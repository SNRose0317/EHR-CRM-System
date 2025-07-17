/**
 * Confidence Score Service
 *
 * Calculates confidence scores for unit conversions to help healthcare
 * providers understand the reliability of conversion results.
 */
import { ConversionStep } from '../lib/units/types';
import { ConfidenceScore, ConversionTrace } from './types';
/**
 * Service for calculating conversion confidence scores
 */
export declare class ConfidenceScoreService {
    /**
     * Calculate confidence score for a conversion
     */
    calculate(trace: ConversionTrace): ConfidenceScore;
    /**
     * Get base score based on conversion complexity
     */
    private getBaseScore;
    /**
     * Calculate all adjustments based on conversion characteristics
     */
    private getAdjustments;
    /**
     * Calculate individual scoring factors
     */
    private calculateFactors;
    /**
     * Generate human-readable rationale
     */
    private generateRationale;
    /**
     * Determine confidence level from score
     */
    private getLevel;
    /**
     * Check if conversion has precision concerns
     */
    private hasPrecisionConcerns;
    /**
     * Generate detailed explanation of the confidence score
     */
    private generateExplanation;
    /**
     * Create a ConversionTrace from ConversionSteps
     * This is a helper method to bridge the current implementation
     */
    createTraceFromSteps(steps: ConversionStep[], request: {
        value: number;
        fromUnit: string;
        toUnit: string;
    }, context?: {
        usedDefaults?: boolean;
        hasLotSpecificData?: boolean;
        missingRequiredContext?: boolean;
    }): ConversionTrace;
}
//# sourceMappingURL=ConfidenceScoreService.d.ts.map