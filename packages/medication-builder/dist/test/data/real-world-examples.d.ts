/**
 * Real-World Examples for Golden Master Testing
 *
 * Production-like test cases based on actual medication scenarios
 * that healthcare providers commonly encounter.
 *
 * @since 3.1.0
 */
import type { GoldenTestCase } from '../utils/golden-master-runner';
/**
 * Common tablet prescriptions
 */
export declare const REAL_WORLD_TABLET_EXAMPLES: Partial<GoldenTestCase>[];
/**
 * Common liquid medication prescriptions
 */
export declare const REAL_WORLD_LIQUID_EXAMPLES: Partial<GoldenTestCase>[];
/**
 * Injectable medication examples
 */
export declare const REAL_WORLD_INJECTABLE_EXAMPLES: Partial<GoldenTestCase>[];
/**
 * Topical medication examples with Topiclick
 */
export declare const REAL_WORLD_TOPICAL_EXAMPLES: Partial<GoldenTestCase>[];
/**
 * Multi-ingredient medication examples
 */
export declare const REAL_WORLD_MULTI_INGREDIENT_EXAMPLES: Partial<GoldenTestCase>[];
/**
 * Edge case scenarios from real practice
 */
export declare const REAL_WORLD_EDGE_CASES: Partial<GoldenTestCase>[];
/**
 * Advanced real-world examples (55 new cases)
 */
export declare const ADVANCED_REAL_WORLD_EXAMPLES: Partial<GoldenTestCase>[];
/**
 * All real-world examples organized by category
 */
export declare const REAL_WORLD_EXAMPLES: {
    tablets: Partial<GoldenTestCase>[];
    liquids: Partial<GoldenTestCase>[];
    injectables: Partial<GoldenTestCase>[];
    topicals: Partial<GoldenTestCase>[];
    multiIngredient: Partial<GoldenTestCase>[];
    edgeCases: Partial<GoldenTestCase>[];
    advanced: Partial<GoldenTestCase>[];
};
/**
 * Get all real-world examples as a flat array
 */
export declare function getAllRealWorldExamples(): Partial<GoldenTestCase>[];
/**
 * Get examples by medication category
 */
export declare function getRealWorldExamplesByCategory(category: keyof typeof REAL_WORLD_EXAMPLES): Partial<GoldenTestCase>[];
/**
 * Get examples for specific medication
 */
export declare function getRealWorldExamplesForMedication(medicationId: string): Partial<GoldenTestCase>[];
//# sourceMappingURL=real-world-examples.d.ts.map