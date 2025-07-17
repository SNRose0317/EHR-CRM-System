import type { Medication } from '../types/index';
export interface DoseInfo {
    value: number;
    unit: string;
    frequencyKey: string;
}
/**
 * Calculates days supply for a medication
 * Returns null if calculation not possible (e.g., PRN medications)
 *
 * @deprecated Consider using the new strategy-based calculation system directly
 */
export declare function calculateDaysSupply(medication: Medication, dose: DoseInfo): number | null;
/**
 * Validates that a dose is within medication constraints
 */
export declare function isDoseValid(medication: Medication, dose: {
    value: number;
    unit: string;
}): boolean;
/**
 * Gets dose constraints message for invalid doses
 */
export declare function getDoseConstraintMessage(medication: Medication, dose: {
    value: number;
    unit: string;
}): string | null;
/**
 * New strategy-based days supply calculation exports
 * Use these for new implementations that support titration and advanced features
 */
export { calculateDaysSupply as calculateDaysSupplyStrategy, createDaysSupplyContext, quickDaysSupplyCalculation, isValidDaysSupplyContext, DaysSupplyStrategyDispatcher, getStrategyInfo } from './strategies/days-supply/index';
//# sourceMappingURL=calculations.d.ts.map