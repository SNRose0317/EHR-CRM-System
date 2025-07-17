/**
 * Special Dispenser Test Cases for Golden Master Testing
 *
 * Comprehensive test cases for special delivery devices including
 * Topiclick dispensers, nasal sprays, inhalers, and other devices.
 *
 * @since 3.2.0
 */
import type { GoldenTestCase } from '../utils/golden-master-runner';
/**
 * Topiclick dispenser test cases (40 cases)
 * Testing 4-click conversion, mg calculations, and air-prime loss
 */
export declare const TOPICLICK_CASES: Partial<GoldenTestCase>[];
/**
 * Nasal spray test cases (30 cases)
 * Testing spray counting, priming, and dose tracking
 */
export declare const NASAL_SPRAY_CASES: Partial<GoldenTestCase>[];
/**
 * Inhaler test cases (20 cases)
 * Testing puff counting, spacer instructions, and dose tracking
 */
export declare const INHALER_CASES: Partial<GoldenTestCase>[];
/**
 * Other devices test cases (10 cases)
 * Testing nebulizers, dry powder inhalers, and other devices
 */
export declare const OTHER_DEVICE_CASES: Partial<GoldenTestCase>[];
/**
 * All special dispenser test cases organized by device type
 */
export declare const SPECIAL_DISPENSER_CASES: {
    topiclick: Partial<GoldenTestCase>[];
    nasalSprays: Partial<GoldenTestCase>[];
    inhalers: Partial<GoldenTestCase>[];
    otherDevices: Partial<GoldenTestCase>[];
};
/**
 * Get all special dispenser test cases as a flat array
 */
export declare function getAllSpecialDispenserCases(): Partial<GoldenTestCase>[];
/**
 * Get test cases by device category
 */
export declare function getSpecialDispenserCasesByCategory(category: keyof typeof SPECIAL_DISPENSER_CASES): Partial<GoldenTestCase>[];
/**
 * Get total count of special dispenser test cases
 */
export declare function getSpecialDispenserCaseCount(): number;
//# sourceMappingURL=special-dispenser-cases.d.ts.map