import IntlMessageFormat from 'intl-messageformat';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
export class TemplateEngine {
    constructor(config = { locale: 'en-US' }) {
        this.templates = new Map();
        this.formatters = new Map();
        this.locale = config.locale;
        this.maxCacheSize = config.cacheSize ?? 100;
        this.enablePerformanceLogging = config.enablePerformanceLogging ?? false;
        this.performanceMetrics = {
            renderTime: 0,
            cacheHits: 0,
            cacheMisses: 0,
            templatesLoaded: 0
        };
        this.loadTemplates();
    }
    render(templateKey, data) {
        const startTime = this.enablePerformanceLogging ? performance.now() : 0;
        try {
            const cacheKey = `${this.locale}:${templateKey}`;
            let formatter = this.formatters.get(cacheKey);
            if (!formatter) {
                this.performanceMetrics.cacheMisses++;
                const template = this.getTemplate(templateKey);
                if (!template) {
                    throw new Error(`Template not found: ${templateKey} for locale: ${this.locale}`);
                }
                formatter = new IntlMessageFormat(template, this.locale || 'en-US');
                // Manage cache size
                if (this.formatters.size >= this.maxCacheSize) {
                    const firstKey = this.formatters.keys().next().value;
                    if (firstKey !== undefined) {
                        this.formatters.delete(firstKey);
                    }
                }
                this.formatters.set(cacheKey, formatter);
            }
            else {
                this.performanceMetrics.cacheHits++;
            }
            const result = formatter.format(data);
            if (this.enablePerformanceLogging) {
                const renderTime = performance.now() - startTime;
                this.performanceMetrics.renderTime += renderTime;
                if (renderTime > 1) {
                    console.warn(`Template render exceeded 1ms: ${templateKey} took ${renderTime.toFixed(2)}ms`);
                }
            }
            return result;
        }
        catch (error) {
            console.error(`Template rendering failed for ${templateKey}:`, error);
            return `[Template Error: ${templateKey}]`;
        }
    }
    setLocale(locale) {
        if (locale !== this.locale) {
            this.locale = locale;
            this.clearCache();
            this.loadTemplates();
        }
    }
    getPerformanceMetrics() {
        return { ...this.performanceMetrics };
    }
    clearCache() {
        this.formatters.clear();
        this.performanceMetrics = {
            renderTime: 0,
            cacheHits: 0,
            cacheMisses: 0,
            templatesLoaded: 0
        };
    }
    getTemplate(key) {
        const localeTemplates = this.templates.get(this.locale);
        return localeTemplates?.get(key);
    }
    loadTemplates() {
        // Load predefined templates from templates.ts
        if (!this.templates.has(this.locale)) {
            this.templates.set(this.locale, new Map());
            try {
                // Import predefined templates synchronously
                const { TEMPLATES, SPECIALIZED_TEMPLATES } = require('./templates');
                const localeTemplates = TEMPLATES[this.locale];
                const specializedTemplates = SPECIALIZED_TEMPLATES[this.locale];
                if (localeTemplates) {
                    Object.entries(localeTemplates).forEach(([key, template]) => {
                        this.registerTemplate(this.locale, key, template);
                    });
                }
                if (specializedTemplates) {
                    Object.entries(specializedTemplates).forEach(([key, template]) => {
                        this.registerTemplate(this.locale, key, template);
                    });
                }
                this.performanceMetrics.templatesLoaded = Object.keys(localeTemplates || {}).length + Object.keys(specializedTemplates || {}).length;
            }
            catch (error) {
                console.warn('Failed to load predefined templates:', error);
                this.performanceMetrics.templatesLoaded = 0;
            }
        }
    }
    // Method to register templates (used by template library)
    registerTemplate(locale, key, template) {
        if (!this.templates.has(locale)) {
            this.templates.set(locale, new Map());
        }
        const localeTemplates = this.templates.get(locale);
        localeTemplates.set(key, template);
        // Clear cache for this locale to force recompilation
        const cachePrefix = `${locale}:`;
        for (const cacheKey of this.formatters.keys()) {
            if (cacheKey.startsWith(cachePrefix)) {
                this.formatters.delete(cacheKey);
            }
        }
    }
}
//# sourceMappingURL=TemplateEngine.js.map