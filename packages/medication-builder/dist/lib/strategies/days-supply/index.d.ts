/**
 * Days Supply Strategy Export Module
 *
 * Centralized exports for the days supply calculation system
 * with titration support and FHIR compliance.
 *
 * @since 3.1.0
 */
export type { DaysSupplyContext, TitrationPhase, FHIRTiming, Duration } from '../../temporal/types';
export type { IDaysSupplyStrategy, IDaysSupplyStrategyDispatcher, DaysSupplyResult, CalculationBreakdown, TitrationBreakdown, DaysSupplyStrategyMetadata, MedicationConversionContext, ICalculationUtils, IUnitConverter } from './types';
import type { DaysSupplyContext } from '../../temporal/types';
export { DaysSupplyCalculationError, InvalidTitrationScheduleError, UnitConversionError } from './types';
export { CALCULATION_CONSTANTS } from './types';
export { createDaysSupplyResult, isDaysSupplyResult, isTitrationBreakdown } from './types';
export { DaysSupplyStrategyDispatcher, daysSupplyDispatcher, calculateDaysSupply, getStrategyInfo, STRATEGY_SELECTION_EXAMPLES } from './DaysSupplyStrategyDispatcher';
export { TitrationDaysSupplyStrategy, TITRATION_EXAMPLES } from './TitrationDaysSupplyStrategy';
export { TabletDaysSupplyStrategy, TABLET_CALCULATION_EXAMPLES } from './TabletDaysSupplyStrategy';
export { LiquidDaysSupplyStrategy, LIQUID_CALCULATION_EXAMPLES } from './LiquidDaysSupplyStrategy';
export { CalculationUtils, calculationUtils, validateDaysSupplyInputs, convertDurationToDays, calculateDosesPerDay } from './CalculationUtils';
export { FHIRTemporalParser, fhirTemporalParser, parseTiming, isTitrationSchedule, calculateDaysSupplyFromTiming } from '../../temporal/FHIRTemporalParser';
export type { ITemporalParser, TemporalParseResult } from '../../temporal/types';
export { createDuration, createFHIRTiming, isFHIRTiming, isTitrationPhase, isDuration, COMMON_TIMING_PATTERNS, TITRATION_PATTERNS } from '../../temporal/types';
/**
 * Convenience function to create a complete days supply context
 */
export declare function createDaysSupplyContext(packageQuantity: number, packageUnit: string, doseAmount: number, doseUnit: string, timing: string | string[], medication?: {
    doseForm: string;
    ingredient?: Array<{
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
    dispenserInfo?: {
        conversionRatio: number;
        unit: string;
    };
}): DaysSupplyContext;
/**
 * Quick calculation function for simple cases
 */
export declare function quickDaysSupplyCalculation(packageQuantity: number, packageUnit: string, doseAmount: number, doseUnit: string, timing: string): number;
/**
 * Validation function for days supply inputs
 */
export declare function isValidDaysSupplyContext(context: unknown): context is DaysSupplyContext;
//# sourceMappingURL=index.d.ts.map