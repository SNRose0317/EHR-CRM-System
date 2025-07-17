/**
 * Strength Display Modifier
 *
 * Adds medication strength information to dose instructions
 * for better clarity (e.g., "2 tablets (1000 mg)").
 *
 * @since 3.0.0
 */
import { IModifierStrategyWithMetadata } from '../types';
import { MedicationRequestContext } from '../../types/MedicationRequestContext';
import { SignatureInstruction } from '../../types/SignatureInstruction';
export declare class StrengthDisplayModifier implements IModifierStrategyWithMetadata {
    readonly priority = 20;
    readonly metadata: {
        id: string;
        name: string;
        description: string;
        examples: string[];
        version: string;
    };
    /**
     * Applies to solid dose forms with countable units
     */
    appliesTo(context: MedicationRequestContext): boolean;
    /**
     * Modifies instruction to add strength display
     */
    modify(instruction: SignatureInstruction, context: MedicationRequestContext): SignatureInstruction;
    /**
     * Explains the modifier's behavior
     */
    explain(): string;
}
//# sourceMappingURL=StrengthDisplayModifier.d.ts.map