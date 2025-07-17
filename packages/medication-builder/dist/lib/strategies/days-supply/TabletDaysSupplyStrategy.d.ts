/**
 * Tablet Days Supply Strategy
 *
 * Handles days supply calculations for solid oral dosage forms
 * including tablets, capsules, and ODTs with proper fractioning.
 *
 * @since 3.1.0
 */
import { DaysSupplyContext } from '../../temporal/types';
import { SpecificityLevel } from '../types';
import { IDaysSupplyStrategy, DaysSupplyResult } from './types';
export declare class TabletDaysSupplyStrategy implements IDaysSupplyStrategy {
    readonly specificity = SpecificityLevel.DOSE_FORM;
    readonly id = "tablet-days-supply";
    readonly name = "Tablet/Capsule Days Supply Calculator";
    private readonly temporalParser;
    private readonly solidDoseForms;
    /**
     * Determines if this strategy matches the given context
     */
    matches(context: DaysSupplyContext): boolean;
    /**
     * Calculates days supply for tablets/capsules
     */
    calculate(context: DaysSupplyContext): DaysSupplyResult;
    /**
     * Parse timing from context
     */
    private parseTiming;
    /**
     * Calculate doses per day from timing
     */
    private calculateDosesPerDay;
    /**
     * Perform the main calculation
     */
    private performCalculation;
    /**
     * Get pack size information from medication data
     */
    private getPackInfo;
    /**
     * Handle strength-based dosing (e.g., 100mg dose when package is in tablets)
     */
    private handleStrengthConversion;
    /**
     * Validate fractional dosing for tablets
     */
    private validateFractionalDosing;
    /**
     * Check if tablet count is a common fraction
     */
    private isCommonTabletFraction;
    /**
     * Create calculation breakdown
     */
    private createBreakdown;
    /**
     * Explains the strategy's behavior
     */
    explain(): string;
}
/**
 * Tablet calculation examples and edge cases
 */
export declare const TABLET_CALCULATION_EXAMPLES: {
    readonly STANDARD_TABLET: {
        readonly description: "Standard tablet dosing";
        readonly input: {
            readonly packageQuantity: 30;
            readonly packageUnit: "tablet";
            readonly doseAmount: 1;
            readonly doseUnit: "tablet";
            readonly timing: "twice daily";
        };
        readonly expected: {
            readonly daysSupply: 15;
            readonly dosesPerDay: 2;
            readonly consumptionPerDay: 2;
        };
    };
    readonly WEIGHT_TO_TABLET: {
        readonly description: "Weight dose converted to tablets";
        readonly input: {
            readonly packageQuantity: 30;
            readonly packageUnit: "tablet";
            readonly doseAmount: 1000;
            readonly doseUnit: "mg";
            readonly timing: "twice daily";
            readonly medication: {
                readonly doseForm: "Tablet";
                readonly ingredient: readonly [{
                    readonly strengthRatio: {
                        readonly numerator: {
                            readonly value: 500;
                            readonly unit: "mg";
                        };
                        readonly denominator: {
                            readonly value: 1;
                            readonly unit: "tablet";
                        };
                    };
                }];
            };
        };
        readonly expected: {
            readonly daysSupply: 7;
            readonly dosesPerDay: 2;
            readonly consumptionPerDay: 4;
        };
    };
    readonly FRACTIONAL_DOSING: {
        readonly description: "Fractional tablet dosing";
        readonly input: {
            readonly packageQuantity: 30;
            readonly packageUnit: "tablet";
            readonly doseAmount: 0.5;
            readonly doseUnit: "tablet";
            readonly timing: "once daily";
        };
        readonly expected: {
            readonly daysSupply: 60;
            readonly dosesPerDay: 1;
            readonly consumptionPerDay: 0.5;
        };
    };
};
//# sourceMappingURL=TabletDaysSupplyStrategy.d.ts.map