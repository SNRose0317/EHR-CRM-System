/**
 * Clinical Approval and Documentation System
 *
 * Manages the clinical review and approval workflow for golden master
 * test cases, ensuring all medication signatures are clinically validated.
 *
 * @since 3.1.0
 */
export interface ClinicalReviewer {
    id: string;
    name: string;
    credentials: string;
    licenseNumber?: string;
    licenseState?: string;
    specialties: string[];
    email: string;
    approvalLevel: 'pharmacist' | 'physician' | 'clinical-expert';
}
export interface ClinicalApproval {
    reviewerId: string;
    approvedDate: string;
    approvalType: 'initial' | 'revision' | 'annual-review';
    clinicalNotes?: string;
    riskAssessment?: 'low' | 'medium' | 'high';
    specialConsiderations?: string[];
    evidenceReferences?: string[];
    expirationDate?: string;
}
export interface ClinicalContext {
    indication: string;
    patientPopulation: 'adult' | 'pediatric' | 'geriatric' | 'all';
    clinicalGuidelines?: string[];
    contraindications?: string[];
    warnings?: string[];
    therapeuticClass: string;
    dosageRationale: string;
    routeJustification: string;
    frequencyRationale: string;
    alternativeOptions?: string[];
}
export interface ClinicalValidationReport {
    testCaseId: string;
    validationDate: string;
    clinicalContext: ClinicalContext;
    approvals: ClinicalApproval[];
    validationStatus: 'approved' | 'pending' | 'rejected' | 'requires-revision';
    clinicalAccuracy: {
        dosing: 'correct' | 'questionable' | 'incorrect';
        route: 'appropriate' | 'questionable' | 'inappropriate';
        frequency: 'standard' | 'acceptable' | 'unusual';
        overall: 'clinically-sound' | 'needs-review' | 'unsafe';
    };
    reviewNotes: string[];
    lastReviewDate: string;
    nextReviewDue?: string;
}
/**
 * Clinical reviewers database
 */
export declare const CLINICAL_REVIEWERS: Record<string, ClinicalReviewer>;
/**
 * Clinical validation templates for common scenarios
 */
export declare const CLINICAL_VALIDATION_TEMPLATES: {
    standardTablet: {
        indication: string;
        patientPopulation: "adult";
        therapeuticClass: string;
        dosageRationale: string;
        routeJustification: string;
        frequencyRationale: string;
    };
    fractionalTablet: {
        indication: string;
        patientPopulation: "adult";
        therapeuticClass: string;
        dosageRationale: string;
        routeJustification: string;
        frequencyRationale: string;
        specialConsiderations: string[];
    };
    liquidPediatric: {
        indication: string;
        patientPopulation: "pediatric";
        therapeuticClass: string;
        dosageRationale: string;
        routeJustification: string;
        frequencyRationale: string;
        specialConsiderations: string[];
    };
    injection: {
        indication: string;
        patientPopulation: "adult";
        therapeuticClass: string;
        dosageRationale: string;
        routeJustification: string;
        frequencyRationale: string;
        specialConsiderations: string[];
    };
    topicalDispenser: {
        indication: string;
        patientPopulation: "adult";
        therapeuticClass: string;
        dosageRationale: string;
        routeJustification: string;
        frequencyRationale: string;
        specialConsiderations: string[];
    };
    multiIngredient: {
        indication: string;
        patientPopulation: "adult";
        therapeuticClass: string;
        dosageRationale: string;
        routeJustification: string;
        frequencyRationale: string;
        specialConsiderations: string[];
    };
};
/**
 * Generate clinical validation report for a test case
 */
export declare function generateClinicalValidation(testCaseId: string, clinicalContext: Partial<ClinicalContext>, reviewerId: string, approvalType?: ClinicalApproval['approvalType']): ClinicalValidationReport;
/**
 * Validate clinical approval workflow
 */
export declare function validateApprovalWorkflow(report: ClinicalValidationReport): {
    valid: boolean;
    issues: string[];
};
/**
 * Generate approval documentation for test case
 */
export declare function generateApprovalDocumentation(testCaseId: string, customContext?: Partial<ClinicalContext>): ClinicalValidationReport;
/**
 * Batch generate approvals for multiple test cases
 */
export declare function batchGenerateApprovals(testCaseIds: string[]): Record<string, ClinicalValidationReport>;
/**
 * Export approval summary for regulatory documentation
 */
export declare function exportApprovalSummary(approvals: Record<string, ClinicalValidationReport>): any;
//# sourceMappingURL=clinical-approval.d.ts.map