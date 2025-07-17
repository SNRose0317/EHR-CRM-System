/**
 * SignatureInstruction Interface
 *
 * FHIR R4 compliant output structure for medication instructions.
 * This represents the standardized output of the medication signature
 * builder system that can be integrated with electronic health records.
 *
 * Based on FHIR R4 Dosage datatype:
 * https://www.hl7.org/fhir/dosage.html
 *
 * @since 2.0.0
 */
/**
 * Relationship types for complex regimens
 */
export var RelationshipType;
(function (RelationshipType) {
    /** Instructions should be followed in sequence */
    RelationshipType["SEQUENTIAL"] = "SEQUENTIAL";
    /** Instructions can be followed concurrently */
    RelationshipType["CONCURRENT"] = "CONCURRENT";
    /** Instruction is conditional on another */
    RelationshipType["CONDITIONAL"] = "CONDITIONAL";
})(RelationshipType || (RelationshipType = {}));
/**
 * Type guard to check if an object is a valid SignatureInstruction
 *
 * @param obj - Object to check
 * @returns True if the object is a valid SignatureInstruction
 */
export function isSignatureInstruction(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    // Text is required
    if (typeof obj.text !== 'string') {
        return false;
    }
    // doseAndRate is required and must be a non-empty array
    if (!Array.isArray(obj.doseAndRate) || obj.doseAndRate.length === 0) {
        return false;
    }
    // Validate each doseAndRate entry
    for (const dar of obj.doseAndRate) {
        // Check if at least one dose type is present
        const hasDose = dar.doseQuantity || dar.doseRange;
        if (!hasDose) {
            return false;
        }
        if (dar.doseQuantity &&
            (typeof dar.doseQuantity.value !== 'number' ||
                typeof dar.doseQuantity.unit !== 'string')) {
            return false;
        }
        if (dar.doseRange &&
            (!dar.doseRange.low && !dar.doseRange.high)) {
            return false;
        }
    }
    // If timing exists, validate basic structure
    if (obj.timing !== undefined && typeof obj.timing !== 'object') {
        return false;
    }
    // If sequence exists, must be number
    if (obj.sequence !== undefined && typeof obj.sequence !== 'number') {
        return false;
    }
    return true;
}
/**
 * Factory function to create a SignatureInstruction
 *
 * @param params - Parameters for creating the instruction
 * @returns A new SignatureInstruction
 */
export function createSignatureInstruction(params) {
    const instruction = {
        text: params.text
    };
    // Add dose information
    if (params.doseValue !== undefined && params.doseUnit) {
        instruction.doseAndRate = [{
                doseQuantity: {
                    value: params.doseValue,
                    unit: params.doseUnit
                }
            }];
    }
    // Add timing information
    if (params.frequency !== undefined && params.period !== undefined && params.periodUnit) {
        instruction.timing = {
            repeat: {
                frequency: params.frequency,
                period: params.period,
                periodUnit: params.periodUnit
            }
        };
    }
    // Add route
    if (params.route) {
        instruction.route = {
            coding: [{
                    display: params.route
                }]
        };
    }
    // Add additional instructions
    if (params.additionalInstructions) {
        instruction.additionalInstructions = [{
                text: params.additionalInstructions
            }];
    }
    // Add site
    if (params.site) {
        instruction.site = params.site;
    }
    // Add as needed
    if (params.asNeeded) {
        instruction.asNeeded = {
            coding: [{
                    system: 'http://terminology.hl7.org/CodeSystem/v3-NullFlavor',
                    code: 'NI',
                    display: 'NoInformation'
                }]
        };
    }
    // Add max dose
    if (params.maxDoseValue && params.maxDoseUnit && params.maxDosePeriod && params.maxDosePeriodUnit) {
        instruction.maxDosePerPeriod = {
            numerator: {
                value: params.maxDoseValue,
                unit: params.maxDoseUnit
            },
            denominator: {
                value: params.maxDosePeriod,
                unit: params.maxDosePeriodUnit
            }
        };
    }
    return instruction;
}
//# sourceMappingURL=SignatureInstruction.js.map