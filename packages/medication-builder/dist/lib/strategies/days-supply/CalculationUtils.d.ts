/**
 * Days Supply Calculation Utilities
 *
 * Common utilities for days supply calculations including
 * unit conversions, duration handling, and validation.
 *
 * @since 3.1.0
 */
import { DaysSupplyContext } from '../../temporal/types';
import { ICalculationUtils, MedicationConversionContext } from './types';
export declare class CalculationUtils implements ICalculationUtils {
    /**
     * Convert duration to days
     */
    convertDurationToDays(value: number, unit: string): number;
    /**
     * Calculate total doses for a time period
     */
    calculateTotalDoses(dosesPerPeriod: number, periodDays: number): number;
    /**
     * Validate calculation inputs
     */
    validateInputs(context: DaysSupplyContext): string[];
    /**
     * Apply dispenser conversions (e.g., Topiclick)
     */
    applyDispenserConversion(quantity: number, unit: string, medication: MedicationConversionContext): {
        quantity: number;
        unit: string;
        conversionApplied: boolean;
    };
    /**
     * Convert between medication units using strength ratios
     */
    convertMedicationUnits(quantity: number, fromUnit: string, toUnit: string, medication: MedicationConversionContext): {
        quantity: number;
        conversionApplied: boolean;
        factor: number;
    };
    /**
     * Normalize tablet units for comparison
     */
    normalizeTabletUnits(unit: string): string;
    /**
     * Check if two units are compatible for direct comparison
     */
    areUnitsCompatible(unit1: string, unit2: string): boolean;
    /**
     * Calculate doses per day from FHIR timing
     */
    calculateDosesPerDay(frequency: number, period: number, periodUnit: string): number;
    /**
     * Round to specified decimal places
     */
    roundToDecimalPlaces(value: number, places: number): number;
    /**
     * Check if value is effectively zero (within tolerance)
     */
    isEffectivelyZero(value: number): boolean;
    /**
     * Validate that a value is positive and finite
     */
    isValidPositiveNumber(value: number): boolean;
    /**
     * Create conversion record for breakdown
     */
    createConversionRecord(from: string, to: string, factor: number, reason: string): {
        from: string;
        to: string;
        factor: number;
        reason: string;
    };
    /**
     * Calculate consumption per day with unit handling
     */
    calculateConsumptionPerDay(doseAmount: number, doseUnit: string, packageUnit: string, dosesPerDay: number, medication: MedicationConversionContext): {
        consumptionPerDay: number;
        conversions: Array<{
            from: string;
            to: string;
            factor: number;
            reason: string;
        }>;
    };
    /**
     * Format number for display (removes trailing zeros)
     */
    formatNumber(value: number, maxDecimals?: number): string;
    /**
     * Calculate percentage difference between two values
     */
    calculatePercentageDifference(value1: number, value2: number): number;
}
/**
 * Create singleton instance
 */
export declare const calculationUtils: CalculationUtils;
/**
 * Convenience functions
 */
export declare function validateDaysSupplyInputs(context: DaysSupplyContext): string[];
export declare function convertDurationToDays(value: number, unit: string): number;
export declare function calculateDosesPerDay(frequency: number, period: number, periodUnit: string): number;
//# sourceMappingURL=CalculationUtils.d.ts.map