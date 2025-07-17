/**
 * ComplexPRNBuilder
 *
 * Specialized builder for complex PRN (as needed) medications with dose ranges,
 * frequency ranges, and maximum daily dose constraints. Handles sophisticated
 * PRN scenarios like "1-2 tablets every 4-6 hours as needed, max 6 tablets daily".
 *
 * @since 3.2.0
 */
import { SimpleTabletBuilder } from './SimpleTabletBuilder';
import { ISignatureBuilder, DoseInput, TimingInput } from './ISignatureBuilder';
import { IComplexRegimenBuilder, DoseRangeInput, FrequencyRangeInput, MaxDailyDoseConstraint, TaperingPhase, ConditionalInstruction, InstructionRelationship, MultiIngredientDoseInput, ComplexRegimenBuilderState } from './IComplexRegimenBuilder';
import { SignatureInstruction } from '../types/SignatureInstruction';
import { MedicationProfile } from '../types/MedicationProfile';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
/**
 * Builder for complex PRN medications with ranges and constraints
 */
export declare class ComplexPRNBuilder extends SimpleTabletBuilder implements IComplexRegimenBuilder {
    protected complexState: ComplexRegimenBuilderState;
    private prnState;
    constructor(medication: MedicationProfile);
    /**
     * Build dose range for PRN medications (e.g., 1-2 tablets)
     */
    buildDoseRange(doseRange: DoseRangeInput): IComplexRegimenBuilder;
    /**
     * Build frequency range for PRN medications (e.g., every 4-6 hours)
     */
    buildFrequencyRange(frequencyRange: FrequencyRangeInput): IComplexRegimenBuilder;
    /**
     * Build maximum daily dose constraints
     */
    buildMaxDailyDoseConstraint(constraint: MaxDailyDoseConstraint): IComplexRegimenBuilder;
    /**
     * Override buildDose to handle dose ranges
     */
    buildDose(dose: DoseInput): ISignatureBuilder;
    /**
     * Override buildTiming to handle frequency ranges
     */
    buildTiming(timing: TimingInput): ISignatureBuilder;
    /**
     * Generate final FHIR-compliant instruction with PRN ranges
     */
    getResult(): SignatureInstruction[];
    /**
     * Generate complex regimen results with PRN relationships
     */
    getComplexResult(): SignatureInstruction[];
    /**
     * Override to provide PRN context formatting
     */
    protected createMedicationRequestContext(): MedicationRequestContext;
    /**
     * Calculate PRN timing configuration from frequency range
     */
    private calculatePRNTiming;
    /**
     * Convert period to hours
     */
    private convertPeriodToHours;
    /**
     * Enhance instruction text with PRN range information
     */
    private enhanceInstructionWithPRNRanges;
    /**
     * Format dose range for display
     */
    private formatDoseRange;
    /**
     * Format frequency range for display
     */
    private formatFrequencyRange;
    /**
     * Build FHIR dose and rate structure with range support
     */
    private buildDoseAndRateWithRange;
    /**
     * Get PRN-specific instructions and warnings
     */
    private getPRNInstructions;
    /**
     * Add maximum daily dose to FHIR instruction
     */
    private addMaxDailyDoseToInstruction;
    /**
     * Validation methods
     */
    private validateDoseRange;
    /**
     * Convert dose value to mg for comparison
     */
    private convertToMg;
    private validateFrequencyRange;
    private validateMaxDailyConstraint;
    private validateDoseAgainstRange;
    private validateTimingAgainstRange;
    private validatePRNMedication;
    buildSequentialInstructions(phases: TaperingPhase[]): IComplexRegimenBuilder;
    buildConditionalLogic(conditional: ConditionalInstruction): IComplexRegimenBuilder;
    buildRelationships(relationships: InstructionRelationship[]): IComplexRegimenBuilder;
    buildMultiIngredientDose(multiIngredientDose: MultiIngredientDoseInput): IComplexRegimenBuilder;
    validateComplexRegimen(): string[];
    explainComplexRegimen(): string;
    /**
     * Add entry to complex audit trail
     */
    private addComplexAuditEntry;
    /**
     * Override builder type in JSON serialization
     */
    toJSON(): object;
    /**
     * Enhanced explanation with PRN capabilities
     */
    explain(): string;
}
//# sourceMappingURL=ComplexPRNBuilder.d.ts.map