/**
 * IComplexRegimenBuilder Interface
 *
 * Extended interface for complex medication regimens including multi-ingredient,
 * PRN with ranges, and tapering schedules. Provides specialized methods for
 * sequential instructions, conditional logic, and complex relationships.
 *
 * @since 3.2.0
 */
/**
 * Validation functions for complex regimen inputs
 */
/**
 * Validates dose range input
 *
 * @param doseRange - Dose range to validate
 * @returns True if valid, false otherwise
 */
export function isValidDoseRangeInput(doseRange) {
    if (!doseRange || typeof doseRange !== 'object') {
        return false;
    }
    const obj = doseRange;
    if (typeof obj.minValue !== 'number' || obj.minValue <= 0) {
        return false;
    }
    if (typeof obj.maxValue !== 'number' || obj.maxValue < obj.minValue) {
        return false;
    }
    if (typeof obj.unit !== 'string' || obj.unit.length === 0) {
        return false;
    }
    return true;
}
/**
 * Validates frequency range input
 *
 * @param frequencyRange - Frequency range to validate
 * @returns True if valid, false otherwise
 */
export function isValidFrequencyRangeInput(frequencyRange) {
    if (!frequencyRange || typeof frequencyRange !== 'object') {
        return false;
    }
    const obj = frequencyRange;
    if (typeof obj.minFrequency !== 'number' || obj.minFrequency <= 0) {
        return false;
    }
    if (typeof obj.maxFrequency !== 'number' || obj.maxFrequency < obj.minFrequency) {
        return false;
    }
    if (typeof obj.period !== 'number' || obj.period <= 0) {
        return false;
    }
    if (typeof obj.periodUnit !== 'string' || obj.periodUnit.length === 0) {
        return false;
    }
    if (obj.minInterval !== undefined &&
        (typeof obj.minInterval !== 'number' || obj.minInterval <= 0)) {
        return false;
    }
    return true;
}
/**
 * Validates tapering phase input
 *
 * @param phase - Tapering phase to validate
 * @returns True if valid, false otherwise
 */
export function isValidTaperingPhase(phase) {
    if (!phase || typeof phase !== 'object') {
        return false;
    }
    const obj = phase;
    if (typeof obj.name !== 'string' || obj.name.length === 0) {
        return false;
    }
    if (!obj.dose || typeof obj.dose !== 'object') {
        return false;
    }
    if (!obj.timing || typeof obj.timing !== 'object') {
        return false;
    }
    if (!obj.duration || typeof obj.duration !== 'object') {
        return false;
    }
    const duration = obj.duration;
    if (typeof duration.value !== 'number' ||
        duration.value <= 0 ||
        typeof duration.unit !== 'string' ||
        duration.unit.length === 0) {
        return false;
    }
    if (obj.specialInstructions !== undefined &&
        (!Array.isArray(obj.specialInstructions) ||
            !obj.specialInstructions.every((inst) => typeof inst === 'string'))) {
        return false;
    }
    return true;
}
//# sourceMappingURL=IComplexRegimenBuilder.js.map