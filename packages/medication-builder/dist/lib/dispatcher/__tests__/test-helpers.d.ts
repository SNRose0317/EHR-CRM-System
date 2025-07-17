/**
 * Test helpers for creating valid test data
 */
import { MedicationProfile } from '../../types/MedicationProfile';
import { MedicationRequestContext } from '../../types/MedicationRequestContext';
/**
 * Creates a valid MedicationProfile for testing
 */
export declare function createTestMedicationProfile(overrides?: Partial<MedicationProfile>): MedicationProfile;
/**
 * Creates a valid MedicationRequestContext for testing
 */
export declare function createTestContext(overrides?: Partial<MedicationRequestContext>): MedicationRequestContext;
/**
 * Creates a test DispenserInfo for Topiclick
 */
export declare function createTestTopiclickDispenser(): {
    type: string;
    unit: string;
    pluralUnit: string;
    conversionRatio: number;
};
//# sourceMappingURL=test-helpers.d.ts.map