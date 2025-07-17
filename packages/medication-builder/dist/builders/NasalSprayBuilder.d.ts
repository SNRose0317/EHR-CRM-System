/**
 * NasalSprayBuilder
 *
 * Specialized builder for nasal spray medications with nostril patterns,
 * priming instructions, and dose validation.
 *
 * @since 3.1.0
 */
import { SimpleLiquidBuilder } from './SimpleLiquidBuilder';
import { ISignatureBuilder, DoseInput } from './ISignatureBuilder';
import { SignatureInstruction } from '../types/SignatureInstruction';
import { MedicationProfile } from '../types/MedicationProfile';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
/**
 * Builder for nasal spray medications
 */
export declare class NasalSprayBuilder extends SimpleLiquidBuilder {
    private originalDose?;
    constructor(medication: MedicationProfile);
    /**
     * Override buildDose to properly handle spray auditing
     */
    buildDose(dose: DoseInput): ISignatureBuilder;
    /**
     * Generate final FHIR-compliant instruction with nasal spray formatting
     *
     * @returns Array of SignatureInstruction with nasal spray-specific formatting
     */
    getResult(): SignatureInstruction[];
    /**
     * Override to provide nasal spray context formatting
     */
    protected createMedicationRequestContext(): MedicationRequestContext;
    /**
     * Format instruction text for nasal spray display
     */
    private formatNasalSprayInstruction;
    /**
     * Format spray display as "X sprays (Y mcg)" or "X sprays per nostril"
     */
    private formatSprayDisplay;
    /**
     * Calculate mcg equivalent from sprays using medication strength
     */
    private calculateMcgFromSprays;
    /**
     * Get nasal spray-specific instructions
     */
    private getNasalSprayInstructions;
    /**
     * Validate spray count against medication limits
     */
    private validateSprayCount;
    /**
     * Validate medication is appropriate for nasal spray builder
     */
    private validateNasalSprayMedication;
    /**
     * Override format dose for audit to show sprays nicely
     */
    protected formatDoseForAudit(dose: DoseInput): string;
    /**
     * Override audit entry to access protected method
     */
    protected addAuditEntry(entry: string): void;
    /**
     * Override builder type in JSON serialization
     */
    toJSON(): object;
    /**
     * Enhanced explanation with nasal spray capabilities
     */
    explain(): string;
}
//# sourceMappingURL=NasalSprayBuilder.d.ts.map