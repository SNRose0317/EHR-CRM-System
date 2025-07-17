/**
 * SignatureInstruction Interface
 *
 * FHIR R4 compliant output structure for medication instructions.
 * This represents the standardized output of the medication signature
 * builder system that can be integrated with electronic health records.
 *
 * Based on FHIR R4 Dosage datatype:
 * https://www.hl7.org/fhir/dosage.html
 *
 * @since 2.0.0
 */
import { CodeableConcept, Quantity, Ratio } from './MedicationProfile';
/**
 * Timing repeat structure for FHIR timing
 */
export interface TimingRepeat {
    /** Number of times to repeat */
    count?: number;
    /** Maximum number of times to repeat */
    countMax?: number;
    /** How long when it happens */
    duration?: number;
    /** How long when it happens (Max) */
    durationMax?: number;
    /** Unit of time (UCUM) */
    durationUnit?: string;
    /** Event occurs frequency times per period */
    frequency?: number;
    /** Event occurs up to frequencyMax times per period */
    frequencyMax?: number;
    /** Event occurs frequency times per duration */
    period?: number;
    /** Upper limit of period */
    periodMax?: number;
    /** Unit of time (UCUM) */
    periodUnit?: string;
    /** Regular life events the event is tied to */
    when?: string[];
    /** Minutes from event (before or after) */
    offset?: number;
}
/**
 * Timing bounds using Period
 */
export interface Period {
    /** Starting time */
    start?: string;
    /** End time (inclusive) */
    end?: string;
}
/**
 * FHIR Timing structure
 */
export interface Timing {
    /** When the event occurs */
    event?: string[];
    /** When the event is to occur */
    repeat?: TimingRepeat;
    /** Length/Range of lengths, or (Start and/or end) limits */
    bounds?: Period;
    /** BID | TID | QID | AM | PM | QD | QOD | + */
    code?: CodeableConcept;
}
/**
 * Range structure for dose ranges
 */
export interface Range {
    /** Low limit */
    low?: Quantity;
    /** High limit */
    high?: Quantity;
}
/**
 * Dose and rate information
 */
export interface DoseAndRate {
    /** The kind of dose or rate specified */
    type?: CodeableConcept;
    /** Amount of medication per dose */
    doseQuantity?: Quantity;
    /** Amount of medication per dose range */
    doseRange?: Range;
    /** Amount of medication per unit of time */
    rateQuantity?: Quantity;
    /** Amount of medication per unit of time range */
    rateRange?: Range;
    /** Amount of medication per unit of time as ratio */
    rateRatio?: Ratio;
    /** When to administer */
    when?: string[];
}
/**
 * Relationship types for complex regimens
 */
export declare enum RelationshipType {
    /** Instructions should be followed in sequence */
    SEQUENTIAL = "SEQUENTIAL",
    /** Instructions can be followed concurrently */
    CONCURRENT = "CONCURRENT",
    /** Instruction is conditional on another */
    CONDITIONAL = "CONDITIONAL"
}
/**
 * Relationship metadata for complex medication regimens
 */
export interface InstructionRelationship {
    /** Type of relationship */
    type: RelationshipType;
    /** ID of the related instruction */
    targetId?: string;
    /** Condition that must be met (for CONDITIONAL type) */
    condition?: string;
}
/**
 * Additional instruction as CodeableConcept
 */
export interface AdditionalInstruction {
    /** Coded instruction */
    coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
    }>;
    /** Plain text instruction */
    text?: string;
}
/**
 * Main SignatureInstruction interface
 *
 * Represents a complete medication instruction that is FHIR R4 compliant
 * and can be used in electronic health record systems.
 */
export interface SignatureInstruction {
    /** Unique identifier for this instruction */
    id?: string;
    /** Sequence number for ordering */
    sequence?: number;
    /** Free text dosage instructions */
    text: string;
    /** Supplemental instructions */
    additionalInstructions?: AdditionalInstruction[];
    /** Patient or consumer oriented instructions */
    patientInstructions?: string;
    /** When medication should be administered */
    timing?: Timing;
    /** Take "as needed" */
    asNeeded?: CodeableConcept;
    /** Body site to administer to */
    site?: CodeableConcept;
    /** How drug should enter body */
    route?: CodeableConcept;
    /** Technique for administering medication */
    method?: CodeableConcept;
    /** Amount of medication per dose */
    doseAndRate?: DoseAndRate[];
    /** Upper limit on medication per unit of time */
    maxDosePerPeriod?: Ratio;
    /** Upper limit on medication per administration */
    maxDosePerAdministration?: Quantity;
    /** Upper limit on medication per lifetime of patient */
    maxDosePerLifetime?: Quantity;
    /** Relationship to other instructions (for complex regimens) */
    relationship?: InstructionRelationship;
}
/**
 * Type guard to check if an object is a valid SignatureInstruction
 *
 * @param obj - Object to check
 * @returns True if the object is a valid SignatureInstruction
 */
export declare function isSignatureInstruction(obj: any): obj is SignatureInstruction;
/**
 * Factory function to create a SignatureInstruction
 *
 * @param params - Parameters for creating the instruction
 * @returns A new SignatureInstruction
 */
export declare function createSignatureInstruction(params: {
    text: string;
    doseValue?: number;
    doseUnit?: string;
    frequency?: number;
    period?: number;
    periodUnit?: string;
    route?: string;
    additionalInstructions?: string;
    site?: CodeableConcept;
    asNeeded?: boolean;
    maxDoseValue?: number;
    maxDoseUnit?: string;
    maxDosePeriod?: number;
    maxDosePeriodUnit?: string;
}): SignatureInstruction;
//# sourceMappingURL=SignatureInstruction.d.ts.map