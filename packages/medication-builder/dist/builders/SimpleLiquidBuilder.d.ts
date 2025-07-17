/**
 * SimpleLiquidBuilder
 *
 * Proof-of-concept builder for liquid medications with support for
 * volume/weight conversions and concentration handling.
 *
 * @since 3.0.0
 */
import { ISignatureBuilder, DoseInput, TimingInput, RouteInput, DoseConstraints, AsNeededInput, BuilderState } from './ISignatureBuilder';
import { SignatureInstruction } from '../types/SignatureInstruction';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
import { MedicationProfile } from '../types/MedicationProfile';
/**
 * Builder for liquid medications with concentration handling
 */
export declare class SimpleLiquidBuilder implements ISignatureBuilder {
    protected medication: MedicationProfile;
    private templateEngine;
    private unitConverter;
    protected state: BuilderState;
    constructor(medication: MedicationProfile);
    /**
     * Configure dose with optional unit conversion
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
     * Validate medication is appropriate for liquid builder
     */
    private validateMedication;
    /**
     * Validate and process dose, handling conversions if needed
     */
    private validateAndProcessDose;
    /**
     * Validate route is appropriate for liquids using centralized validation
     */
    private validateRoute;
    /**
     * Validate builder has required state
     */
    private validateBuilderState;
    /**
     * Build template data with dual dosing calculation
     */
    private buildLiquidTemplateData;
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
//# sourceMappingURL=SimpleLiquidBuilder.d.ts.map