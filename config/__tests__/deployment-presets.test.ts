/**
 * Deployment Presets Tests
 * 
 * Tests for pre-configured deployment scenarios including traditional healthcare,
 * business CRM, and sales organization presets.
 */

import { traditionalHealthcarePreset, DeploymentPreset } from '../deployment-presets/traditional-healthcare';
import { businessCrmPreset } from '../deployment-presets/business-crm';
import { salesOrganizationPreset } from '../deployment-presets/sales-organization';

describe('Deployment Presets', () => {
  describe('Traditional Healthcare Preset', () => {
    it('should have complete healthcare configuration', () => {
      expect(traditionalHealthcarePreset.name).toBe('Traditional Healthcare');
      expect(traditionalHealthcarePreset.description).toContain('FHIR compliance');
      expect(traditionalHealthcarePreset.version).toBe('2.1.0');
    });

    it('should use patient terminology', () => {
      expect(traditionalHealthcarePreset.primaryExternalUser.singular).toBe('patient');
      expect(traditionalHealthcarePreset.primaryExternalUser.plural).toBe('patients');
    });

    it('should enable all healthcare features', () => {
      const features = traditionalHealthcarePreset.features;
      expect(features.fhirCompliance).toBe(true);
      expect(features.hipaaCompliance).toBe(true);
      expect(features.prescribing).toBe(true);
      expect(features.scheduling).toBe(true);
      expect(features.billing).toBe(true);
      expect(features.messaging).toBe(true);
      expect(features.reporting).toBe(true);
      expect(features.api).toBe(true);
    });

    it('should have healthcare-specific integrations', () => {
      const integrations = traditionalHealthcarePreset.integrations!;
      expect(integrations.ehr).toBe('epic');
      expect(integrations.pharmacy).toBe('surescripts');
      expect(integrations.lab).toBe('labcorp');
      expect(integrations.billing).toBe('epic-clarity');
      expect(integrations.messaging).toBe('secure-messaging');
    });

    it('should have clinical UI preferences', () => {
      const ui = traditionalHealthcarePreset.uiPreferences!;
      expect(ui.theme).toBe('light');
      expect(ui.primaryColor).toBe('#2563eb'); // Medical blue
      expect(ui.layout).toBe('sidebar');
      expect(ui.density).toBe('comfortable');
    });

    it('should have maximum security settings', () => {
      const security = traditionalHealthcarePreset.security!;
      expect(security.mfaRequired).toBe(true);
      expect(security.sessionTimeout).toBe(30); // 30 minutes
      expect(security.auditLogging).toBe(true);
      expect(security.dataEncryption).toBe(true);
    });
  });

  describe('Business CRM Preset', () => {
    it('should have complete business configuration', () => {
      expect(businessCrmPreset.name).toBe('Business CRM');
      expect(businessCrmPreset.description).toContain('client management');
      expect(businessCrmPreset.version).toBe('2.1.0');
    });

    it('should use client terminology', () => {
      expect(businessCrmPreset.primaryExternalUser.singular).toBe('client');
      expect(businessCrmPreset.primaryExternalUser.plural).toBe('clients');
    });

    it('should enable business-appropriate features', () => {
      const features = businessCrmPreset.features;
      expect(features.fhirCompliance).toBe(false);
      expect(features.hipaaCompliance).toBe(false);
      expect(features.prescribing).toBe(false);
      expect(features.scheduling).toBe(true);
      expect(features.billing).toBe(true);
      expect(features.messaging).toBe(true);
      expect(features.reporting).toBe(true);
      expect(features.api).toBe(true);
    });

    it('should have business-specific integrations', () => {
      const integrations = businessCrmPreset.integrations!;
      expect(integrations.billing).toBe('quickbooks');
      expect(integrations.messaging).toBe('business-email');
      expect(integrations.ehr).toBeUndefined();
      expect(integrations.pharmacy).toBeUndefined();
      expect(integrations.lab).toBeUndefined();
    });

    it('should have professional UI preferences', () => {
      const ui = businessCrmPreset.uiPreferences!;
      expect(ui.theme).toBe('auto');
      expect(ui.primaryColor).toBe('#059669'); // Business green
      expect(ui.layout).toBe('sidebar');
      expect(ui.density).toBe('comfortable');
    });

    it('should have business-appropriate security', () => {
      const security = businessCrmPreset.security!;
      expect(security.mfaRequired).toBe(false);
      expect(security.sessionTimeout).toBe(60); // 1 hour
      expect(security.auditLogging).toBe(true);
      expect(security.dataEncryption).toBe(true);
    });
  });

  describe('Sales Organization Preset', () => {
    it('should have complete sales configuration', () => {
      expect(salesOrganizationPreset.name).toBe('Sales Organization');
      expect(salesOrganizationPreset.description).toContain('lead management');
      expect(salesOrganizationPreset.version).toBe('2.1.0');
    });

    it('should use contact terminology', () => {
      expect(salesOrganizationPreset.primaryExternalUser.singular).toBe('contact');
      expect(salesOrganizationPreset.primaryExternalUser.plural).toBe('contacts');
    });

    it('should enable sales-focused features', () => {
      const features = salesOrganizationPreset.features;
      expect(features.fhirCompliance).toBe(false);
      expect(features.hipaaCompliance).toBe(false);
      expect(features.prescribing).toBe(false);
      expect(features.scheduling).toBe(true); // For sales meetings
      expect(features.billing).toBe(false); // Usually handled separately
      expect(features.messaging).toBe(true); // Sales communication
      expect(features.reporting).toBe(true); // Sales analytics
      expect(features.api).toBe(true);
    });

    it('should have sales-specific integrations', () => {
      const integrations = salesOrganizationPreset.integrations!;
      expect(integrations.billing).toBe('stripe');
      expect(integrations.messaging).toBe('sales-automation');
      expect(integrations.ehr).toBeUndefined();
      expect(integrations.pharmacy).toBeUndefined();
      expect(integrations.lab).toBeUndefined();
    });

    it('should have sales-optimized UI preferences', () => {
      const ui = salesOrganizationPreset.uiPreferences!;
      expect(ui.theme).toBe('auto');
      expect(ui.primaryColor).toBe('#dc2626'); // Sales red
      expect(ui.layout).toBe('sidebar');
      expect(ui.density).toBe('compact'); // More data-dense
    });

    it('should have standard business security', () => {
      const security = salesOrganizationPreset.security!;
      expect(security.mfaRequired).toBe(false);
      expect(security.sessionTimeout).toBe(120); // 2 hours - longer for sales
      expect(security.auditLogging).toBe(true);
      expect(security.dataEncryption).toBe(true);
    });
  });

  describe('Preset Consistency', () => {
    const presets = [
      traditionalHealthcarePreset,
      businessCrmPreset,
      salesOrganizationPreset
    ];

    it('should all have required fields', () => {
      presets.forEach(preset => {
        expect(preset).toHaveProperty('name');
        expect(preset).toHaveProperty('description');
        expect(preset).toHaveProperty('version');
        expect(preset).toHaveProperty('primaryExternalUser');
        expect(preset).toHaveProperty('features');
      });
    });

    it('should all have the same version', () => {
      const versions = presets.map(preset => preset.version);
      expect(new Set(versions).size).toBe(1);
      expect(versions[0]).toBe('2.1.0');
    });

    it('should have unique names', () => {
      const names = presets.map(preset => preset.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('should have complete features configuration', () => {
      presets.forEach(preset => {
        const features = preset.features;
        expect(features).toHaveProperty('fhirCompliance');
        expect(features).toHaveProperty('hipaaCompliance');
        expect(features).toHaveProperty('prescribing');
        expect(features).toHaveProperty('scheduling');
        expect(features).toHaveProperty('billing');
        expect(features).toHaveProperty('messaging');
        expect(features).toHaveProperty('reporting');
        expect(features).toHaveProperty('api');
      });
    });
  });

  describe('DeploymentPreset Interface Compliance', () => {
    const testPreset = (preset: DeploymentPreset, presetName: string) => {
      it(`${presetName} should conform to DeploymentPreset interface`, () => {
        // Required fields
        expect(typeof preset.name).toBe('string');
        expect(typeof preset.description).toBe('string');
        expect(typeof preset.version).toBe('string');
        expect(preset.primaryExternalUser).toBeDefined();
        expect(preset.features).toBeDefined();

        // Features object structure
        expect(typeof preset.features.fhirCompliance).toBe('boolean');
        
        // Optional fields should be properly typed if present
        if (preset.integrations) {
          expect(typeof preset.integrations).toBe('object');
        }
        
        if (preset.uiPreferences) {
          expect(typeof preset.uiPreferences).toBe('object');
          if (preset.uiPreferences.theme) {
            expect(['light', 'dark', 'auto']).toContain(preset.uiPreferences.theme);
          }
        }
        
        if (preset.security) {
          expect(typeof preset.security).toBe('object');
          if (preset.security.sessionTimeout) {
            expect(typeof preset.security.sessionTimeout).toBe('number');
            expect(preset.security.sessionTimeout).toBeGreaterThan(0);
          }
        }
      });
    };

    testPreset(traditionalHealthcarePreset, 'Traditional Healthcare');
    testPreset(businessCrmPreset, 'Business CRM');
    testPreset(salesOrganizationPreset, 'Sales Organization');
  });

  describe('Feature Flag Validation', () => {
    it('should have logical feature combinations for healthcare', () => {
      const features = traditionalHealthcarePreset.features;
      
      // Healthcare should have FHIR and HIPAA
      expect(features.fhirCompliance).toBe(true);
      expect(features.hipaaCompliance).toBe(true);
      
      // If FHIR is enabled, prescribing should be available
      if (features.fhirCompliance) {
        expect(features.prescribing).toBe(true);
      }
    });

    it('should have logical feature combinations for business', () => {
      const features = businessCrmPreset.features;
      
      // Business should not need medical compliance
      expect(features.fhirCompliance).toBe(false);
      expect(features.hipaaCompliance).toBe(false);
      expect(features.prescribing).toBe(false);
      
      // But should have business features
      expect(features.billing).toBe(true);
      expect(features.reporting).toBe(true);
    });

    it('should have logical feature combinations for sales', () => {
      const features = salesOrganizationPreset.features;
      
      // Sales should not need medical or billing
      expect(features.fhirCompliance).toBe(false);
      expect(features.hipaaCompliance).toBe(false);
      expect(features.prescribing).toBe(false);
      expect(features.billing).toBe(false); // Usually separate
      
      // But should have communication and analytics
      expect(features.messaging).toBe(true);
      expect(features.reporting).toBe(true);
    });
  });

  describe('Security Configuration Validation', () => {
    it('should have stricter security for healthcare', () => {
      const healthcareSecurity = traditionalHealthcarePreset.security!;
      const businessSecurity = businessCrmPreset.security!;
      const salesSecurity = salesOrganizationPreset.security!;
      
      // Healthcare should be most strict
      expect(healthcareSecurity.mfaRequired).toBe(true);
      expect(healthcareSecurity.sessionTimeout).toBeLessThan(businessSecurity.sessionTimeout!);
      expect(healthcareSecurity.sessionTimeout).toBeLessThan(salesSecurity.sessionTimeout!);
      
      // All should have encryption and audit logging
      [healthcareSecurity, businessSecurity, salesSecurity].forEach(security => {
        expect(security.auditLogging).toBe(true);
        expect(security.dataEncryption).toBe(true);
      });
    });

    it('should have appropriate session timeouts', () => {
      expect(traditionalHealthcarePreset.security!.sessionTimeout).toBe(30); // Shortest for healthcare
      expect(businessCrmPreset.security!.sessionTimeout).toBe(60); // Medium for business
      expect(salesOrganizationPreset.security!.sessionTimeout).toBe(120); // Longest for sales activities
    });
  });

  describe('Integration Validation', () => {
    it('should have appropriate integrations for each domain', () => {
      // Healthcare integrations
      const healthcareIntegrations = traditionalHealthcarePreset.integrations!;
      expect(healthcareIntegrations.ehr).toBeDefined();
      expect(healthcareIntegrations.pharmacy).toBeDefined();
      expect(healthcareIntegrations.lab).toBeDefined();
      
      // Business integrations
      const businessIntegrations = businessCrmPreset.integrations!;
      expect(businessIntegrations.billing).toBe('quickbooks');
      expect(businessIntegrations.ehr).toBeUndefined();
      
      // Sales integrations
      const salesIntegrations = salesOrganizationPreset.integrations!;
      expect(salesIntegrations.billing).toBe('stripe');
      expect(salesIntegrations.messaging).toBe('sales-automation');
    });
  });
});