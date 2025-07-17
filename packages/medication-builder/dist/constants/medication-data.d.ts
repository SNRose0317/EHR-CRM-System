export interface Frequency {
    id: string;
    name: string;
    count: number;
    frequency?: number;
    period?: number;
    periodUnit: string;
    humanReadable: string;
    abbreviation?: string;
    fhirMapping: {
        frequency?: number;
        period?: number;
        periodUnit: string;
        [key: string]: any;
    };
}
export declare const frequencies: Record<string, Frequency>;
export declare const getFrequency: (value: string) => Frequency | undefined;
export declare const frequencyOptions: {
    value: string;
    label: string;
}[];
export interface Route {
    id: string;
    name: string;
    code: string;
    description: string;
    applicableForms: string[];
    humanReadable: string;
    fhirCode: string;
    requiresSpecialInstructions: boolean;
    specialInstructionsTemplate?: string;
    verbMap?: Record<string, string>;
}
export declare const routes: Record<string, Route>;
export declare const routeOptions: {
    value: string;
    label: string;
}[];
export declare const getRoute: (value: string) => Route | undefined;
export interface DoseForm {
    id: string;
    name: string;
    isCountable: boolean;
    defaultUnit: string;
    pluralUnit: string;
    applicableRoutes: string[];
    defaultRoute: string;
    verb: string;
    hasSpecialDispenser?: boolean;
    dispenserConversion?: {
        dispenserUnit: string;
        dispenserPluralUnit: string;
        conversionRatio: number;
    };
}
export declare const doseForms: Record<string, DoseForm>;
export declare const doseFormOptions: {
    value: string;
    label: string;
}[];
export interface VerbMapping {
    doseForm: string;
    route: string;
    verb: string;
}
export declare const verbMappings: VerbMapping[];
export declare function getVerb(doseForm: string, route: string): string;
export interface DispenserType {
    id: string;
    name: string;
    defaultUnit: string;
    pluralUnit: string;
    defaultConversionRatio: number;
    applicableDoseForms: string[];
    maxAmountPerDose?: number;
}
export declare const dispenserTypes: Record<string, DispenserType>;
export declare const dispenserOptions: {
    value: string;
    label: string;
}[];
//# sourceMappingURL=medication-data.d.ts.map