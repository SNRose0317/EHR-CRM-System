/**
 * Business CRM Deployment Preset
 * 
 * Professional services and client management configuration
 * focused on business relationships and service delivery.
 * 
 * Use this preset for:
 * - Consulting firms
 * - Legal practices
 * - Financial advisory services
 * - Professional service organizations
 * - B2B service providers
 * 
 * @since 2.1.0
 */

import { clientConfig } from '../users/external/primary/client';
import { DeploymentPreset } from './traditional-healthcare';

export const businessCrmPreset: DeploymentPreset = {
  name: "Business CRM",
  description: "Professional services and client management configuration",
  version: "2.1.0",
  
  // Use client terminology
  primaryExternalUser: clientConfig,
  
  // Business-focused features
  features: {
    fhirCompliance: false, // Not needed for business use
    hipaaCompliance: false,
    prescribing: false,
    scheduling: true,
    billing: true,
    messaging: true,
    reporting: true,
    api: true
  },
  
  // Business service integrations
  integrations: {
    billing: "quickbooks",
    messaging: "business-email",
    ehr: undefined, // Not applicable
    pharmacy: undefined,
    lab: undefined
  },
  
  // Professional UI preferences
  uiPreferences: {
    theme: 'auto',
    primaryColor: '#059669', // Business green
    layout: 'sidebar',
    density: 'comfortable'
  },
  
  // Business-appropriate security
  security: {
    mfaRequired: false, // Optional for business use
    sessionTimeout: 60, // 1 hour
    auditLogging: true,
    dataEncryption: true
  }
};

export default businessCrmPreset;