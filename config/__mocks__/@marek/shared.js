/**
 * Mock for @marek/shared package
 * 
 * Provides test doubles for the shared package functionality
 * to enable isolated testing of the configuration system.
 */

export const createDomainConfig = jest.fn((primaryExternalUserConfig) => ({
  primaryExternalUser: primaryExternalUserConfig,
  version: '2.1.0',
  created: new Date().toISOString(),
  // Add FHIR mapping for patient configurations
  fhirMapping: primaryExternalUserConfig.singular === 'patient' ? {
    resourceType: 'Patient',
    active: true,
    meta: {
      profile: ['http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient']
    }
  } : undefined,
  // Add additional metadata based on configuration type
  metadata: {
    configType: primaryExternalUserConfig.context?.industry || 'unknown',
    features: {
      supportsSearch: true,
      supportsFiltering: true,
      supportsSorting: true
    }
  }
}));

// Export type definitions for testing
export const DomainEntityConfig = {};

// Mock validation functions
export const validateDomainConfig = jest.fn((config) => ({
  isValid: true,
  errors: [],
  warnings: []
}));

// Mock utility functions
export const normalizeUserType = jest.fn((userType) => userType.toLowerCase().trim());

export const getUserTypeMetadata = jest.fn((userType) => ({
  singular: userType,
  plural: `${userType}s`,
  category: userType === 'patient' ? 'healthcare' : 'business'
}));

// Mock constants
export const SUPPORTED_USER_TYPES = [
  'patient', 'client', 'contact', 'customer', 
  'member', 'subscriber', 'participant'
];

export const DEFAULT_CONFIG_VERSION = '2.1.0';

// Mock error classes
export class ConfigurationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ConfigurationError';
    this.code = code;
  }
}

export class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}