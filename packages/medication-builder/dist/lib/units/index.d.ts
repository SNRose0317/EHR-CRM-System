/**
 * Unit Conversion Module
 *
 * This module provides comprehensive unit conversion capabilities for medical
 * applications, including support for standard UCUM units and custom medical
 * device units like Topiclick clicks, drops, tablets, etc.
 */
export { UnitConverter } from './UnitConverter';
export { UCUMWrapper } from './UCUMWrapper';
export { DeviceUnitAdapter } from './DeviceUnitAdapter';
export { ConversionError, ImpossibleConversionError, MissingContextError, InvalidUnitError, PrecisionError, ConversionErrors, type ConversionResult, type ErrorResult, type SuccessResult, success, error, isError, isSuccess } from './ConversionErrors';
export type { IUnitConverter, IUCUMWrapper, IDeviceUnitAdapter, Unit, DeviceUnit, DeviceMetadata, ConversionContext, ConversionOptions, ConversionSuccess, ConversionStep, CustomConversion, UnitValidation } from './types';
export { UnitConverter as default } from './UnitConverter';
//# sourceMappingURL=index.d.ts.map