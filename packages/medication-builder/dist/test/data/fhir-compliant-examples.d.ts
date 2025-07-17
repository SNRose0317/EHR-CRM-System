/**
 * FHIR R4 Compliant Medication Test Examples
 *
 * Comprehensive test cases that validate the corrected FHIR packaging model
 * and ensure accurate days supply calculations. These examples represent
 * real-world scenarios using proper FHIR R4 medication packaging standards.
 *
 * Updated: 2025-07-17 - Corrected FHIR packaging model implementation
 *
 * @see {@link ../types/README.md} FHIR packaging documentation
 */
import type { Medication } from '../../types';
import type { GoldenTestCase } from '../utils/golden-master-runner';
/**
 * FHIR-Compliant Injectable Medications
 *
 * Tests the corrected FHIR packaging model for injectables where:
 * - totalVolume: Individual vial/ampule volume
 * - packageInfo.quantity: Unit dose volume (matches totalVolume)
 * - packageInfo.packSize: Number of vials/ampules per package
 */
export declare const FHIR_INJECTABLE_MEDICATIONS: Record<string, Medication>;
/**
 * FHIR-Compliant Tablet Medications
 *
 * Tests proper tablet packaging where quantity represents individual tablets
 * and packSize represents total tablets per bottle/package.
 */
export declare const FHIR_TABLET_MEDICATIONS: Record<string, Medication>;
/**
 * FHIR-Compliant Topical Medications
 *
 * Tests proper topical packaging for tubes, dispensers, and applicators.
 */
export declare const FHIR_TOPICAL_MEDICATIONS: Record<string, Medication>;
/**
 * FHIR-Compliant Liquid Medications
 *
 * Tests liquid medications with proper concentration and packaging models.
 */
export declare const FHIR_LIQUID_MEDICATIONS: Record<string, Medication>;
/**
 * Days Supply Calculation Test Cases
 *
 * These test cases validate that the corrected FHIR packaging model
 * produces accurate days supply calculations for various scenarios.
 */
export declare const FHIR_DAYS_SUPPLY_TEST_CASES: Partial<GoldenTestCase>[];
/**
 * FHIR Edge Cases and Boundary Testing
 *
 * Complex scenarios that test the limits of the FHIR packaging model.
 */
export declare const FHIR_EDGE_CASE_MEDICATIONS: Record<string, Medication>;
/**
 * All FHIR-compliant medication fixtures organized by category
 */
export declare const FHIR_MEDICATION_FIXTURES: {
    injectables: Record<string, Medication>;
    tablets: Record<string, Medication>;
    topicals: Record<string, Medication>;
    liquids: Record<string, Medication>;
    edgeCases: Record<string, Medication>;
};
/**
 * Complete test suite for FHIR compliance validation
 */
export declare const FHIR_COMPLIANCE_TEST_SUITE: {
    daysSupplyTests: Partial<GoldenTestCase>[];
    medications: {
        injectables: Record<string, Medication>;
        tablets: Record<string, Medication>;
        topicals: Record<string, Medication>;
        liquids: Record<string, Medication>;
        edgeCases: Record<string, Medication>;
    };
};
/**
 * Get all FHIR-compliant medications as a flat array
 */
export declare function getAllFHIRMedications(): Medication[];
/**
 * Validate FHIR packaging model compliance
 */
export declare function validateFHIRPackaging(medication: Medication): {
    isValid: boolean;
    errors: string[];
};
//# sourceMappingURL=fhir-compliant-examples.d.ts.map