export interface TemplateData {
    verb: string;
    doseValue?: number;
    doseUnit?: string;
    doseText?: string;
    route: string;
    frequency?: string;
    frequencyText?: string;
    dualDose?: string;
    doseRange?: string;
    frequencyRange?: string;
    site?: string;
    specialInstructions?: string;
    indication?: string;
    technique?: string;
    maxDose?: string;
    gender?: 'male' | 'female' | 'other';
    ingredients?: string[];
    [key: string]: unknown;
}
export interface TemplateConfig {
    locale: string;
    cacheSize?: number;
    enablePerformanceLogging?: boolean;
}
export interface TemplatePerformanceMetrics {
    renderTime: number;
    cacheHits: number;
    cacheMisses: number;
    templatesLoaded: number;
}
export type TemplateKey = 'ORAL_TABLET_TEMPLATE' | 'LIQUID_DOSE_TEMPLATE' | 'TOPICAL_APPLICATION_TEMPLATE' | 'INJECTION_TEMPLATE' | 'PRN_INSTRUCTION_TEMPLATE' | 'DEFAULT_TEMPLATE';
export interface LocaleTemplates {
    [key: string]: string;
}
export type TemplateLibrary = Map<string, Map<string, string>>;
export interface TemplateEngine {
    render(templateKey: TemplateKey, data: TemplateData): string;
    setLocale(locale: string): void;
    getPerformanceMetrics(): TemplatePerformanceMetrics;
    clearCache(): void;
}
//# sourceMappingURL=types.d.ts.map