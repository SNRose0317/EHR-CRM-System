/**
 * FHIR Temporal Parser with Titration Support
 *
 * Parses natural language timing strings to FHIR R4 compliant
 * timing structures, with special support for titration schedules.
 * Eliminates hardcoded assumptions and provides precise calculations.
 *
 * @since 3.1.0
 */
import { ITemporalParser, FHIRTiming, TitrationPhase, Duration, TemporalParseResult } from './types';
export declare class FHIRTemporalParser implements ITemporalParser {
    /**
     * Parse timing string(s) to FHIR structure
     */
    parse(timing: string | string[]): TemporalParseResult;
    /**
     * Parse single timing string to FHIR
     */
    private parseSingleTiming;
    /**
     * Parse common frequency patterns
     */
    private parseCommonPatterns;
    /**
     * Basic frequency parsing fallback
     */
    private parseBasicFrequency;
    /**
     * Detect if string contains titration sequence
     */
    private detectTitrationInString;
    /**
     * Split titration string into phases
     */
    private splitTitrationString;
    /**
     * Parse titration from array of phase strings
     */
    private parseTitrationFromArray;
    /**
     * Parse titration sequence to phases
     */
    parseTitrationSequence(phases: string[]): TitrationPhase[];
    /**
     * Parse a single titration phase
     */
    private parseSinglePhase;
    /**
     * Extract week range from phase string
     */
    private extractWeekRange;
    /**
     * Extract day range from phase string
     */
    private extractDayRange;
    /**
     * Extract frequency from phase string
     */
    private extractFrequencyFromPhase;
    /**
     * Calculate doses per day from frequency
     */
    private calculateDosesPerDay;
    /**
     * Calculate doses per period for given timing
     */
    calculateDosesPerPeriod(timing: FHIRTiming, period: Duration): number;
    /**
     * Calculate duration of a timing phase
     */
    calculatePhaseDuration(timing: FHIRTiming): Duration | null;
    /**
     * Convert duration to specific unit
     */
    private convertDurationToUnit;
    /**
     * Get default timing for fallback
     */
    private getDefaultTiming;
}
/**
 * Create singleton instance
 */
export declare const fhirTemporalParser: FHIRTemporalParser;
/**
 * Convenience function for parsing
 */
export declare function parseTiming(timing: string | string[]): TemporalParseResult;
/**
 * Convenience function for titration detection
 */
export declare function isTitrationSchedule(timing: string | string[] | FHIRTiming | FHIRTiming[]): boolean;
/**
 * Convenience function for calculating days supply from timing
 */
export declare function calculateDaysSupplyFromTiming(timing: FHIRTiming | FHIRTiming[], packageQuantity: number, doseAmountPerAdmin: number): number;
//# sourceMappingURL=FHIRTemporalParser.d.ts.map