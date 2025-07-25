/**
 * Golden Master Test Runner
 *
 * Manages execution of golden master tests with detailed comparison,
 * performance benchmarking, and approval workflow support.
 *
 * @since 3.1.0
 */
import { performance } from 'perf_hooks';
/**
 * Golden Master Test Runner
 * Executes test cases and compares outputs with sophisticated clinical comparison
 */
export class GoldenMasterRunner {
    constructor(testFunction, config = {}) {
        this.testFunction = testFunction;
        this.config = {
            parallelExecution: true,
            maxWorkers: Math.max(1, Math.floor(require('os').cpus().length / 2)),
            timeoutMs: 5000,
            enablePerformanceBenchmarks: true,
            strictComparison: false,
            approvalRequired: false,
            ...config
        };
    }
    /**
     * Run a single test case
     */
    async runTest(testCase) {
        const startTime = performance.now();
        try {
            // Execute the test function with timeout
            const actualOutput = await this.withTimeout(Promise.resolve(this.testFunction(testCase)), this.config.timeoutMs);
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            // Compare outputs
            const comparison = this.compareOutputs(actualOutput, {
                humanReadable: testCase.expected.humanReadable,
                fhirRepresentation: testCase.expected.fhirStructure || {}
            });
            return {
                testCase,
                passed: comparison.isEquivalent,
                actualOutput,
                expectedOutput: {
                    humanReadable: testCase.expected.humanReadable,
                    fhirRepresentation: testCase.expected.fhirStructure || {}
                },
                differences: comparison.differences.map(d => d.description),
                executionTime
            };
        }
        catch (error) {
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            return {
                testCase,
                passed: false,
                actualOutput: { humanReadable: '', fhirRepresentation: {} },
                expectedOutput: {
                    humanReadable: testCase.expected.humanReadable,
                    fhirRepresentation: testCase.expected.fhirStructure || {}
                },
                differences: [`Error executing test: ${error.message}`],
                executionTime,
                error: error
            };
        }
    }
    /**
     * Run multiple test cases
     */
    async runTests(testCases) {
        const startTime = performance.now();
        let results;
        if (this.config.parallelExecution && testCases.length > 1) {
            results = await this.runTestsInParallel(testCases);
        }
        else {
            results = await this.runTestsSequentially(testCases);
        }
        const endTime = performance.now();
        const totalExecutionTime = endTime - startTime;
        return this.generateReport(results, totalExecutionTime);
    }
    /**
     * Compare two signature outputs for clinical equivalence
     */
    compareOutputs(actual, expected) {
        const differences = [];
        let confidence = 1.0;
        // Compare human-readable text
        const textComparison = this.compareSignatureText(actual.humanReadable, expected.humanReadable);
        differences.push(...textComparison.differences);
        confidence *= textComparison.confidence;
        // Compare FHIR structure if both exist
        if (actual.fhirRepresentation && expected.fhirRepresentation) {
            const fhirComparison = this.compareFhirStructure(actual.fhirRepresentation, expected.fhirRepresentation);
            differences.push(...fhirComparison.differences);
            confidence *= fhirComparison.confidence;
        }
        // Determine if outputs are equivalent
        const criticalDifferences = differences.filter(d => d.severity === 'critical');
        const majorDifferences = differences.filter(d => d.severity === 'major');
        const isEquivalent = criticalDifferences.length === 0 &&
            (this.config.strictComparison ? majorDifferences.length === 0 : true);
        return {
            isEquivalent,
            confidence: Math.max(0, confidence),
            differences,
            summary: this.generateComparisonSummary(differences, confidence)
        };
    }
    /**
     * Generate comprehensive test report
     */
    generateReport(results, totalExecutionTime) {
        const passed = results.filter(r => r.passed);
        const failed = results.filter(r => !r.passed);
        const skipped = 0; // TODO: Implement skipped test support
        // Performance analysis
        const executionTimes = results.map(r => r.executionTime);
        const sortedTimes = [...executionTimes].sort((a, b) => a - b);
        const performance = {
            averageExecutionTime: executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length,
            p95ExecutionTime: sortedTimes[Math.floor(sortedTimes.length * 0.95)] || 0,
            p99ExecutionTime: sortedTimes[Math.floor(sortedTimes.length * 0.99)] || 0,
            slowestTests: results
                .sort((a, b) => b.executionTime - a.executionTime)
                .slice(0, 5)
                .map(r => ({ name: r.testCase.name, time: r.executionTime }))
        };
        // Category summary
        const categorySummary = {};
        for (const result of results) {
            const category = result.testCase.category;
            if (!categorySummary[category]) {
                categorySummary[category] = { passed: 0, total: 0 };
            }
            categorySummary[category].total++;
            if (result.passed) {
                categorySummary[category].passed++;
            }
        }
        return {
            summary: {
                totalTests: results.length,
                passed: passed.length,
                failed: failed.length,
                skipped,
                executionTime: totalExecutionTime,
                successRate: results.length > 0 ? passed.length / results.length : 0
            },
            results,
            failures: failed,
            performance,
            categorySummary
        };
    }
    /**
     * Run tests in parallel with worker limit
     */
    async runTestsInParallel(testCases) {
        const results = [];
        const chunks = this.chunkArray(testCases, this.config.maxWorkers);
        for (const chunk of chunks) {
            const chunkResults = await Promise.all(chunk.map(testCase => this.runTest(testCase)));
            results.push(...chunkResults);
        }
        return results;
    }
    /**
     * Run tests sequentially
     */
    async runTestsSequentially(testCases) {
        const results = [];
        for (const testCase of testCases) {
            const result = await this.runTest(testCase);
            results.push(result);
        }
        return results;
    }
    /**
     * Compare signature text for clinical equivalence
     */
    compareSignatureText(actual, expected) {
        const differences = [];
        let confidence = 1.0;
        // Normalize text for comparison
        const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, ' ').replace(/[.,]/g, '').trim();
        const normalizedActual = normalizeText(actual);
        const normalizedExpected = normalizeText(expected);
        // Exact match after normalization
        if (normalizedActual === normalizedExpected) {
            return { differences: [], confidence: 1.0 };
        }
        // Check individual components
        const components = ['dose', 'route', 'frequency', 'instructions'];
        for (const component of components) {
            const componentDiff = this.compareSignatureComponent(actual, expected, component);
            if (componentDiff) {
                differences.push(componentDiff);
                confidence *= 0.8; // Reduce confidence for each difference
            }
        }
        // If no specific components differ, it's a general text difference
        if (differences.length === 0) {
            differences.push({
                type: 'other',
                severity: 'minor',
                description: 'Text differs but no specific component identified',
                actual,
                expected
            });
            confidence *= 0.9;
        }
        return { differences, confidence };
    }
    /**
     * Compare specific component of signature
     */
    compareSignatureComponent(actual, expected, component) {
        // This is a simplified implementation - could be expanded with more sophisticated parsing
        switch (component) {
            case 'dose':
                // Extract dose patterns
                const doseRegex = /(\d+(?:\.\d+)?(?:\/\d+)?)\s*(tablet|capsule|ml|mg|mcg|g|click)s?/i;
                const actualDose = actual.match(doseRegex);
                const expectedDose = expected.match(doseRegex);
                if (actualDose && expectedDose && actualDose[0] !== expectedDose[0]) {
                    return {
                        type: 'dose',
                        severity: 'critical',
                        description: 'Dose amount or unit differs',
                        actual: actualDose[0],
                        expected: expectedDose[0]
                    };
                }
                break;
            case 'frequency':
                const freqRegex = /(once|twice|thrice|three times|four times)\s*(daily|weekly)/i;
                const actualFreq = actual.match(freqRegex);
                const expectedFreq = expected.match(freqRegex);
                if (actualFreq && expectedFreq && actualFreq[0] !== expectedFreq[0]) {
                    return {
                        type: 'frequency',
                        severity: 'critical',
                        description: 'Frequency differs',
                        actual: actualFreq[0],
                        expected: expectedFreq[0]
                    };
                }
                break;
            case 'route':
                const routeRegex = /(by mouth|orally|topically|intramuscularly|subcutaneously)/i;
                const actualRoute = actual.match(routeRegex);
                const expectedRoute = expected.match(routeRegex);
                if (actualRoute && expectedRoute && actualRoute[0] !== expectedRoute[0]) {
                    return {
                        type: 'route',
                        severity: 'major',
                        description: 'Route of administration differs',
                        actual: actualRoute[0],
                        expected: expectedRoute[0]
                    };
                }
                break;
        }
        return null;
    }
    /**
     * Compare FHIR structure
     */
    compareFhirStructure(actual, expected) {
        const differences = [];
        let confidence = 1.0;
        // Basic structure validation
        if (!actual.dosageInstruction && expected.dosageInstruction) {
            differences.push({
                type: 'structure',
                severity: 'critical',
                description: 'Missing dosageInstruction in actual output',
                actual: 'undefined',
                expected: 'defined'
            });
            confidence *= 0.5;
        }
        // TODO: Add more sophisticated FHIR comparison logic
        return { differences, confidence };
    }
    /**
     * Generate comparison summary text
     */
    generateComparisonSummary(differences, confidence) {
        if (differences.length === 0) {
            return 'Outputs are clinically equivalent';
        }
        const critical = differences.filter(d => d.severity === 'critical').length;
        const major = differences.filter(d => d.severity === 'major').length;
        const minor = differences.filter(d => d.severity === 'minor').length;
        let summary = `Found ${differences.length} difference(s): `;
        const parts = [];
        if (critical > 0)
            parts.push(`${critical} critical`);
        if (major > 0)
            parts.push(`${major} major`);
        if (minor > 0)
            parts.push(`${minor} minor`);
        summary += parts.join(', ');
        summary += `. Confidence: ${(confidence * 100).toFixed(1)}%`;
        return summary;
    }
    /**
     * Utility: Add timeout to promise
     */
    withTimeout(promise, timeoutMs) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Test timed out after ${timeoutMs}ms`)), timeoutMs);
        });
        return Promise.race([promise, timeoutPromise]);
    }
    /**
     * Utility: Split array into chunks
     */
    chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }
}
/**
 * Utility function to create a golden master runner for signature testing
 */
export function createSignatureGoldenMasterRunner(signatureFunction, config) {
    const testFunction = (testCase) => {
        return signatureFunction(testCase.input.medication, testCase.input.dose, testCase.input.route, testCase.input.frequency, testCase.input.specialInstructions);
    };
    return new GoldenMasterRunner(testFunction, config);
}
//# sourceMappingURL=golden-master-runner.js.map