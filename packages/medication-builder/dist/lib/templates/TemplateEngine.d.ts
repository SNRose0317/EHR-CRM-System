import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import { TemplateData, TemplateConfig, TemplateKey, TemplatePerformanceMetrics, TemplateEngine as ITemplateEngine } from './types';
export declare class TemplateEngine implements ITemplateEngine {
    private templates;
    private formatters;
    private locale;
    private performanceMetrics;
    private maxCacheSize;
    private enablePerformanceLogging;
    constructor(config?: TemplateConfig);
    render(templateKey: TemplateKey, data: TemplateData): string;
    setLocale(locale: string): void;
    getPerformanceMetrics(): TemplatePerformanceMetrics;
    clearCache(): void;
    private getTemplate;
    private loadTemplates;
    registerTemplate(locale: string, key: string, template: string): void;
}
//# sourceMappingURL=TemplateEngine.d.ts.map