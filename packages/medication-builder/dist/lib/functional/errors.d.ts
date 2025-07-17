/**
 * Error Types and Utilities
 *
 * Provides structured error types for the medication signature builder
 * with consistent format for API responses and detailed error context.
 *
 * @since 2.0.0
 */
import { DoseInput } from '../builders/ISignatureBuilder';
import { DoseConstraints } from '../builders/ISignatureBuilder';
/**
 * Error categories for classification
 */
export declare enum ErrorCategory {
    /** Input validation errors */
    VALIDATION = "VALIDATION",
    /** Business rule violations */
    BUSINESS_LOGIC = "BUSINESS_LOGIC",
    /** Configuration or setup errors */
    CONFIGURATION = "CONFIGURATION",
    /** External service failures */
    EXTERNAL_SERVICE = "EXTERNAL_SERVICE",
    /** Internal system errors */
    INTERNAL = "INTERNAL"
}
/**
 * Structured error response for API consistency
 */
export interface ErrorResponse {
    /** Unique error code for client handling */
    code: string;
    /** Human-readable error message */
    message: string;
    /** Additional error context */
    details?: Record<string, unknown>;
    /** ISO timestamp of error occurrence */
    timestamp: string;
    /** Request ID for tracing */
    requestId?: string;
    /** Suggested actions for recovery */
    suggestions?: string[];
}
/**
 * Creates a standard error response
 */
export declare function createError(code: string, message: string, details?: Record<string, unknown>, suggestions?: string[]): ErrorResponse;
/**
 * Dose validation error
 */
export interface DoseError {
    category: ErrorCategory.VALIDATION;
    field: 'dose';
    reason: 'negative_value' | 'exceeds_maximum' | 'invalid_unit' | 'zero_value';
    attempted: DoseInput;
    constraints?: DoseConstraints;
}
/**
 * Creates a dose error
 */
export declare function createDoseError(reason: DoseError['reason'], attempted: DoseInput, constraints?: DoseConstraints): DoseError;
/**
 * Frequency validation error
 */
export interface FrequencyError {
    category: ErrorCategory.VALIDATION;
    field: 'frequency';
    reason: 'unrecognized_pattern' | 'ambiguous' | 'invalid_interval';
    input: string;
    suggestions?: string[];
}
/**
 * Creates a frequency error
 */
export declare function createFrequencyError(reason: FrequencyError['reason'], input: string, suggestions?: string[]): FrequencyError;
/**
 * Route validation error
 */
export interface RouteError {
    category: ErrorCategory.BUSINESS_LOGIC;
    field: 'route';
    reason: 'incompatible_dose_form' | 'not_allowed' | 'requires_device';
    route: string;
    doseForm: string;
    allowedRoutes?: string[];
}
/**
 * Creates a route error
 */
export declare function createRouteError(reason: RouteError['reason'], route: string, doseForm: string, allowedRoutes?: string[]): RouteError;
/**
 * Type guard for ErrorResponse
 */
export declare function isErrorResponse(value: unknown): value is ErrorResponse;
/**
 * Converts domain errors to ErrorResponse
 */
export declare function errorToResponse(error: DoseError | FrequencyError | RouteError): ErrorResponse;
//# sourceMappingURL=errors.d.ts.map