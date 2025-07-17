import type { Medication } from '../types/index';
export interface DoseInput {
    value: number;
    unit: string;
}
export interface SignatureResult {
    humanReadable: string;
    fhirRepresentation: any;
    templateVariables?: {
        verb: string;
        doseText: string;
        dualDose?: string;
        route: string;
        frequency: string;
        additionalInstructions?: string;
    };
}
/**
 * Determines if a medication has multiple active ingredients
 * Multi-ingredient medications are dosed by volume (mL) instead of strength (mg)
 */
export declare function isMultiIngredient(medication: Medication): boolean;
/**
 * Determines the strength mode based on dose form
 * Ratio mode: Liquids/Creams (mg/mL, mg/g)
 * Quantity mode: Solids (mg per tablet)
 */
export declare function getStrengthMode(doseForm: string): 'ratio' | 'quantity';
/**
 * Gets the appropriate denominator unit based on dose form
 * Liquids: mL
 * Creams: g
 * Solids: dose form name (tablet, capsule, etc.)
 */
export declare function getDenominatorUnit(doseForm: string): string;
/**
 * Gets the appropriate dispensing unit based on medication type and multi-ingredient status
 * Multi-ingredient: Always use volume/weight (mL, g) for liquids/creams
 * Single-ingredient + Ratio mode: Can use either active ingredient or volume
 * Single-ingredient + Quantity mode: Use active ingredient unit
 */
export declare function getDispensingUnit(medication: Medication): string;
/**
 * Generates a medication signature
 * Core logic: verb + dose + route + frequency + instructions
 */
export declare function generateSignature(medication: Medication, dose: DoseInput, routeName: string, frequencyName: string, specialInstructions?: string): SignatureResult;
/**
 * Validates dose constraints
 */
export declare function validateDose(medication: Medication, dose: DoseInput): {
    valid: boolean;
    message?: string;
};
//# sourceMappingURL=signature.d.ts.map