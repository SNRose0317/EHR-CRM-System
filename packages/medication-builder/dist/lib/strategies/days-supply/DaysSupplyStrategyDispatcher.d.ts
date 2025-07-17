/**
 * Days Supply Strategy Dispatcher
 *
 * Central dispatcher that selects and executes the most appropriate
 * days supply calculation strategy based on medication context.
 * Supports titration schedules and various medication types.
 *
 * @since 3.1.0
 */
import { DaysSupplyContext } from '../../temporal/types';
import { SpecificityLevel } from '../types';
import { IDaysSupplyStrategy, IDaysSupplyStrategyDispatcher, DaysSupplyResult } from './types';
/**
 * Main strategy dispatcher implementation
 */
export declare class DaysSupplyStrategyDispatcher implements IDaysSupplyStrategyDispatcher {
    private readonly strategies;
    constructor();
    /**
     * Initialize all available strategies
     */
    private initializeStrategies;
    /**
     * Selects and executes the most appropriate strategy
     */
    calculateDaysSupply(context: DaysSupplyContext): DaysSupplyResult;
    /**
     * Gets the strategy that would be used for given context
     */
    getStrategy(context: DaysSupplyContext): IDaysSupplyStrategy;
    /**
     * Lists all available strategies
     */
    getAvailableStrategies(): IDaysSupplyStrategy[];
    /**
     * Add a custom strategy
     */
    addStrategy(strategy: IDaysSupplyStrategy): void;
    /**
     * Remove a strategy by ID
     */
    removeStrategy(strategyId: string): boolean;
    /**
     * Get strategy information for debugging
     */
    getStrategyInfo(context: DaysSupplyContext): {
        selectedStrategy: string;
        allMatches: string[];
        selectionReason: string;
    };
    /**
     * Test all strategies against a context
     */
    testAllStrategies(context: DaysSupplyContext): Array<{
        strategy: string;
        matches: boolean;
        specificity: number;
        result?: DaysSupplyResult;
        error?: string;
    }>;
}
/**
 * Create singleton instance
 */
export declare const daysSupplyDispatcher: DaysSupplyStrategyDispatcher;
/**
 * Convenience function for calculating days supply
 */
export declare function calculateDaysSupply(context: DaysSupplyContext): DaysSupplyResult;
/**
 * Convenience function for getting strategy information
 */
export declare function getStrategyInfo(context: DaysSupplyContext): string;
/**
 * Strategy selection examples for different contexts
 */
export declare const STRATEGY_SELECTION_EXAMPLES: {
    readonly TITRATION_SCHEDULE: {
        readonly description: "Multi-phase GLP-1 agonist titration";
        readonly context: {
            readonly packageQuantity: 1000;
            readonly packageUnit: "units";
            readonly doseAmount: 12.5;
            readonly doseUnit: "units";
            readonly timing: string[];
        };
        readonly expectedStrategy: "TitrationDaysSupplyStrategy";
        readonly expectedSpecificity: SpecificityLevel.DOSE_FORM_AND_INGREDIENT;
    };
    readonly TABLET_MEDICATION: {
        readonly description: "Standard tablet with weight-based dosing";
        readonly context: {
            readonly packageQuantity: 30;
            readonly packageUnit: "tablet";
            readonly doseAmount: 1000;
            readonly doseUnit: "mg";
            readonly timing: "twice daily";
            readonly medication: {
                readonly doseForm: "Tablet";
                readonly ingredient: Array<{
                    strengthRatio?: {
                        numerator: {
                            value: number;
                            unit: string;
                        };
                        denominator: {
                            value: number;
                            unit: string;
                        };
                    };
                }>;
            };
        };
        readonly expectedStrategy: "TabletDaysSupplyStrategy";
        readonly expectedSpecificity: SpecificityLevel.DOSE_FORM;
    };
    readonly LIQUID_MEDICATION: {
        readonly description: "Oral liquid with concentration";
        readonly context: {
            readonly packageQuantity: 120;
            readonly packageUnit: "mL";
            readonly doseAmount: 250;
            readonly doseUnit: "mg";
            readonly timing: "three times daily";
            readonly medication: {
                readonly doseForm: "Solution";
                readonly ingredient: Array<{
                    strengthRatio?: {
                        numerator: {
                            value: number;
                            unit: string;
                        };
                        denominator: {
                            value: number;
                            unit: string;
                        };
                    };
                }>;
            };
        };
        readonly expectedStrategy: "LiquidDaysSupplyStrategy";
        readonly expectedSpecificity: SpecificityLevel.DOSE_FORM;
    };
};
//# sourceMappingURL=DaysSupplyStrategyDispatcher.d.ts.map