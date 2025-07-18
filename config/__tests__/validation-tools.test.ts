/**
 * Configuration Validation Tools Tests
 * 
 * Tests for configuration validation utilities including schema validation,
 * deployment validation, and configuration analysis tools.
 */

import {
  validateUserConfiguration,
  validateDeploymentPreset,
  ValidationResult,
  ValidationSeverity,
  ConfigurationAnalysis
} from '../tools/validate-config';

// Mock configurations for testing
const mockValidUserConfig = {
  singular: 'client',
  plural: 'clients',
  routes: {
    list: '/clients',
    detail: '/client',
    add: '/add-client'
  },
  labels: {
    management: 'Client Management',
    addNew: 'Add New Client'
  },
  context: {
    industry: 'business',
    domain: 'professional-services'
  }
};

const mockValidDeploymentPreset = {
  name: 'Test Preset',
  description: 'Test deployment preset',
  version: '2.1.0',
  primaryExternalUser: mockValidUserConfig,
  features: {
    fhirCompliance: false,
    hipaaCompliance: false,
    prescribing: false,
    scheduling: true,
    billing: true,
    messaging: true,
    reporting: true,
    api: true
  },
  integrations: {
    billing: 'test-billing',
    messaging: 'test-messaging'
  },
  uiPreferences: {
    theme: 'auto' as const,
    primaryColor: '#059669',
    layout: 'sidebar' as const,
    density: 'comfortable' as const
  },
  security: {
    mfaRequired: false,
    sessionTimeout: 60,
    auditLogging: true,
    dataEncryption: true
  }
};

describe('Configuration Validation Tools', () => {
  describe('validateUserConfiguration', () => {
    it('should validate correct user configuration', () => {
      const result = validateUserConfiguration(mockValidUserConfig);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const incompleteConfig = {
        singular: 'client',
        // Missing plural, routes, labels, context
      };
      
      const result = validateUserConfiguration(incompleteConfig as any);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(error => error.message.includes('plural'))).toBe(true);
      expect(result.errors.some(error => error.message.includes('routes'))).toBe(true);
    });

    it('should validate route formats', () => {
      const configWithBadRoutes = {
        ...mockValidUserConfig,
        routes: {
          list: 'clients', // Missing leading slash
          detail: '/client',
          add: '/add-client'
        }
      };
      
      const result = validateUserConfiguration(configWithBadRoutes);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => 
        error.message.includes('route') && error.message.includes('/')
      )).toBe(true);
    });

    it('should validate singular/plural consistency', () => {
      const configWithInconsistentPlural = {
        ...mockValidUserConfig,
        singular: 'client',
        plural: 'users' // Should be 'clients'
      };
      
      const result = validateUserConfiguration(configWithInconsistentPlural);
      
      expect(result.warnings.some(warning => 
        warning.message.includes('plural') && warning.message.includes('consistent')
      )).toBe(true);
    });

    it('should validate label consistency', () => {
      const configWithInconsistentLabels = {
        ...mockValidUserConfig,
        singular: 'client',
        labels: {
          management: 'User Management', // Should be 'Client Management'
          addNew: 'Add New Client'
        }
      };
      
      const result = validateUserConfiguration(configWithInconsistentLabels);
      
      expect(result.warnings.some(warning => 
        warning.message.includes('label') && warning.message.includes('consistent')
      )).toBe(true);
    });

    it('should validate context completeness', () => {
      const configWithIncompleteContext = {
        ...mockValidUserConfig,
        context: {
          industry: 'business'
          // Missing domain
        }
      };
      
      const result = validateUserConfiguration(configWithIncompleteContext);
      
      expect(result.errors.some(error => 
        error.message.includes('context') && error.message.includes('domain')
      )).toBe(true);
    });

    it('should provide detailed error information', () => {
      const invalidConfig = {
        singular: '', // Empty string
        plural: 'clients',
        routes: {},  // Empty routes
        labels: {},  // Empty labels
        context: {}  // Empty context
      };
      
      const result = validateUserConfiguration(invalidConfig as any);
      
      expect(result.isValid).toBe(false);
      result.errors.forEach(error => {
        expect(error).toHaveProperty('field');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('severity');
        expect(error.severity).toBe(ValidationSeverity.ERROR);
      });
    });
  });

  describe('validateDeploymentPreset', () => {
    it('should validate correct deployment preset', () => {
      const result = validateDeploymentPreset(mockValidDeploymentPreset);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required preset fields', () => {
      const incompletePreset = {
        name: 'Test Preset',
        // Missing description, version, primaryExternalUser, features
      };
      
      const result = validateDeploymentPreset(incompletePreset as any);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate features configuration', () => {
      const presetWithInvalidFeatures = {
        ...mockValidDeploymentPreset,
        features: {
          fhirCompliance: 'yes', // Should be boolean
          hipaaCompliance: false,
          // Missing other required features
        }
      };
      
      const result = validateDeploymentPreset(presetWithInvalidFeatures as any);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => 
        error.message.includes('fhirCompliance') && error.message.includes('boolean')
      )).toBe(true);
    });

    it('should validate logical feature combinations', () => {
      const presetWithIllogicalFeatures = {
        ...mockValidDeploymentPreset,
        features: {
          ...mockValidDeploymentPreset.features,
          fhirCompliance: false,
          prescribing: true // Prescribing without FHIR compliance
        }
      };
      
      const result = validateDeploymentPreset(presetWithIllogicalFeatures);
      
      expect(result.warnings.some(warning => 
        warning.message.includes('prescribing') && warning.message.includes('FHIR')
      )).toBe(true);
    });

    it('should validate UI preferences', () => {
      const presetWithInvalidUI = {
        ...mockValidDeploymentPreset,
        uiPreferences: {
          theme: 'invalid-theme' as any,
          primaryColor: 'not-a-color',
          layout: 'invalid-layout' as any,
          density: 'invalid-density' as any
        }
      };
      
      const result = validateDeploymentPreset(presetWithInvalidUI);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.message.includes('theme'))).toBe(true);
      expect(result.errors.some(error => error.message.includes('layout'))).toBe(true);
      expect(result.errors.some(error => error.message.includes('density'))).toBe(true);
    });

    it('should validate security configuration', () => {
      const presetWithInvalidSecurity = {
        ...mockValidDeploymentPreset,
        security: {
          mfaRequired: 'maybe', // Should be boolean
          sessionTimeout: -1, // Should be positive
          auditLogging: true,
          dataEncryption: true
        }
      };
      
      const result = validateDeploymentPreset(presetWithInvalidSecurity as any);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => 
        error.message.includes('mfaRequired') && error.message.includes('boolean')
      )).toBe(true);
      expect(result.errors.some(error => 
        error.message.includes('sessionTimeout') && error.message.includes('positive')
      )).toBe(true);
    });

    it('should validate version format', () => {
      const presetWithInvalidVersion = {
        ...mockValidDeploymentPreset,
        version: 'v1.0' // Should be semantic version
      };
      
      const result = validateDeploymentPreset(presetWithInvalidVersion);
      
      expect(result.warnings.some(warning => 
        warning.message.includes('version') && warning.message.includes('semantic')
      )).toBe(true);
    });
  });

  describe('ValidationResult Structure', () => {
    it('should provide comprehensive validation results', () => {
      const result = validateUserConfiguration({} as any);
      
      expect(result).toHaveProperty('isValid');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');
      expect(result).toHaveProperty('analysis');
      
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });

    it('should categorize issues by severity', () => {
      const result = validateUserConfiguration({} as any);
      
      result.errors.forEach(error => {
        expect(error.severity).toBe(ValidationSeverity.ERROR);
      });
      
      // Test with a config that generates warnings
      const configWithWarnings = {
        ...mockValidUserConfig,
        singular: 'client',
        plural: 'users' // Inconsistent plural
      };
      
      const warningResult = validateUserConfiguration(configWithWarnings);
      warningResult.warnings.forEach(warning => {
        expect(warning.severity).toBe(ValidationSeverity.WARNING);
      });
    });

    it('should provide field-specific error information', () => {
      const result = validateUserConfiguration({
        singular: '', // Invalid
        routes: {} // Invalid
      } as any);
      
      const singularError = result.errors.find(error => error.field === 'singular');
      const routesError = result.errors.find(error => error.field === 'routes');
      
      expect(singularError).toBeDefined();
      expect(routesError).toBeDefined();
    });
  });

  describe('Configuration Analysis', () => {
    it('should provide analysis for valid configurations', () => {
      const result = validateUserConfiguration(mockValidUserConfig);
      
      expect(result.analysis).toBeDefined();
      expect(result.analysis.completeness).toBeGreaterThan(0);
      expect(result.analysis.completeness).toBeLessThanOrEqual(100);
    });

    it('should analyze deployment preset completeness', () => {
      const result = validateDeploymentPreset(mockValidDeploymentPreset);
      
      expect(result.analysis).toBeDefined();
      expect(result.analysis.completeness).toBeGreaterThan(0);
      
      // Should have high completeness for complete preset
      expect(result.analysis.completeness).toBeGreaterThan(80);
    });

    it('should identify missing optional features', () => {
      const minimalPreset = {
        name: 'Minimal Preset',
        description: 'Minimal test preset',
        version: '2.1.0',
        primaryExternalUser: mockValidUserConfig,
        features: {
          fhirCompliance: false,
          hipaaCompliance: false,
          prescribing: false,
          scheduling: false,
          billing: false,
          messaging: false,
          reporting: false,
          api: false
        }
        // Missing integrations, uiPreferences, security
      };
      
      const result = validateDeploymentPreset(minimalPreset);
      
      expect(result.analysis.completeness).toBeLessThan(100);
      expect(result.analysis.suggestions?.length).toBeGreaterThan(0);
    });
  });

  describe('Error Recovery and Suggestions', () => {
    it('should provide helpful suggestions for common errors', () => {
      const configWithTypos = {
        singuar: 'client', // Typo: should be 'singular'
        plural: 'clients',
        routes: {
          list: '/clients',
          detail: '/client',
          add: '/add-client'
        },
        labels: {
          management: 'Client Management',
          addNew: 'Add New Client'
        },
        context: {
          industry: 'business',
          domain: 'professional-services'
        }
      };
      
      const result = validateUserConfiguration(configWithTypos as any);
      
      expect(result.analysis.suggestions?.some(suggestion => 
        suggestion.includes('singular')
      )).toBe(true);
    });

    it('should suggest improvements for incomplete configurations', () => {
      const incompletePreset = {
        ...mockValidDeploymentPreset,
        integrations: undefined,
        uiPreferences: undefined,
        security: undefined
      };
      
      const result = validateDeploymentPreset(incompletePreset);
      
      expect(result.analysis.suggestions?.length).toBeGreaterThan(0);
      expect(result.analysis.suggestions?.some(suggestion => 
        suggestion.includes('integrations') || 
        suggestion.includes('security') || 
        suggestion.includes('UI')
      )).toBe(true);
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle very large configurations efficiently', () => {
      const largeConfig = {
        ...mockValidUserConfig,
        context: {
          ...mockValidUserConfig.context,
          // Add many additional context fields
          ...Object.fromEntries(
            Array.from({ length: 100 }, (_, i) => [`field${i}`, `value${i}`])
          )
        }
      };
      
      const startTime = Date.now();
      const result = validateUserConfiguration(largeConfig);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
      expect(result).toBeDefined();
    });

    it('should handle null and undefined values gracefully', () => {
      const configWithNulls = {
        singular: null,
        plural: undefined,
        routes: null,
        labels: undefined,
        context: null
      };
      
      expect(() => {
        validateUserConfiguration(configWithNulls as any);
      }).not.toThrow();
    });

    it('should handle circular references safely', () => {
      const circularConfig: any = {
        singular: 'client',
        plural: 'clients'
      };
      circularConfig.self = circularConfig; // Create circular reference
      
      expect(() => {
        validateUserConfiguration(circularConfig);
      }).not.toThrow();
    });
  });
});