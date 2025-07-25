/**
 * Tablet Base Strategy
 *
 * Handles oral solid medications (tablets, capsules) with
 * special support for fractional dosing and strength display.
 *
 * @since 3.0.0
 */
import { SpecificityLevel } from '../types';
import { createTemplateEngine } from '../../lib/templates/templates';
import { TemplateDataBuilder } from '../../lib/templates/TemplateDataBuilder';
export class TabletStrategy {
    constructor() {
        this.specificity = SpecificityLevel.DOSE_FORM;
        this.templateEngine = createTemplateEngine();
        this.metadata = {
            id: 'tablet-strategy',
            name: 'Tablet Strategy',
            description: 'Handles oral solid medications with fractional dosing support',
            examples: ['Metformin 500mg', 'Atorvastatin 20mg', 'Levothyroxine 50mcg'],
            version: '2.0.0'
        };
    }
    /**
     * Matches tablet and similar solid oral dose forms
     */
    matches(context) {
        const doseForm = context.medication?.doseForm?.toLowerCase() || '';
        const solidForms = ['tablet', 'capsule', 'troche', 'odt'];
        return solidForms.includes(doseForm);
    }
    /**
     * Builds instruction using template engine with tablet-specific formatting
     */
    buildInstruction(context) {
        const { medication, dose, frequency } = context;
        // Build template data with all complex logic handled
        const templateData = TemplateDataBuilder.forTablet(context);
        // Render text using template engine
        const text = this.templateEngine.render('ORAL_TABLET_TEMPLATE', templateData);
        // Build FHIR-compliant instruction
        return {
            text,
            timing: this.buildTiming(frequency),
            doseAndRate: dose ? [{
                    type: {
                        coding: [{
                                system: 'http://terminology.hl7.org/CodeSystem/dose-rate-type',
                                code: 'ordered',
                                display: 'Ordered'
                            }]
                    },
                    doseQuantity: {
                        value: dose.value,
                        unit: dose.unit
                    }
                }] : undefined,
            route: {
                coding: [{
                        system: 'http://snomed.info/sct',
                        code: '26643006', // Oral route
                        display: 'Oral'
                    }]
            },
            method: medication?.doseForm === 'ODT' ? {
                coding: [{
                        system: 'http://snomed.info/sct',
                        code: '421521009',
                        display: 'Swallow - dosing instruction'
                    }]
            } : undefined
        };
    }
    /**
     * Explains the strategy's behavior
     */
    explain() {
        return 'Tablet strategy: Uses template engine for internationalization-ready instructions with fractional dose support and proper pluralization';
    }
    /**
     * Builds FHIR timing from frequency string
     */
    buildTiming(frequency) {
        if (!frequency)
            return undefined;
        // Map common frequencies to FHIR timing
        const timingMap = {
            'once daily': {
                repeat: {
                    frequency: 1,
                    period: 1,
                    periodUnit: 'd',
                    when: ['MORN']
                }
            },
            'twice daily': {
                repeat: {
                    frequency: 2,
                    period: 1,
                    periodUnit: 'd',
                    when: ['MORN', 'EVE']
                }
            },
            'three times daily': {
                repeat: {
                    frequency: 3,
                    period: 1,
                    periodUnit: 'd',
                    when: ['MORN', 'AFT', 'EVE']
                }
            },
            'four times daily': {
                repeat: {
                    frequency: 4,
                    period: 1,
                    periodUnit: 'd',
                    when: ['MORN', 'NOON', 'AFT', 'EVE']
                }
            },
            'at bedtime': {
                repeat: {
                    frequency: 1,
                    period: 1,
                    periodUnit: 'd',
                    when: ['HS']
                }
            },
            'every morning': {
                repeat: {
                    frequency: 1,
                    period: 1,
                    periodUnit: 'd',
                    when: ['MORN']
                }
            }
        };
        return timingMap[frequency] || {
            code: {
                text: frequency
            }
        };
    }
    /**
     * Maps unit strings to UCUM codes
     */
    mapUnitCode(unit) {
        const unitMap = {
            'tablet': '{tbl}',
            'tablets': '{tbl}',
            'capsule': '{capsule}',
            'capsules': '{capsule}',
            'mg': 'mg',
            'mcg': 'ug',
            'g': 'g'
        };
        return unitMap[unit.toLowerCase()] || unit;
    }
}
//# sourceMappingURL=TabletStrategy.js.map