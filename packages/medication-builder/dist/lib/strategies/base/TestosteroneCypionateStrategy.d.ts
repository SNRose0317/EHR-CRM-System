/**
 * Testosterone Cypionate Strategy
 *
 * Highly specific strategy for testosterone cypionate injections
 * with dual dosing display (mg and mL).
 *
 * @since 3.0.0
 */
import { IBaseStrategyWithMetadata, SpecificityLevel } from '../types';
import { MedicationRequestContext } from '../../types/MedicationRequestContext';
import { SignatureInstruction } from '../../types/SignatureInstruction';
export declare class TestosteroneCypionateStrategy implements IBaseStrategyWithMetadata {
    readonly specificity = SpecificityLevel.MEDICATION_ID;
    private templateEngine;
    readonly metadata: {
        id: string;
        name: string;
        description: string;
        examples: string[];
        version: string;
    };
    /**
     * Matches testosterone cypionate specifically
     */
    matches(context: MedicationRequestContext): boolean;
    /**
     * Builds instruction with dual dosing for testosterone using template engine
     */
    buildInstruction(context: MedicationRequestContext): SignatureInstruction;
    /**
     * Explains the strategy's behavior
     */
    explain(): string;
    /**
     * Builds timing for testosterone injections
     */
    private buildTiming;
}
//# sourceMappingURL=TestosteroneCypionateStrategy.d.ts.map