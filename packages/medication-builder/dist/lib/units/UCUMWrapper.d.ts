import { IUCUMWrapper, UnitValidation } from './types';
/**
 * UCUM Wrapper implementation using js-quantities
 */
export declare class UCUMWrapper implements IUCUMWrapper {
    /**
     * Normalize a unit string to js-quantities format
     */
    private normalizeUnit;
    /**
     * Convert between standard units
     */
    convert(value: number, from: string, to: string): number;
    /**
     * Validate a unit string
     */
    validate(unit: string): UnitValidation;
    /**
     * Get compatible units for a given unit
     */
    getCompatibleUnits(unit: string): string[];
    /**
     * Check if two units are compatible (can be converted between)
     */
    areUnitsCompatible(unit1: string, unit2: string): boolean;
    /**
     * Get unit suggestions for common typos
     */
    private getSuggestions;
}
//# sourceMappingURL=UCUMWrapper.d.ts.map