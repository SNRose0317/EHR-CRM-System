/**
 * ISignatureBuilder Interface
 *
 * Core contract that all medication signature builders must implement.
 * Provides a fluent API for constructing FHIR-compliant medication
 * instructions with full validation and audit trail support.
 *
 * @since 2.0.0
 */
/**
 * Validates dose input
 *
 * @param dose - Dose to validate
 * @returns True if valid, false otherwise
 */
export function isValidDoseInput(dose) {
    if (!dose || typeof dose !== 'object') {
        return false;
    }
    if (typeof dose.value !== 'number' || dose.value <= 0) {
        return false;
    }
    if (typeof dose.unit !== 'string' || dose.unit.length === 0) {
        return false;
    }
    if (dose.maxValue !== undefined &&
        (typeof dose.maxValue !== 'number' || dose.maxValue < dose.value)) {
        return false;
    }
    return true;
}
/**
 * Validates timing input
 *
 * @param timing - Timing to validate
 * @returns True if valid, false otherwise
 */
export function isValidTimingInput(timing) {
    if (!timing || typeof timing !== 'object') {
        return false;
    }
    if (typeof timing.frequency !== 'number' || timing.frequency <= 0) {
        return false;
    }
    if (typeof timing.period !== 'number' || timing.period <= 0) {
        return false;
    }
    if (typeof timing.periodUnit !== 'string' || timing.periodUnit.length === 0) {
        return false;
    }
    if (timing.when !== undefined &&
        (!Array.isArray(timing.when) || !timing.when.every((w) => typeof w === 'string'))) {
        return false;
    }
    if (timing.duration !== undefined) {
        if (typeof timing.duration.value !== 'number' || timing.duration.value <= 0 ||
            typeof timing.duration.unit !== 'string' || timing.duration.unit.length === 0) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=ISignatureBuilder.js.map