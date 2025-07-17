/**
 * Custom Jest Matchers for Clinical Comparison
 *
 * Provides specialized matchers for comparing medication signatures and clinical outputs.
 * These matchers understand clinical equivalence rather than exact string matching.
 *
 * @since 3.1.0
 */
interface ClinicalComparisonResult {
    pass: boolean;
    message: () => string;
    actualReceived?: any;
    expectedReceived?: any;
}
interface DoseComparison {
    isEquivalent: boolean;
    actualDose: string;
    expectedDose: string;
    reason?: string;
}
interface SignatureComparison {
    isEquivalent: boolean;
    differences: string[];
    actualSignature: string;
    expectedSignature: string;
}
/**
 * Normalize dose text for clinical comparison
 */
declare function normalizeDoseText(doseText: string): string;
/**
 * Extract dose amount and unit from signature text
 */
declare function extractDose(signatureText: string): {
    amount: number | null;
    unit: string | null;
};
/**
 * Compare two doses for clinical equivalence
 */
declare function compareDoses(actual: string, expected: string): DoseComparison;
/**
 * Compare medication signatures for clinical equivalence
 */
declare function compareSignatures(actual: string, expected: string): SignatureComparison;
/**
 * Matcher: toClinicallyEqual
 * Compares two medication signatures for clinical equivalence
 */
declare function toClinicallyEqual(this: jest.MatcherContext, received: any, expected: any): ClinicalComparisonResult;
/**
 * Matcher: toHaveValidDoseFormat
 * Validates that a signature has properly formatted dose
 */
declare function toHaveValidDoseFormat(this: jest.MatcherContext, received: any): ClinicalComparisonResult;
/**
 * Matcher: toMatchSignatureStructure
 * Validates FHIR-compliant signature structure
 */
declare function toMatchSignatureStructure(this: jest.MatcherContext, received: any): ClinicalComparisonResult;
/**
 * Matcher: toBeWithinDoseTolerance
 * Compares numeric doses with clinical tolerance
 */
declare function toBeWithinDoseTolerance(this: jest.MatcherContext, received: number, expected: number, tolerance?: number): ClinicalComparisonResult;
declare global {
    namespace jest {
        interface Matchers<R> {
            toClinicallyEqual(expected: any): R;
            toHaveValidDoseFormat(): R;
            toMatchSignatureStructure(): R;
            toBeWithinDoseTolerance(expected: number, tolerance?: number): R;
        }
    }
}
export declare const clinicalMatchers: {
    toClinicallyEqual: typeof toClinicallyEqual;
    toHaveValidDoseFormat: typeof toHaveValidDoseFormat;
    toMatchSignatureStructure: typeof toMatchSignatureStructure;
    toBeWithinDoseTolerance: typeof toBeWithinDoseTolerance;
};
export { compareDoses, compareSignatures, normalizeDoseText, extractDose };
//# sourceMappingURL=clinical-matchers.d.ts.map