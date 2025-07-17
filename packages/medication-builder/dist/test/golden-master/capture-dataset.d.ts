/**
 * Golden Dataset Capture Utility
 *
 * Runs the legacy signature generation system against all test scenarios
 * and captures the outputs as the golden master baseline dataset.
 *
 * @since 3.1.0
 */
import type { GoldenTestCase } from '../utils/golden-master-runner';
export interface GoldenDatasetEntry {
    id: string;
    name: string;
    category: string;
    input: {
        medication: any;
        dose: any;
        route: string;
        frequency: string;
        specialInstructions?: string;
    };
    output: {
        humanReadable: string;
        fhirRepresentation: any;
        executionTime: number;
        timestamp: string;
    };
    metadata: {
        clinicalIntent: string;
        approvedBy?: string;
        approvedDate?: string;
        version: string;
        captureDate: string;
        legacySystemVersion: string;
    };
}
export interface GoldenDataset {
    metadata: {
        captureDate: string;
        totalCases: number;
        successfulCaptures: number;
        failedCaptures: number;
        legacySystemVersion: string;
        captureMethod: string;
    };
    entries: GoldenDatasetEntry[];
    failures: Array<{
        testCase: Partial<GoldenTestCase>;
        error: string;
        timestamp: string;
    }>;
}
/**
 * Capture golden dataset from legacy system
 */
export declare function captureGoldenDataset(): Promise<GoldenDataset>;
/**
 * Save golden dataset to JSON file
 */
export declare function saveGoldenDataset(dataset: GoldenDataset, filePath: string): void;
/**
 * Load golden dataset from JSON file
 */
export declare function loadGoldenDataset(filePath: string): GoldenDataset;
/**
 * Validate golden dataset integrity
 */
export declare function validateGoldenDataset(dataset: GoldenDataset): {
    valid: boolean;
    errors: string[];
};
/**
 * Generate summary statistics for dataset
 */
export declare function generateDatasetSummary(dataset: GoldenDataset): any;
//# sourceMappingURL=capture-dataset.d.ts.map