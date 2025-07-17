/**
 * Core Functional Programming Utilities
 *
 * Provides fundamental functional programming constructs including
 * Result types for error handling, predicate combinators, and
 * function composition utilities.
 *
 * @since 2.0.0
 */
/**
 * Creates a successful Result
 */
export const ok = (value) => ({ ok: true, value });
/**
 * Creates an error Result
 */
export const err = (error) => ({ ok: false, error });
/**
 * Type guard for successful Results
 */
export const isOk = (result) => result.ok === true;
/**
 * Type guard for error Results
 */
export const isErr = (result) => result.ok === false;
/**
 * Maps a function over a successful Result
 */
export const map = (result, fn) => {
    if (isOk(result)) {
        return ok(fn(result.value));
    }
    return result;
};
/**
 * Chains Result-returning functions
 */
export const flatMap = (result, fn) => {
    if (isOk(result)) {
        return fn(result.value);
    }
    return result;
};
/**
 * Maps a function over an error Result
 */
export const mapErr = (result, fn) => {
    if (isErr(result)) {
        return err(fn(result.error));
    }
    return result;
};
/**
 * Combines predicates with AND logic
 */
export const and = (...predicates) => (value) => predicates.every(p => p(value));
/**
 * Combines predicates with OR logic
 */
export const or = (...predicates) => (value) => predicates.some(p => p(value));
/**
 * Negates a predicate
 */
export const not = (predicate) => (value) => !predicate(value);
/**
 * Chains validators sequentially, short-circuiting on first error
 */
export const pipe = (...validators) => (value) => {
    let result = ok(value);
    for (const validator of validators) {
        if (!result.ok)
            break;
        result = validator(result.value);
    }
    return result;
};
/**
 * Composes two functions left-to-right
 */
export const compose = (f, g) => (value) => g(f(value));
/**
 * Generic memoization wrapper for pure functions
 *
 * @param fn - Function to memoize
 * @param keyFn - Optional custom key generator
 * @returns Memoized version of the function
 */
export function memoize(fn, keyFn) {
    const cache = new Map();
    return (...args) => {
        const key = keyFn ? keyFn(...args) : JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}
/**
 * Safely extracts value from Result or throws
 * Use only at system boundaries
 */
export const unwrap = (result) => {
    if (isOk(result)) {
        return result.value;
    }
    throw new Error(`Unwrap called on error: ${JSON.stringify(result.error)}`);
};
/**
 * Provides default value for error Results
 */
export const withDefault = (result, defaultValue) => {
    if (isOk(result)) {
        return result.value;
    }
    return defaultValue;
};
/**
 * Converts Result to nullable value
 */
export const toNullable = (result) => {
    if (isOk(result)) {
        return result.value;
    }
    return null;
};
/**
 * Creates Result from nullable value
 */
export const fromNullable = (value, error) => {
    if (value !== null && value !== undefined) {
        return ok(value);
    }
    return err(error);
};
//# sourceMappingURL=core.js.map