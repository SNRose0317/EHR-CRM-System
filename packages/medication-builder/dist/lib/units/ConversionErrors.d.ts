/**
 * Conversion Error Classes for Unit Converter
 *
 * This module defines explicit error types for unit conversion failures.
 * Following the principle of "fail fast and fail loud" - no silent failures.
 */
/**
 * Base error class for all conversion-related errors
 */
export declare abstract class ConversionError extends Error {
    readonly details: Record<string, unknown>;
    abstract readonly errorType: string;
    constructor(message: string, details: Record<string, unknown>);
    /**
     * Serialize error for logging/debugging
     */
    toJSON(): Record<string, unknown>;
}
/**
 * Thrown when a conversion is mathematically or logically impossible
 *
 * Examples:
 * - Converting mass to volume without density
 * - Converting temperature to length
 * - Converting incompatible unit dimensions
 */
export declare class ImpossibleConversionError extends ConversionError {
    readonly from: string;
    readonly to: string;
    readonly reason: string;
    readonly errorType = "IMPOSSIBLE_CONVERSION";
    constructor(from: string, to: string, reason: string);
}
/**
 * Thrown when required context is missing for a conversion
 *
 * Examples:
 * - mg → mL without concentration/strength ratio
 * - tablets → mg without tablet strength
 * - {click} → mg without device information
 */
export declare class MissingContextError extends ConversionError {
    readonly requiredContext: string[];
    readonly conversion: string;
    readonly availableContext?: Record<string, unknown> | undefined;
    readonly errorType = "MISSING_CONTEXT";
    constructor(requiredContext: string[], conversion: string, availableContext?: Record<string, unknown> | undefined);
}
/**
 * Thrown when a unit string is malformed or unrecognized
 *
 * Examples:
 * - "mgg" (typo)
 * - "{clicks" (missing closing brace)
 * - "mg/mL/L" (invalid structure)
 */
export declare class InvalidUnitError extends ConversionError {
    readonly unit: string;
    readonly validationError?: string | undefined;
    readonly suggestions?: string[] | undefined;
    readonly errorType = "INVALID_UNIT";
    constructor(unit: string, validationError?: string | undefined, suggestions?: string[] | undefined);
}
/**
 * Thrown when conversion would result in unacceptable precision loss
 *
 * Examples:
 * - Converting very small doses where rounding would be significant
 * - Conversions that exceed the tolerance threshold
 */
export declare class PrecisionError extends ConversionError {
    readonly value: number;
    readonly from: string;
    readonly to: string;
    readonly expectedPrecision: number;
    readonly actualPrecision: number;
    readonly errorType = "PRECISION_LOSS";
    constructor(value: number, from: string, to: string, expectedPrecision: number, actualPrecision: number);
}
/**
 * Error result type for functional error handling
 */
export interface ErrorResult<E extends ConversionError = ConversionError> {
    ok: false;
    error: E;
}
/**
 * Success result type for functional error handling
 */
export interface SuccessResult<T> {
    ok: true;
    value: T;
}
/**
 * Union type for conversion results
 */
export type ConversionResult<T, E extends ConversionError = ConversionError> = SuccessResult<T> | ErrorResult<E>;
/**
 * Type guard for error results
 */
export declare function isError<T, E extends ConversionError>(result: ConversionResult<T, E>): result is ErrorResult<E>;
/**
 * Type guard for success results
 */
export declare function isSuccess<T, E extends ConversionError>(result: ConversionResult<T, E>): result is SuccessResult<T>;
/**
 * Helper to create success results
 */
export declare function success<T>(value: T): SuccessResult<T>;
/**
 * Helper to create error results
 */
export declare function error<E extends ConversionError>(err: E): ErrorResult<E>;
/**
 * Factory functions for creating specific errors with context
 */
export declare const ConversionErrors: {
    readonly impossibleConversion: (from: string, to: string, reason: string) => ImpossibleConversionError;
    readonly missingContext: (requiredContext: string[], conversion: string, availableContext?: Record<string, unknown>) => MissingContextError;
    readonly invalidUnit: (unit: string, validationError?: string, suggestions?: string[]) => InvalidUnitError;
    readonly precisionLoss: (value: number, from: string, to: string, expectedPrecision: number, actualPrecision: number) => PrecisionError;
};
//# sourceMappingURL=ConversionErrors.d.ts.map