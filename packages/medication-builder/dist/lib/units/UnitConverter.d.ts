/**
 * Unit Converter - Main conversion orchestrator
 *
 * This is the main entry point for unit conversions in the medication signature builder.
 * It coordinates between the UCUM wrapper (Tier 1) and device unit adapter (Tier 2)
 * to provide comprehensive unit conversion capabilities with full traceability.
 */
import { IUnitConverter, IUCUMWrapper, IDeviceUnitAdapter, ConversionContext, ConversionOptions, ConversionSuccess, UnitValidation, Unit, DeviceUnit } from './types';
import { ConfidenceScoreService } from '../confidence/ConfidenceScoreService';
import { ConversionTracer } from '../tracing/ConversionTracer';
import { TracerOptions } from '../tracing/types';
/**
 * Main Unit Converter implementation
 */
export declare class UnitConverter implements IUnitConverter {
    private ucumWrapper;
    private deviceAdapter;
    private confidenceService;
    private tracer;
    private lastConversion;
    private lastConfidenceScore;
    constructor(ucumWrapper?: IUCUMWrapper, deviceAdapter?: IDeviceUnitAdapter, confidenceService?: ConfidenceScoreService, tracerOptions?: TracerOptions | ConversionTracer);
    /**
     * Convert between any units with full context support
     */
    convert(value: number, from: string, to: string, context?: ConversionContext, options?: ConversionOptions): ConversionSuccess;
    /**
     * Validate a unit string
     */
    validate(unit: string): UnitValidation;
    /**
     * Get explanation of last conversion
     */
    explain(): string;
    /**
     * Get compatible units for a given unit
     */
    getCompatibleUnits(unit: string): Unit[];
    /**
     * Register custom device unit
     */
    registerDeviceUnit(unit: DeviceUnit): void;
    /**
     * Validate conversion inputs
     */
    private validateInputs;
    /**
     * Check if conversion requires concentration context
     */
    private isConcentrationConversion;
    /**
     * Handle concentration-based conversions
     */
    private handleConcentrationConversion;
    /**
     * Check precision constraints
     */
    private checkPrecision;
    /**
     * Get all registered device units
     */
    private getAllDeviceUnits;
    /**
     * Get the tracer instance for debugging and export
     */
    getTracer(): ConversionTracer;
    /**
     * Enable/disable tracing
     */
    setTracingEnabled(enabled: boolean): void;
    /**
     * Export trace in specified format
     */
    exportTrace(format?: 'json' | 'dot' | 'text'): string;
}
//# sourceMappingURL=UnitConverter.d.ts.map