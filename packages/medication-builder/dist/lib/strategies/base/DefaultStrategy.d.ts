/**
 * Default Base Strategy
 *
 * Fallback strategy that handles any medication when no more
 * specific strategy matches. Uses simple formatting rules.
 *
 * @since 3.0.0
 */
import { IBaseStrategyWithMetadata, SpecificityLevel } from '../types';
import { MedicationRequestContext } from '../../types/MedicationRequestContext';
import { SignatureInstruction } from '../../types/SignatureInstruction';
export declare class DefaultStrategy implements IBaseStrategyWithMetadata {
    readonly specificity = SpecificityLevel.DEFAULT;
    private templateEngine;
    readonly metadata: {
        id: string;
        name: string;
        description: string;
        version: string;
    };
    /**
     * Always matches as the fallback strategy
     */
    matches(context: MedicationRequestContext): boolean;
    /**
     * Builds a simple instruction using template engine
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
     * Maps route names to SNOMED codes
     */
    private getRouteCode;
}
//# sourceMappingURL=DefaultStrategy.d.ts.map