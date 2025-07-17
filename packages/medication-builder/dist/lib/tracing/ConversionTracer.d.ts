/**
 * Conversion Tracer
 *
 * Provides detailed tracing and performance monitoring for unit conversions.
 * Supports multiple output formats for debugging and analysis.
 */
import { TracerOptions, TraceEvent, TraceOutputFormat, PerformanceMetrics, PerformanceSummary } from './types';
/**
 * Conversion tracer implementation
 */
export declare class ConversionTracer {
    private options;
    private traces;
    private startTime;
    private operationTimings;
    private currentOperationStart;
    constructor(options?: TracerOptions);
    /**
     * Check if tracing is enabled
     */
    get isEnabled(): boolean;
    /**
     * Check if in dry-run mode
     */
    get isDryRun(): boolean;
    /**
     * Record a trace event
     */
    trace(event: TraceEvent): void;
    /**
     * Start timing an operation
     */
    private startOperation;
    /**
     * End timing an operation and record duration
     */
    private endOperation;
    /**
     * Export traces in specified format
     */
    export(format?: TraceOutputFormat): string;
    /**
     * Export as JSON
     */
    private toJSON;
    /**
     * Export as DOT graph for visualization
     */
    private toDOT;
    /**
     * Create label for DOT node
     */
    private createDOTLabel;
    /**
     * Get color for DOT node based on event type
     */
    private getDOTColor;
    /**
     * Export as human-readable text
     */
    private toText;
    /**
     * Get performance metrics
     */
    getPerformanceMetrics(): PerformanceMetrics[];
    /**
     * Get performance summary
     */
    getPerformanceSummary(): PerformanceSummary;
    /**
     * Clear all traces
     */
    clear(): void;
    /**
     * Enable/disable tracing
     */
    setEnabled(enabled: boolean): void;
    /**
     * Get a specific metric
     */
    getMetric(operation: string): PerformanceMetrics | undefined;
}
//# sourceMappingURL=ConversionTracer.d.ts.map