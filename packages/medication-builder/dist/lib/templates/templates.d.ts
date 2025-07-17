import { TemplateEngine } from './TemplateEngine';
import { TemplateKey } from './types';
export declare const TEMPLATES: {
    readonly 'en-US': {
        readonly ORAL_TABLET_TEMPLATE: "{verb} {doseText} {route} {frequency}{specialInstructions}.";
        readonly LIQUID_DOSE_TEMPLATE: "{verb} {doseValue} {doseUnit}{dualDose} {route} {frequency}{specialInstructions}.";
        readonly TOPICAL_APPLICATION_TEMPLATE: "{verb} {doseText} {route}{site} {frequency}{specialInstructions}.";
        readonly INJECTION_TEMPLATE: "{verb} {doseValue} {doseUnit}{dualDose} {route}{site} {frequency}{technique}.";
        readonly PRN_INSTRUCTION_TEMPLATE: "{verb} {doseText} {route} {frequencyText} as needed{indication}{maxDose}.";
        readonly DEFAULT_TEMPLATE: "{verb} {doseText} {route} {frequency}{specialInstructions}.";
    };
};
export declare const SPECIALIZED_TEMPLATES: {
    readonly 'en-US': {
        readonly TESTOSTERONE_INJECTION_TEMPLATE: "{verb} {doseValue} {doseUnit}, as {dualDose}, {route} {frequency}. {technique, select,\n      undefined {Rotate injection sites.}\n      other {{technique}}\n    }";
        readonly TOPICLICK_APPLICATION_TEMPLATE: "{verb} {doseValue, plural,\n      =1 {# click}\n      other {# clicks}\n    } {route}{site, select,\n      undefined {}\n      other { to {site}}\n    } {frequency}{specialInstructions, select,\n      undefined {}\n      other { {specialInstructions}}\n    }.";
        readonly COMPOUNDED_MEDICATION_TEMPLATE: "{verb} {doseValue} {doseUnit} of {medicationName} {route} {frequency}{specialInstructions, select,\n      undefined {}\n      other { {specialInstructions}}\n    }. {compoundingInstructions, select,\n      undefined {}\n      other {Compounding notes: {compoundingInstructions}}\n    }";
        readonly INSULIN_INJECTION_TEMPLATE: "{verb} {doseValue} {doseUnit, select,\n      unit {{doseValue, plural, one {unit} other {units}}}\n      other {{doseUnit}}\n    } {route} {frequency}{mealTiming, select,\n      undefined {}\n      other { {mealTiming}}\n    }{site, select,\n      undefined {}\n      other {. Rotate injection sites in {site}}\n    }.";
        readonly INHALER_TEMPLATE: "{verb} {doseValue, plural,\n      =1 {# puff}\n      other {# puffs}\n    } {route} {frequency}{spacerInstructions, select,\n      undefined {}\n      other { {spacerInstructions}}\n    }{rinseInstructions, select,\n      undefined {}\n      other { {rinseInstructions}}\n    }.";
        readonly DROPS_TEMPLATE: "{verb} {doseValue, plural,\n      =1 {# drop}\n      other {# drops}\n    } {route}{site, select,\n      undefined {}\n      other { in {site}}\n    } {frequency}{waitBetweenDrops, select,\n      undefined {}\n      other { {waitBetweenDrops}}\n    }.";
    };
};
export declare function createTemplateEngine(locale?: string): TemplateEngine;
export declare function validateTemplate(templateKey: TemplateKey, sampleData: Record<string, unknown>): boolean;
export declare const TEMPLATE_EXAMPLES: {
    readonly ORAL_TABLET_TEMPLATE: readonly [{
        readonly data: {
            readonly verb: "Take";
            readonly doseValue: 1;
            readonly doseUnit: "tablet";
            readonly route: "by mouth";
            readonly frequency: "twice daily";
        };
        readonly expected: "Take one tablet by mouth twice daily.";
    }, {
        readonly data: {
            readonly verb: "Take";
            readonly doseValue: 0.5;
            readonly doseUnit: "tablet";
            readonly route: "by mouth";
            readonly frequency: "daily";
            readonly specialInstructions: "with food";
        };
        readonly expected: "Take half a tablet by mouth daily with food.";
    }, {
        readonly data: {
            readonly verb: "Take";
            readonly doseValue: 2.5;
            readonly doseUnit: "tablet";
            readonly route: "by mouth";
            readonly frequency: "every 8 hours";
        };
        readonly expected: "Take 2.5 tablets by mouth every 8 hours.";
    }];
    readonly LIQUID_DOSE_TEMPLATE: readonly [{
        readonly data: {
            readonly verb: "Take";
            readonly doseValue: 5;
            readonly doseUnit: "mL";
            readonly route: "by mouth";
            readonly frequency: "twice daily";
        };
        readonly expected: "Take 5 mL by mouth twice daily.";
    }, {
        readonly data: {
            readonly verb: "Take";
            readonly doseValue: 10;
            readonly doseUnit: "mL";
            readonly dualDose: "500 mg";
            readonly route: "by mouth";
            readonly frequency: "daily";
        };
        readonly expected: "Take 10 mL, as 500 mg, by mouth daily.";
    }];
    readonly INJECTION_TEMPLATE: readonly [{
        readonly data: {
            readonly verb: "Inject";
            readonly doseValue: 0.5;
            readonly doseUnit: "mL";
            readonly dualDose: "100 mg";
            readonly route: "intramuscularly";
            readonly frequency: "weekly";
        };
        readonly expected: "Inject 0.5 mL, as 100 mg, intramuscularly weekly.";
    }, {
        readonly data: {
            readonly verb: "Inject";
            readonly doseValue: 1;
            readonly doseUnit: "mL";
            readonly route: "subcutaneously";
            readonly site: "abdomen";
            readonly frequency: "daily";
            readonly technique: "Rotate injection sites";
        };
        readonly expected: "Inject 1 mL subcutaneously into abdomen daily. Rotate injection sites.";
    }];
    readonly TOPICAL_APPLICATION_TEMPLATE: readonly [{
        readonly data: {
            readonly verb: "Apply";
            readonly route: "topically";
            readonly frequency: "twice daily";
        };
        readonly expected: "Apply a thin layer topically twice daily.";
    }, {
        readonly data: {
            readonly verb: "Apply";
            readonly doseValue: 2;
            readonly doseUnit: "grams";
            readonly route: "topically";
            readonly site: "affected area";
            readonly frequency: "once daily";
        };
        readonly expected: "Apply 2 grams topically to affected area once daily.";
    }];
    readonly PRN_INSTRUCTION_TEMPLATE: readonly [{
        readonly data: {
            readonly verb: "Take";
            readonly doseValue: 1;
            readonly doseUnit: "tablet";
            readonly route: "by mouth";
            readonly frequency: "every 4 hours";
        };
        readonly expected: "Take 1 tablet by mouth every 4 hours as needed.";
    }, {
        readonly data: {
            readonly verb: "Take";
            readonly doseRange: "1-2 tablets";
            readonly route: "by mouth";
            readonly frequencyRange: "every 4-6 hours";
            readonly indication: "pain";
            readonly maxDose: "8 tablets";
        };
        readonly expected: "Take 1-2 tablets by mouth every 4-6 hours as needed for pain. Do not exceed 8 tablets in 24 hours.";
    }];
};
//# sourceMappingURL=templates.d.ts.map