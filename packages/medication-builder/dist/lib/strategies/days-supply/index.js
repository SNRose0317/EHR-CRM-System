/**
 * Days Supply Strategy Export Module
 *
 * Centralized exports for the days supply calculation system
 * with titration support and FHIR compliance.
 *
 * @since 3.1.0
 */
import { calculateDaysSupply } from './DaysSupplyStrategyDispatcher';
// Error types
export { DaysSupplyCalculationError, InvalidTitrationScheduleError, UnitConversionError } from './types';
// Constants
export { CALCULATION_CONSTANTS } from './types';
// Helper functions
export { createDaysSupplyResult, isDaysSupplyResult, isTitrationBreakdown } from './types';
// Main dispatcher and calculation functions
export { DaysSupplyStrategyDispatcher, daysSupplyDispatcher, calculateDaysSupply, getStrategyInfo, STRATEGY_SELECTION_EXAMPLES } from './DaysSupplyStrategyDispatcher';
// Individual strategies
export { TitrationDaysSupplyStrategy, TITRATION_EXAMPLES } from './TitrationDaysSupplyStrategy';
export { TabletDaysSupplyStrategy, TABLET_CALCULATION_EXAMPLES } from './TabletDaysSupplyStrategy';
export { LiquidDaysSupplyStrategy, LIQUID_CALCULATION_EXAMPLES } from './LiquidDaysSupplyStrategy';
// Utilities
export { CalculationUtils, calculationUtils, validateDaysSupplyInputs, convertDurationToDays, calculateDosesPerDay } from './CalculationUtils';
// Temporal parsing integration
export { FHIRTemporalParser, fhirTemporalParser, parseTiming, isTitrationSchedule, calculateDaysSupplyFromTiming } from '../../temporal/FHIRTemporalParser';
export { createDuration, createFHIRTiming, isFHIRTiming, isTitrationPhase, isDuration, COMMON_TIMING_PATTERNS, TITRATION_PATTERNS } from '../../temporal/types';
/**
 * Convenience function to create a complete days supply context
 */
export function createDaysSupplyContext(packageQuantity, packageUnit, doseAmount, doseUnit, timing, medication) {
    return {
        packageQuantity,
        packageUnit,
        doseAmount,
        doseUnit,
        timing,
        medication
    };
}
/**
 * Quick calculation function for simple cases
 */
export function quickDaysSupplyCalculation(packageQuantity, packageUnit, doseAmount, doseUnit, timing) {
    const context = createDaysSupplyContext(packageQuantity, packageUnit, doseAmount, doseUnit, timing);
    try {
        const result = calculateDaysSupply(context);
        return result.daysSupply;
    }
    catch {
        return 0; // Return 0 if calculation fails
    }
}
/**
 * Validation function for days supply inputs
 */
export function isValidDaysSupplyContext(context) {
    if (!context || typeof context !== 'object') {
        return false;
    }
    const obj = context;
    return typeof obj.packageQuantity === 'number' &&
        obj.packageQuantity > 0 &&
        typeof obj.packageUnit === 'string' &&
        obj.packageUnit.trim() !== '' &&
        typeof obj.doseAmount === 'number' &&
        obj.doseAmount > 0 &&
        typeof obj.doseUnit === 'string' &&
        obj.doseUnit.trim() !== '' &&
        obj.timing !== undefined &&
        obj.timing !== null;
}
//# sourceMappingURL=index.js.map