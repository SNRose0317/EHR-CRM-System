/**
 * SimpleTabletBuilder
 *
 * Proof-of-concept builder for oral solid medications (tablets, capsules)
 * with support for fractional dosing and scored tablet validation.
 *
 * @since 3.0.0
 */
import { ISignatureBuilder, DoseInput, TimingInput, RouteInput, DoseConstraints, AsNeededInput, BuilderState } from './ISignatureBuilder';
import { SignatureInstruction } from '../types/SignatureInstruction';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
import { MedicationProfile } from '../types/MedicationProfile';
/**
 * Builder for tablet and similar solid oral medications
 */
export declare class SimpleTabletBuilder implements ISignatureBuilder {
    protected medication: MedicationProfile;
    private templateEngine;
    protected state: BuilderState;
    constructor(medication: MedicationProfile);
    /**
     * Configure dose with tablet-specific fractional validation
     */
    buildDose(dose: DoseInput): ISignatureBuilder;
    /**
     * Set timing patterns
     */
    buildTiming(timing: TimingInput): ISignatureBuilder;
    /**
     * Set administration route
     */
    buildRoute(route: RouteInput): ISignatureBuilder;
    /**
     * Add dose constraints
     */
    buildConstraints(constraints: DoseConstraints): ISignatureBuilder;
    /**
     * Configure PRN instructions
     */
    buildAsNeeded(asNeeded: AsNeededInput): ISignatureBuilder;
    /**
     * Add special instructions
     */
    buildSpecialInstructions(instructions: string[]): ISignatureBuilder;
    /**
     * Generate final FHIR-compliant instruction
     */
    getResult(): SignatureInstruction[];
    /**
     * Return audit trail
     */
    explain(): string;
    /**
     * Serialize builder state
     */
    toJSON(): object;
    /**
     * Validate medication is appropriate for tablet builder
     */
    private validateMedication;
    /**
     * Validate fractional doses against tablet scoring
     */
    private validateFractionalDose;
    /**
     * Validate route is appropriate for tablets using centralized validation
     */
    private validateRoute;
    /**
     * Validate builder has required state
     */
    private validateBuilderState;
    /**
     * Create MedicationRequestContext for template rendering
     */
    protected createMedicationRequestContext(): MedicationRequestContext;
    /**
     * Build FHIR dose and rate structure
     */
    private buildDoseAndRate;
    /**
     * Build FHIR timing structure
     */
    private buildTimingStructure;
    /**
     * Build FHIR route structure
     */
    private buildRouteStructure;
    /**
     * Build additional instructions array
     */
    private buildAdditionalInstructions;
    /**
     * Format frequency for MedicationRequestContext
     */
    private formatFrequencyForContext;
    /**
     * Format dose for audit trail
     */
    protected formatDoseForAudit(dose: DoseInput): string;
    /**
     * Add entry to audit trail
     */
    protected addAuditEntry(entry: string): void;
}
//# sourceMappingURL=SimpleTabletBuilder.d.ts.map