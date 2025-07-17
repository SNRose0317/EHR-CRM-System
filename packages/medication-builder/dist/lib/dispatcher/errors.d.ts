/**
 * Custom Error Classes for Strategy Dispatcher
 *
 * Provides specific error types for different failure scenarios
 * in the strategy selection and composition process.
 *
 * @since 3.0.0
 */
import { MedicationRequestContext } from '../types/MedicationRequestContext';
import { SpecificityLevel } from '../lib/strategies/types';
/**
 * Thrown when multiple strategies at the same specificity level
 * match the given context, making selection ambiguous.
 */
export declare class AmbiguousStrategyError extends Error {
    readonly strategies: string[];
    readonly specificity: SpecificityLevel;
    readonly context: MedicationRequestContext;
    constructor(message: string, strategies: string[], specificity: SpecificityLevel, context: MedicationRequestContext);
    /**
     * Creates a detailed error message for ambiguous matches
     */
    static create(strategies: Array<{
        name: string;
        specificity: SpecificityLevel;
    }>, context: MedicationRequestContext): AmbiguousStrategyError;
}
/**
 * Thrown when no strategy matches the given context.
 */
export declare class NoMatchingStrategyError extends Error {
    readonly context: MedicationRequestContext;
    readonly availableStrategies: string[];
    constructor(message: string, context: MedicationRequestContext, availableStrategies?: string[]);
    /**
     * Creates a detailed error message for no matching strategy
     */
    static create(context: MedicationRequestContext, availableStrategies?: string[]): NoMatchingStrategyError;
}
/**
 * Thrown when attempting to register a strategy with a name that already exists.
 */
export declare class DuplicateStrategyError extends Error {
    readonly strategyName: string;
    readonly strategyType: 'base' | 'modifier';
    constructor(strategyName: string, strategyType: 'base' | 'modifier');
}
/**
 * Thrown when modifier priorities conflict.
 */
export declare class PriorityConflictError extends Error {
    readonly conflictingModifiers: Array<{
        name: string;
        priority: number;
    }>;
    constructor(conflictingModifiers: Array<{
        name: string;
        priority: number;
    }>);
}
/**
 * Type guard for AmbiguousStrategyError
 */
export declare function isAmbiguousStrategyError(error: unknown): error is AmbiguousStrategyError;
/**
 * Type guard for NoMatchingStrategyError
 */
export declare function isNoMatchingStrategyError(error: unknown): error is NoMatchingStrategyError;
/**
 * Type guard for DuplicateStrategyError
 */
export declare function isDuplicateStrategyError(error: unknown): error is DuplicateStrategyError;
/**
 * Type guard for PriorityConflictError
 */
export declare function isPriorityConflictError(error: unknown): error is PriorityConflictError;
//# sourceMappingURL=errors.d.ts.map