// Main exports for the medication builder package
export * from './builders';
export * from './types';
export * from './constants/medication-data';

// Core functionality exports
export { calculateDaysSupply } from './lib/calculations';
export { generateSignature } from './lib/signature';

// Utility exports
export { UnitConverter } from './lib/units';
export { TemplateEngine } from './lib/templates';
export { StrategyDispatcher } from './lib/dispatcher';

// Re-export all types and interfaces
export type {
  Medication,
  SignatureState,
  SignatureResult
} from './types';

export type {
  MedicationProfile,
  ScoringType,
  Quantity,
  Ratio,
  Coding,
  CodeableConcept,
  Ingredient,
  CustomConversion,
  MolarMass,
  DispenserMetadata,
  PackageInfo,
  DispenserInfo,
  DosageConstraints,
  DefaultSignatureSettings
} from './types/MedicationProfile';

export type {
  SignatureInstruction,
  TimingRepeat,
  Period,
  Timing,
  Range,
  DoseAndRate,
  RelationshipType,
  InstructionRelationship,
  AdditionalInstruction
} from './types/SignatureInstruction';

export type {
  MedicationRequestContext,
  PatientContext,
  PrescriberContext,
  FormularyContext,
  ClinicalContext
} from './types/MedicationRequestContext';

export type {
  Mass,
  Volume,
  Count,
  MassUnit,
  VolumeUnit,
  CountUnit,
  DoseJSON,
  Dose,
  PeriodUnit,
  WhenTiming,
  FrequencyJSON,
  Frequency,
  RouteJSON,
  Route
} from './types/value-objects';