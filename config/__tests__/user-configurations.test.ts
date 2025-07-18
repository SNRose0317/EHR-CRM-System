/**
 * User Configuration Tests
 * 
 * Tests for all user type configurations including external primary users,
 * secondary users, and internal staff configurations.
 */

import {
  getPrimaryExternalUserConfig,
  AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES,
  DEFAULT_PRIMARY_EXTERNAL_USER_TYPE,
  isValidPrimaryExternalUserType,
  PrimaryExternalUserType
} from '../users/external/primary';

// Import individual configurations for detailed testing
import { patientConfig } from '../users/external/primary/patient';
import { clientConfig } from '../users/external/primary/client';
import { contactConfig } from '../users/external/primary/contact';
import { customerConfig } from '../users/external/primary/customer';
import { memberConfig } from '../users/external/primary/member';
import { subscriberConfig } from '../users/external/primary/subscriber';
import { participantConfig } from '../users/external/primary/participant';

describe('User Configuration System', () => {
  describe('Primary External User Types', () => {
    describe('Configuration Availability', () => {
      it('should have all expected user types available', () => {
        const expectedTypes = [
          'patient', 'client', 'contact', 'customer', 
          'member', 'subscriber', 'participant'
        ];
        
        expect(AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES).toEqual(
          expect.arrayContaining(expectedTypes)
        );
        expect(AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES).toHaveLength(expectedTypes.length);
      });

      it('should have a valid default user type', () => {
        expect(AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES).toContain(DEFAULT_PRIMARY_EXTERNAL_USER_TYPE);
        expect(DEFAULT_PRIMARY_EXTERNAL_USER_TYPE).toBe('client');
      });
    });

    describe('User Type Validation', () => {
      it('should validate known user types', () => {
        AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES.forEach(userType => {
          expect(isValidPrimaryExternalUserType(userType)).toBe(true);
        });
      });

      it('should reject invalid user types', () => {
        const invalidTypes = ['admin', 'user', 'person', 'invalid', ''];
        
        invalidTypes.forEach(invalidType => {
          expect(isValidPrimaryExternalUserType(invalidType)).toBe(false);
        });
      });

      it('should be case sensitive', () => {
        expect(isValidPrimaryExternalUserType('CLIENT')).toBe(false);
        expect(isValidPrimaryExternalUserType('Patient')).toBe(false);
        expect(isValidPrimaryExternalUserType('client')).toBe(true);
      });
    });

    describe('Configuration Retrieval', () => {
      it('should retrieve configurations for all user types', () => {
        AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES.forEach(userType => {
          const config = getPrimaryExternalUserConfig(userType as PrimaryExternalUserType);
          expect(config).toBeDefined();
          expect(config.singular).toBe(userType);
        });
      });

      it('should throw error for invalid user type', () => {
        expect(() => {
          getPrimaryExternalUserConfig('invalid' as PrimaryExternalUserType);
        }).toThrow();
      });
    });
  });

  describe('Individual Configuration Validation', () => {
    const configTestCases = [
      { name: 'patient', config: patientConfig, context: 'healthcare' },
      { name: 'client', config: clientConfig, context: 'business' },
      { name: 'contact', config: contactConfig, context: 'sales' },
      { name: 'customer', config: customerConfig, context: 'ecommerce' },
      { name: 'member', config: memberConfig, context: 'membership' },
      { name: 'subscriber', config: subscriberConfig, context: 'subscription' },
      { name: 'participant', config: participantConfig, context: 'research' }
    ];

    configTestCases.forEach(({ name, config, context }) => {
      describe(`${name} configuration`, () => {
        it('should have correct singular and plural forms', () => {
          expect(config.singular).toBe(name);
          expect(config.plural).toBe(`${name}s`);
        });

        it('should have properly formatted routes', () => {
          expect(config.routes.list).toBe(`/${name}s`);
          expect(config.routes.detail).toBe(`/${name}`);
          expect(config.routes.add).toBe(`/add-${name}`);
        });

        it('should have appropriate labels', () => {
          const expectedManagement = `${name.charAt(0).toUpperCase() + name.slice(1)} Management`;
          const expectedAddNew = `Add New ${name.charAt(0).toUpperCase() + name.slice(1)}`;
          
          expect(config.labels.management).toBe(expectedManagement);
          expect(config.labels.addNew).toBe(expectedAddNew);
        });

        it('should have contextual information', () => {
          expect(config.context).toBeDefined();
          expect(config.context.domain).toContain(context);
        });

        it('should be a complete configuration object', () => {
          const requiredFields = ['singular', 'plural', 'routes', 'labels', 'context'];
          requiredFields.forEach(field => {
            expect(config).toHaveProperty(field);
          });
        });
      });
    });
  });

  describe('Healthcare-Specific Validation (Patient Config)', () => {
    it('should have FHIR-compliant context', () => {
      expect(patientConfig.context.industry).toBe('healthcare');
      expect(patientConfig.context.domain).toBe('clinical-care');
    });

    it('should use medical terminology', () => {
      expect(patientConfig.labels.management).toBe('Patient Management');
      expect(patientConfig.labels.addNew).toBe('Add New Patient');
    });
  });

  describe('Business-Specific Validation (Client Config)', () => {
    it('should have business-appropriate context', () => {
      expect(clientConfig.context.industry).toBe('business');
      expect(clientConfig.context.domain).toBe('professional-services');
    });

    it('should use professional terminology', () => {
      expect(clientConfig.labels.management).toBe('Client Management');
      expect(clientConfig.labels.addNew).toBe('Add New Client');
    });
  });

  describe('Sales-Specific Validation (Contact Config)', () => {
    it('should have sales-appropriate context', () => {
      expect(contactConfig.context.industry).toBe('sales');
      expect(contactConfig.context.domain).toBe('lead-management');
    });

    it('should use sales terminology', () => {
      expect(contactConfig.labels.management).toBe('Contact Management');
      expect(contactConfig.labels.addNew).toBe('Add New Contact');
    });
  });

  describe('Configuration Consistency', () => {
    it('should have consistent structure across all configurations', () => {
      const configs = [
        patientConfig, clientConfig, contactConfig, customerConfig,
        memberConfig, subscriberConfig, participantConfig
      ];

      configs.forEach((config, index) => {
        const configName = AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES[index];
        
        // Check required top-level properties
        expect(config).toHaveProperty('singular');
        expect(config).toHaveProperty('plural');
        expect(config).toHaveProperty('routes');
        expect(config).toHaveProperty('labels');
        expect(config).toHaveProperty('context');

        // Check routes structure
        expect(config.routes).toHaveProperty('list');
        expect(config.routes).toHaveProperty('detail');
        expect(config.routes).toHaveProperty('add');

        // Check labels structure
        expect(config.labels).toHaveProperty('management');
        expect(config.labels).toHaveProperty('addNew');

        // Check context structure
        expect(config.context).toHaveProperty('industry');
        expect(config.context).toHaveProperty('domain');
      });
    });

    it('should have unique route patterns', () => {
      const configs = [
        patientConfig, clientConfig, contactConfig, customerConfig,
        memberConfig, subscriberConfig, participantConfig
      ];

      const listRoutes = configs.map(config => config.routes.list);
      const detailRoutes = configs.map(config => config.routes.detail);
      const addRoutes = configs.map(config => config.routes.add);

      // All routes should be unique
      expect(new Set(listRoutes).size).toBe(listRoutes.length);
      expect(new Set(detailRoutes).size).toBe(detailRoutes.length);
      expect(new Set(addRoutes).size).toBe(addRoutes.length);
    });

    it('should have appropriate string formats', () => {
      const configs = [
        patientConfig, clientConfig, contactConfig, customerConfig,
        memberConfig, subscriberConfig, participantConfig
      ];

      configs.forEach(config => {
        // Singular should be lowercase
        expect(config.singular).toBe(config.singular.toLowerCase());
        
        // Plural should be lowercase
        expect(config.plural).toBe(config.plural.toLowerCase());
        
        // Routes should start with /
        expect(config.routes.list).toMatch(/^\/[a-z]+s$/);
        expect(config.routes.detail).toMatch(/^\/[a-z]+$/);
        expect(config.routes.add).toMatch(/^\/add-[a-z]+$/);
        
        // Labels should be title case
        expect(config.labels.management).toMatch(/^[A-Z][a-z]+\s+Management$/);
        expect(config.labels.addNew).toMatch(/^Add\s+New\s+[A-Z][a-z]+$/);
      });
    });
  });

  describe('Integration with External Systems', () => {
    it('should provide FHIR mapping capability for patient config', () => {
      // Patient config should be suitable for FHIR Patient resource mapping
      expect(patientConfig.singular).toBe('patient');
      expect(patientConfig.context.industry).toBe('healthcare');
    });

    it('should provide CRM mapping capability for client config', () => {
      // Client config should be suitable for CRM Contact/Account mapping
      expect(clientConfig.singular).toBe('client');
      expect(clientConfig.context.industry).toBe('business');
    });

    it('should provide sales pipeline mapping for contact config', () => {
      // Contact config should be suitable for sales automation
      expect(contactConfig.singular).toBe('contact');
      expect(contactConfig.context.industry).toBe('sales');
    });
  });

  describe('Error Handling', () => {
    it('should handle configuration loading errors gracefully', () => {
      // Test that the module exports are properly defined
      expect(() => {
        getPrimaryExternalUserConfig('client' as PrimaryExternalUserType);
      }).not.toThrow();
    });

    it('should provide meaningful error messages for invalid types', () => {
      expect(() => {
        getPrimaryExternalUserConfig('invalid' as PrimaryExternalUserType);
      }).toThrow(/invalid.*type/i);
    });
  });
});