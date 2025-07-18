/**
 * Primary External Users Registry
 * 
 * Centralized registry of all available primary external user configurations.
 * Provides type-safe access to configurations and validation utilities.
 * 
 * @since 2.1.0
 */

import { ExternalServiceRecipientConfig } from '@marek/shared';

// Import all primary external user configurations
import patientConfig from './patient';
import clientConfig from './client';
import contactConfig from './contact';
import customerConfig from './customer';
import memberConfig from './member';
import subscriberConfig from './subscriber';
import participantConfig from './participant';

/**
 * Registry of all available primary external user configurations
 */
export const PRIMARY_EXTERNAL_USER_CONFIGS = {
  patient: patientConfig,
  client: clientConfig,
  contact: contactConfig,
  customer: customerConfig,
  member: memberConfig,
  subscriber: subscriberConfig,
  participant: participantConfig
} as const;

/**
 * Type for valid primary external user type names
 */
export type PrimaryExternalUserType = keyof typeof PRIMARY_EXTERNAL_USER_CONFIGS;

/**
 * Array of all available primary external user type names
 */
export const AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES: PrimaryExternalUserType[] = [
  'patient',
  'client', 
  'contact',
  'customer',
  'member',
  'subscriber',
  'participant'
];

/**
 * Default primary external user type (can be overridden by environment)
 */
export const DEFAULT_PRIMARY_EXTERNAL_USER_TYPE: PrimaryExternalUserType = 'client';

/**
 * Get primary external user configuration by type name
 * 
 * @param userType - The user type name
 * @returns The configuration object
 * @throws Error if user type is not found
 */
export function getPrimaryExternalUserConfig(
  userType: PrimaryExternalUserType
): ExternalServiceRecipientConfig {
  const config = PRIMARY_EXTERNAL_USER_CONFIGS[userType];
  
  if (!config) {
    throw new Error(
      `Primary external user type "${userType}" not found. ` +
      `Available types: ${AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES.join(', ')}`
    );
  }
  
  return config;
}

/**
 * Check if a user type name is valid
 * 
 * @param userType - The user type name to validate
 * @returns True if the user type is valid
 */
export function isValidPrimaryExternalUserType(
  userType: string
): userType is PrimaryExternalUserType {
  return userType in PRIMARY_EXTERNAL_USER_CONFIGS;
}

/**
 * Get configuration recommendations based on industry
 * 
 * @param industry - The industry context
 * @returns Array of recommended user type configurations
 */
export function getRecommendedConfigsByIndustry(industry: string): {
  primary: PrimaryExternalUserType;
  alternatives: PrimaryExternalUserType[];
  description: string;
}[] {
  const recommendations = {
    healthcare: {
      primary: 'patient' as const,
      alternatives: ['member', 'participant'],
      description: 'Traditional healthcare terminology with FHIR compliance'
    },
    business: {
      primary: 'client' as const,
      alternatives: ['contact', 'customer'],
      description: 'Professional services and B2B terminology'
    },
    sales: {
      primary: 'contact' as const,
      alternatives: ['client', 'customer'],
      description: 'Sales and marketing focused terminology'
    },
    retail: {
      primary: 'customer' as const,
      alternatives: ['subscriber', 'member'],
      description: 'E-commerce and retail transaction terminology'
    },
    saas: {
      primary: 'subscriber' as const,
      alternatives: ['customer', 'client'],
      description: 'Subscription and recurring service terminology'
    },
    research: {
      primary: 'participant' as const,
      alternatives: ['patient'],
      description: 'Clinical research and study terminology'
    },
    membership: {
      primary: 'member' as const,
      alternatives: ['client', 'customer'],
      description: 'Membership organization and community terminology'
    }
  };

  const recommendation = recommendations[industry.toLowerCase()];
  return recommendation ? [recommendation] : [];
}

/**
 * Validate a primary external user configuration
 * 
 * @param config - The configuration to validate
 * @returns Validation result with any errors
 */
export function validatePrimaryExternalUserConfig(
  config: ExternalServiceRecipientConfig
): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  const requiredFields = ['singular', 'plural', 'singularCap', 'pluralCap', 'idField'];
  for (const field of requiredFields) {
    if (!config[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Check routes
  if (!config.routes) {
    errors.push('Missing routes configuration');
  } else {
    const requiredRoutes = ['list', 'detail', 'add'];
    for (const route of requiredRoutes) {
      if (!config.routes[route]) {
        errors.push(`Missing required route: ${route}`);
      }
    }
  }

  // Check labels
  if (!config.labels) {
    errors.push('Missing labels configuration');
  } else {
    const requiredLabels = ['management', 'addNew', 'search', 'listTitle', 'entityId'];
    for (const label of requiredLabels) {
      if (!config.labels[label]) {
        errors.push(`Missing required label: ${label}`);
      }
    }
  }

  // Check consistency
  if (config.singular && config.plural) {
    if (config.singular === config.plural) {
      warnings.push('Singular and plural forms are identical');
    }
  }

  // Check route format
  if (config.routes) {
    if (config.routes.list && !config.routes.list.startsWith('/')) {
      errors.push('List route must start with "/"');
    }
    if (config.routes.detail && !config.routes.detail.startsWith('/')) {
      errors.push('Detail route must start with "/"');
    }
    if (config.routes.add && !config.routes.add.startsWith('/')) {
      errors.push('Add route must start with "/"');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Re-export all configurations for direct access
export {
  patientConfig,
  clientConfig,
  contactConfig,
  customerConfig,
  memberConfig,
  subscriberConfig,
  participantConfig
};