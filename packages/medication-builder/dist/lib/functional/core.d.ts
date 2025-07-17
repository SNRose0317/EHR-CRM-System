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
 * Result type for representing success or failure
 * Enables error handling without exceptions
 */
export type Result<T, E> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: E;
};
/**
 * Creates a successful Result
 */
export declare const ok: <T>(value: T) => Result<T, never>;
/**
 * Creates an error Result
 */
export declare const err: <E>(error: E) => Result<never, E>;
/**
 * Type guard for successful Results
 */
export declare const isOk: <T, E>(result: Result<T, E>) => result is {
    ok: true;
    value: T;
};
/**
 * Type guard for error Results
 */
export declare const isErr: <T, E>(result: Result<T, E>) => result is {
    ok: false;
    error: E;
};
/**
 * Maps a function over a successful Result
 */
export declare const map: <T, U, E>(result: Result<T, E>, fn: (value: T) => U) => Result<U, E>;
/**
 * Chains Result-returning functions
 */
export declare const flatMap: <T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>) => Result<U, E>;
/**
 * Maps a function over an error Result
 */
export declare const mapErr: <T, E, F>(result: Result<T, E>, fn: (error: E) => F) => Result<T, F>;
/**
 * Type-safe predicate function
 */
export type Predicate<T> = (value: T) => boolean;
/**
 * Combines predicates with AND logic
 */
export declare const and: <T>(...predicates: Predicate<T>[]) => Predicate<T>;
/**
 * Combines predicates with OR logic
 */
export declare const or: <T>(...predicates: Predicate<T>[]) => Predicate<T>;
/**
 * Negates a predicate
 */
export declare const not: <T>(predicate: Predicate<T>) => Predicate<T>;
/**
 * Validator function type
 */
export type Validator<T, E = string> = (value: T) => Result<T, E>;
/**
 * Chains validators sequentially, short-circuiting on first error
 */
export declare const pipe: <T, E>(...validators: Validator<T, E>[]) => Validator<T, E>;
/**
 * Generic transformer function
 */
export type Transformer<A, B> = (value: A) => B;
/**
 * Composes two functions left-to-right
 */
export declare const compose: <A, B, C>(f: Transformer<A, B>, g: Transformer<B, C>) => Transformer<A, C>;
/**
 * Generic memoization wrapper for pure functions
 *
 * @param fn - Function to memoize
 * @param keyFn - Optional custom key generator
 * @returns Memoized version of the function
 */
export declare function memoize<Args extends unknown[], Return>(fn: (...args: Args) => Return, keyFn?: (...args: Args) => string): (...args: Args) => Return;
/**
 * Safely extracts value from Result or throws
 * Use only at system boundaries
 */
export declare const unwrap: <T, E>(result: Result<T, E>) => T;
/**
 * Provides default value for error Results
 */
export declare const withDefault: <T, E>(result: Result<T, E>, defaultValue: T) => T;
/**
 * Converts Result to nullable value
 */
export declare const toNullable: <T, E>(result: Result<T, E>) => T | null;
/**
 * Creates Result from nullable value
 */
export declare const fromNullable: <T, E>(value: T | null | undefined, error: E) => Result<T, E>;
//# sourceMappingURL=core.d.ts.map