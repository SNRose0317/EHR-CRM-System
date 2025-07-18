/**
 * Deployment Presets Registry
 * 
 * Centralized registry of all available deployment presets with
 * loading utilities and validation functions.
 * 
 * @since 2.1.0
 */

import traditionalHealthcarePreset, { DeploymentPreset } from './traditional-healthcare';
import businessCrmPreset from './business-crm';
import salesOrganizationPreset from './sales-organization';

/**
 * Registry of all available deployment presets
 */
export const DEPLOYMENT_PRESETS = {
  'traditional-healthcare': traditionalHealthcarePreset,
  'business-crm': businessCrmPreset,
  'sales-organization': salesOrganizationPreset
} as const;

/**
 * Type for valid deployment preset names
 */
export type DeploymentPresetType = keyof typeof DEPLOYMENT_PRESETS;

/**
 * Array of all available deployment preset names
 */
export const AVAILABLE_DEPLOYMENT_PRESETS: DeploymentPresetType[] = [
  'traditional-healthcare',
  'business-crm', 
  'sales-organization'
];

/**
 * Default deployment preset
 */
export const DEFAULT_DEPLOYMENT_PRESET: DeploymentPresetType = 'business-crm';

/**
 * Get deployment preset by name
 * 
 * @param presetName - The preset name
 * @returns The deployment preset
 * @throws Error if preset is not found
 */
export function getDeploymentPreset(
  presetName: DeploymentPresetType
): DeploymentPreset {
  const preset = DEPLOYMENT_PRESETS[presetName];
  
  if (!preset) {
    throw new Error(
      `Deployment preset "${presetName}" not found. ` +
      `Available presets: ${AVAILABLE_DEPLOYMENT_PRESETS.join(', ')}`
    );
  }
  
  return preset;
}

/**
 * Check if a preset name is valid
 * 
 * @param presetName - The preset name to validate
 * @returns True if the preset name is valid
 */
export function isValidDeploymentPreset(
  presetName: string
): presetName is DeploymentPresetType {
  return presetName in DEPLOYMENT_PRESETS;
}

/**
 * Load deployment preset from environment variable
 * 
 * @param fallbackToDefault - Whether to fallback to default if env var is invalid
 * @returns Deployment preset
 */
export function loadDeploymentPresetFromEnv(
  fallbackToDefault: boolean = true
): DeploymentPreset {
  const envValue = process.env.DEPLOYMENT_PRESET;
  
  if (!envValue) {
    if (fallbackToDefault) {
      console.warn(
        `[Config Warning] DEPLOYMENT_PRESET environment variable not set. ` +
        `Using default: ${DEFAULT_DEPLOYMENT_PRESET}`
      );
      return getDeploymentPreset(DEFAULT_DEPLOYMENT_PRESET);
    } else {
      throw new Error(
        `DEPLOYMENT_PRESET environment variable is required. ` +
        `Available presets: ${AVAILABLE_DEPLOYMENT_PRESETS.join(', ')}`
      );
    }
  }
  
  if (!isValidDeploymentPreset(envValue)) {
    const message = 
      `Invalid DEPLOYMENT_PRESET value: "${envValue}". ` +
      `Available presets: ${AVAILABLE_DEPLOYMENT_PRESETS.join(', ')}`;
      
    if (fallbackToDefault) {
      console.warn(`[Config Warning] ${message}. Using default: ${DEFAULT_DEPLOYMENT_PRESET}`);
      return getDeploymentPreset(DEFAULT_DEPLOYMENT_PRESET);
    } else {
      throw new Error(message);
    }
  }
  
  return getDeploymentPreset(envValue);
}

/**
 * Get preset recommendations by industry
 * 
 * @param industry - The industry context
 * @returns Array of recommended presets
 */
export function getRecommendedPresetsByIndustry(industry: string): {
  preset: DeploymentPresetType;
  score: number;
  reason: string;
}[] {
  const recommendations = {
    healthcare: [
      { preset: 'traditional-healthcare' as const, score: 10, reason: 'Perfect match for healthcare organizations' }
    ],
    business: [
      { preset: 'business-crm' as const, score: 10, reason: 'Ideal for professional services' },
      { preset: 'sales-organization' as const, score: 7, reason: 'Good if sales-focused' }
    ],
    sales: [
      { preset: 'sales-organization' as const, score: 10, reason: 'Optimized for sales operations' },
      { preset: 'business-crm' as const, score: 8, reason: 'Alternative for service-oriented sales' }
    ],
    consulting: [
      { preset: 'business-crm' as const, score: 10, reason: 'Perfect for consulting firms' }
    ],
    finance: [
      { preset: 'business-crm' as const, score: 9, reason: 'Great for financial advisory services' }
    ],
    legal: [
      { preset: 'business-crm' as const, score: 9, reason: 'Suitable for legal practices' }
    ]
  };

  return recommendations[industry.toLowerCase()] || [
    { preset: 'business-crm' as const, score: 5, reason: 'General purpose business configuration' }
  ];
}

/**
 * Validate a deployment preset
 * 
 * @param preset - The preset to validate
 * @returns Validation result
 */
export function validateDeploymentPreset(preset: DeploymentPreset): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!preset.name) errors.push('Missing preset name');
  if (!preset.description) errors.push('Missing preset description');
  if (!preset.version) errors.push('Missing preset version');
  if (!preset.primaryExternalUser) errors.push('Missing primary external user configuration');
  if (!preset.features) errors.push('Missing features configuration');

  // Validate features
  if (preset.features) {
    if (typeof preset.features.fhirCompliance !== 'boolean') {
      errors.push('fhirCompliance must be boolean');
    }
    
    // Check for conflicting features
    if (preset.features.prescribing && !preset.features.fhirCompliance) {
      warnings.push('Prescribing feature enabled without FHIR compliance');
    }
    
    if (preset.features.hipaaCompliance && !preset.features.fhirCompliance) {
      warnings.push('HIPAA compliance enabled without FHIR compliance');
    }
  }

  // Validate integrations
  if (preset.integrations) {
    if (preset.integrations.ehr && !preset.features?.fhirCompliance) {
      warnings.push('EHR integration specified without FHIR compliance');
    }
    
    if (preset.integrations.pharmacy && !preset.features?.prescribing) {
      warnings.push('Pharmacy integration specified without prescribing feature');
    }
  }

  // Validate security settings
  if (preset.security) {
    if (preset.security.sessionTimeout && preset.security.sessionTimeout < 5) {
      warnings.push('Session timeout is very short (less than 5 minutes)');
    }
    
    if (preset.features?.hipaaCompliance && !preset.security.mfaRequired) {
      warnings.push('HIPAA compliance enabled without MFA requirement');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Compare two deployment presets
 * 
 * @param preset1 - First preset to compare
 * @param preset2 - Second preset to compare
 * @returns Comparison result
 */
export function compareDeploymentPresets(
  preset1: DeploymentPreset,
  preset2: DeploymentPreset
): {
  differences: {
    field: string;
    preset1Value: any;
    preset2Value: any;
  }[];
  compatibilityScore: number;
} {
  const differences: any[] = [];
  
  // Compare primary external user
  if (preset1.primaryExternalUser.singular !== preset2.primaryExternalUser.singular) {
    differences.push({
      field: 'primaryExternalUser.terminology',
      preset1Value: preset1.primaryExternalUser.singular,
      preset2Value: preset2.primaryExternalUser.singular
    });
  }
  
  // Compare features
  for (const [feature, value1] of Object.entries(preset1.features)) {
    const value2 = preset2.features[feature as keyof typeof preset2.features];
    if (value1 !== value2) {
      differences.push({
        field: `features.${feature}`,
        preset1Value: value1,
        preset2Value: value2
      });
    }
  }
  
  // Calculate compatibility score (0-100)
  const totalComparableFields = Object.keys(preset1.features).length + 1; // +1 for user type
  const compatibilityScore = Math.round(
    ((totalComparableFields - differences.length) / totalComparableFields) * 100
  );
  
  return {
    differences,
    compatibilityScore
  };
}

// Re-export all presets
export {
  traditionalHealthcarePreset,
  businessCrmPreset,
  salesOrganizationPreset,
  type DeploymentPreset
};