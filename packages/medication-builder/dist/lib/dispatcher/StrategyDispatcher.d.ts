/**
 * Specificity-Based Strategy Dispatcher
 *
 * Core dispatcher that selects the most specific base strategy
 * and applies all relevant modifiers to generate medication
 * signature instructions.
 *
 * @since 3.0.0
 */
import { MedicationRequestContext } from '../types/MedicationRequestContext';
import { SignatureInstruction } from '../types/SignatureInstruction';
import { StrategyRegistry } from '../registry/StrategyRegistry';
/**
 * Audit entry for strategy selection decisions
 */
export interface StrategySelectionAudit {
    timestamp: Date;
    context: MedicationRequestContext;
    candidateStrategies: Array<{
        name: string;
        specificity: number;
        matched: boolean;
    }>;
    selectedStrategy: string | null;
    appliedModifiers: string[];
    executionTimeMs: number;
}
/**
 * Main dispatcher for strategy selection and composition
 */
export declare class StrategyDispatcher {
    private registry;
    private auditLog;
    private readonly maxAuditLogSize;
    constructor(registry: StrategyRegistry);
    /**
     * Dispatches a medication request context to generate signature instructions
     *
     * @param context - The medication request context
     * @returns Generated signature instruction
     * @throws {AmbiguousStrategyError} When multiple strategies at same specificity match
     * @throws {NoMatchingStrategyError} When no strategy matches the context
     */
    dispatch(context: MedicationRequestContext): SignatureInstruction;
    /**
     * Gets a composition preview without executing
     * Useful for debugging and testing
     */
    preview(context: MedicationRequestContext): {
        baseStrategy: string | null;
        modifiers: string[];
        wouldSucceed: boolean;
        error?: string;
    };
    /**
     * Explains the selection logic for a given context
     */
    explainSelection(context: MedicationRequestContext): string;
    /**
     * Gets recent audit entries
     */
    getAuditLog(limit?: number): StrategySelectionAudit[];
    /**
     * Clears the audit log
     */
    clearAuditLog(): void;
    /**
     * Records an audit entry, maintaining size limit
     */
    private recordAudit;
    /**
     * Gets performance statistics from audit log
     */
    getPerformanceStats(): {
        count: number;
        avgTimeMs: number;
        p50Ms: number;
        p95Ms: number;
        p99Ms: number;
    };
}
//# sourceMappingURL=StrategyDispatcher.d.ts.map