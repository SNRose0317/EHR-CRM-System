/**
 * Default tracer options
 */
const DEFAULT_OPTIONS = {
    enabled: false,
    includeMemoryMetrics: false,
    maxTraceEntries: 1000,
    dryRun: false
};
/**
 * Conversion tracer implementation
 */
export class ConversionTracer {
    constructor(options) {
        this.traces = [];
        this.startTime = 0;
        this.operationTimings = new Map();
        this.currentOperationStart = new Map();
        this.options = { ...DEFAULT_OPTIONS, ...options };
        this.startTime = performance.now();
    }
    /**
     * Check if tracing is enabled
     */
    get isEnabled() {
        return this.options.enabled;
    }
    /**
     * Check if in dry-run mode
     */
    get isDryRun() {
        return this.options.dryRun;
    }
    /**
     * Record a trace event
     */
    trace(event) {
        if (!this.options.enabled)
            return;
        const entry = {
            ...event,
            timestamp: performance.now() - this.startTime
        };
        // Add memory metrics if enabled
        if (this.options.includeMemoryMetrics && typeof process !== 'undefined') {
            entry.metadata = {
                ...entry.metadata,
                memory: process.memoryUsage?.().heapUsed
            };
        }
        // Handle operation timing
        if (event.type === 'conversion_start' || event.type === 'validation_start') {
            this.startOperation(event.description);
        }
        else if (event.type === 'conversion_end' || event.type === 'validation_end') {
            entry.duration = this.endOperation(event.description);
        }
        // Add to traces
        this.traces.push(entry);
        // Trim if exceeding max entries
        if (this.traces.length > this.options.maxTraceEntries) {
            this.traces = this.traces.slice(-this.options.maxTraceEntries);
        }
    }
    /**
     * Start timing an operation
     */
    startOperation(name) {
        this.currentOperationStart.set(name, performance.now());
    }
    /**
     * End timing an operation and record duration
     */
    endOperation(name) {
        const startTime = this.currentOperationStart.get(name);
        if (startTime === undefined)
            return undefined;
        const duration = performance.now() - startTime;
        this.currentOperationStart.delete(name);
        // Record timing for metrics
        if (!this.operationTimings.has(name)) {
            this.operationTimings.set(name, []);
        }
        this.operationTimings.get(name).push(duration);
        return duration;
    }
    /**
     * Export traces in specified format
     */
    export(format = 'json') {
        switch (format) {
            case 'json':
                return this.toJSON();
            case 'dot':
                return this.toDOT();
            case 'text':
                return this.toText();
            default:
                throw new Error(`Unknown export format: ${format}`);
        }
    }
    /**
     * Export as JSON
     */
    toJSON() {
        return JSON.stringify({
            traces: this.traces,
            summary: this.getPerformanceSummary(),
            options: this.options
        }, null, 2);
    }
    /**
     * Export as DOT graph for visualization
     */
    toDOT() {
        const nodes = [];
        const edges = [];
        // Create nodes for each trace entry
        this.traces.forEach((trace, index) => {
            const label = this.createDOTLabel(trace);
            const color = this.getDOTColor(trace.type);
            nodes.push(`  n${index} [label="${label}", fillcolor="${color}", style="filled"];`);
        });
        // Create edges between consecutive events
        for (let i = 1; i < this.traces.length; i++) {
            const duration = this.traces[i].timestamp - this.traces[i - 1].timestamp;
            edges.push(`  n${i - 1} -> n${i} [label="${duration.toFixed(2)}ms"];`);
        }
        return `digraph ConversionTrace {
  rankdir=TB;
  node [shape=box, fontname="Arial", fontsize=10];
  edge [fontname="Arial", fontsize=9];
  
  label="Unit Conversion Trace";
  labelloc="t";
  
${nodes.join('\n')}

${edges.join('\n')}
}`;
    }
    /**
     * Create label for DOT node
     */
    createDOTLabel(trace) {
        let label = trace.description;
        if (trace.data) {
            const key = Object.keys(trace.data)[0];
            if (key && trace.data[key] !== undefined) {
                label += `\\n${key}: ${trace.data[key]}`;
            }
        }
        if (trace.duration !== undefined) {
            label += `\\n(${trace.duration.toFixed(2)}ms)`;
        }
        return label.replace(/"/g, '\\"');
    }
    /**
     * Get color for DOT node based on event type
     */
    getDOTColor(type) {
        const colors = {
            conversion_start: '#90EE90', // Light green
            conversion_end: '#98FB98', // Pale green
            conversion_step: '#87CEEB', // Sky blue
            validation_start: '#FFE4B5', // Moccasin
            validation_end: '#FFDEAD', // Navajo white
            adapter_selection: '#DDA0DD', // Plum
            cache_hit: '#90EE90', // Light green
            cache_miss: '#F0E68C', // Khaki
            confidence_calculation: '#B0E0E6', // Powder blue
            error: '#FFA07A', // Light salmon
            warning: '#FFFFE0', // Light yellow
            performance_metric: '#E6E6FA' // Lavender
        };
        return colors[type] || '#FFFFFF';
    }
    /**
     * Export as human-readable text
     */
    toText() {
        const lines = [];
        lines.push('=== Conversion Trace ===');
        lines.push(`Total Duration: ${(performance.now() - this.startTime).toFixed(2)}ms`);
        lines.push(`Events: ${this.traces.length}`);
        lines.push('');
        // Group traces by operation
        let currentOperation = null;
        this.traces.forEach((trace, index) => {
            const indent = trace.type.includes('step') ? '  ' : '';
            const timestamp = `[${trace.timestamp.toFixed(2)}ms]`;
            // Add section headers
            if (trace.type === 'conversion_start') {
                if (currentOperation)
                    lines.push('');
                currentOperation = trace.description;
                lines.push(`--- ${trace.description} ---`);
            }
            // Format the trace line
            let line = `${timestamp} ${indent}${trace.description}`;
            if (trace.duration !== undefined) {
                line += ` (${trace.duration.toFixed(2)}ms)`;
            }
            if (trace.data) {
                const dataStr = Object.entries(trace.data)
                    .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
                    .join(', ');
                if (dataStr) {
                    line += ` [${dataStr}]`;
                }
            }
            if (trace.error) {
                line += ` ERROR: ${trace.error.message}`;
            }
            lines.push(line);
        });
        // Add performance summary
        lines.push('');
        lines.push('=== Performance Summary ===');
        const summary = this.getPerformanceSummary();
        summary.metrics.forEach(metric => {
            lines.push(`${metric.operation}:`);
            lines.push(`  Count: ${metric.count}`);
            lines.push(`  Average: ${metric.averageDuration.toFixed(2)}ms`);
            lines.push(`  Min: ${metric.minDuration.toFixed(2)}ms`);
            lines.push(`  Max: ${metric.maxDuration.toFixed(2)}ms`);
        });
        if (summary.bottlenecks.length > 0) {
            lines.push('');
            lines.push('Bottlenecks:');
            summary.bottlenecks.forEach(b => lines.push(`  - ${b}`));
        }
        return lines.join('\n');
    }
    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        const metrics = [];
        this.operationTimings.forEach((timings, operation) => {
            if (timings.length === 0)
                return;
            const total = timings.reduce((sum, t) => sum + t, 0);
            const average = total / timings.length;
            const min = Math.min(...timings);
            const max = Math.max(...timings);
            metrics.push({
                operation,
                count: timings.length,
                totalDuration: total,
                averageDuration: average,
                minDuration: min,
                maxDuration: max
            });
        });
        return metrics;
    }
    /**
     * Get performance summary
     */
    getPerformanceSummary() {
        const metrics = this.getPerformanceMetrics();
        const totalDuration = performance.now() - this.startTime;
        const operationCount = this.traces.length;
        // Identify bottlenecks (operations taking >50% of average time)
        const avgDuration = totalDuration / operationCount;
        const bottlenecks = metrics
            .filter(m => m.averageDuration > avgDuration * 0.5)
            .map(m => `${m.operation} (avg ${m.averageDuration.toFixed(2)}ms)`);
        return {
            totalDuration,
            operationCount,
            metrics,
            bottlenecks
        };
    }
    /**
     * Clear all traces
     */
    clear() {
        this.traces = [];
        this.operationTimings.clear();
        this.currentOperationStart.clear();
        this.startTime = performance.now();
    }
    /**
     * Enable/disable tracing
     */
    setEnabled(enabled) {
        this.options.enabled = enabled;
    }
    /**
     * Get a specific metric
     */
    getMetric(operation) {
        return this.getPerformanceMetrics().find(m => m.operation === operation);
    }
}
//# sourceMappingURL=ConversionTracer.js.map