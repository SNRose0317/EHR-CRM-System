/**
 * Traditional Healthcare Deployment Preset
 * 
 * Standard hospital/clinic configuration with full FHIR compliance,
 * HIPAA requirements, and clinical workflows.
 * 
 * Use this preset for:
 * - Hospitals and health systems
 * - Medical clinics and practices
 * - Specialty healthcare providers
 * - Healthcare networks
 * 
 * @since 2.1.0
 */

import { patientConfig } from '../users/external/primary/patient';

export interface DeploymentPreset {
  name: string;
  description: string;
  version: string;
  primaryExternalUser: any;
  features: {
    fhirCompliance: boolean;
    hipaaCompliance?: boolean;
    prescribing?: boolean;
    scheduling?: boolean;
    billing?: boolean;
    messaging?: boolean;
    reporting?: boolean;
    api?: boolean;
  };
  integrations?: {
    ehr?: string;
    pharmacy?: string;
    lab?: string;
    billing?: string;
    messaging?: string;
  };
  uiPreferences?: {
    theme?: 'light' | 'dark' | 'auto';
    primaryColor?: string;
    layout?: 'sidebar' | 'top-nav' | 'compact';
    density?: 'comfortable' | 'compact' | 'spacious';
  };
  security?: {
    mfaRequired?: boolean;
    sessionTimeout?: number;
    auditLogging?: boolean;
    dataEncryption?: boolean;
  };
}

export const traditionalHealthcarePreset: DeploymentPreset = {
  name: "Traditional Healthcare",
  description: "Standard hospital/clinic configuration with FHIR compliance and clinical workflows",
  version: "2.1.0",
  
  // Use patient terminology
  primaryExternalUser: patientConfig,
  
  // Enable all healthcare features
  features: {
    fhirCompliance: true,
    hipaaCompliance: true,
    prescribing: true,
    scheduling: true,
    billing: true,
    messaging: true,
    reporting: true,
    api: true
  },
  
  // Standard healthcare integrations
  integrations: {
    ehr: "epic",
    pharmacy: "surescripts",
    lab: "labcorp",
    billing: "epic-clarity",
    messaging: "secure-messaging"
  },
  
  // Clinical-friendly UI preferences
  uiPreferences: {
    theme: 'light',
    primaryColor: '#2563eb', // Medical blue
    layout: 'sidebar',
    density: 'comfortable'
  },
  
  // Maximum security for healthcare
  security: {
    mfaRequired: true,
    sessionTimeout: 30, // 30 minutes
    auditLogging: true,
    dataEncryption: true
  }
};

export default traditionalHealthcarePreset;