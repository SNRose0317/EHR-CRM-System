/**
 * Complex Regimen Test Cases for Golden Master Testing
 *
 * Comprehensive test cases for advanced builder features including
 * multi-ingredient medications, complex PRN dosing, and tapering schedules.
 *
 * @since 3.2.0
 */
import type { GoldenTestCase } from '../utils/golden-master-runner';
/**
 * Multi-ingredient medication test cases (50 cases)
 * Testing compound medications, ingredient breakdown, and ratio calculations
 */
export declare const MULTI_INGREDIENT_CASES: Partial<GoldenTestCase>[];
/**
 * Complex PRN test cases (50 cases)
 * Testing dose ranges, frequency ranges, and maximum daily constraints
 */
export declare const COMPLEX_PRN_CASES: Partial<GoldenTestCase>[];
/**
 * Tapering dose test cases (50 cases)
 * Testing sequential instructions, phase management, and FHIR relationships
 */
export declare const TAPERING_DOSE_CASES: Partial<GoldenTestCase>[];
/**
 * All complex regimen test cases organized by builder type
 */
export declare const COMPLEX_REGIMEN_CASES: {
    multiIngredient: Partial<GoldenTestCase>[];
    complexPRN: Partial<GoldenTestCase>[];
    taperingDose: Partial<GoldenTestCase>[];
};
/**
 * Get all complex regimen test cases as a flat array
 */
export declare function getAllComplexRegimenCases(): Partial<GoldenTestCase>[];
/**
 * Get test cases by builder category
 */
export declare function getComplexRegimenCasesByCategory(category: keyof typeof COMPLEX_REGIMEN_CASES): Partial<GoldenTestCase>[];
/**
 * Get total count of complex regimen test cases
 */
export declare function getComplexRegimenCaseCount(): number;
//# sourceMappingURL=complex-regimen-cases.d.ts.map