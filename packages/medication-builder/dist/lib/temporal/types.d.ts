/**
 * FHIR Temporal Types for Days Supply Calculation
 *
 * Defines FHIR R4 compliant timing structures for accurate
 * temporal parsing and titration schedule support.
 *
 * @since 3.1.0
 */
/**
 * FHIR R4 Duration structure
 */
export interface Duration {
    value: number;
    unit: 's' | 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
    system?: string;
    code?: string;
}
/**
 * FHIR R4 Timing.repeat structure
 */
export interface FHIRTimingRepeat {
    /** Number of times to repeat */
    count?: number;
    /** Maximum number of repetitions */
    countMax?: number;
    /** Duration for each repetition */
    duration?: number;
    /** Maximum duration for each repetition */
    durationMax?: number;
    /** Units for duration */
    durationUnit?: 's' | 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
    /** Frequency within period */
    frequency?: number;
    /** Maximum frequency within period */
    frequencyMax?: number;
    /** Period length */
    period?: number;
    /** Maximum period length */
    periodMax?: number;
    /** Period units */
    periodUnit?: 's' | 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
    /** Days of week (mon, tue, wed, thu, fri, sat, sun) */
    dayOfWeek?: string[];
    /** Time of day for administration */
    timeOfDay?: string[];
    /** When during the day (MORN, AFT, EVE, NIGHT, PHS, HS, WAKE, C, M, D, AC, PC) */
    when?: string[];
    /** Offset from event */
    offset?: number;
    /** Bounds for the timing */
    boundsDuration?: Duration;
    /** Bounds as range */
    boundsRange?: {
        low?: Duration;
        high?: Duration;
    };
    /** Bounds as period */
    boundsPeriod?: {
        start?: string;
        end?: string;
    };
}
/**
 * FHIR R4 Timing structure
 */
export interface FHIRTiming {
    /** Specific timing events */
    event?: string[];
    /** Timing repeat instructions */
    repeat?: FHIRTimingRepeat;
    /** Coded timing specification */
    code?: {
        coding?: Array<{
            system?: string;
            code?: string;
            display?: string;
        }>;
        text?: string;
    };
}
/**
 * Represents a single phase in a titration schedule
 */
export interface TitrationPhase {
    /** FHIR timing for this phase */
    timing: FHIRTiming;
    /** Dose amount for this phase */
    doseAmount: number;
    /** Dose unit for this phase */
    doseUnit: string;
    /** Duration of this phase */
    duration: Duration;
    /** Whether this is the final maintenance phase */
    isMaintenancePhase: boolean;
    /** Human-readable description */
    description: string;
    /** Phase order (0-based) */
    phaseIndex: number;
}
/**
 * Context for days supply calculation
 */
export interface DaysSupplyContext {
    /** Package quantity available */
    packageQuantity: number;
    /** Package unit */
    packageUnit: string;
    /** Timing information (string or titration sequence) */
    timing: string | string[] | FHIRTiming | FHIRTiming[];
    /** Dose amount per administration */
    doseAmount: number;
    /** Dose unit */
    doseUnit: string;
    /** Medication information for conversions */
    medication?: {
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
        packageInfo?: {
            quantity: number;
            unit: string;
            packSize?: number;
        };
    };
}
/**
 * Result of temporal parsing
 */
export interface TemporalParseResult {
    /** Parsed FHIR timing structure(s) */
    timing: FHIRTiming | FHIRTiming[];
    /** Whether this is a titration schedule */
    isTitration: boolean;
    /** Titration phases if applicable */
    phases?: TitrationPhase[];
    /** Confidence in parsing (0-1) */
    confidence: number;
    /** Warnings or issues during parsing */
    warnings: string[];
}
/**
 * Interface for temporal parsing implementations
 */
export interface ITemporalParser {
    /**
     * Parse timing string(s) to FHIR structure
     */
    parse(timing: string | string[]): TemporalParseResult;
    /**
     * Calculate doses per period for given timing
     */
    calculateDosesPerPeriod(timing: FHIRTiming, period: Duration): number;
    /**
     * Parse titration sequence to phases
     */
    parseTitrationSequence(phases: string[]): TitrationPhase[];
    /**
     * Calculate duration of a timing phase
     */
    calculatePhaseDuration(timing: FHIRTiming): Duration | null;
}
/**
 * Common timing patterns for validation
 */
export declare const COMMON_TIMING_PATTERNS: {
    readonly DAILY: {
        readonly frequency: 1;
        readonly period: 1;
        readonly periodUnit: "d";
    };
    readonly TWICE_DAILY: {
        readonly frequency: 2;
        readonly period: 1;
        readonly periodUnit: "d";
    };
    readonly THREE_TIMES_DAILY: {
        readonly frequency: 3;
        readonly period: 1;
        readonly periodUnit: "d";
    };
    readonly WEEKLY: {
        readonly frequency: 1;
        readonly period: 1;
        readonly periodUnit: "wk";
    };
    readonly MONTHLY: {
        readonly frequency: 1;
        readonly period: 1;
        readonly periodUnit: "mo";
    };
};
/**
 * Titration pattern identifiers
 */
export declare const TITRATION_PATTERNS: {
    readonly WEEK_RANGE: RegExp;
    readonly WEEK_PLUS: RegExp;
    readonly DAY_RANGE: RegExp;
    readonly DAY_PLUS: RegExp;
    readonly PHASE_SEPARATOR: RegExp;
};
/**
 * Helper function to create Duration objects
 */
export declare function createDuration(value: number, unit: Duration['unit']): Duration;
/**
 * Helper function to create basic FHIRTiming
 */
export declare function createFHIRTiming(frequency: number, period: number, periodUnit: Duration['unit'], options?: Partial<FHIRTimingRepeat>): FHIRTiming;
/**
 * Type guards
 */
export declare function isFHIRTiming(obj: any): obj is FHIRTiming;
export declare function isTitrationPhase(obj: any): obj is TitrationPhase;
export declare function isDuration(obj: any): obj is Duration;
//# sourceMappingURL=types.d.ts.map