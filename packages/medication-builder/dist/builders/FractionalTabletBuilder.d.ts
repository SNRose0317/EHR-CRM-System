/**
 * FractionalTabletBuilder
 *
 * Specialized builder for medications requiring fractional tablet dosing
 * with Unicode fraction display formatting and patient-friendly splitting
 * instructions. Extends SimpleTabletBuilder to inherit all validation logic.
 *
 * @since 3.1.0
 */
import { SimpleTabletBuilder } from './SimpleTabletBuilder';
import { ISignatureBuilder, DoseInput } from './ISignatureBuilder';
import { SignatureInstruction } from '../types/SignatureInstruction';
import { MedicationProfile } from '../types/MedicationProfile';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
/**
 * Builder for tablet medications requiring fractional dosing with
 * enhanced formatting and patient guidance
 */
export declare class FractionalTabletBuilder extends SimpleTabletBuilder {
    constructor(medication: MedicationProfile);
    /**
     * Configure dose with enhanced fractional formatting
     *
     * @param dose - Dose configuration
     * @returns Builder instance for chaining
     * @throws Error if dose is invalid
     */
    buildDose(dose: DoseInput): ISignatureBuilder;
    /**
     * Generate final FHIR-compliant instruction with splitting guidance
     *
     * @returns Array of SignatureInstruction with enhanced fractional formatting
     */
    getResult(): SignatureInstruction[];
    /**
     * Override to provide fractional context formatting
     */
    protected createMedicationRequestContext(): MedicationRequestContext;
    /**
     * Format numeric fraction as Unicode symbol
     *
     * @param value - Numeric dose value
     * @returns Formatted string with Unicode fractions
     */
    private formatFraction;
    /**
     * Generate splitting instructions for all fractional doses
     *
     * @returns Array of instruction objects
     */
    private getSplittingInstructions;
    /**
     * Get splitting instruction for specific dose value
     *
     * @param doseValue - Numeric dose value
     * @returns Splitting instruction or undefined
     */
    private getSplittingInstructionForDose;
    /**
     * Check if dose is fractional tablet dosing
     *
     * @param dose - Dose to check
     * @returns True if fractional tablet dose
     */
    private isFractionalTabletDose;
    /**
     * Override format dose for audit to show fractions nicely
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
     * Enhanced explanation with fractional capabilities
     */
    explain(): string;
}
//# sourceMappingURL=FractionalTabletBuilder.d.ts.map