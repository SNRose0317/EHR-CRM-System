/**
 * Unit Conversion Module
 *
 * This module provides comprehensive unit conversion capabilities for medical
 * applications, including support for standard UCUM units and custom medical
 * device units like Topiclick clicks, drops, tablets, etc.
 */
// Main converter
export { UnitConverter } from './UnitConverter';
// Tier 1: UCUM Wrapper
export { UCUMWrapper } from './UCUMWrapper';
// Tier 2: Device Unit Adapter
export { DeviceUnitAdapter } from './DeviceUnitAdapter';
// Error types
export { ConversionError, ImpossibleConversionError, MissingContextError, InvalidUnitError, PrecisionError, ConversionErrors, 
// Helper functions
success, error, isError, isSuccess } from './ConversionErrors';
// Default export is the main converter
export { UnitConverter as default } from './UnitConverter';
//# sourceMappingURL=index.js.map