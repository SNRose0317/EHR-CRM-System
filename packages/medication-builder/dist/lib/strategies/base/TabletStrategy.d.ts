/**
 * Tablet Base Strategy
 *
 * Handles oral solid medications (tablets, capsules) with
 * special support for fractional dosing and strength display.
 *
 * @since 3.0.0
 */
import { IBaseStrategyWithMetadata, SpecificityLevel } from '../types';
import { MedicationRequestContext } from '../../types/MedicationRequestContext';
import { SignatureInstruction } from '../../types/SignatureInstruction';
export declare class TabletStrategy implements IBaseStrategyWithMetadata {
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
     * Matches tablet and similar solid oral dose forms
     */
    matches(context: MedicationRequestContext): boolean;
    /**
     * Builds instruction using template engine with tablet-specific formatting
     */
    buildInstruction(context: MedicationRequestContext): SignatureInstruction;
    /**
     * Explains the strategy's behavior
     */
    explain(): string;
    /**
     * Builds FHIR timing from frequency string
     */
    private buildTiming;
    /**
     * Maps unit strings to UCUM codes
     */
    private mapUnitCode;
}
//# sourceMappingURL=TabletStrategy.d.ts.map