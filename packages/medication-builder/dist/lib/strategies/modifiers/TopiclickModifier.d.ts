/**
 * Topiclick Modifier Strategy
 *
 * Modifies instructions for medications using the Topiclick
 * dispenser system (4 clicks = 1 mL conversion).
 *
 * @since 3.0.0
 */
import { IModifierStrategyWithMetadata } from '../types';
import { MedicationRequestContext } from '../../types/MedicationRequestContext';
import { SignatureInstruction } from '../../types/SignatureInstruction';
export declare class TopiclickModifier implements IModifierStrategyWithMetadata {
    readonly priority = 10;
    readonly metadata: {
        id: string;
        name: string;
        description: string;
        examples: string[];
        version: string;
    };
    /**
     * Applies to medications with Topiclick dispenser
     */
    appliesTo(context: MedicationRequestContext): boolean;
    /**
     * Modifies instruction to handle click conversions
     */
    modify(instruction: SignatureInstruction, context: MedicationRequestContext): SignatureInstruction;
    /**
     * Explains the modifier's behavior
     */
    explain(): string;
}
//# sourceMappingURL=TopiclickModifier.d.ts.map