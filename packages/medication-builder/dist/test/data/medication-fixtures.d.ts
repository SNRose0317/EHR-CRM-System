/**
 * Medication Fixtures for Golden Master Testing
 *
 * Standardized medication profiles for consistent testing across
 * all golden master test scenarios.
 *
 * @since 3.1.0
 */
import type { Medication } from '../../types';
/**
 * Standard tablet medications
 */
export declare const TABLET_MEDICATIONS: {
    metformin500: Medication;
    lisinopril10: Medication;
    levothyroxine25: Medication;
    omeprazole20: Medication;
};
/**
 * Liquid medications with various concentrations
 */
export declare const LIQUID_MEDICATIONS: {
    amoxicillinSuspension: Medication;
    acetaminophenSolution: Medication;
    insulin: Medication;
};
/**
 * Injectable medications
 */
export declare const INJECTABLE_MEDICATIONS: {
    testosteroneCypionate: Medication;
    morphineInjection: Medication;
};
/**
 * Topical medications with special dispensers
 */
export declare const TOPICAL_MEDICATIONS: {
    hormoneCreams: Medication;
    hydrocortisoneCream: Medication;
};
/**
 * Multi-ingredient medications for complex scenarios
 */
export declare const MULTI_INGREDIENT_MEDICATIONS: {
    combinationHormone: Medication;
    combinationTablet: Medication;
};
/**
 * Edge case medications for boundary testing
 */
export declare const EDGE_CASE_MEDICATIONS: {
    highDoseVitamin: Medication;
    lowDosePediatric: Medication;
};
/**
 * All medication fixtures organized by category
 */
export declare const MEDICATION_FIXTURES: {
    tablets: {
        metformin500: Medication;
        lisinopril10: Medication;
        levothyroxine25: Medication;
        omeprazole20: Medication;
    };
    liquids: {
        amoxicillinSuspension: Medication;
        acetaminophenSolution: Medication;
        insulin: Medication;
    };
    injectables: {
        testosteroneCypionate: Medication;
        morphineInjection: Medication;
    };
    topicals: {
        hormoneCreams: Medication;
        hydrocortisoneCream: Medication;
    };
    multiIngredient: {
        combinationHormone: Medication;
        combinationTablet: Medication;
    };
    edgeCases: {
        highDoseVitamin: Medication;
        lowDosePediatric: Medication;
    };
};
/**
 * Get all medications as a flat array
 */
export declare function getAllMedications(): Medication[];
/**
 * Get medications by dose form
 */
export declare function getMedicationsByDoseForm(doseForm: string): Medication[];
/**
 * Get medication by ID
 */
export declare function getMedicationById(id: string): Medication | undefined;
//# sourceMappingURL=medication-fixtures.d.ts.map