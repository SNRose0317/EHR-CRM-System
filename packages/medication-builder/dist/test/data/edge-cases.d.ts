/**
 * Edge Cases for Golden Master Testing
 *
 * Boundary conditions, error scenarios, and unusual combinations
 * that test the limits of the signature generation system.
 *
 * @since 3.1.0
 */
import type { GoldenTestCase } from '../utils/golden-master-runner';
/**
 * Fractional dose edge cases - testing tablet scoring limits
 */
export declare const FRACTIONAL_DOSE_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * Unit conversion edge cases
 */
export declare const UNIT_CONVERSION_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * Extreme dose value edge cases
 */
export declare const EXTREME_DOSE_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * Multi-ingredient medication edge cases
 */
export declare const MULTI_INGREDIENT_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * Route and frequency edge cases
 */
export declare const ROUTE_FREQUENCY_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * Range dosing edge cases
 */
export declare const RANGE_DOSING_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * Special instruction edge cases
 */
export declare const SPECIAL_INSTRUCTION_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * Advanced builder edge cases (100 new cases)
 */
export declare const ADVANCED_BUILDER_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * All edge case collections
 */
export declare const EDGE_CASES: {
    fractionalDoses: Partial<GoldenTestCase>[];
    unitConversions: Partial<GoldenTestCase>[];
    extremeDoses: Partial<GoldenTestCase>[];
    multiIngredient: Partial<GoldenTestCase>[];
    routeFrequency: Partial<GoldenTestCase>[];
    rangeDosing: Partial<GoldenTestCase>[];
    specialInstructions: Partial<GoldenTestCase>[];
    advancedBuilders: Partial<GoldenTestCase>[];
};
/**
 * Get all edge cases as a flat array
 */
export declare function getAllEdgeCases(): Partial<GoldenTestCase>[];
/**
 * Get edge cases by category
 */
export declare function getEdgeCasesByCategory(category: keyof typeof EDGE_CASES): Partial<GoldenTestCase>[];
/**
 * Get error test cases (expected to fail)
 */
export declare function getErrorTestCases(): Partial<GoldenTestCase>[];
/**
 * Get valid edge cases (expected to pass)
 */
export declare function getValidEdgeCases(): Partial<GoldenTestCase>[];
//# sourceMappingURL=edge-cases.d.ts.map