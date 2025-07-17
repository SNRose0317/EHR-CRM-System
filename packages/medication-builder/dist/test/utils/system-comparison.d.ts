/**
 * System Comparison Framework
 *
 * Provides sophisticated comparison between legacy signature generation
 * and new Epic 3 builder system outputs with detailed analysis.
 *
 * @since 3.1.0
 */
import type { SignatureResult } from '../../types';
import type { GoldenTestCase, TestResult } from './golden-master-runner';
export interface SystemComparisonResult {
    testCaseId: string;
    comparisonType: 'identical' | 'clinically-equivalent' | 'different' | 'error';
    confidence: number;
    differences: SystemDifference[];
    legacyOutput: SignatureResult;
    newSystemOutput: SignatureResult;
    legacyExecutionTime: number;
    newSystemExecutionTime: number;
    performanceRatio: number;
    summary: string;
}
export interface SystemDifference {
    component: 'dose' | 'route' | 'frequency' | 'instructions' | 'structure' | 'performance';
    severity: 'critical' | 'major' | 'minor' | 'cosmetic';
    description: string;
    legacyValue: string;
    newSystemValue: string;
    clinicalImpact: 'none' | 'low' | 'medium' | 'high';
    recommendation?: string;
}
export interface ComparisonReport {
    summary: {
        totalComparisons: number;
        identical: number;
        clinicallyEquivalent: number;
        different: number;
        errors: number;
        overallAgreement: number;
    };
    performance: {
        legacyAverageTime: number;
        newSystemAverageTime: number;
        performanceImprovement: number;
        p95LegacyTime: number;
        p95NewSystemTime: number;
    };
    differences: {
        critical: SystemDifference[];
        major: SystemDifference[];
        minor: SystemDifference[];
        cosmetic: SystemDifference[];
    };
    categoryBreakdown: Record<string, {
        total: number;
        identical: number;
        equivalent: number;
        different: number;
    }>;
    recommendations: string[];
}
/**
 * Compare outputs from legacy and new systems
 */
export declare function compareSystemOutputs(testCase: GoldenTestCase, legacyResult: TestResult, newSystemResult: TestResult): SystemComparisonResult;
/**
 * Generate comprehensive comparison report
 */
export declare function generateComparisonReport(comparisons: SystemComparisonResult[]): ComparisonReport;
/**
 * Export comparison results for regulatory documentation
 */
export declare function exportComparisonDocumentation(report: ComparisonReport): any;
//# sourceMappingURL=system-comparison.d.ts.map