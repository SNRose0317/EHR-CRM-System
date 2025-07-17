/**
 * Strategy Registry with Composition Support
 *
 * Central registry for all base strategies and modifiers with
 * validation, introspection, and debugging capabilities.
 *
 * @since 3.0.0
 */
import { SpecificityLevel } from '../lib/strategies/types';
import { DuplicateStrategyError, PriorityConflictError } from '../lib/dispatcher/errors';
/**
 * Main registry class for strategies and modifiers
 */
export class StrategyRegistry {
    constructor() {
        this.baseStrategies = new Map();
        this.modifiers = new Map();
        this.registrationOrder = [];
        // Metadata storage for introspection
        this.baseMetadata = new Map();
        this.modifierMetadata = new Map();
    }
    /**
     * Registers a base strategy
     *
     * @param name - Unique name for the strategy
     * @param strategy - The strategy implementation
     * @throws {DuplicateStrategyError} If name already exists
     */
    registerBase(name, strategy) {
        if (this.baseStrategies.has(name)) {
            throw new DuplicateStrategyError(name, 'base');
        }
        this.baseStrategies.set(name, strategy);
        this.registrationOrder.push(`base:${name}`);
        // Extract metadata if available
        if ('metadata' in strategy) {
            const strategyWithMeta = strategy;
            this.baseMetadata.set(name, strategyWithMeta.metadata);
        }
        // Validate no specificity conflicts
        this.validateSpecificity();
    }
    /**
     * Registers a modifier strategy
     *
     * @param name - Unique name for the modifier
     * @param modifier - The modifier implementation
     * @throws {DuplicateStrategyError} If name already exists
     * @throws {PriorityConflictError} If priority conflicts exist
     */
    registerModifier(name, modifier) {
        if (this.modifiers.has(name)) {
            throw new DuplicateStrategyError(name, 'modifier');
        }
        this.modifiers.set(name, modifier);
        this.registrationOrder.push(`modifier:${name}`);
        // Extract metadata if available
        if ('metadata' in modifier) {
            const modifierWithMeta = modifier;
            this.modifierMetadata.set(name, modifierWithMeta.metadata);
        }
        // Validate priority uniqueness
        this.validatePriorities();
    }
    /**
     * Unregisters a base strategy
     */
    unregisterBase(name) {
        const deleted = this.baseStrategies.delete(name);
        if (deleted) {
            this.baseMetadata.delete(name);
            this.registrationOrder = this.registrationOrder.filter(entry => entry !== `base:${name}`);
        }
        return deleted;
    }
    /**
     * Unregisters a modifier
     */
    unregisterModifier(name) {
        const deleted = this.modifiers.delete(name);
        if (deleted) {
            this.modifierMetadata.delete(name);
            this.registrationOrder = this.registrationOrder.filter(entry => entry !== `modifier:${name}`);
        }
        return deleted;
    }
    /**
     * Gets all base strategies
     */
    getBaseStrategies() {
        return new Map(this.baseStrategies);
    }
    /**
     * Gets all modifiers
     */
    getModifiers() {
        return new Map(this.modifiers);
    }
    /**
     * Gets registration order for debugging
     */
    getRegistrationOrder() {
        return [...this.registrationOrder];
    }
    /**
     * Validates that no specificity conflicts exist
     * Logs warnings for potential conflicts
     */
    validateSpecificity() {
        // Group strategies by specificity level
        const bySpecificity = new Map();
        for (const [name, strategy] of this.baseStrategies) {
            const level = strategy.specificity;
            if (!bySpecificity.has(level)) {
                bySpecificity.set(level, []);
            }
            bySpecificity.get(level).push([name, strategy]);
        }
        // Check for potential conflicts (strategies that could match same input)
        // This is a runtime warning, not an error
        for (const [level, strategies] of bySpecificity) {
            if (strategies.length > 1) {
                console.warn(`Multiple strategies at specificity ${level} (${SpecificityLevel[level]}): ` +
                    strategies.map(([name]) => name).join(', '));
            }
        }
    }
    /**
     * Validates that modifier priorities are unique
     * @throws {PriorityConflictError} If conflicts exist
     */
    validatePriorities() {
        const priorityMap = new Map();
        for (const [name, modifier] of this.modifiers) {
            const priority = modifier.priority;
            if (!priorityMap.has(priority)) {
                priorityMap.set(priority, []);
            }
            priorityMap.get(priority).push(name);
        }
        // Check for conflicts
        const conflicts = [];
        for (const [priority, names] of priorityMap) {
            if (names.length > 1) {
                names.forEach(name => conflicts.push({ name, priority }));
            }
        }
        if (conflicts.length > 0) {
            throw new PriorityConflictError(conflicts);
        }
    }
    /**
     * Gets the composition chain for a given context
     */
    getCompositionChain(context) {
        // Find matching base strategy
        const matchingBase = this.findMatchingBase(context);
        // Find matching modifiers
        const matchingModifiers = this.findMatchingModifiers(context);
        return {
            base: matchingBase
                ? {
                    name: matchingBase.name,
                    specificity: matchingBase.strategy.specificity,
                    metadata: this.baseMetadata.get(matchingBase.name)
                }
                : {
                    name: 'none',
                    specificity: SpecificityLevel.DEFAULT
                },
            modifiers: matchingModifiers.map(({ name, modifier }) => ({
                name,
                priority: modifier.priority,
                metadata: this.modifierMetadata.get(name)
            }))
        };
    }
    /**
     * Visualizes the registry structure
     */
    visualizeRegistry() {
        const lines = [
            '=== Strategy Registry ===',
            '',
            'Base Strategies:',
            ...Array.from(this.baseStrategies.entries()).map(([name, strategy]) => {
                const meta = this.baseMetadata.get(name);
                const metaInfo = meta ? ` (${meta.description})` : '';
                return `  - ${name} [Specificity: ${strategy.specificity}]${metaInfo}`;
            }),
            '',
            'Modifier Strategies:',
            ...Array.from(this.modifiers.entries())
                .sort(([, a], [, b]) => a.priority - b.priority)
                .map(([name, modifier]) => {
                const meta = this.modifierMetadata.get(name);
                const metaInfo = meta ? ` (${meta.description})` : '';
                return `  - ${name} [Priority: ${modifier.priority}]${metaInfo}`;
            }),
            '',
            'Registration Order:',
            ...this.registrationOrder.map(entry => `  - ${entry}`)
        ];
        return lines.join('\n');
    }
    /**
     * Explains the selection process for a context
     */
    explainSelection(context) {
        const evaluated = [];
        // Evaluate all base strategies
        let selectedBase = null;
        let highestSpecificity = -1;
        for (const [name, strategy] of this.baseStrategies) {
            const matched = strategy.matches(context);
            evaluated.push({
                name,
                type: 'base',
                matched,
                reason: matched ? strategy.explain() : 'Context did not match strategy criteria'
            });
            if (matched && strategy.specificity > highestSpecificity) {
                selectedBase = name;
                highestSpecificity = strategy.specificity;
            }
        }
        // Evaluate all modifiers
        const selectedModifiers = [];
        const modifierPriorities = [];
        for (const [name, modifier] of this.modifiers) {
            const matched = modifier.appliesTo(context);
            evaluated.push({
                name,
                type: 'modifier',
                matched,
                reason: matched ? modifier.explain() : 'Context did not match modifier criteria'
            });
            if (matched) {
                selectedModifiers.push(name);
                modifierPriorities.push({ name, priority: modifier.priority });
            }
        }
        // Sort modifiers by priority to show execution order
        modifierPriorities.sort((a, b) => a.priority - b.priority);
        const executionOrder = selectedBase
            ? [selectedBase, ...modifierPriorities.map(m => m.name)]
            : [];
        return {
            context,
            evaluated,
            selected: {
                base: selectedBase || 'none',
                modifiers: selectedModifiers
            },
            executionOrder
        };
    }
    /**
     * Finds the highest specificity matching base strategy
     */
    findMatchingBase(context) {
        let bestMatch = null;
        let highestSpecificity = -1;
        for (const [name, strategy] of this.baseStrategies) {
            if (strategy.matches(context) && strategy.specificity > highestSpecificity) {
                bestMatch = { name, strategy };
                highestSpecificity = strategy.specificity;
            }
        }
        return bestMatch;
    }
    /**
     * Finds all matching modifiers
     */
    findMatchingModifiers(context) {
        const matching = [];
        for (const [name, modifier] of this.modifiers) {
            if (modifier.appliesTo(context)) {
                matching.push({ name, modifier });
            }
        }
        // Sort by priority
        matching.sort((a, b) => a.modifier.priority - b.modifier.priority);
        return matching;
    }
    /**
     * Clears all registrations (useful for testing)
     */
    clear() {
        this.baseStrategies.clear();
        this.modifiers.clear();
        this.baseMetadata.clear();
        this.modifierMetadata.clear();
        this.registrationOrder = [];
    }
}
//# sourceMappingURL=StrategyRegistry.js.map