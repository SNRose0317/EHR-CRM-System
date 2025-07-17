import { TemplateData } from './types';
import { MedicationRequestContext } from '../types/MedicationRequestContext';
/**
 * Builds template data from MedicationRequestContext
 * Handles all the complex logic for dose formatting, pluralization, etc.
 */
export declare class TemplateDataBuilder {
    /**
     * Build template data for tablet/capsule medications
     */
    static forTablet(context: MedicationRequestContext): TemplateData;
    /**
     * Build template data for liquid medications
     */
    static forLiquid(context: MedicationRequestContext): TemplateData;
    /**
     * Build template data for topical medications
     */
    static forTopical(context: MedicationRequestContext): TemplateData;
    /**
     * Build template data for injection medications
     */
    static forInjection(context: MedicationRequestContext): TemplateData;
    /**
     * Build template data for testosterone cypionate specifically
     */
    static forTestosteroneCypionate(context: MedicationRequestContext): TemplateData;
    /**
     * Build template data for PRN (as needed) medications
     */
    static forPRN(context: MedicationRequestContext): TemplateData;
    /**
     * Build template data for default/fallback case
     */
    static forDefault(context: MedicationRequestContext): TemplateData;
    /**
     * Format tablet doses with proper fractions
     * CRITICAL: Never go below 1/4 tablet
     */
    private static formatTabletDose;
    /**
     * Format tablet unit for display
     */
    private static formatTabletUnit;
    /**
     * Format route based on medication type
     */
    private static formatRoute;
    /**
     * Get default verb based on route
     */
    private static getDefaultVerb;
}
//# sourceMappingURL=TemplateDataBuilder.d.ts.map