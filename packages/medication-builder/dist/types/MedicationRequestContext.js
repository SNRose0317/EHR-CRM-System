/**
 * MedicationRequestContext DTO
 *
 * Stable Data Transfer Object that represents the complete context
 * for a medication request. This serves as the input contract for
 * the medication signature builder API and decouples external systems
 * from internal representations.
 *
 * @since 2.0.0
 */
import { isMedicationProfile } from './MedicationProfile';
/**
 * Type guard to check if an object is a valid MedicationRequestContext
 *
 * @param obj - Object to check
 * @returns True if the object is a valid MedicationRequestContext
 */
export function isMedicationRequestContext(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    // Check required fields
    if (typeof obj.id !== 'string' ||
        typeof obj.timestamp !== 'string' ||
        typeof obj.frequency !== 'string' ||
        typeof obj.route !== 'string') {
        return false;
    }
    // Validate medication
    if (!isMedicationProfile(obj.medication)) {
        return false;
    }
    // Validate patient
    if (!obj.patient ||
        typeof obj.patient.id !== 'string' ||
        typeof obj.patient.age !== 'number') {
        return false;
    }
    // Validate dose
    if (!obj.dose ||
        typeof obj.dose.value !== 'number' ||
        typeof obj.dose.unit !== 'string') {
        return false;
    }
    // Validate optional patient fields if present
    if (obj.patient.gender !== undefined &&
        !['MALE', 'FEMALE', 'OTHER'].includes(obj.patient.gender)) {
        return false;
    }
    // Validate optional fields if present
    if (obj.refills !== undefined && typeof obj.refills !== 'number') {
        return false;
    }
    return true;
}
/**
 * Factory function to create a MedicationRequestContext
 *
 * @param params - Parameters for creating the context
 * @returns A new MedicationRequestContext with generated ID and timestamp
 */
export function createMedicationRequestContext(params) {
    // Generate UUID-like ID (simplified for this example)
    const id = `ctx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
        id,
        timestamp: new Date().toISOString(),
        medication: params.medication,
        patient: params.patient,
        dose: {
            value: params.doseValue,
            unit: params.doseUnit
        },
        frequency: params.frequency,
        route: params.route,
        ...(params.duration && { duration: params.duration }),
        ...(params.quantity && { quantity: params.quantity }),
        ...(params.refills !== undefined && { refills: params.refills }),
        ...(params.specialInstructions && { specialInstructions: params.specialInstructions }),
        ...(params.prescriber && { prescriber: params.prescriber }),
        ...(params.formulary && { formulary: params.formulary }),
        ...(params.clinicalContext && { clinicalContext: params.clinicalContext }),
        ...(params.asNeeded && { asNeeded: params.asNeeded })
    };
}
//# sourceMappingURL=MedicationRequestContext.js.map