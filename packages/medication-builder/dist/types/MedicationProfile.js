/**
 * MedicationProfile Interface
 *
 * Extended medication interface with advanced features for complex dosing scenarios.
 * Immutable input data structure that captures all medication information
 * needed for signature generation. This is the primary input to the
 * refactored medication signature builder system.
 *
 * @see {@link ./README.md} Complete schema documentation with FHIR packaging examples
 * @see {@link ./index.ts} Primary Medication interface for basic use cases
 *
 * @since 2.0.0
 */
/**
 * Enum for tablet scoring capabilities
 */
export var ScoringType;
(function (ScoringType) {
    /** Tablet cannot be split */
    ScoringType["NONE"] = "NONE";
    /** Tablet can be split in half */
    ScoringType["HALF"] = "HALF";
    /** Tablet can be split into quarters */
    ScoringType["QUARTER"] = "QUARTER";
})(ScoringType || (ScoringType = {}));
/**
 * Type guard to check if an object is a valid MedicationProfile
 *
 * @param obj - Object to check
 * @returns True if the object is a valid MedicationProfile
 */
export function isMedicationProfile(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    // Check required fields
    if (typeof obj.id !== 'string' ||
        typeof obj.name !== 'string' ||
        !['medication', 'supplement', 'compound'].includes(obj.type) ||
        typeof obj.isActive !== 'boolean' ||
        typeof obj.doseForm !== 'string') {
        return false;
    }
    // Check code field
    if (!obj.code ||
        !Array.isArray(obj.code.coding) ||
        obj.code.coding.length === 0 ||
        !obj.code.coding.every((c) => c && typeof c.display === 'string')) {
        return false;
    }
    // Check ingredient field
    if (!Array.isArray(obj.ingredient) ||
        obj.ingredient.length === 0 ||
        !obj.ingredient.every((ing) => ing &&
            typeof ing.name === 'string' &&
            ing.strengthRatio &&
            typeof ing.strengthRatio.numerator?.value === 'number' &&
            typeof ing.strengthRatio.numerator?.unit === 'string' &&
            typeof ing.strengthRatio.denominator?.value === 'number' &&
            typeof ing.strengthRatio.denominator?.unit === 'string')) {
        return false;
    }
    // Optional field type checks
    if (obj.isScored !== undefined &&
        !Object.values(ScoringType).includes(obj.isScored)) {
        return false;
    }
    if (obj.eligibleGenders !== undefined &&
        (!Array.isArray(obj.eligibleGenders) ||
            !obj.eligibleGenders.every((g) => ['MALE', 'FEMALE', 'OTHER'].includes(g)))) {
        return false;
    }
    return true;
}
//# sourceMappingURL=MedicationProfile.js.map