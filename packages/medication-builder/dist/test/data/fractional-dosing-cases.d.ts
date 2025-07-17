/**
 * Fractional Dosing Test Cases for Golden Master Testing
 *
 * Comprehensive test cases for FractionalTabletBuilder covering all scoring types,
 * fractional dose scenarios, and validation edge cases.
 *
 * Total: 75 test cases
 * - Quarter tablets (1/4): 20 cases
 * - Half tablets (1/2): 20 cases
 * - Three-quarter tablets (3/4): 15 cases
 * - Mixed whole/fractional: 10 cases
 * - Unscored validation: 10 cases
 *
 * @since 3.2.0
 */
import type { GoldenTestCase } from '../utils/golden-master-runner';
/**
 * Quarter tablet test cases (1/4 tablet doses)
 * Requires QUARTER scoring type
 */
export declare const QUARTER_TABLET_CASES: Partial<GoldenTestCase>[];
/**
 * Half tablet test cases (1/2 tablet doses)
 * Requires HALF or QUARTER scoring type
 */
export declare const HALF_TABLET_CASES: Partial<GoldenTestCase>[];
/**
 * Three-quarter tablet test cases (3/4 tablet doses)
 * Requires QUARTER scoring type
 */
export declare const THREE_QUARTER_TABLET_CASES: Partial<GoldenTestCase>[];
/**
 * Mixed whole and fractional tablet test cases
 * Complex combinations like 1.25, 1.5, 1.75, 2.25, etc.
 */
export declare const MIXED_WHOLE_FRACTIONAL_CASES: Partial<GoldenTestCase>[];
/**
 * Unscored tablet validation test cases (error scenarios)
 * Tests for inappropriate splitting of unscored medications
 */
export declare const UNSCORED_VALIDATION_CASES: Partial<GoldenTestCase>[];
/**
 * All fractional dosing test cases organized by subcategory
 */
export declare const FRACTIONAL_DOSING_CASES: {
    quarters: Partial<GoldenTestCase>[];
    halves: Partial<GoldenTestCase>[];
    threeQuarters: Partial<GoldenTestCase>[];
    mixed: Partial<GoldenTestCase>[];
    validation: Partial<GoldenTestCase>[];
};
/**
 * Get all fractional dosing test cases as a flat array
 */
export declare function getAllFractionalDosingCases(): Partial<GoldenTestCase>[];
/**
 * Get fractional dosing cases by subcategory
 */
export declare function getFractionalDosingCasesByCategory(category: keyof typeof FRACTIONAL_DOSING_CASES): Partial<GoldenTestCase>[];
/**
 * Get error test cases (expected to fail validation)
 */
export declare function getFractionalDosingErrorCases(): Partial<GoldenTestCase>[];
/**
 * Get valid fractional dosing cases (expected to pass)
 */
export declare function getValidFractionalDosingCases(): Partial<GoldenTestCase>[];
//# sourceMappingURL=fractional-dosing-cases.d.ts.map