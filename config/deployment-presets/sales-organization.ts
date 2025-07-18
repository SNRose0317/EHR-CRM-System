/**
 * Sales Organization Deployment Preset
 * 
 * Sales and marketing focused configuration for lead management,
 * customer acquisition, and sales pipeline management.
 * 
 * Use this preset for:
 * - Sales organizations
 * - Marketing agencies
 * - Lead generation companies
 * - Customer acquisition focused businesses
 * - CRM-heavy operations
 * 
 * @since 2.1.0
 */

import { contactConfig } from '../users/external/primary/contact';
import { DeploymentPreset } from './traditional-healthcare';

export const salesOrganizationPreset: DeploymentPreset = {
  name: "Sales Organization",
  description: "Sales and marketing focused configuration for lead management and customer acquisition",
  version: "2.1.0",
  
  // Use contact terminology
  primaryExternalUser: contactConfig,
  
  // Sales-focused features
  features: {
    fhirCompliance: false,
    hipaaCompliance: false,
    prescribing: false,
    scheduling: true, // For sales meetings
    billing: false, // Usually handled separately
    messaging: true, // Sales communication
    reporting: true, // Sales analytics
    api: true
  },
  
  // Sales and marketing integrations
  integrations: {
    billing: "stripe", // For payment processing
    messaging: "sales-automation",
    ehr: undefined,
    pharmacy: undefined,
    lab: undefined
  },
  
  // Sales-optimized UI preferences
  uiPreferences: {
    theme: 'auto',
    primaryColor: '#dc2626', // Sales red
    layout: 'sidebar',
    density: 'compact' // More data-dense for sales teams
  },
  
  // Standard business security
  security: {
    mfaRequired: false,
    sessionTimeout: 120, // 2 hours - longer for sales activities
    auditLogging: true,
    dataEncryption: true
  }
};

export default salesOrganizationPreset;