/**
 * MultiIngredientBuilder
 *
 * Specialized builder for multi-ingredient and compound medications.
 * Handles ingredient breakdown display, compound ratio calculations,
 * and proper FHIR representation for combination products.
 *
 * @since 3.2.0
 */
import { SimpleLiquidBuilder } from './SimpleLiquidBuilder';
import { ISignatureBuilder, DoseInput } from './ISignatureBuilder';
import { IComplexRegimenBuilder, MultiIngredientDoseInput, TaperingPhase, ConditionalInstruction, InstructionRelationship, DoseRangeInput, FrequencyRangeInput, MaxDailyDoseConstraint, ComplexRegimenBuilderState } from './IComplexRegimenBuilder';
import { SignatureInstruction } from '../types/SignatureInstruction';
import { MedicationProfile } from '../types/MedicationProfile';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
/**
 * Builder for multi-ingredient and compound medications
 */
export declare class MultiIngredientBuilder extends SimpleLiquidBuilder implements IComplexRegimenBuilder {
    protected complexState: ComplexRegimenBuilderState;
    private ingredientBreakdown;
    private showIngredientBreakdown;
    constructor(medication: MedicationProfile);
    /**
     * Override buildDose to handle multi-ingredient calculations
     */
    buildDose(dose: DoseInput): ISignatureBuilder;
    /**
     * Build multi-ingredient dose with explicit breakdown
     */
    buildMultiIngredientDose(multiIngredientDose: MultiIngredientDoseInput): IComplexRegimenBuilder;
    /**
     * Generate final FHIR-compliant instruction with ingredient breakdown
     */
    getResult(): SignatureInstruction[];
    /**
     * Override to provide multi-ingredient context formatting
     */
    protected createMedicationRequestContext(): MedicationRequestContext;
    /**
     * Calculate ingredient breakdown based on total dose
     */
    private calculateIngredientBreakdown;
    /**
     * Update ingredient breakdown for specific dose
     */
    private updateIngredientBreakdown;
    /**
     * Find ingredient ratio by name
     */
    private findIngredientRatio;
    /**
     * Enhance instruction text with ingredient breakdown
     */
    private enhanceInstructionWithIngredients;
    /**
     * Get ingredient-specific instructions
     */
    private getIngredientInstructions;
    /**
     * Add ingredient breakdown to audit trail
     */
    private addIngredientBreakdownToAudit;
    /**
     * Validate medication is appropriate for multi-ingredient builder
     */
    private validateMultiIngredientMedication;
    /**
     * Build sequential instructions for tapering schedules
     */
    buildSequentialInstructions(phases: TaperingPhase[]): IComplexRegimenBuilder;
    /**
     * Build conditional logic for complex scenarios
     */
    buildConditionalLogic(conditional: ConditionalInstruction): IComplexRegimenBuilder;
    /**
     * Build relationships between instructions
     */
    buildRelationships(relationships: InstructionRelationship[]): IComplexRegimenBuilder;
    /**
     * Build dose ranges for PRN medications
     */
    buildDoseRange(doseRange: DoseRangeInput): IComplexRegimenBuilder;
    /**
     * Build frequency ranges for PRN medications
     */
    buildFrequencyRange(frequencyRange: FrequencyRangeInput): IComplexRegimenBuilder;
    /**
     * Build maximum daily dose constraints
     */
    buildMaxDailyDoseConstraint(constraint: MaxDailyDoseConstraint): IComplexRegimenBuilder;
    /**
     * Generate complex regimen results with relationships
     */
    getComplexResult(): SignatureInstruction[];
    /**
     * Validate complex regimen constraints
     */
    validateComplexRegimen(): string[];
    /**
     * Get detailed explanation of complex regimen logic
     */
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
     * Enhanced explanation with multi-ingredient capabilities
     */
    explain(): string;
}
//# sourceMappingURL=MultiIngredientBuilder.d.ts.map