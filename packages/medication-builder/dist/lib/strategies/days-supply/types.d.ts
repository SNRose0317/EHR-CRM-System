/**
 * Days Supply Strategy Types
 *
 * Defines interfaces and types for the days supply calculation
 * strategy pattern, with support for titration schedules.
 *
 * @since 3.1.0
 */
import { DaysSupplyContext } from '../../temporal/types';
import { SpecificityLevel } from '../types';
/**
 * Result of days supply calculation
 */
export interface DaysSupplyResult {
    /** Total days the medication will last */
    daysSupply: number;
    /** Explanation of calculation method */
    calculationMethod: string;
    /** Breakdown of calculation steps */
    breakdown: CalculationBreakdown;
    /** Confidence in the result (0-1) */
    confidence: number;
    /** Warnings or limitations */
    warnings: string[];
}
/**
 * Detailed breakdown of calculation steps
 */
export interface CalculationBreakdown {
    /** Package information used */
    packageQuantity: number;
    packageUnit: string;
    /** Dose information */
    doseAmount: number;
    doseUnit: string;
    /** Frequency calculation */
    dosesPerDay: number;
    /** Total medication consumption per day */
    consumptionPerDay: number;
    /** Unit conversions applied */
    conversions?: Array<{
        from: string;
        to: string;
        factor: number;
        reason: string;
    }>;
    /** Titration-specific breakdown */
    titrationBreakdown?: TitrationBreakdown;
}
/**
 * Breakdown for titration calculations
 */
export interface TitrationBreakdown {
    /** Individual phase calculations */
    phases: Array<{
        phaseIndex: number;
        description: string;
        doseAmount: number;
        doseUnit: string;
        dosesInPhase: number;
        totalConsumption: number;
        phaseDurationDays: number;
    }>;
    /** Total consumption across all completed phases */
    titrationConsumption: number;
    /** Days consumed during titration */
    titrationDays: number;
    /** Remaining quantity after titration */
    remainingQuantity: number;
    /** Maintenance phase calculation */
    maintenancePhase?: {
        doseAmount: number;
        dosesPerDay: number;
        consumptionPerDay: number;
        additionalDays: number;
    };
}
/**
 * Base interface for days supply calculation strategies
 */
export interface IDaysSupplyStrategy {
    /** Specificity level for strategy selection */
    readonly specificity: SpecificityLevel;
    /** Strategy identifier */
    readonly id: string;
    /** Human-readable name */
    readonly name: string;
    /**
     * Determines if this strategy matches the given context
     */
    matches(context: DaysSupplyContext): boolean;
    /**
     * Calculates days supply for the given context
     */
    calculate(context: DaysSupplyContext): DaysSupplyResult;
    /**
     * Explains the strategy's behavior
     */
    explain(): string;
}
/**
 * Strategy dispatcher for selecting appropriate calculation method
 */
export interface IDaysSupplyStrategyDispatcher {
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
}
/**
 * Unit conversion service interface
 */
export interface IUnitConverter {
    /**
     * Convert quantity from one unit to another
     */
    convert(quantity: number, fromUnit: string, toUnit: string): number;
    /**
     * Check if units are compatible for conversion
     */
    areCompatible(unit1: string, unit2: string): boolean;
    /**
     * Get conversion factor between units
     */
    getConversionFactor(fromUnit: string, toUnit: string): number;
}
/**
 * Medication context for unit conversions
 */
export interface MedicationConversionContext {
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
}
/**
 * Strategy registration metadata
 */
export interface DaysSupplyStrategyMetadata {
    id: string;
    name: string;
    description: string;
    applicableDoseForms: string[];
    supportsTitration: boolean;
    examples: string[];
    version: string;
}
/**
 * Extended strategy interface with metadata
 */
export interface IDaysSupplyStrategyWithMetadata extends IDaysSupplyStrategy {
    readonly metadata: DaysSupplyStrategyMetadata;
}
/**
 * Strategy registration for the dispatcher
 */
export interface StrategyRegistration {
    strategy: IDaysSupplyStrategy;
    priority: number;
    enabled: boolean;
}
/**
 * Common calculation utilities
 */
export interface ICalculationUtils {
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
}
/**
 * Error types for days supply calculations
 */
export declare class DaysSupplyCalculationError extends Error {
    readonly context: DaysSupplyContext;
    readonly strategy?: string | undefined;
    constructor(message: string, context: DaysSupplyContext, strategy?: string | undefined);
}
export declare class InvalidTitrationScheduleError extends DaysSupplyCalculationError {
    constructor(message: string, context: DaysSupplyContext);
}
export declare class UnitConversionError extends DaysSupplyCalculationError {
    readonly fromUnit: string;
    readonly toUnit: string;
    constructor(message: string, context: DaysSupplyContext, fromUnit: string, toUnit: string);
}
/**
 * Type guards
 */
export declare function isDaysSupplyResult(obj: any): obj is DaysSupplyResult;
export declare function isTitrationBreakdown(obj: any): obj is TitrationBreakdown;
/**
 * Constants for calculation
 */
export declare const CALCULATION_CONSTANTS: {
    /** Default confidence levels */
    readonly HIGH_CONFIDENCE: 0.9;
    readonly MEDIUM_CONFIDENCE: 0.7;
    readonly LOW_CONFIDENCE: 0.5;
    /** Performance requirements */
    readonly MAX_CALCULATION_TIME_MS: 5;
    /** Common conversion factors */
    readonly DAYS_PER_WEEK: 7;
    readonly DAYS_PER_MONTH: 30;
    readonly HOURS_PER_DAY: 24;
    /** Topiclick conversion */
    readonly TOPICLICK_CLICKS_PER_ML: 4;
    /** Precision for floating point comparisons */
    readonly PRECISION_TOLERANCE: 0.001;
};
/**
 * Helper function to create a basic days supply result
 */
export declare function createDaysSupplyResult(daysSupply: number, method: string, breakdown: CalculationBreakdown, confidence?: number, warnings?: string[]): DaysSupplyResult;
//# sourceMappingURL=types.d.ts.map