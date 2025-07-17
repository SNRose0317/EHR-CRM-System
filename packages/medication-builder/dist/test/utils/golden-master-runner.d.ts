/**
 * Golden Master Test Runner
 *
 * Manages execution of golden master tests with detailed comparison,
 * performance benchmarking, and approval workflow support.
 *
 * @since 3.1.0
 */
import type { SignatureResult } from '../../types';
export interface GoldenTestCase {
    id: string;
    name: string;
    description: string;
    category: 'tablet' | 'liquid' | 'topical' | 'injection' | 'complex' | 'edge-case';
    input: {
        medication: any;
        dose: any;
        route: string;
        frequency: string;
        specialInstructions?: string;
    };
    expected: {
        humanReadable: string;
        fhirStructure?: any;
    };
    metadata: {
        approvedBy?: string;
        approvedDate?: string;
        clinicalIntent: string;
        lastReviewed?: string;
        version: string;
    };
}
export interface TestResult {
    testCase: GoldenTestCase;
    passed: boolean;
    actualOutput: SignatureResult;
    expectedOutput: SignatureResult;
    differences: string[];
    executionTime: number;
    error?: Error;
}
export interface ComparisonResult {
    isEquivalent: boolean;
    confidence: number;
    differences: Difference[];
    summary: string;
}
export interface Difference {
    type: 'dose' | 'frequency' | 'route' | 'instructions' | 'structure' | 'other';
    severity: 'critical' | 'major' | 'minor' | 'cosmetic';
    description: string;
    actual: string;
    expected: string;
    suggestion?: string;
}
export interface TestReport {
    summary: {
        totalTests: number;
        passed: number;
        failed: number;
        skipped: number;
        executionTime: number;
        successRate: number;
    };
    results: TestResult[];
    failures: TestResult[];
    performance: {
        averageExecutionTime: number;
        p95ExecutionTime: number;
        p99ExecutionTime: number;
        slowestTests: Array<{
            name: string;
            time: number;
        }>;
    };
    categorySummary: Record<string, {
        passed: number;
        total: number;
    }>;
}
export interface GoldenMasterConfig {
    parallelExecution: boolean;
    maxWorkers: number;
    timeoutMs: number;
    enablePerformanceBenchmarks: boolean;
    strictComparison: boolean;
    approvalRequired: boolean;
}
/**
 * Golden Master Test Runner
 * Executes test cases and compares outputs with sophisticated clinical comparison
 */
export declare class GoldenMasterRunner {
    private config;
    private testFunction;
    constructor(testFunction: (testCase: GoldenTestCase) => Promise<SignatureResult> | SignatureResult, config?: Partial<GoldenMasterConfig>);
    /**
     * Run a single test case
     */
    runTest(testCase: GoldenTestCase): Promise<TestResult>;
    /**
     * Run multiple test cases
     */
    runTests(testCases: GoldenTestCase[]): Promise<TestReport>;
    /**
     * Compare two signature outputs for clinical equivalence
     */
    compareOutputs(actual: SignatureResult, expected: SignatureResult): ComparisonResult;
    /**
     * Generate comprehensive test report
     */
    generateReport(results: TestResult[], totalExecutionTime: number): TestReport;
    /**
     * Run tests in parallel with worker limit
     */
    private runTestsInParallel;
    /**
     * Run tests sequentially
     */
    private runTestsSequentially;
    /**
     * Compare signature text for clinical equivalence
     */
    private compareSignatureText;
    /**
     * Compare specific component of signature
     */
    private compareSignatureComponent;
    /**
     * Compare FHIR structure
     */
    private compareFhirStructure;
    /**
     * Generate comparison summary text
     */
    private generateComparisonSummary;
    /**
     * Utility: Add timeout to promise
     */
    private withTimeout;
    /**
     * Utility: Split array into chunks
     */
    private chunkArray;
}
/**
 * Utility function to create a golden master runner for signature testing
 */
export declare function createSignatureGoldenMasterRunner(signatureFunction: (medication: any, dose: any, route: string, frequency: string, specialInstructions?: string) => SignatureResult, config?: Partial<GoldenMasterConfig>): GoldenMasterRunner;
//# sourceMappingURL=golden-master-runner.d.ts.map