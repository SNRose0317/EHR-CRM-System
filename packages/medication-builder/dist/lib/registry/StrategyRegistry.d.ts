/**
 * Strategy Registry with Composition Support
 *
 * Central registry for all base strategies and modifiers with
 * validation, introspection, and debugging capabilities.
 *
 * @since 3.0.0
 */
import { IBaseStrategy, IModifierStrategy, SpecificityLevel, StrategyMetadata } from '../lib/strategies/types';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
/**
 * Composition chain for debugging
 */
export interface CompositionChain {
    base: {
        name: string;
        specificity: SpecificityLevel;
        metadata?: StrategyMetadata;
    };
    modifiers: Array<{
        name: string;
        priority: number;
        metadata?: StrategyMetadata;
    }>;
}
/**
 * Selection explanation for debugging
 */
export interface SelectionExplanation {
    context: MedicationRequestContext;
    evaluated: Array<{
        name: string;
        type: 'base' | 'modifier';
        matched: boolean;
        reason: string;
    }>;
    selected: {
        base: string;
        modifiers: string[];
    };
    executionOrder: string[];
}
/**
 * Registry introspection interface
 */
export interface RegistryIntrospection {
    getCompositionChain(context: MedicationRequestContext): CompositionChain;
    visualizeRegistry(): string;
    explainSelection(context: MedicationRequestContext): SelectionExplanation;
}
/**
 * Main registry class for strategies and modifiers
 */
export declare class StrategyRegistry implements RegistryIntrospection {
    private baseStrategies;
    private modifiers;
    private registrationOrder;
    private baseMetadata;
    private modifierMetadata;
    /**
     * Registers a base strategy
     *
     * @param name - Unique name for the strategy
     * @param strategy - The strategy implementation
     * @throws {DuplicateStrategyError} If name already exists
     */
    registerBase(name: string, strategy: IBaseStrategy): void;
    /**
     * Registers a modifier strategy
     *
     * @param name - Unique name for the modifier
     * @param modifier - The modifier implementation
     * @throws {DuplicateStrategyError} If name already exists
     * @throws {PriorityConflictError} If priority conflicts exist
     */
    registerModifier(name: string, modifier: IModifierStrategy): void;
    /**
     * Unregisters a base strategy
     */
    unregisterBase(name: string): boolean;
    /**
     * Unregisters a modifier
     */
    unregisterModifier(name: string): boolean;
    /**
     * Gets all base strategies
     */
    getBaseStrategies(): Map<string, IBaseStrategy>;
    /**
     * Gets all modifiers
     */
    getModifiers(): Map<string, IModifierStrategy>;
    /**
     * Gets registration order for debugging
     */
    getRegistrationOrder(): string[];
    /**
     * Validates that no specificity conflicts exist
     * Logs warnings for potential conflicts
     */
    private validateSpecificity;
    /**
     * Validates that modifier priorities are unique
     * @throws {PriorityConflictError} If conflicts exist
     */
    private validatePriorities;
    /**
     * Gets the composition chain for a given context
     */
    getCompositionChain(context: MedicationRequestContext): CompositionChain;
    /**
     * Visualizes the registry structure
     */
    visualizeRegistry(): string;
    /**
     * Explains the selection process for a context
     */
    explainSelection(context: MedicationRequestContext): SelectionExplanation;
    /**
     * Finds the highest specificity matching base strategy
     */
    private findMatchingBase;
    /**
     * Finds all matching modifiers
     */
    private findMatchingModifiers;
    /**
     * Clears all registrations (useful for testing)
     */
    clear(): void;
}
//# sourceMappingURL=StrategyRegistry.d.ts.map