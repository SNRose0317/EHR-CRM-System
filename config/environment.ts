/**
 * Environment-Based Configuration Loading
 * 
 * Provides environment variable based configuration loading for domain types
 * and deployment presets. Enables easy switching between configurations
 * without code changes.
 * 
 * @since 2.1.0
 */

import { DomainEntityConfig, createDomainConfig } from '@marek/shared';
import { 
  getPrimaryExternalUserConfig, 
  PrimaryExternalUserType,
  AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES,
  DEFAULT_PRIMARY_EXTERNAL_USER_TYPE,
  isValidPrimaryExternalUserType
} from './users/external/primary';

/**
 * Environment variable names used for configuration
 */
export const ENV_VARS = {
  DOMAIN_TYPE: 'DOMAIN_TYPE',
  DEPLOYMENT_PRESET: 'DEPLOYMENT_PRESET', 
  CONFIG_VALIDATION: 'CONFIG_VALIDATION',
  NODE_ENV: 'NODE_ENV'
} as const;

/**
 * Configuration loading options
 */
export interface ConfigLoadingOptions {
  /** Override environment variables */
  envOverrides?: Record<string, string>;
  /** Enable strict validation */
  strictValidation?: boolean;
  /** Fallback to default if env var is invalid */
  fallbackToDefault?: boolean;
  /** Enable console warnings for configuration issues */
  enableWarnings?: boolean;
}

/**
 * Load primary external user type from environment
 * 
 * @param options - Configuration loading options
 * @returns Primary external user type
 */
export function loadPrimaryExternalUserTypeFromEnv(
  options: ConfigLoadingOptions = {}
): PrimaryExternalUserType {
  const {
    envOverrides = {},
    fallbackToDefault = true,
    enableWarnings = true
  } = options;

  // Get environment value (with possible override)
  const envValue = envOverrides[ENV_VARS.DOMAIN_TYPE] 
    || process.env[ENV_VARS.DOMAIN_TYPE] 
    || (fallbackToDefault ? DEFAULT_PRIMARY_EXTERNAL_USER_TYPE : undefined);

  if (!envValue) {
    throw new Error(
      `Environment variable ${ENV_VARS.DOMAIN_TYPE} is required. ` +
      `Available options: ${AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES.join(', ')}`
    );
  }

  // Validate the environment value
  if (!isValidPrimaryExternalUserType(envValue)) {
    const message = 
      `Invalid ${ENV_VARS.DOMAIN_TYPE} value: "${envValue}". ` +
      `Available options: ${AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES.join(', ')}`;

    if (fallbackToDefault) {
      if (enableWarnings) {
        console.warn(`[Config Warning] ${message}. Falling back to: ${DEFAULT_PRIMARY_EXTERNAL_USER_TYPE}`);
      }
      return DEFAULT_PRIMARY_EXTERNAL_USER_TYPE;
    } else {
      throw new Error(message);
    }
  }

  return envValue;
}

/**
 * Load domain configuration from environment
 * 
 * @param options - Configuration loading options
 * @returns Complete domain configuration
 */
export function loadDomainConfigFromEnv(
  options: ConfigLoadingOptions = {}
): DomainEntityConfig {
  const primaryUserType = loadPrimaryExternalUserTypeFromEnv(options);
  const primaryUserConfig = getPrimaryExternalUserConfig(primaryUserType);
  
  return createDomainConfig(primaryUserConfig);
}

/**
 * Validate current environment configuration
 * 
 * @param options - Configuration loading options
 * @returns Validation result
 */
export function validateEnvironmentConfig(
  options: ConfigLoadingOptions = {}
): {
  valid: boolean;
  errors: string[];
  warnings: string[];
  config?: DomainEntityConfig;
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Test loading configuration
    const config = loadDomainConfigFromEnv({
      ...options,
      fallbackToDefault: false,
      enableWarnings: false
    });

    // Additional validation checks
    const domainType = process.env[ENV_VARS.DOMAIN_TYPE];
    if (!domainType) {
      warnings.push(`${ENV_VARS.DOMAIN_TYPE} environment variable not set`);
    }

    // Check for configuration validation setting
    const configValidation = process.env[ENV_VARS.CONFIG_VALIDATION];
    if (configValidation === 'false') {
      warnings.push('Configuration validation is disabled');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      config
    };

  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
    
    return {
      valid: false,
      errors,
      warnings
    };
  }
}

/**
 * Get current environment configuration summary
 * 
 * @returns Environment configuration summary
 */
export function getEnvironmentConfigSummary(): {
  domainType: string | undefined;
  deploymentPreset: string | undefined;
  configValidation: boolean;
  nodeEnv: string | undefined;
  availableTypes: PrimaryExternalUserType[];
  defaultType: PrimaryExternalUserType;
} {
  return {
    domainType: process.env[ENV_VARS.DOMAIN_TYPE],
    deploymentPreset: process.env[ENV_VARS.DEPLOYMENT_PRESET],
    configValidation: process.env[ENV_VARS.CONFIG_VALIDATION] !== 'false',
    nodeEnv: process.env[ENV_VARS.NODE_ENV],
    availableTypes: AVAILABLE_PRIMARY_EXTERNAL_USER_TYPES,
    defaultType: DEFAULT_PRIMARY_EXTERNAL_USER_TYPE
  };
}

/**
 * Set environment variables for configuration (useful for testing)
 * 
 * @param config - Environment configuration to set
 */
export function setEnvironmentConfig(config: {
  domainType?: PrimaryExternalUserType;
  deploymentPreset?: string;
  configValidation?: boolean;
}): void {
  if (config.domainType) {
    process.env[ENV_VARS.DOMAIN_TYPE] = config.domainType;
  }
  
  if (config.deploymentPreset) {
    process.env[ENV_VARS.DEPLOYMENT_PRESET] = config.deploymentPreset;
  }
  
  if (config.configValidation !== undefined) {
    process.env[ENV_VARS.CONFIG_VALIDATION] = String(config.configValidation);
  }
}

/**
 * Clear environment configuration (useful for testing)
 */
export function clearEnvironmentConfig(): void {
  delete process.env[ENV_VARS.DOMAIN_TYPE];
  delete process.env[ENV_VARS.DEPLOYMENT_PRESET];
  delete process.env[ENV_VARS.CONFIG_VALIDATION];
}

/**
 * Default domain configuration loader
 * 
 * This is the main function applications should use to load configuration.
 * It handles environment variables, validation, and fallbacks automatically.
 * 
 * @param options - Configuration loading options
 * @returns Domain configuration ready for use
 */
export function loadDomainConfig(
  options: ConfigLoadingOptions = {}
): DomainEntityConfig {
  const defaultOptions: ConfigLoadingOptions = {
    fallbackToDefault: true,
    enableWarnings: process.env[ENV_VARS.NODE_ENV] !== 'production',
    strictValidation: process.env[ENV_VARS.CONFIG_VALIDATION] !== 'false',
    ...options
  };

  return loadDomainConfigFromEnv(defaultOptions);
}