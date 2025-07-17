/**
 * Strategy Pattern Type Definitions
 *
 * Defines the contracts for the Specificity-Based Dispatcher system
 * that replaces cascading if/else logic with composable strategies.
 * This enables clean separation of concerns and eliminates complex
 * conditional chains in medication signature generation.
 *
 * @since 2.0.0
 */
/**
 * Specificity levels for strategy matching
 *
 * Higher values indicate more specific matching criteria.
 * The dispatcher will select the highest specificity match.
 */
export var SpecificityLevel;
(function (SpecificityLevel) {
    /** Matches specific SKU (most specific) */
    SpecificityLevel[SpecificityLevel["MEDICATION_SKU"] = 4] = "MEDICATION_SKU";
    /** Matches specific medication ID */
    SpecificityLevel[SpecificityLevel["MEDICATION_ID"] = 3] = "MEDICATION_ID";
    /** Matches dose form + ingredient combination */
    SpecificityLevel[SpecificityLevel["DOSE_FORM_AND_INGREDIENT"] = 2] = "DOSE_FORM_AND_INGREDIENT";
    /** Matches dose form only */
    SpecificityLevel[SpecificityLevel["DOSE_FORM"] = 1] = "DOSE_FORM";
    /** Default fallback (least specific) */
    SpecificityLevel[SpecificityLevel["DEFAULT"] = 0] = "DEFAULT";
})(SpecificityLevel || (SpecificityLevel = {}));
/**
 * Comparator function for sorting strategies by specificity
 *
 * @param a - First strategy
 * @param b - Second strategy
 * @returns Negative if a is more specific, positive if b is more specific
 */
export function compareSpecificity(a, b) {
    return b.specificity - a.specificity;
}
/**
 * Sorts modifiers by priority (ascending)
 *
 * @param modifiers - Array of modifiers to sort
 * @returns New array sorted by priority
 */
export function sortModifiersByPriority(modifiers) {
    return [...modifiers].sort((a, b) => a.priority - b.priority);
}
/**
 * Type guard for StrategyComposition
 *
 * @param obj - Object to validate
 * @returns True if valid composition
 */
export function isValidStrategyComposition(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    if (!obj.base || typeof obj.base.matches !== 'function' ||
        typeof obj.base.buildInstruction !== 'function') {
        return false;
    }
    if (!Array.isArray(obj.modifiers)) {
        return false;
    }
    return obj.modifiers.every((mod) => mod &&
        typeof mod.appliesTo === 'function' &&
        typeof mod.modify === 'function' &&
        typeof mod.priority === 'number');
}
//# sourceMappingURL=types.js.map