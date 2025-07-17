/**
 * TopiclickBuilder
 *
 * Specialized builder for medications using the Topiclick dispensing system.
 * Handles 4 clicks = 1 mL conversion with air-prime loss accounting and
 * device-specific formatting and instructions.
 *
 * @since 3.1.0
 */
import { SimpleLiquidBuilder } from './SimpleLiquidBuilder';
import { ISignatureBuilder, DoseInput } from './ISignatureBuilder';
import { SignatureInstruction } from '../types/SignatureInstruction';
import { MedicationProfile } from '../types/MedicationProfile';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
/**
 * Builder for medications using Topiclick dispensing system
 */
export declare class TopiclickBuilder extends SimpleLiquidBuilder {
    private readonly CLICKS_PER_ML;
    private readonly AIR_PRIME_LOSS_CLICKS;
    private originalDose?;
    constructor(medication: MedicationProfile);
    /**
     * Generate final FHIR-compliant instruction with Topiclick formatting
     *
     * @returns Array of SignatureInstruction with Topiclick-specific formatting
     */
    getResult(): SignatureInstruction[];
    /**
     * Override to provide Topiclick context formatting
     */
    protected createMedicationRequestContext(): MedicationRequestContext;
    /**
     * Format instruction text for Topiclick display
     */
    private formatTopiclickInstruction;
    /**
     * Format click display as "X clicks (Y mg)"
     */
    private formatClickDisplay;
    /**
     * Calculate mg equivalent from clicks using medication concentration
     */
    private calculateMgFromClicks;
    /**
     * Get Topiclick-specific instructions
     */
    private getTopiclickInstructions;
    /**
     * Validate medication is appropriate for Topiclick builder
     */
    private validateTopiclickMedication;
    /**
     * Override format dose for audit to show clicks nicely
     */
    protected formatDoseForAudit(dose: DoseInput): string;
    /**
     * Override buildDose to properly handle click auditing
     */
    buildDose(dose: DoseInput): ISignatureBuilder;
    /**
     * Override audit entry to access protected method
     */
    protected addAuditEntry(entry: string): void;
    /**
     * Override builder type in JSON serialization
     */
    toJSON(): object;
    /**
     * Enhanced explanation with Topiclick capabilities
     */
    explain(): string;
}
//# sourceMappingURL=TopiclickBuilder.d.ts.map