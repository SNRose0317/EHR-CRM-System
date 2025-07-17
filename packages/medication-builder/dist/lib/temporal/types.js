/**
 * FHIR Temporal Types for Days Supply Calculation
 *
 * Defines FHIR R4 compliant timing structures for accurate
 * temporal parsing and titration schedule support.
 *
 * @since 3.1.0
 */
/**
 * Common timing patterns for validation
 */
export const COMMON_TIMING_PATTERNS = {
    DAILY: {
        frequency: 1,
        period: 1,
        periodUnit: 'd'
    },
    TWICE_DAILY: {
        frequency: 2,
        period: 1,
        periodUnit: 'd'
    },
    THREE_TIMES_DAILY: {
        frequency: 3,
        period: 1,
        periodUnit: 'd'
    },
    WEEKLY: {
        frequency: 1,
        period: 1,
        periodUnit: 'wk'
    },
    MONTHLY: {
        frequency: 1,
        period: 1,
        periodUnit: 'mo'
    }
};
/**
 * Titration pattern identifiers
 */
export const TITRATION_PATTERNS = {
    WEEK_RANGE: /week\s+(\d+)-(\d+)/i,
    WEEK_PLUS: /week\s+(\d+)\+/i,
    DAY_RANGE: /day\s+(\d+)-(\d+)/i,
    DAY_PLUS: /day\s+(\d+)\+/i,
    PHASE_SEPARATOR: /then|,\s*then|week\s+\d+/i
};
/**
 * Helper function to create Duration objects
 */
export function createDuration(value, unit) {
    return { value, unit };
}
/**
 * Helper function to create basic FHIRTiming
 */
export function createFHIRTiming(frequency, period, periodUnit, options) {
    return {
        repeat: {
            frequency,
            period,
            periodUnit,
            ...options
        }
    };
}
/**
 * Type guards
 */
export function isFHIRTiming(obj) {
    return obj && typeof obj === 'object' &&
        (obj.repeat || obj.event || obj.code);
}
export function isTitrationPhase(obj) {
    return obj && typeof obj === 'object' &&
        isFHIRTiming(obj.timing) &&
        typeof obj.doseAmount === 'number' &&
        typeof obj.doseUnit === 'string' &&
        obj.duration && typeof obj.duration.value === 'number';
}
export function isDuration(obj) {
    return obj && typeof obj === 'object' &&
        typeof obj.value === 'number' &&
        typeof obj.unit === 'string' &&
        ['s', 'min', 'h', 'd', 'wk', 'mo', 'a'].includes(obj.unit);
}
//# sourceMappingURL=types.js.map