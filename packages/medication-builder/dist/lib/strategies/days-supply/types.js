/**
 * Days Supply Strategy Types
 *
 * Defines interfaces and types for the days supply calculation
 * strategy pattern, with support for titration schedules.
 *
 * @since 3.1.0
 */
/**
 * Error types for days supply calculations
 */
export class DaysSupplyCalculationError extends Error {
    constructor(message, context, strategy) {
        super(message);
        this.context = context;
        this.strategy = strategy;
        this.name = 'DaysSupplyCalculationError';
    }
}
export class InvalidTitrationScheduleError extends DaysSupplyCalculationError {
    constructor(message, context) {
        super(message, context, 'TitrationDaysSupplyStrategy');
        this.name = 'InvalidTitrationScheduleError';
    }
}
export class UnitConversionError extends DaysSupplyCalculationError {
    constructor(message, context, fromUnit, toUnit) {
        super(message, context);
        this.fromUnit = fromUnit;
        this.toUnit = toUnit;
        this.name = 'UnitConversionError';
    }
}
/**
 * Type guards
 */
export function isDaysSupplyResult(obj) {
    return obj &&
        typeof obj.daysSupply === 'number' &&
        typeof obj.calculationMethod === 'string' &&
        obj.breakdown &&
        typeof obj.confidence === 'number';
}
export function isTitrationBreakdown(obj) {
    return obj &&
        Array.isArray(obj.phases) &&
        typeof obj.titrationConsumption === 'number' &&
        typeof obj.titrationDays === 'number';
}
/**
 * Constants for calculation
 */
export const CALCULATION_CONSTANTS = {
    /** Default confidence levels */
    HIGH_CONFIDENCE: 0.9,
    MEDIUM_CONFIDENCE: 0.7,
    LOW_CONFIDENCE: 0.5,
    /** Performance requirements */
    MAX_CALCULATION_TIME_MS: 5,
    /** Common conversion factors */
    DAYS_PER_WEEK: 7,
    DAYS_PER_MONTH: 30, // This will be eliminated in favor of precise calculations
    HOURS_PER_DAY: 24,
    /** Topiclick conversion */
    TOPICLICK_CLICKS_PER_ML: 4,
    /** Precision for floating point comparisons */
    PRECISION_TOLERANCE: 0.001
};
/**
 * Helper function to create a basic days supply result
 */
export function createDaysSupplyResult(daysSupply, method, breakdown, confidence = CALCULATION_CONSTANTS.HIGH_CONFIDENCE, warnings = []) {
    return {
        daysSupply: Math.floor(daysSupply), // Always round down to whole days
        calculationMethod: method,
        breakdown,
        confidence,
        warnings
    };
}
//# sourceMappingURL=types.js.map