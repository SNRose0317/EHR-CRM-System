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
import { isValidDoseInput } from './ISignatureBuilder';
/**
 * Builder for tablet medications requiring fractional dosing with
 * enhanced formatting and patient guidance
 */
export class FractionalTabletBuilder extends SimpleTabletBuilder {
    constructor(medication) {
        super(medication);
        // Override audit trail to indicate fractional builder
        this.addAuditEntry('FractionalTabletBuilder initialized for enhanced fraction support');
    }
    /**
     * Configure dose with enhanced fractional formatting
     *
     * @param dose - Dose configuration
     * @returns Builder instance for chaining
     * @throws Error if dose is invalid
     */
    buildDose(dose) {
        // Validate input
        if (!isValidDoseInput(dose)) {
            throw new Error('Invalid dose input');
        }
        // Round fractional values to nearest quarter for tablet units to handle floating point precision
        let adjustedDose = dose;
        if (this.isFractionalTabletDose(dose)) {
            const roundedValue = Math.round(dose.value * 4) / 4;
            // Only apply rounding if it results in a valid dose (>= 0.25 for tablets)
            if (roundedValue >= 0.25) {
                adjustedDose = { ...dose, value: roundedValue };
            }
        }
        // Call parent for all validation logic
        super.buildDose(adjustedDose);
        // Add fraction-specific audit and formatting
        if (this.isFractionalTabletDose(adjustedDose)) {
            const fractionDisplay = this.formatFraction(adjustedDose.value);
            this.addAuditEntry(`Formatted fractional dose: ${fractionDisplay} ${adjustedDose.unit}`);
            // Add splitting instruction preview to audit
            const splittingInstruction = this.getSplittingInstructionForDose(adjustedDose.value);
            if (splittingInstruction) {
                this.addAuditEntry(`Splitting instruction: ${splittingInstruction}`);
            }
        }
        return this;
    }
    /**
     * Generate final FHIR-compliant instruction with splitting guidance
     *
     * @returns Array of SignatureInstruction with enhanced fractional formatting
     */
    getResult() {
        // Get base instruction from parent
        const instructions = super.getResult();
        // Add splitting instructions for fractional doses
        const splittingInstructions = this.getSplittingInstructions();
        if (splittingInstructions.length > 0) {
            instructions[0].additionalInstructions = [
                ...(instructions[0].additionalInstructions || []),
                ...splittingInstructions
            ];
            this.addAuditEntry(`Added ${splittingInstructions.length} splitting instructions`);
        }
        return instructions;
    }
    /**
     * Override to provide fractional context formatting
     */
    createMedicationRequestContext() {
        const context = super.createMedicationRequestContext();
        // Apply fraction formatting to dose display
        if (this.isFractionalTabletDose(this.state.doses[0])) {
            const formattedValue = this.formatFraction(context.dose.value);
            context.dose = {
                ...context.dose,
                value: formattedValue // Template expects string for fractional display
            };
        }
        return context;
    }
    /**
     * Format numeric fraction as Unicode symbol
     *
     * @param value - Numeric dose value
     * @returns Formatted string with Unicode fractions
     */
    formatFraction(value) {
        const wholePart = Math.floor(value);
        const fractionalPart = Math.round((value - wholePart) * 4) / 4; // Round to nearest quarter
        const fractionMap = {
            0.25: '¼',
            0.5: '½',
            0.75: '¾'
        };
        if (wholePart === 0) {
            return fractionMap[fractionalPart] || value.toString();
        }
        else if (fractionalPart === 0) {
            return wholePart.toString();
        }
        else {
            return `${wholePart}${fractionMap[fractionalPart] || fractionalPart}`;
        }
    }
    /**
     * Generate splitting instructions for all fractional doses
     *
     * @returns Array of instruction objects
     */
    getSplittingInstructions() {
        const instructions = [];
        const addedInstructions = new Set(); // Prevent duplicates
        for (const dose of this.state.doses) {
            if (this.isFractionalTabletDose(dose)) {
                const instruction = this.getSplittingInstructionForDose(dose.value);
                if (instruction && !addedInstructions.has(instruction)) {
                    instructions.push({ text: instruction });
                    addedInstructions.add(instruction);
                }
            }
        }
        return instructions;
    }
    /**
     * Get splitting instruction for specific dose value
     *
     * @param doseValue - Numeric dose value
     * @returns Splitting instruction or undefined
     */
    getSplittingInstructionForDose(doseValue) {
        const fractionalPart = Math.round((doseValue % 1) * 4) / 4; // Round to nearest quarter
        switch (fractionalPart) {
            case 0.25:
                return 'Split tablet into quarters, take one piece';
            case 0.5:
                return 'Split tablet in half';
            case 0.75:
                return 'Split tablet into quarters, take three pieces';
            default:
                return undefined;
        }
    }
    /**
     * Check if dose is fractional tablet dosing
     *
     * @param dose - Dose to check
     * @returns True if fractional tablet dose
     */
    isFractionalTabletDose(dose) {
        const unit = dose.unit.toLowerCase();
        const isTabletUnit = ['tablet', 'tablets', 'capsule', 'capsules'].includes(unit);
        const isFractional = (dose.value % 1) !== 0;
        return isTabletUnit && isFractional;
    }
    /**
     * Override format dose for audit to show fractions nicely
     */
    formatDoseForAudit(dose) {
        if (this.isFractionalTabletDose(dose)) {
            const fractionDisplay = this.formatFraction(dose.value);
            if (dose.maxValue) {
                const maxFractionDisplay = this.formatFraction(dose.maxValue);
                return `${fractionDisplay}-${maxFractionDisplay} ${dose.unit}`;
            }
            return `${fractionDisplay} ${dose.unit}`;
        }
        // Fall back to parent implementation
        return super.formatDoseForAudit(dose);
    }
    /**
     * Override audit entry to access protected method
     */
    addAuditEntry(entry) {
        super.addAuditEntry(entry);
    }
    /**
     * Override builder type in JSON serialization
     */
    toJSON() {
        const baseJson = super.toJSON();
        return {
            ...baseJson,
            builderType: 'FractionalTabletBuilder',
            features: {
                unicodeFractions: true,
                splittingInstructions: true,
                inheritedValidation: true
            }
        };
    }
    /**
     * Enhanced explanation with fractional capabilities
     */
    explain() {
        const baseExplanation = super.explain();
        const fractionalDoses = this.state.doses.filter(dose => this.isFractionalTabletDose(dose));
        if (fractionalDoses.length > 0) {
            const fractionalSummary = fractionalDoses.map(dose => `${this.formatFraction(dose.value)} ${dose.unit}`).join(', ');
            return `${baseExplanation}\n\n--- Fractional Tablet Features ---\n` +
                `Fractional doses: ${fractionalSummary}\n` +
                `Unicode formatting: Enabled\n` +
                `Splitting instructions: ${this.getSplittingInstructions().length} added`;
        }
        return baseExplanation;
    }
}
//# sourceMappingURL=FractionalTabletBuilder.js.map