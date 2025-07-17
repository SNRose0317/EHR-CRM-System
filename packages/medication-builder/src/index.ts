// Main exports for the medication builder package
export * from './builders';
export * from './types';
export * from './constants/medication-data';

// Core functionality exports
export { calculateDaysSupply } from './lib/calculations';
export { buildSignature } from './lib/signature';

// Utility exports
export { UnitConverter } from './lib/units';
export { TemplateEngine } from './lib/templates';
export { StrategyDispatcher } from './lib/dispatcher';

// Re-export commonly used types for convenience
export type {
  MedicationProfile,
  SignatureInstruction,
  MedicationRequestContext,
  Dose,
  Route,
  Frequency,
  AsNeededInfo
} from './types';