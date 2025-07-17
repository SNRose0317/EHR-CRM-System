/**
 * Real-World Prescription Scenarios
 *
 * Comprehensive test cases representing actual prescription scenarios that
 * healthcare providers encounter daily. These examples validate the corrected
 * FHIR packaging model against real-world clinical workflows.
 *
 * Each scenario includes:
 * - Clinical context and rationale
 * - FHIR-compliant medication data
 * - Expected prescription output
 * - Days supply validation
 * - Pharmacy dispensing considerations
 *
 * @since 2025-07-17 - FHIR packaging model correction
 */
import type { Medication } from '../../types';
import type { GoldenTestCase } from '../utils/golden-master-runner';
/**
 * Endocrinology & Hormone Replacement Scenarios
 */
export declare const ENDOCRINOLOGY_SCENARIOS: Record<string, Medication & {
    scenarios: Partial<GoldenTestCase>[];
}>;
/**
 * Cardiology Scenarios
 */
export declare const CARDIOLOGY_SCENARIOS: Record<string, Medication & {
    scenarios: Partial<GoldenTestCase>[];
}>;
/**
 * Dermatology & Topical Scenarios
 */
export declare const DERMATOLOGY_SCENARIOS: Record<string, Medication & {
    scenarios: Partial<GoldenTestCase>[];
}>;
/**
 * Pediatric Scenarios
 */
export declare const PEDIATRIC_SCENARIOS: Record<string, Medication & {
    scenarios: Partial<GoldenTestCase>[];
}>;
/**
 * Diabetes & Endocrinology Scenarios
 */
export declare const DIABETES_SCENARIOS: Record<string, Medication & {
    scenarios: Partial<GoldenTestCase>[];
}>;
/**
 * All Real-World Prescription Scenarios
 */
export declare const REAL_WORLD_PRESCRIPTION_SCENARIOS: {
    endocrinology: Record<string, Medication & {
        scenarios: Partial<GoldenTestCase>[];
    }>;
    cardiology: Record<string, Medication & {
        scenarios: Partial<GoldenTestCase>[];
    }>;
    dermatology: Record<string, Medication & {
        scenarios: Partial<GoldenTestCase>[];
    }>;
    pediatrics: Record<string, Medication & {
        scenarios: Partial<GoldenTestCase>[];
    }>;
    diabetes: Record<string, Medication & {
        scenarios: Partial<GoldenTestCase>[];
    }>;
};
/**
 * Get all real-world test cases as a flat array
 */
export declare function getAllRealWorldTestCases(): Partial<GoldenTestCase>[];
/**
 * Get all real-world medications as a flat array
 */
export declare function getAllRealWorldMedications(): Medication[];
//# sourceMappingURL=real-world-prescription-scenarios.d.ts.map