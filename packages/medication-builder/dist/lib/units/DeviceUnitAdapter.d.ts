/**
 * Device Unit Adapter - Tier 2 of Two-Tier Anti-Corruption Layer
 *
 * This adapter handles medication-specific device units that aren't part
 * of the standard UCUM specification, such as clicks (Topiclick), drops,
 * tablets, capsules, patches, etc.
 */
import { IDeviceUnitAdapter, IUCUMWrapper, DeviceUnit, ConversionContext, ConversionSuccess } from './types';
/**
 * Device Unit Adapter implementation
 */
export declare class DeviceUnitAdapter implements IDeviceUnitAdapter {
    private ucumWrapper;
    private deviceUnits;
    constructor(ucumWrapper: IUCUMWrapper);
    /**
     * Register a custom device unit
     */
    registerDeviceUnit(unit: DeviceUnit): void;
    /**
     * Check if a unit is a device unit
     */
    isDeviceUnit(unit: string): boolean;
    /**
     * Get device unit metadata
     */
    getDeviceUnit(unit: string): DeviceUnit | undefined;
    /**
     * Convert involving device units
     */
    convert(value: number, from: string, to: string, context?: ConversionContext): ConversionSuccess;
    /**
     * Convert between two device units
     */
    private convertBetweenDeviceUnits;
    /**
     * Convert from device unit to standard unit
     */
    private convertFromDeviceUnit;
    /**
     * Convert from standard unit to device unit
     */
    private convertToDeviceUnit;
    /**
     * Get conversion factor for a device unit, considering context
     */
    private getConversionFactor;
    /**
     * Create appropriate missing context error
     */
    private createMissingContextError;
}
//# sourceMappingURL=DeviceUnitAdapter.d.ts.map