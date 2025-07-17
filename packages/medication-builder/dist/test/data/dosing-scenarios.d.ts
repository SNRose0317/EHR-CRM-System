/**
 * Dosing Scenarios for Golden Master Testing
 *
 * Comprehensive collection of dose inputs, routes, frequencies, and
 * special instructions for systematic testing coverage.
 *
 * @since 3.1.0
 */
export interface DoseScenario {
    id: string;
    description: string;
    dose: {
        value: number;
        unit: string;
        maxValue?: number;
    };
    category: 'standard' | 'fractional' | 'range' | 'high' | 'low' | 'conversion';
}
export interface RouteScenario {
    id: string;
    route: string;
    category: 'oral' | 'topical' | 'injection' | 'other';
    applicableDoseForms: string[];
}
export interface FrequencyScenario {
    id: string;
    frequency: string;
    category: 'daily' | 'weekly' | 'asNeeded' | 'complex';
    description: string;
}
export interface SpecialInstructionScenario {
    id: string;
    instructions: string;
    category: 'timing' | 'location' | 'technique' | 'precaution';
    applicableRoutes: string[];
}
/**
 * Standard tablet dose scenarios
 */
export declare const TABLET_DOSE_SCENARIOS: DoseScenario[];
/**
 * Capsule dose scenarios
 */
export declare const CAPSULE_DOSE_SCENARIOS: DoseScenario[];
/**
 * Liquid volume dose scenarios
 */
export declare const LIQUID_VOLUME_SCENARIOS: DoseScenario[];
/**
 * Weight-based dose scenarios (mg, mcg, g)
 */
export declare const WEIGHT_DOSE_SCENARIOS: DoseScenario[];
/**
 * Unit-based dose scenarios (insulin, vitamins)
 */
export declare const UNIT_DOSE_SCENARIOS: DoseScenario[];
/**
 * Topical dose scenarios (clicks, applications)
 */
export declare const TOPICAL_DOSE_SCENARIOS: DoseScenario[];
/**
 * Route scenarios organized by category
 */
export declare const ROUTE_SCENARIOS: RouteScenario[];
/**
 * Frequency scenarios
 */
export declare const FREQUENCY_SCENARIOS: FrequencyScenario[];
/**
 * Special instruction scenarios
 */
export declare const SPECIAL_INSTRUCTION_SCENARIOS: SpecialInstructionScenario[];
/**
 * Get all dose scenarios by category
 */
export declare function getDoseScenariosByCategory(category: string): DoseScenario[];
/**
 * Get route scenarios for specific dose form
 */
export declare function getRouteScenarios(doseForm: string): RouteScenario[];
/**
 * Get compatible special instructions for route
 */
export declare function getSpecialInstructions(route: string): SpecialInstructionScenario[];
/**
 * All scenario collections
 */
export declare const DOSING_SCENARIOS: {
    doses: {
        tablets: DoseScenario[];
        capsules: DoseScenario[];
        volumes: DoseScenario[];
        weights: DoseScenario[];
        units: DoseScenario[];
        topicals: DoseScenario[];
    };
    routes: RouteScenario[];
    frequencies: FrequencyScenario[];
    specialInstructions: SpecialInstructionScenario[];
};
//# sourceMappingURL=dosing-scenarios.d.ts.map