/**
 * Medication Signature Builders
 *
 * This module provides builder pattern implementations for constructing
 * FHIR-compliant medication instructions using a fluent API.
 *
 * @since 3.0.0
 */
export type { ISignatureBuilder, DoseInput, TimingInput, RouteInput, DoseConstraints, AsNeededInput, BuilderState } from './ISignatureBuilder';
export { isValidDoseInput, isValidTimingInput } from './ISignatureBuilder';
export type { IComplexRegimenBuilder, DoseRangeInput, FrequencyRangeInput, TaperingPhase, ConditionalInstruction, MaxDailyDoseConstraint, MultiIngredientDoseInput, ComplexRegimenBuilderState } from './IComplexRegimenBuilder';
export type { InstructionRelationship } from '../types/SignatureInstruction';
export { isValidDoseRangeInput, isValidFrequencyRangeInput, isValidTaperingPhase } from './IComplexRegimenBuilder';
export { SimpleTabletBuilder } from './SimpleTabletBuilder';
export { SimpleLiquidBuilder } from './SimpleLiquidBuilder';
export { FractionalTabletBuilder } from './FractionalTabletBuilder';
export { TopiclickBuilder } from './TopiclickBuilder';
export { NasalSprayBuilder } from './NasalSprayBuilder';
export { MultiIngredientBuilder } from './MultiIngredientBuilder';
export { ComplexPRNBuilder } from './ComplexPRNBuilder';
export { TaperingDoseBuilder } from './TaperingDoseBuilder';
/**
 * Factory function to create appropriate builder based on medication
 */
import { MedicationProfile } from '../types/MedicationProfile';
import { ISignatureBuilder } from './ISignatureBuilder';
export declare function createBuilder(medication: MedicationProfile): ISignatureBuilder;
//# sourceMappingURL=index.d.ts.map