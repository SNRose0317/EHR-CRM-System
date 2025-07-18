/**
 * Domain Abstract Types
 * 
 * Application-layer types that abstract away specific terminology while maintaining
 * compatibility with FHIR-compliant types in the medication-builder package.
 * 
 * @since 2.1.0
 */

import { PatientContext } from '@marek/medication-builder';
import { Quantity } from '@marek/medication-builder';

/**
 * External Service Recipient Context
 * 
 * Abstract application-layer type representing the primary external user
 * receiving services. Maps to FHIR PatientContext while allowing configurable
 * terminology (patient/client/contact/customer).
 */
export interface ExternalServiceRecipientContext {
  /** Service recipient identifier */
  id: string;
  /** Age in years */
  age: number;
  /** Body weight */
  weight?: Quantity;
  /** Height */
  height?: Quantity;
  /** Gender */
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  /** Renal function parameters */
  renalFunction?: {
    /** Estimated glomerular filtration rate */
    egfr: number;
    /** Unit (typically mL/min/1.73m2) */
    unit: string;
    /** Creatinine clearance if available */
    creatinineClearance?: number;
  };
  /** Hepatic function parameters */
  hepaticFunction?: {
    /** AST level */
    ast?: number;
    /** ALT level */
    alt?: number;
    /** Unit for liver enzymes */
    unit: string;
    /** Child-Pugh score if applicable */
    childPughScore?: 'A' | 'B' | 'C';
  };
  /** Known allergies */
  allergies?: string[];
  /** Active medical conditions */
  conditions?: string[];
  /** Current medications (for interaction checking) */
  concurrentMedications?: string[];
}

/**
 * External Service Recipient Profile
 * 
 * Extended profile information for service recipients including
 * contact information and preferences.
 */
export interface ExternalServiceRecipientProfile extends ExternalServiceRecipientContext {
  /** Full name */
  name: {
    first: string;
    last: string;
    middle?: string;
    preferred?: string;
  };
  /** Date of birth */
  dateOfBirth: string;
  /** Contact information */
  contact: {
    phone?: string;
    email?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country?: string;
    };
  };
  /** Emergency contact */
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  /** Insurance information */
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  /** Last visit date */
  lastVisit?: string;
  /** Status */
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  /** Creation timestamp */
  createdAt: string;
  /** Last updated timestamp */
  updatedAt: string;
}

/**
 * Mapping Functions
 * 
 * Convert between application-layer types and FHIR-compliant types
 * to maintain standards compliance in the medication-builder package.
 */

/**
 * Convert FHIR PatientContext to application-layer ExternalServiceRecipientContext
 * 
 * @param patient - FHIR-compliant PatientContext
 * @returns Application-layer ExternalServiceRecipientContext
 */
export function toExternalServiceRecipient(patient: PatientContext): ExternalServiceRecipientContext {
  return {
    id: patient.id,
    age: patient.age,
    weight: patient.weight,
    height: patient.height,
    gender: patient.gender,
    renalFunction: patient.renalFunction,
    hepaticFunction: patient.hepaticFunction,
    allergies: patient.allergies,
    conditions: patient.conditions,
    concurrentMedications: patient.concurrentMedications
  };
}

/**
 * Convert application-layer ExternalServiceRecipientContext to FHIR PatientContext
 * 
 * @param serviceRecipient - Application-layer ExternalServiceRecipientContext
 * @returns FHIR-compliant PatientContext for medication-builder
 */
export function toPatientContext(serviceRecipient: ExternalServiceRecipientContext): PatientContext {
  return {
    id: serviceRecipient.id,
    age: serviceRecipient.age,
    weight: serviceRecipient.weight,
    height: serviceRecipient.height,
    gender: serviceRecipient.gender,
    renalFunction: serviceRecipient.renalFunction,
    hepaticFunction: serviceRecipient.hepaticFunction,
    allergies: serviceRecipient.allergies,
    conditions: serviceRecipient.conditions,
    concurrentMedications: serviceRecipient.concurrentMedications
  };
}

/**
 * Type guard to check if an object is a valid ExternalServiceRecipientContext
 * 
 * @param obj - Object to check
 * @returns True if the object is a valid ExternalServiceRecipientContext
 */
export function isExternalServiceRecipientContext(obj: any): obj is ExternalServiceRecipientContext {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  // Check required fields
  if (typeof obj.id !== 'string' || typeof obj.age !== 'number') {
    return false;
  }

  // Validate optional gender field if present
  if (obj.gender !== undefined &&
      !['MALE', 'FEMALE', 'OTHER'].includes(obj.gender)) {
    return false;
  }

  // Validate optional weight/height if present
  if (obj.weight !== undefined &&
      (typeof obj.weight.value !== 'number' || typeof obj.weight.unit !== 'string')) {
    return false;
  }

  if (obj.height !== undefined &&
      (typeof obj.height.value !== 'number' || typeof obj.height.unit !== 'string')) {
    return false;
  }

  return true;
}

/**
 * Type guard to check if an object is a valid ExternalServiceRecipientProfile
 * 
 * @param obj - Object to check
 * @returns True if the object is a valid ExternalServiceRecipientProfile
 */
export function isExternalServiceRecipientProfile(obj: any): obj is ExternalServiceRecipientProfile {
  if (!isExternalServiceRecipientContext(obj)) {
    return false;
  }

  // Check additional profile fields
  if (!obj.name || 
      typeof obj.name.first !== 'string' ||
      typeof obj.name.last !== 'string') {
    return false;
  }

  if (typeof obj.dateOfBirth !== 'string' ||
      typeof obj.status !== 'string' ||
      typeof obj.createdAt !== 'string' ||
      typeof obj.updatedAt !== 'string') {
    return false;
  }

  // Validate status enum
  if (!['ACTIVE', 'INACTIVE', 'PENDING'].includes(obj.status)) {
    return false;
  }

  return true;
}

/**
 * Factory function to create an ExternalServiceRecipientProfile
 * 
 * @param params - Parameters for creating the profile
 * @returns A new ExternalServiceRecipientProfile with generated timestamps
 */
export function createExternalServiceRecipientProfile(params: {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  dateOfBirth: string;
  age: number;
  phone?: string;
  email?: string;
  weight?: Quantity;
  height?: Quantity;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  allergies?: string[];
  conditions?: string[];
}): ExternalServiceRecipientProfile {
  const now = new Date().toISOString();
  const id = `sr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    id,
    age: params.age,
    weight: params.weight,
    height: params.height,
    gender: params.gender,
    allergies: params.allergies,
    conditions: params.conditions,
    name: {
      first: params.firstName,
      last: params.lastName,
      middle: params.middleName,
      preferred: params.preferredName
    },
    dateOfBirth: params.dateOfBirth,
    contact: {
      phone: params.phone,
      email: params.email
    },
    status: 'ACTIVE',
    createdAt: now,
    updatedAt: now
  };
}