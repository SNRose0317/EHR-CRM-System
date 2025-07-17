/**
 * Test helpers for creating valid test data
 */
/**
 * Creates a valid MedicationProfile for testing
 */
export function createTestMedicationProfile(overrides = {}) {
    return {
        id: 'test-med',
        name: 'Test Medication',
        type: 'medication',
        isActive: true,
        doseForm: 'Tablet',
        code: {
            coding: [{
                    display: 'Test Medication'
                }]
        },
        ingredient: [{
                name: 'Test Ingredient',
                strengthRatio: {
                    numerator: { value: 100, unit: 'mg' },
                    denominator: { value: 1, unit: 'tablet' }
                }
            }],
        ...overrides
    };
}
/**
 * Creates a valid MedicationRequestContext for testing
 */
export function createTestContext(overrides = {}) {
    return {
        id: 'test-request',
        timestamp: new Date().toISOString(),
        patient: { id: 'test-patient', age: 30 },
        medication: createTestMedicationProfile(overrides.medication || {}),
        dose: { value: 1, unit: 'tablet' },
        route: 'Orally',
        frequency: 'Twice Daily',
        ...overrides
    };
}
/**
 * Creates a test DispenserInfo for Topiclick
 */
export function createTestTopiclickDispenser() {
    return {
        type: 'Topiclick',
        unit: 'click',
        pluralUnit: 'clicks',
        conversionRatio: 4
    };
}
//# sourceMappingURL=test-helpers.js.map