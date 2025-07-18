/**
 * Medication Service Integration Layer
 * 
 * Provides integration between the application domain layer and the FHIR-compliant
 * medication-builder package. Handles mapping between ExternalServiceRecipientContext
 * and PatientContext to maintain standards compliance.
 * 
 * @since 2.1.0
 */

import { 
  createMedicationRequestContext,
  type MedicationRequestContext,
  type MedicationProfile,
  type Quantity
} from '@marek/medication-builder';
import { 
  type ExternalServiceRecipientContext,
  toPatientContext 
} from '@marek/shared';

/**
 * Application-layer medication request parameters
 */
export interface ServiceRecipientMedicationRequest {
  /** External service recipient context */
  serviceRecipient: ExternalServiceRecipientContext;
  /** Medication profile */
  medication: MedicationProfile;
  /** Requested dose */
  doseValue: number;
  /** Dose unit */
  doseUnit: string;
  /** Frequency (e.g., 'twice daily', 'every 8 hours') */
  frequency: string;
  /** Route of administration */
  route: string;
  /** Duration of therapy */
  duration?: Quantity;
  /** Quantity to dispense */
  quantity?: Quantity;
  /** Number of refills */
  refills?: number;
  /** Special instructions */
  specialInstructions?: string;
  /** PRN (as needed) indication */
  asNeeded?: string;
}

/**
 * Medication Service Class
 * 
 * Handles integration between application domain and medication-builder package
 */
export class MedicationService {
  /**
   * Create a medication request context for the medication-builder
   * 
   * @param request - Application-layer medication request
   * @returns FHIR-compliant MedicationRequestContext
   */
  createMedicationRequest(request: ServiceRecipientMedicationRequest): MedicationRequestContext {
    // Convert application-layer service recipient to FHIR-compliant PatientContext
    const patientContext = toPatientContext(request.serviceRecipient);
    
    // Create FHIR-compliant medication request context
    return createMedicationRequestContext({
      medication: request.medication,
      patient: patientContext, // FHIR-compliant field name
      doseValue: request.doseValue,
      doseUnit: request.doseUnit,
      frequency: request.frequency,
      route: request.route,
      duration: request.duration,
      quantity: request.quantity,
      refills: request.refills,
      specialInstructions: request.specialInstructions,
      asNeeded: request.asNeeded
    });
  }

  /**
   * Validate a service recipient for medication prescribing
   * 
   * @param serviceRecipient - Service recipient to validate
   * @returns Validation result with any warnings or errors
   */
  validateServiceRecipientForMedication(
    serviceRecipient: ExternalServiceRecipientContext
  ): {
    valid: boolean;
    warnings: string[];
    errors: string[];
  } {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Age validation
    if (serviceRecipient.age < 0 || serviceRecipient.age > 150) {
      errors.push('Invalid age: must be between 0 and 150');
    }

    if (serviceRecipient.age < 18) {
      warnings.push('Pediatric patient: consider age-appropriate dosing');
    }

    if (serviceRecipient.age >= 65) {
      warnings.push('Geriatric patient: consider renal/hepatic function and drug interactions');
    }

    // Renal function validation
    if (serviceRecipient.renalFunction) {
      const { egfr } = serviceRecipient.renalFunction;
      if (egfr < 30) {
        warnings.push('Severe renal impairment: dose adjustment may be required');
      } else if (egfr < 60) {
        warnings.push('Moderate renal impairment: monitor closely');
      }
    } else {
      warnings.push('Renal function not assessed: consider evaluation for medication dosing');
    }

    // Hepatic function validation
    if (serviceRecipient.hepaticFunction?.childPughScore) {
      const score = serviceRecipient.hepaticFunction.childPughScore;
      if (score === 'C') {
        warnings.push('Severe hepatic impairment: dose adjustment likely required');
      } else if (score === 'B') {
        warnings.push('Moderate hepatic impairment: monitor closely');
      }
    }

    // Allergy validation
    if (serviceRecipient.allergies && serviceRecipient.allergies.length > 0) {
      warnings.push(`Known allergies: ${serviceRecipient.allergies.join(', ')}`);
    }

    // Drug interaction validation
    if (serviceRecipient.concurrentMedications && serviceRecipient.concurrentMedications.length > 0) {
      warnings.push('Concurrent medications present: check for interactions');
    }

    return {
      valid: errors.length === 0,
      warnings,
      errors
    };
  }

  /**
   * Get medication history for a service recipient
   * 
   * @param serviceRecipientId - Service recipient identifier
   * @returns Promise resolving to medication history
   */
  async getMedicationHistory(serviceRecipientId: string): Promise<MedicationRequestContext[]> {
    // This would typically fetch from a database or API
    // For now, return empty array as placeholder
    console.log(`Fetching medication history for service recipient: ${serviceRecipientId}`);
    return [];
  }

  /**
   * Save a medication request
   * 
   * @param request - Medication request context to save
   * @returns Promise resolving to saved request with ID
   */
  async saveMedicationRequest(request: MedicationRequestContext): Promise<MedicationRequestContext & { id: string }> {
    // This would typically save to a database or API
    // For now, return the request with a generated ID
    const id = `med-req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`Saving medication request: ${id}`, request);
    
    return {
      ...request,
      id
    };
  }
}

/**
 * Default medication service instance
 */
export const medicationService = new MedicationService();