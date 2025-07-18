/**
 * Configuration Integration Tests
 * 
 * End-to-end tests for the complete configuration system including
 * environment loading, user configurations, deployment presets,
 * and validation working together.
 */

import {
  loadDomainConfig,
  setEnvironmentConfig,
  clearEnvironmentConfig,
  validateEnvironmentConfig
} from '../environment';
import { validateDeploymentPreset } from '../tools/validate-config';
import { traditionalHealthcarePreset } from '../deployment-presets/traditional-healthcare';
import { businessCrmPreset } from '../deployment-presets/business-crm';
import { salesOrganizationPreset } from '../deployment-presets/sales-organization';

// Mock the shared module for consistent testing
jest.mock('@marek/shared', () => ({
  createDomainConfig: jest.fn((config) => ({
    primaryExternalUser: config,
    version: '2.1.0',
    created: new Date().toISOString(),
    fhirMapping: config.singular === 'patient' ? {
      resourceType: 'Patient',
      active: true
    } : undefined
  }))
}));

describe('Configuration System Integration', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    clearEnvironmentConfig();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  describe('Complete Configuration Loading Flow', () => {
    it('should load healthcare configuration end-to-end', () => {
      setEnvironmentConfig({ domainType: 'patient' });
      
      const config = loadDomainConfig();
      
      expect(config.primaryExternalUser.singular).toBe('patient');
      expect(config.primaryExternalUser.plural).toBe('patients');
      expect(config.primaryExternalUser.context.industry).toBe('healthcare');
      expect(config.fhirMapping).toBeDefined();
    });

    it('should load business configuration end-to-end', () => {
      setEnvironmentConfig({ domainType: 'client' });
      
      const config = loadDomainConfig();
      
      expect(config.primaryExternalUser.singular).toBe('client');
      expect(config.primaryExternalUser.plural).toBe('clients');
      expect(config.primaryExternalUser.context.industry).toBe('business');
      expect(config.fhirMapping).toBeUndefined();
    });

    it('should load sales configuration end-to-end', () => {
      setEnvironmentConfig({ domainType: 'contact' });
      
      const config = loadDomainConfig();
      
      expect(config.primaryExternalUser.singular).toBe('contact');
      expect(config.primaryExternalUser.plural).toBe('contacts');
      expect(config.primaryExternalUser.context.industry).toBe('sales');
    });
  });

  describe('Deployment Preset Integration', () => {
    it('should have consistent configuration between preset and loaded config', () => {
      setEnvironmentConfig({ domainType: 'patient' });
      
      const loadedConfig = loadDomainConfig();
      const healthcarePreset = traditionalHealthcarePreset;
      
      expect(loadedConfig.primaryExternalUser.singular)
        .toBe(healthcarePreset.primaryExternalUser.singular);
      expect(loadedConfig.primaryExternalUser.context.industry)
        .toBe(healthcarePreset.primaryExternalUser.context.industry);
    });

    it('should validate all built-in deployment presets', () => {
      const presets = [
        traditionalHealthcarePreset,
        businessCrmPreset,
        salesOrganizationPreset
      ];

      presets.forEach(preset => {
        const validation = validateDeploymentPreset(preset);
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      });
    });

    it('should have logical feature alignment across presets', () => {
      // Healthcare preset should enable medical features
      expect(traditionalHealthcarePreset.features.fhirCompliance).toBe(true);
      expect(traditionalHealthcarePreset.features.hipaaCompliance).toBe(true);
      expect(traditionalHealthcarePreset.features.prescribing).toBe(true);

      // Business preset should disable medical features
      expect(businessCrmPreset.features.fhirCompliance).toBe(false);
      expect(businessCrmPreset.features.hipaaCompliance).toBe(false);
      expect(businessCrmPreset.features.prescribing).toBe(false);

      // Sales preset should focus on sales features
      expect(salesOrganizationPreset.features.fhirCompliance).toBe(false);
      expect(salesOrganizationPreset.features.messaging).toBe(true);
      expect(salesOrganizationPreset.features.reporting).toBe(true);
    });
  });

  describe('Environment Variable Handling', () => {
    it('should handle environment switching correctly', () => {
      // Start with patient
      setEnvironmentConfig({ domainType: 'patient' });
      let config = loadDomainConfig();
      expect(config.primaryExternalUser.singular).toBe('patient');

      // Switch to client
      setEnvironmentConfig({ domainType: 'client' });
      config = loadDomainConfig();
      expect(config.primaryExternalUser.singular).toBe('client');

      // Switch to contact
      setEnvironmentConfig({ domainType: 'contact' });
      config = loadDomainConfig();
      expect(config.primaryExternalUser.singular).toBe('contact');
    });

    it('should validate configuration after environment changes', () => {
      setEnvironmentConfig({ domainType: 'patient' });
      let validation = validateEnvironmentConfig();
      expect(validation.valid).toBe(true);

      setEnvironmentConfig({ domainType: 'invalid-type' });
      validation = validateEnvironmentConfig();
      expect(validation.valid).toBe(false);

      setEnvironmentConfig({ domainType: 'client' });
      validation = validateEnvironmentConfig();
      expect(validation.valid).toBe(true);
    });

    it('should handle missing environment variables gracefully', () => {
      clearEnvironmentConfig();
      
      // Should use default
      const config = loadDomainConfig();
      expect(config.primaryExternalUser.singular).toBe('client'); // Default
      
      // Validation should show warnings
      const validation = validateEnvironmentConfig();
      expect(validation.warnings.some(w => 
        w.includes('DOMAIN_TYPE environment variable not set')
      )).toBe(true);
    });
  });

  describe('FHIR Compliance Integration', () => {
    it('should enable FHIR mapping for healthcare configurations', () => {
      setEnvironmentConfig({ domainType: 'patient' });
      
      const config = loadDomainConfig();
      const validation = validateEnvironmentConfig();
      
      expect(config.fhirMapping).toBeDefined();
      expect(validation.valid).toBe(true);
    });

    it('should disable FHIR mapping for non-healthcare configurations', () => {
      const nonHealthcareTypes = ['client', 'contact', 'customer', 'member'];
      
      nonHealthcareTypes.forEach(type => {
        setEnvironmentConfig({ domainType: type as any });
        const config = loadDomainConfig();
        expect(config.fhirMapping).toBeUndefined();
      });
    });

    it('should maintain FHIR compliance in healthcare preset', () => {
      const preset = traditionalHealthcarePreset;
      const validation = validateDeploymentPreset(preset);
      
      expect(preset.features.fhirCompliance).toBe(true);
      expect(validation.isValid).toBe(true);
      
      // Should not have warnings about FHIR compliance
      expect(validation.warnings.some(w => 
        w.message.includes('FHIR') && w.message.includes('missing')
      )).toBe(false);
    });
  });

  describe('Configuration Consistency Across System', () => {
    it('should have consistent terminology across all components', () => {
      const userTypes = ['patient', 'client', 'contact', 'customer', 'member', 'subscriber', 'participant'];
      
      userTypes.forEach(userType => {
        setEnvironmentConfig({ domainType: userType as any });
        const config = loadDomainConfig();
        
        // Terminology should be consistent
        expect(config.primaryExternalUser.singular).toBe(userType);
        expect(config.primaryExternalUser.plural).toBe(`${userType}s`);
        expect(config.primaryExternalUser.routes.list).toBe(`/${userType}s`);
        expect(config.primaryExternalUser.routes.detail).toBe(`/${userType}`);
      });
    });

    it('should have consistent version across all components', () => {
      const config = loadDomainConfig();
      const presets = [traditionalHealthcarePreset, businessCrmPreset, salesOrganizationPreset];
      
      expect(config.version).toBe('2.1.0');
      presets.forEach(preset => {
        expect(preset.version).toBe('2.1.0');
      });
    });

    it('should validate cross-component relationships', () => {
      // Healthcare preset should use patient configuration
      expect(traditionalHealthcarePreset.primaryExternalUser.singular).toBe('patient');
      
      // Business preset should use client configuration  
      expect(businessCrmPreset.primaryExternalUser.singular).toBe('client');
      
      // Sales preset should use contact configuration
      expect(salesOrganizationPreset.primaryExternalUser.singular).toBe('contact');
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle configuration loading errors gracefully', () => {
      // Mock a loading error
      const { createDomainConfig } = require('@marek/shared');
      createDomainConfig.mockImplementationOnce(() => {
        throw new Error('Configuration loading failed');
      });
      
      expect(() => {
        loadDomainConfig();
      }).toThrow('Configuration loading failed');
    });

    it('should provide comprehensive error information', () => {
      setEnvironmentConfig({ domainType: 'invalid-type' });
      
      const validation = validateEnvironmentConfig();
      
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
      expect(validation.errors[0]).toContain('invalid-type');
    });

    it('should recover from temporary configuration issues', () => {
      // Start with invalid configuration
      setEnvironmentConfig({ domainType: 'invalid-type' });
      let validation = validateEnvironmentConfig();
      expect(validation.valid).toBe(false);
      
      // Fix configuration
      setEnvironmentConfig({ domainType: 'client' });
      validation = validateEnvironmentConfig();
      expect(validation.valid).toBe(true);
      
      // Should be able to load config successfully
      const config = loadDomainConfig();
      expect(config).toBeDefined();
      expect(config.primaryExternalUser.singular).toBe('client');
    });
  });

  describe('Performance and Scalability', () => {
    it('should load configurations efficiently', () => {
      const startTime = Date.now();
      
      // Load multiple configurations
      const userTypes = ['patient', 'client', 'contact', 'customer'];
      userTypes.forEach(userType => {
        setEnvironmentConfig({ domainType: userType as any });
        loadDomainConfig();
      });
      
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should handle concurrent configuration loading', async () => {
      const userTypes = ['patient', 'client', 'contact', 'customer'];
      
      const loadPromises = userTypes.map(async (userType) => {
        setEnvironmentConfig({ domainType: userType as any });
        return loadDomainConfig();
      });
      
      const configs = await Promise.all(loadPromises);
      
      expect(configs).toHaveLength(userTypes.length);
      configs.forEach(config => {
        expect(config).toBeDefined();
        expect(config.primaryExternalUser).toBeDefined();
      });
    });

    it('should validate large configurations efficiently', () => {
      const startTime = Date.now();
      
      // Validate all presets
      const presets = [traditionalHealthcarePreset, businessCrmPreset, salesOrganizationPreset];
      presets.forEach(preset => {
        validateDeploymentPreset(preset);
      });
      
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(500); // Should complete within 500ms
    });
  });

  describe('Real-World Usage Scenarios', () => {
    it('should support switching between development environments', () => {
      // Development environment - use client terminology
      process.env.NODE_ENV = 'development';
      setEnvironmentConfig({ domainType: 'client' });
      
      let config = loadDomainConfig();
      expect(config.primaryExternalUser.singular).toBe('client');
      
      // Production environment - use patient terminology
      process.env.NODE_ENV = 'production';
      setEnvironmentConfig({ domainType: 'patient' });
      
      config = loadDomainConfig();
      expect(config.primaryExternalUser.singular).toBe('patient');
    });

    it('should support multi-tenant deployment scenarios', () => {
      const tenantConfigurations = [
        { tenant: 'healthcare-org', domainType: 'patient' },
        { tenant: 'consulting-firm', domainType: 'client' },
        { tenant: 'sales-company', domainType: 'contact' }
      ];
      
      tenantConfigurations.forEach(({ tenant, domainType }) => {
        setEnvironmentConfig({ domainType: domainType as any });
        const config = loadDomainConfig();
        
        expect(config.primaryExternalUser.singular).toBe(domainType);
        
        // Each tenant should have valid configuration
        const validation = validateEnvironmentConfig();
        expect(validation.valid).toBe(true);
      });
    });

    it('should support gradual migration scenarios', () => {
      // Start with patient terminology (existing system)
      setEnvironmentConfig({ domainType: 'patient' });
      let config = loadDomainConfig();
      expect(config.primaryExternalUser.singular).toBe('patient');
      
      // Migrate to client terminology (new system)
      setEnvironmentConfig({ domainType: 'client' });
      config = loadDomainConfig();
      expect(config.primaryExternalUser.singular).toBe('client');
      
      // Both configurations should maintain same structure
      setEnvironmentConfig({ domainType: 'patient' });
      const patientConfig = loadDomainConfig();
      
      setEnvironmentConfig({ domainType: 'client' });
      const clientConfig = loadDomainConfig();
      
      // Should have same structure, different terminology
      expect(Object.keys(patientConfig.primaryExternalUser))
        .toEqual(Object.keys(clientConfig.primaryExternalUser));
    });
  });
});