/**
 * TaperingDoseBuilder
 *
 * Specialized builder for medications with tapering schedules and sequential dose reductions.
 * Handles phase-based dosing, duration management, and FHIR sequential relationship modeling.
 *
 * @since 3.2.0
 */
import { SimpleTabletBuilder } from './SimpleTabletBuilder';
import { IComplexRegimenBuilder, TaperingPhase, ConditionalInstruction, DoseRangeInput, FrequencyRangeInput, MaxDailyDoseConstraint, MultiIngredientDoseInput, ComplexRegimenBuilderState } from './IComplexRegimenBuilder';
import { SignatureInstruction, InstructionRelationship } from '../types/SignatureInstruction';
import { MedicationProfile } from '../types/MedicationProfile';
/**
 * Phase transition types for tapering schedules
 */
export declare enum TaperingTransitionType {
    /** Immediate transition to next phase */
    IMMEDIATE = "IMMEDIATE",
    /** Gradual reduction over time */
    GRADUAL = "GRADUAL",
    /** Conditional transition based on symptoms */
    CONDITIONAL = "CONDITIONAL",
    /** Provider-directed transition */
    PROVIDER_DIRECTED = "PROVIDER_DIRECTED"
}
/**
 * Enhanced tapering phase with transition metadata
 */
export interface TaperingPhaseWithTransition extends TaperingPhase {
    /** Sequence number for ordering */
    sequenceNumber: number;
    /** Transition type to next phase */
    transitionType?: TaperingTransitionType;
    /** Minimum duration before allowing transition */
    minimumDuration?: {
        value: number;
        unit: string;
    };
    /** Conditions that must be met before transition */
    transitionConditions?: string[];
    /** Phase completion criteria */
    completionCriteria?: string;
}
/**
 * Builder for tapering dose schedules and sequential instructions
 */
export declare class TaperingDoseBuilder extends SimpleTabletBuilder implements IComplexRegimenBuilder {
    protected complexState: ComplexRegimenBuilderState;
    private taperingState;
    constructor(medication: MedicationProfile);
    /**
     * Build sequential instructions for tapering schedules
     */
    buildSequentialInstructions(phases: TaperingPhase[]): IComplexRegimenBuilder;
    /**
     * Set current active phase
     */
    setCurrentPhase(phaseNumber: number): TaperingDoseBuilder;
    /**
     * Add monitoring requirements for tapering
     */
    addMonitoringRequirement(requirement: string): TaperingDoseBuilder;
    /**
     * Add discontinuation warning
     */
    addDiscontinuationWarning(warning: string): TaperingDoseBuilder;
    /**
     * Generate complex regimen results with relationships
     */
    getComplexResult(): SignatureInstruction[];
    /**
     * Get current phase instruction only
     */
    getResult(): SignatureInstruction[];
    /**
     * Validate complex regimen constraints
     */
    validateComplexRegimen(): string[];
    /**
     * Get detailed explanation of complex regimen logic
     */
    explainComplexRegimen(): string;
    buildConditionalLogic(conditional: ConditionalInstruction): IComplexRegimenBuilder;
    buildRelationships(relationships: InstructionRelationship[]): IComplexRegimenBuilder;
    buildDoseRange(doseRange: DoseRangeInput): IComplexRegimenBuilder;
    buildFrequencyRange(frequencyRange: FrequencyRangeInput): IComplexRegimenBuilder;
    buildMaxDailyDoseConstraint(constraint: MaxDailyDoseConstraint): IComplexRegimenBuilder;
    buildMultiIngredientDose(multiIngredientDose: MultiIngredientDoseInput): IComplexRegimenBuilder;
    /**
     * Generate instruction for a specific phase
     */
    private generatePhaseInstruction;
    /**
     * Add tapering-specific instructions to instruction set
     */
    private addTaperingInstructions;
    /**
     * Add tapering context to current phase instruction
     */
    private addTaperingContextToInstruction;
    /**
     * Validate tapering medication is appropriate
     */
    private validateTaperingMedication;
    /**
     * Validate tapering sequence logic
     */
    private validateTaperingSequence;
    /**
     * Detect tapering direction (ascending vs descending)
     */
    private detectTaperingDirection;
    /**
     * Calculate total duration of tapering schedule
     */
    private calculateTotalDuration;
    /**
     * Validate dose progression makes sense
     */
    private validateDoseProgression;
    /**
     * Validate timing consistency across phases
     */
    private validateTimingConsistency;
    /**
     * Validate duration logic
     */
    private validateDurationLogic;
    /**
     * Validate medication-specific constraints
     */
    private validateMedicationConstraints;
    /**
     * Check if medication requires slow tapering
     */
    private requiresSlowTapering;
    /**
     * Get total duration as formatted text
     */
    private getTotalDurationText;
    /**
     * Format timing for explanation text
     */
    private formatTimingForExplanation;
    /**
     * Add tapering analysis to audit trail
     */
    private addTaperingAnalysisToAudit;
    /**
     * Add entry to complex audit trail
     */
    private addComplexAuditEntry;
    /**
     * Override builder type in JSON serialization
     */
    toJSON(): object;
    /**
     * Convert duration to milliseconds
     */
    private convertDurationToMs;
    /**
     * Enhanced explanation with tapering capabilities
     */
    explain(): string;
}
//# sourceMappingURL=TaperingDoseBuilder.d.ts.map