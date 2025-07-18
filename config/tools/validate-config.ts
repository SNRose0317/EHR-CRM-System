/**
 * Configuration Validation Tool
 * 
 * Provides comprehensive validation for domain configurations,
 * deployment presets, and environment settings.
 * 
 * @since 2.1.0
 */

import { validateEnvironmentConfig, getEnvironmentConfigSummary } from '../environment';
import { validatePrimaryExternalUserConfig } from '../user-types/external-users/primary';
import { validateDeploymentPreset, loadDeploymentPresetFromEnv } from '../deployment-presets';
import { isDomainEntityConfig } from '@marek/shared';

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  details?: any;
}

/**
 * Comprehensive validation result
 */
export interface ComprehensiveValidationResult {
  overall: {
    valid: boolean;
    score: number; // 0-100
    summary: string;
  };
  environment: ValidationResult;
  primaryExternalUser: ValidationResult;
  deploymentPreset: ValidationResult;
  domainConfig: ValidationResult;
}

/**
 * Validate current environment configuration
 * 
 * @returns Validation result
 */
export function validateCurrentEnvironment(): ValidationResult {
  try {
    const result = validateEnvironmentConfig({
      fallbackToDefault: false,
      enableWarnings: true
    });
    
    return {
      valid: result.valid,
      errors: result.errors,
      warnings: result.warnings,
      details: getEnvironmentConfigSummary()
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : String(error)],
      warnings: []
    };
  }
}

/**
 * Validate current deployment preset
 * 
 * @returns Validation result
 */
export function validateCurrentDeploymentPreset(): ValidationResult {
  try {
    const preset = loadDeploymentPresetFromEnv(false);
    const result = validateDeploymentPreset(preset);
    
    return {
      valid: result.valid,
      errors: result.errors,
      warnings: result.warnings,
      details: {
        name: preset.name,
        version: preset.version,
        features: preset.features
      }
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : String(error)],
      warnings: []
    };
  }
}

/**
 * Validate current domain configuration
 * 
 * @returns Validation result
 */
export function validateCurrentDomainConfig(): ValidationResult {
  try {
    const envResult = validateEnvironmentConfig();
    
    if (!envResult.valid || !envResult.config) {
      return {
        valid: false,
        errors: ['Cannot load domain configuration: ' + envResult.errors.join(', ')],
        warnings: envResult.warnings
      };
    }
    
    const config = envResult.config;
    
    // Validate domain config structure
    if (!isDomainEntityConfig(config)) {
      return {
        valid: false,
        errors: ['Invalid domain configuration structure'],
        warnings: []
      };
    }
    
    // Validate primary external user config
    const userValidation = validatePrimaryExternalUserConfig(config.externalServiceRecipient);
    
    return {
      valid: userValidation.valid,
      errors: userValidation.errors,
      warnings: userValidation.warnings,
      details: {
        primaryUserType: config.externalServiceRecipient.singular,
        routes: config.externalServiceRecipient.routes,
        labels: config.externalServiceRecipient.labels
      }
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : String(error)],
      warnings: []
    };
  }
}

/**
 * Run comprehensive validation of entire configuration system
 * 
 * @returns Comprehensive validation result
 */
export function validateComprehensiveConfiguration(): ComprehensiveValidationResult {
  const environmentResult = validateCurrentEnvironment();
  const presetResult = validateCurrentDeploymentPreset();
  const domainConfigResult = validateCurrentDomainConfig();
  
  // We'll create a placeholder for primary user validation
  const primaryExternalUserResult: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };
  
  // Calculate overall score
  const results = [environmentResult, primaryExternalUserResult, presetResult, domainConfigResult];
  const validResults = results.filter(r => r.valid).length;
  const score = Math.round((validResults / results.length) * 100);
  
  // Determine overall validity
  const overallValid = results.every(r => r.valid);
  
  // Generate summary
  let summary = '';
  if (overallValid) {
    summary = 'All configuration components are valid and ready for use.';
  } else {
    const invalidComponents = [];
    if (!environmentResult.valid) invalidComponents.push('environment');
    if (!primaryExternalUserResult.valid) invalidComponents.push('primary user config');
    if (!presetResult.valid) invalidComponents.push('deployment preset');
    if (!domainConfigResult.valid) invalidComponents.push('domain config');
    
    summary = `Configuration issues found in: ${invalidComponents.join(', ')}.`;
  }
  
  return {
    overall: {
      valid: overallValid,
      score,
      summary
    },
    environment: environmentResult,
    primaryExternalUser: primaryExternalUserResult,
    deploymentPreset: presetResult,
    domainConfig: domainConfigResult
  };
}

/**
 * Generate validation report as formatted string
 * 
 * @param result - Validation result to format
 * @returns Formatted report string
 */
export function generateValidationReport(result: ComprehensiveValidationResult): string {
  const lines: string[] = [];
  
  lines.push('='.repeat(60));
  lines.push('CONFIGURATION VALIDATION REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  
  // Overall status
  lines.push(`Overall Status: ${result.overall.valid ? '✅ VALID' : '❌ INVALID'}`);
  lines.push(`Validation Score: ${result.overall.score}/100`);
  lines.push(`Summary: ${result.overall.summary}`);
  lines.push('');
  
  // Component details
  const components = [
    { name: 'Environment Configuration', result: result.environment },
    { name: 'Primary External User', result: result.primaryExternalUser },
    { name: 'Deployment Preset', result: result.deploymentPreset },
    { name: 'Domain Configuration', result: result.domainConfig }
  ];
  
  for (const component of components) {
    lines.push(`${component.name}: ${component.result.valid ? '✅' : '❌'}`);
    
    if (component.result.errors.length > 0) {
      lines.push('  Errors:');
      component.result.errors.forEach(error => lines.push(`    - ${error}`));
    }
    
    if (component.result.warnings.length > 0) {
      lines.push('  Warnings:');
      component.result.warnings.forEach(warning => lines.push(`    - ${warning}`));
    }
    
    if (component.result.details) {
      lines.push('  Details:');
      lines.push(`    ${JSON.stringify(component.result.details, null, 4).replace(/\n/g, '\n    ')}`);
    }
    
    lines.push('');
  }
  
  lines.push('='.repeat(60));
  
  return lines.join('\n');
}

/**
 * Quick validation check (returns boolean)
 * 
 * @returns True if configuration is valid
 */
export function isConfigurationValid(): boolean {
  try {
    const result = validateComprehensiveConfiguration();
    return result.overall.valid;
  } catch {
    return false;
  }
}

/**
 * Validate and throw if invalid (useful for startup checks)
 * 
 * @throws Error if configuration is invalid
 */
export function validateConfigurationOrThrow(): void {
  const result = validateComprehensiveConfiguration();
  
  if (!result.overall.valid) {
    const report = generateValidationReport(result);
    throw new Error(`Configuration validation failed:\n\n${report}`);
  }
}