/**
 * Environment Configuration Loading Tests
 * 
 * Tests for environment-based configuration loading system including
 * validation, error handling, and fallback behavior.
 */

import {
  loadPrimaryExternalUserTypeFromEnv,
  loadDomainConfigFromEnv,
  validateEnvironmentConfig,
  getEnvironmentConfigSummary,
  setEnvironmentConfig,
  clearEnvironmentConfig,
  loadDomainConfig,
  ENV_VARS,
  ConfigLoadingOptions
} from '../environment';

// Mock the primary user configuration module
jest.mock('../users/external/primary', () => ({
  getPrimaryExternalUserConfig: jest.fn((userType: string) => ({
    singular: userType,
    plural: `${userType}s`,
    routes: { list: `/${userType}s`, detail: `/${userType}`, add: `/add-${userType}` },
    labels: { management: `${userType} Management`, addNew: `Add New ${userType}` },
    context: { industry: 'test', domain: 'test' }
  })),
  AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES: ['patient', 'client', 'contact', 'customer', 'member', 'subscriber', 'participant'],
  DEFAULT_PRIMARY_EXTERNAL_USER_TYPE: 'client',
  isValidPrimaryExternalUserType: jest.fn((type: string) => 
    ['patient', 'client', 'contact', 'customer', 'member', 'subscriber', 'participant'].includes(type)
  )
}));

// Mock the shared module
jest.mock('@marek/shared', () => ({
  createDomainConfig: jest.fn((config) => ({
    primaryExternalUser: config,
    version: '2.1.0',
    created: new Date().toISOString()
  }))
}));

describe('Environment Configuration Loading', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment
    originalEnv = { ...process.env };
    // Clear test-related env vars
    clearEnvironmentConfig();
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  describe('loadPrimaryExternalUserTypeFromEnv', () => {
    it('should load valid user type from environment', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'patient';
      
      const result = loadPrimaryExternalUserTypeFromEnv();
      expect(result).toBe('patient');
    });

    it('should use default when no environment variable set', () => {
      const result = loadPrimaryExternalUserTypeFromEnv();
      expect(result).toBe('client'); // DEFAULT_PRIMARY_EXTERNAL_USER_TYPE
    });

    it('should throw error when invalid type and fallback disabled', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'invalid-type';
      
      expect(() => {
        loadPrimaryExternalUserTypeFromEnv({ fallbackToDefault: false });
      }).toThrow('Invalid DOMAIN_TYPE value: "invalid-type"');
    });

    it('should fallback to default for invalid type when fallback enabled', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'invalid-type';
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const result = loadPrimaryExternalUserTypeFromEnv({ 
        fallbackToDefault: true,
        enableWarnings: true 
      });
      
      expect(result).toBe('client');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Config Warning]')
      );
      
      consoleSpy.mockRestore();
    });

    it('should respect environment overrides', () => {
      const result = loadPrimaryExternalUserTypeFromEnv({
        envOverrides: { [ENV_VARS.DOMAIN_TYPE]: 'contact' }
      });
      
      expect(result).toBe('contact');
    });

    it('should throw error when no value and fallback disabled', () => {
      expect(() => {
        loadPrimaryExternalUserTypeFromEnv({ fallbackToDefault: false });
      }).toThrow('Environment variable DOMAIN_TYPE is required');
    });
  });

  describe('loadDomainConfigFromEnv', () => {
    it('should load complete domain configuration', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'client';
      
      const result = loadDomainConfigFromEnv();
      
      expect(result).toEqual({
        primaryExternalUser: expect.objectContaining({
          singular: 'client',
          plural: 'clients'
        }),
        version: '2.1.0',
        created: expect.any(String)
      });
    });

    it('should pass options to user type loader', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'invalid';
      
      const result = loadDomainConfigFromEnv({ 
        fallbackToDefault: true,
        enableWarnings: false 
      });
      
      expect(result).toBeDefined();
    });
  });

  describe('validateEnvironmentConfig', () => {
    it('should return valid for proper configuration', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'patient';
      
      const result = validateEnvironmentConfig();
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.config).toBeDefined();
    });

    it('should return errors for invalid configuration', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'invalid-type';
      
      const result = validateEnvironmentConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.config).toBeUndefined();
    });

    it('should include warnings for missing environment variables', () => {
      delete process.env[ENV_VARS.DOMAIN_TYPE];
      
      const result = validateEnvironmentConfig({ fallbackToDefault: true });
      
      expect(result.warnings).toContain('DOMAIN_TYPE environment variable not set');
    });

    it('should warn when validation is disabled', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'client';
      process.env[ENV_VARS.CONFIG_VALIDATION] = 'false';
      
      const result = validateEnvironmentConfig();
      
      expect(result.warnings).toContain('Configuration validation is disabled');
    });
  });

  describe('getEnvironmentConfigSummary', () => {
    it('should return complete environment summary', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'patient';
      process.env[ENV_VARS.DEPLOYMENT_PRESET] = 'traditional-healthcare';
      process.env[ENV_VARS.CONFIG_VALIDATION] = 'true';
      process.env[ENV_VARS.NODE_ENV] = 'test';
      
      const result = getEnvironmentConfigSummary();
      
      expect(result).toEqual({
        domainType: 'patient',
        deploymentPreset: 'traditional-healthcare',
        configValidation: true,
        nodeEnv: 'test',
        availableTypes: expect.arrayContaining(['patient', 'client', 'contact']),
        defaultType: 'client'
      });
    });

    it('should handle missing environment variables', () => {
      const result = getEnvironmentConfigSummary();
      
      expect(result.domainType).toBeUndefined();
      expect(result.deploymentPreset).toBeUndefined();
      expect(result.configValidation).toBe(true); // default
    });
  });

  describe('setEnvironmentConfig', () => {
    it('should set domain type', () => {
      setEnvironmentConfig({ domainType: 'contact' });
      
      expect(process.env[ENV_VARS.DOMAIN_TYPE]).toBe('contact');
    });

    it('should set deployment preset', () => {
      setEnvironmentConfig({ deploymentPreset: 'business-crm' });
      
      expect(process.env[ENV_VARS.DEPLOYMENT_PRESET]).toBe('business-crm');
    });

    it('should set config validation', () => {
      setEnvironmentConfig({ configValidation: false });
      
      expect(process.env[ENV_VARS.CONFIG_VALIDATION]).toBe('false');
    });

    it('should set multiple values', () => {
      setEnvironmentConfig({
        domainType: 'member',
        deploymentPreset: 'sales-organization',
        configValidation: true
      });
      
      expect(process.env[ENV_VARS.DOMAIN_TYPE]).toBe('member');
      expect(process.env[ENV_VARS.DEPLOYMENT_PRESET]).toBe('sales-organization');
      expect(process.env[ENV_VARS.CONFIG_VALIDATION]).toBe('true');
    });
  });

  describe('clearEnvironmentConfig', () => {
    it('should clear all configuration environment variables', () => {
      // Set some values first
      process.env[ENV_VARS.DOMAIN_TYPE] = 'patient';
      process.env[ENV_VARS.DEPLOYMENT_PRESET] = 'traditional-healthcare';
      process.env[ENV_VARS.CONFIG_VALIDATION] = 'true';
      
      clearEnvironmentConfig();
      
      expect(process.env[ENV_VARS.DOMAIN_TYPE]).toBeUndefined();
      expect(process.env[ENV_VARS.DEPLOYMENT_PRESET]).toBeUndefined();
      expect(process.env[ENV_VARS.CONFIG_VALIDATION]).toBeUndefined();
    });
  });

  describe('loadDomainConfig (main function)', () => {
    it('should use development defaults in non-production', () => {
      process.env[ENV_VARS.NODE_ENV] = 'development';
      process.env[ENV_VARS.DOMAIN_TYPE] = 'client';
      
      const result = loadDomainConfig();
      
      expect(result).toBeDefined();
      expect(result.primaryExternalUser.singular).toBe('client');
    });

    it('should disable warnings in production', () => {
      process.env[ENV_VARS.NODE_ENV] = 'production';
      process.env[ENV_VARS.DOMAIN_TYPE] = 'invalid';
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const result = loadDomainConfig();
      
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should respect strict validation setting', () => {
      process.env[ENV_VARS.CONFIG_VALIDATION] = 'false';
      process.env[ENV_VARS.DOMAIN_TYPE] = 'client';
      
      const result = loadDomainConfig();
      
      expect(result).toBeDefined();
    });

    it('should allow option overrides', () => {
      process.env[ENV_VARS.DOMAIN_TYPE] = 'invalid';
      
      const result = loadDomainConfig({
        fallbackToDefault: true,
        enableWarnings: false
      });
      
      expect(result).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing shared module gracefully', () => {
      // This would typically be a module loading error
      const { createDomainConfig } = require('@marek/shared');
      createDomainConfig.mockImplementation(() => {
        throw new Error('Module not found');
      });
      
      expect(() => {
        loadDomainConfigFromEnv();
      }).toThrow('Module not found');
    });

    it('should handle validation errors with proper error messages', () => {
      const result = validateEnvironmentConfig();
      
      if (!result.valid) {
        expect(result.errors[0]).toContain('DOMAIN_TYPE');
      }
    });
  });
});