/**
 * Domain Configuration and Types
 * 
 * Centralized domain abstraction system for configurable terminology
 * across different deployment scenarios.
 * 
 * @since 2.1.0
 */

// Configuration exports
export {
  type DomainEntityConfig,
  type ExternalServiceRecipientConfig,
  PATIENT_CONFIG,
  CLIENT_CONFIG,
  CONTACT_CONFIG,
  CUSTOMER_CONFIG,
  createDomainConfig,
  isDomainEntityConfig
} from './config';

// Type exports
export {
  type ExternalServiceRecipientContext,
  type ExternalServiceRecipientProfile,
  toExternalServiceRecipient,
  toPatientContext,
  isExternalServiceRecipientContext,
  isExternalServiceRecipientProfile,
  createExternalServiceRecipientProfile
} from './types';

// React Context exports
export {
  DomainConfigProvider,
  useDomainConfig,
  useServiceRecipientConfig,
  useServiceRecipientLabels,
  useServiceRecipientRoutes,
  useServiceRecipientTerminology
} from './context';