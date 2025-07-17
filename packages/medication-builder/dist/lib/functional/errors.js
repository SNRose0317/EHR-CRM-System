/**
 * Error Types and Utilities
 *
 * Provides structured error types for the medication signature builder
 * with consistent format for API responses and detailed error context.
 *
 * @since 2.0.0
 */
/**
 * Error categories for classification
 */
export var ErrorCategory;
(function (ErrorCategory) {
    /** Input validation errors */
    ErrorCategory["VALIDATION"] = "VALIDATION";
    /** Business rule violations */
    ErrorCategory["BUSINESS_LOGIC"] = "BUSINESS_LOGIC";
    /** Configuration or setup errors */
    ErrorCategory["CONFIGURATION"] = "CONFIGURATION";
    /** External service failures */
    ErrorCategory["EXTERNAL_SERVICE"] = "EXTERNAL_SERVICE";
    /** Internal system errors */
    ErrorCategory["INTERNAL"] = "INTERNAL";
})(ErrorCategory || (ErrorCategory = {}));
/**
 * Creates a standard error response
 */
export function createError(code, message, details, suggestions) {
    return {
        code,
        message,
        details,
        timestamp: new Date().toISOString(),
        ...(suggestions && { suggestions })
    };
}
/**
 * Creates a dose error
 */
export function createDoseError(reason, attempted, constraints) {
    return {
        category: ErrorCategory.VALIDATION,
        field: 'dose',
        reason,
        attempted,
        ...(constraints && { constraints })
    };
}
/**
 * Creates a frequency error
 */
export function createFrequencyError(reason, input, suggestions) {
    return {
        category: ErrorCategory.VALIDATION,
        field: 'frequency',
        reason,
        input,
        ...(suggestions && { suggestions })
    };
}
/**
 * Creates a route error
 */
export function createRouteError(reason, route, doseForm, allowedRoutes) {
    return {
        category: ErrorCategory.BUSINESS_LOGIC,
        field: 'route',
        reason,
        route,
        doseForm,
        ...(allowedRoutes && { allowedRoutes })
    };
}
/**
 * Type guard for ErrorResponse
 */
export function isErrorResponse(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    const obj = value;
    return (typeof obj.code === 'string' &&
        typeof obj.message === 'string' &&
        typeof obj.timestamp === 'string');
}
/**
 * Converts domain errors to ErrorResponse
 */
export function errorToResponse(error) {
    const baseCode = `${error.field.toUpperCase()}_${error.reason.toUpperCase()}`;
    switch (error.field) {
        case 'dose': {
            const doseError = error;
            let message = '';
            switch (doseError.reason) {
                case 'negative_value':
                    message = `Dose cannot be negative: ${doseError.attempted.value} ${doseError.attempted.unit}`;
                    break;
                case 'zero_value':
                    message = `Dose cannot be zero`;
                    break;
                case 'exceeds_maximum':
                    message = `Dose exceeds maximum allowed: ${doseError.attempted.value} ${doseError.attempted.unit}`;
                    break;
                case 'invalid_unit':
                    message = `Invalid dose unit: ${doseError.attempted.unit}`;
                    break;
            }
            return createError(baseCode, message, {
                category: doseError.category,
                field: doseError.field,
                attempted: doseError.attempted,
                ...(doseError.constraints && { constraints: doseError.constraints })
            });
        }
        case 'frequency': {
            const freqError = error;
            let message = '';
            switch (freqError.reason) {
                case 'unrecognized_pattern':
                    message = `Unrecognized frequency pattern: ${freqError.input}`;
                    break;
                case 'ambiguous':
                    message = `Ambiguous frequency: ${freqError.input}`;
                    break;
                case 'invalid_interval':
                    message = `Invalid frequency interval: ${freqError.input}`;
                    break;
            }
            return createError(baseCode, message, {
                category: freqError.category,
                field: freqError.field,
                input: freqError.input
            }, freqError.suggestions);
        }
        case 'route': {
            const routeError = error;
            let message = '';
            switch (routeError.reason) {
                case 'incompatible_dose_form':
                    message = `Route "${routeError.route}" is incompatible with dose form "${routeError.doseForm}"`;
                    break;
                case 'not_allowed':
                    message = `Route "${routeError.route}" is not allowed for this medication`;
                    break;
                case 'requires_device':
                    message = `Route "${routeError.route}" requires a specific device`;
                    break;
            }
            return createError(baseCode, message, {
                category: routeError.category,
                field: routeError.field,
                route: routeError.route,
                doseForm: routeError.doseForm,
                ...(routeError.allowedRoutes && { allowedRoutes: routeError.allowedRoutes })
            });
        }
        default:
            // Type safety: this should never happen
            const _exhaustive = error;
            throw new Error(`Unhandled error type: ${JSON.stringify(_exhaustive)}`);
    }
}
//# sourceMappingURL=errors.js.map