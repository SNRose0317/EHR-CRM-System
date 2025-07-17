/**
 * Liquid Base Strategy
 *
 * Handles liquid medications (solutions, suspensions, syrups)
 * with volume-based dosing and multi-ingredient support.
 *
 * @since 3.0.0
 */
import { IBaseStrategyWithMetadata, SpecificityLevel } from '../types';
import { MedicationRequestContext } from '../../types/MedicationRequestContext';
import { SignatureInstruction } from '../../types/SignatureInstruction';
export declare class LiquidStrategy implements IBaseStrategyWithMetadata {
    readonly specificity = SpecificityLevel.DOSE_FORM;
    private templateEngine;
    readonly metadata: {
        id: string;
        name: string;
        description: string;
        examples: string[];
        version: string;
    };
    /**
     * Matches liquid dose forms
     */
    matches(context: MedicationRequestContext): boolean;
    /**
     * Builds instruction for liquid medications using template engine
     */
    buildInstruction(context: MedicationRequestContext): SignatureInstruction;
    /**
     * Explains the strategy's behavior
     */
    explain(): string;
    /**
     * Determines if medication has multiple active ingredients
     */
    private isMultiIngredient;
    /**
     * Builds FHIR timing from frequency string
     */
    private buildTiming;
    /**
     * Maps unit strings to UCUM codes
     */
    private mapUnitCode;
}
//# sourceMappingURL=LiquidStrategy.d.ts.map