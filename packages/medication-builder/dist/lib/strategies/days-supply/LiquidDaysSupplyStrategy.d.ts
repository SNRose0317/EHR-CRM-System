/**
 * Liquid Days Supply Strategy
 *
 * Handles days supply calculations for liquid medications including
 * oral solutions, injectable vials, and topical liquids with
 * proper unit conversions and concentration handling.
 *
 * @since 3.1.0
 */
import { DaysSupplyContext } from '../../temporal/types';
import { SpecificityLevel } from '../types';
import { IDaysSupplyStrategy, DaysSupplyResult } from './types';
export declare class LiquidDaysSupplyStrategy implements IDaysSupplyStrategy {
    readonly specificity = SpecificityLevel.DOSE_FORM;
    readonly id = "liquid-days-supply";
    readonly name = "Liquid Medication Days Supply Calculator";
    private readonly temporalParser;
    private readonly liquidDoseForms;
    /**
     * Determines if this strategy matches the given context
     */
    matches(context: DaysSupplyContext): boolean;
    /**
     * Calculates days supply for liquid medications
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
     * Perform liquid-specific calculation
     */
    private performLiquidCalculation;
    /**
     * Handle concentration-based conversions (weight to volume)
     */
    private handleConcentrationConversion;
    /**
     * Standardize volume units for calculation
     */
    private standardizeVolumeUnits;
    /**
     * Validate liquid dosing precision
     */
    private validateLiquidPrecision;
    /**
     * Get number of decimal places
     */
    private getDecimalPlaces;
    /**
     * Check if volume is a common measurement
     */
    private isCommonLiquidMeasurement;
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
 * Liquid calculation examples
 */
export declare const LIQUID_CALCULATION_EXAMPLES: {
    readonly ORAL_SOLUTION: {
        readonly description: "Oral liquid with concentration conversion";
        readonly input: {
            readonly packageQuantity: 120;
            readonly packageUnit: "mL";
            readonly doseAmount: 250;
            readonly doseUnit: "mg";
            readonly timing: "three times daily";
            readonly medication: {
                readonly doseForm: "Solution";
                readonly ingredient: readonly [{
                    readonly strengthRatio: {
                        readonly numerator: {
                            readonly value: 50;
                            readonly unit: "mg";
                        };
                        readonly denominator: {
                            readonly value: 1;
                            readonly unit: "mL";
                        };
                    };
                }];
            };
        };
        readonly expected: {
            readonly daysSupply: 8;
            readonly dosesPerDay: 3;
            readonly consumptionPerDay: 15;
        };
    };
    readonly INJECTABLE_VIAL: {
        readonly description: "Injectable medication with dual dosing";
        readonly input: {
            readonly packageQuantity: 10;
            readonly packageUnit: "mL";
            readonly doseAmount: 1;
            readonly doseUnit: "mL";
            readonly timing: "once weekly";
        };
        readonly expected: {
            readonly daysSupply: 70;
            readonly dosesPerDay: number;
            readonly consumptionPerDay: number;
        };
    };
    readonly PEDIATRIC_SUSPENSION: {
        readonly description: "Pediatric liquid with small volume";
        readonly input: {
            readonly packageQuantity: 60;
            readonly packageUnit: "mL";
            readonly doseAmount: 2.5;
            readonly doseUnit: "mL";
            readonly timing: "twice daily";
        };
        readonly expected: {
            readonly daysSupply: 12;
            readonly dosesPerDay: 2;
            readonly consumptionPerDay: 5;
        };
    };
};
//# sourceMappingURL=LiquidDaysSupplyStrategy.d.ts.map