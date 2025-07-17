/**
 * Conversion Error Classes for Unit Converter
 *
 * This module defines explicit error types for unit conversion failures.
 * Following the principle of "fail fast and fail loud" - no silent failures.
 */
/**
 * Base error class for all conversion-related errors
 */
export class ConversionError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
        this.name = this.constructor.name;
        // Ensure proper prototype chain for instanceof checks
        Object.setPrototypeOf(this, new.target.prototype);
    }
    /**
     * Serialize error for logging/debugging
     */
    toJSON() {
        return {
            errorType: this.errorType,
            message: this.message,
            details: this.details,
            stack: this.stack
        };
    }
}
/**
 * Thrown when a conversion is mathematically or logically impossible
 *
 * Examples:
 * - Converting mass to volume without density
 * - Converting temperature to length
 * - Converting incompatible unit dimensions
 */
export class ImpossibleConversionError extends ConversionError {
    constructor(from, to, reason) {
        super(`Cannot convert from ${from} to ${to}: ${reason}`, { from, to, reason });
        this.from = from;
        this.to = to;
        this.reason = reason;
        this.errorType = 'IMPOSSIBLE_CONVERSION';
    }
}
/**
 * Thrown when required context is missing for a conversion
 *
 * Examples:
 * - mg → mL without concentration/strength ratio
 * - tablets → mg without tablet strength
 * - {click} → mg without device information
 */
export class MissingContextError extends ConversionError {
    constructor(requiredContext, conversion, availableContext) {
        super(`Missing required context for ${conversion}: ${requiredContext.join(', ')}`, { requiredContext, conversion, availableContext });
        this.requiredContext = requiredContext;
        this.conversion = conversion;
        this.availableContext = availableContext;
        this.errorType = 'MISSING_CONTEXT';
    }
}
/**
 * Thrown when a unit string is malformed or unrecognized
 *
 * Examples:
 * - "mgg" (typo)
 * - "{clicks" (missing closing brace)
 * - "mg/mL/L" (invalid structure)
 */
export class InvalidUnitError extends ConversionError {
    constructor(unit, validationError, suggestions) {
        super(`Invalid unit: ${unit}${validationError ? ` - ${validationError}` : ''}`, { unit, validationError, suggestions });
        this.unit = unit;
        this.validationError = validationError;
        this.suggestions = suggestions;
        this.errorType = 'INVALID_UNIT';
    }
}
/**
 * Thrown when conversion would result in unacceptable precision loss
 *
 * Examples:
 * - Converting very small doses where rounding would be significant
 * - Conversions that exceed the tolerance threshold
 */
export class PrecisionError extends ConversionError {
    constructor(value, from, to, expectedPrecision, actualPrecision) {
        super(`Conversion of ${value} ${from} to ${to} would lose precision: ` +
            `expected ${expectedPrecision}, got ${actualPrecision}`, { value, from, to, expectedPrecision, actualPrecision });
        this.value = value;
        this.from = from;
        this.to = to;
        this.expectedPrecision = expectedPrecision;
        this.actualPrecision = actualPrecision;
        this.errorType = 'PRECISION_LOSS';
    }
}
/**
 * Type guard for error results
 */
export function isError(result) {
    return !result.ok;
}
/**
 * Type guard for success results
 */
export function isSuccess(result) {
    return result.ok;
}
/**
 * Helper to create success results
 */
export function success(value) {
    return { ok: true, value };
}
/**
 * Helper to create error results
 */
export function error(err) {
    return { ok: false, error: err };
}
/**
 * Factory functions for creating specific errors with context
 */
export const ConversionErrors = {
    impossibleConversion(from, to, reason) {
        return new ImpossibleConversionError(from, to, reason);
    },
    missingContext(requiredContext, conversion, availableContext) {
        return new MissingContextError(requiredContext, conversion, availableContext);
    },
    invalidUnit(unit, validationError, suggestions) {
        return new InvalidUnitError(unit, validationError, suggestions);
    },
    precisionLoss(value, from, to, expectedPrecision, actualPrecision) {
        return new PrecisionError(value, from, to, expectedPrecision, actualPrecision);
    }
};
//# sourceMappingURL=ConversionErrors.js.map