/**
 * Centralized Route Validation System
 *
 * This class provides centralized validation for administration routes,
 * replacing the fragmented validation logic across individual builders.
 *
 * @since 2025-01-17
 */
import { routes, doseForms } from '../../constants/medication-data';
/**
 * Centralized route validation using constants file
 */
export class RouteValidator {
    /**
     * Validate a route against the centralized route definitions
     */
    static validateRoute(route, doseForm) {
        const result = {
            isValid: false,
            errors: [],
            warnings: []
        };
        if (!route || route.trim() === '') {
            result.errors.push('Route is required');
            return result;
        }
        // Normalize route name
        const normalizedRoute = this.normalizeRoute(route);
        // Check if route exists in our definitions
        if (!this.isValidRoute(normalizedRoute)) {
            result.errors.push(`Invalid route: "${route}". Route not found in system definitions.`);
            result.suggestedRoutes = this.getSuggestedRoutes(route);
            return result;
        }
        // If dose form is provided, validate compatibility (only if dose form exists in constants)
        if (doseForm && doseForms[doseForm]) {
            const compatibility = this.validateRouteCompatibility(normalizedRoute, doseForm);
            if (!compatibility.isValid) {
                result.errors.push(...compatibility.errors);
                result.warnings.push(...compatibility.warnings);
                return result;
            }
        }
        else if (doseForm && !doseForms[doseForm]) {
            // If dose form is not in constants, add a warning but don't fail validation
            result.warnings.push(`Dose form "${doseForm}" not found in system definitions. Skipping dose form compatibility check.`);
        }
        result.isValid = true;
        return result;
    }
    /**
     * Check if a route is valid according to central definitions
     */
    static isValidRoute(route) {
        const normalizedRoute = this.normalizeRoute(route);
        return routes.hasOwnProperty(normalizedRoute);
    }
    /**
     * Get all allowed routes for a specific dose form
     */
    static getAllowedRoutesForDoseForm(doseForm) {
        const doseFormData = doseForms[doseForm];
        if (!doseFormData) {
            throw new Error(`Invalid dose form: ${doseForm}`);
        }
        return doseFormData.applicableRoutes || [];
    }
    /**
     * Get route metadata from central definitions
     */
    static getRouteMetadata(route) {
        const normalizedRoute = this.normalizeRoute(route);
        const routeData = routes[normalizedRoute];
        if (!routeData) {
            return null;
        }
        return {
            id: routeData.id,
            name: routeData.name,
            code: routeData.code,
            description: routeData.description,
            applicableForms: routeData.applicableForms,
            humanReadable: routeData.humanReadable,
            fhirCode: routeData.fhirCode,
            requiresSpecialInstructions: routeData.requiresSpecialInstructions,
            specialInstructionsTemplate: routeData.specialInstructionsTemplate,
            verbMap: routeData.verbMap
        };
    }
    /**
     * Get all available routes
     */
    static getAllRoutes() {
        return Object.values(routes).map(route => ({
            id: route.id,
            name: route.name,
            code: route.code,
            description: route.description,
            applicableForms: route.applicableForms,
            humanReadable: route.humanReadable,
            fhirCode: route.fhirCode,
            requiresSpecialInstructions: route.requiresSpecialInstructions,
            specialInstructionsTemplate: route.specialInstructionsTemplate,
            verbMap: route.verbMap
        }));
    }
    /**
     * Validate route compatibility with dose form
     */
    static validateRouteCompatibility(route, doseForm) {
        const result = {
            isValid: false,
            errors: [],
            warnings: []
        };
        const routeData = routes[route];
        const doseFormData = doseForms[doseForm];
        if (!routeData) {
            result.errors.push(`Route "${route}" not found in system definitions`);
            return result;
        }
        if (!doseFormData) {
            result.errors.push(`Dose form "${doseForm}" not found in system definitions`);
            return result;
        }
        // Check if route is applicable for this dose form
        if (!routeData.applicableForms.includes(doseForm)) {
            result.errors.push(`Route "${route}" is not applicable for dose form "${doseForm}". ` +
                `Applicable forms: ${routeData.applicableForms.join(', ')}`);
            return result;
        }
        // Check if dose form allows this route
        if (!doseFormData.applicableRoutes.includes(route)) {
            result.errors.push(`Dose form "${doseForm}" does not allow route "${route}". ` +
                `Allowed routes: ${doseFormData.applicableRoutes.join(', ')}`);
            return result;
        }
        result.isValid = true;
        return result;
    }
    /**
     * Normalize route name using aliases
     */
    static normalizeRoute(route) {
        const normalized = route.toLowerCase().trim();
        const aliasResult = this.ROUTE_ALIASES.get(normalized);
        if (aliasResult) {
            return aliasResult;
        }
        // Check if the route matches a canonical route name (case insensitive)
        for (const canonicalRoute of Object.keys(routes)) {
            if (canonicalRoute.toLowerCase() === normalized) {
                return canonicalRoute;
            }
        }
        return route;
    }
    /**
     * Get suggested routes based on partial match
     */
    static getSuggestedRoutes(route) {
        const normalized = route.toLowerCase().trim();
        const suggestions = [];
        // Check aliases first
        for (const [alias, canonical] of this.ROUTE_ALIASES.entries()) {
            if (alias.includes(normalized) || normalized.includes(alias)) {
                suggestions.push(canonical);
            }
        }
        // Check route names
        for (const routeName of Object.keys(routes)) {
            if (routeName.toLowerCase().includes(normalized) ||
                normalized.includes(routeName.toLowerCase())) {
                suggestions.push(routeName);
            }
        }
        // Check for fuzzy matches (simple edit distance)
        for (const routeName of Object.keys(routes)) {
            const routeLower = routeName.toLowerCase();
            if (this.getEditDistance(normalized, routeLower) <= 2) {
                suggestions.push(routeName);
            }
        }
        // Remove duplicates and return top 3
        return [...new Set(suggestions)].slice(0, 3);
    }
    /**
     * Simple edit distance calculation for fuzzy matching
     */
    static getEditDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                }
                else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
                }
            }
        }
        return matrix[str2.length][str1.length];
    }
    /**
     * Validate an array of routes (for medication.allowedRoutes)
     */
    static validateRouteArray(routes) {
        const result = {
            isValid: true,
            errors: [],
            warnings: []
        };
        if (!Array.isArray(routes)) {
            result.errors.push('Routes must be an array');
            result.isValid = false;
            return result;
        }
        if (routes.length === 0) {
            result.warnings.push('No routes specified');
            return result;
        }
        for (const route of routes) {
            const validation = this.validateRoute(route);
            if (!validation.isValid) {
                result.errors.push(...validation.errors);
                result.warnings.push(...validation.warnings);
                result.isValid = false;
            }
        }
        return result;
    }
    /**
     * Get the default route for a dose form
     */
    static getDefaultRouteForDoseForm(doseForm) {
        const doseFormData = doseForms[doseForm];
        return doseFormData?.defaultRoute || null;
    }
    /**
     * Check if a route requires special instructions
     */
    static requiresSpecialInstructions(route) {
        const normalizedRoute = this.normalizeRoute(route);
        const routeData = routes[normalizedRoute];
        return routeData?.requiresSpecialInstructions || false;
    }
    /**
     * Get special instructions template for a route
     */
    static getSpecialInstructionsTemplate(route) {
        const normalizedRoute = this.normalizeRoute(route);
        const routeData = routes[normalizedRoute];
        return routeData?.specialInstructionsTemplate || null;
    }
}
RouteValidator.ROUTE_ALIASES = new Map([
    // Oral aliases
    ['oral', 'Orally'],
    ['po', 'Orally'],
    ['by mouth', 'Orally'],
    ['mouth', 'Orally'],
    // Injection aliases
    ['im', 'Intramuscularly'],
    ['intramuscular', 'Intramuscularly'],
    ['intramuscularly', 'Intramuscularly'],
    ['sc', 'Subcutaneous'],
    ['sq', 'Subcutaneous'],
    ['subcut', 'Subcutaneous'],
    ['subcutaneous', 'Subcutaneous'],
    ['subcutaneously', 'Subcutaneous'],
    ['iv', 'Intravenous'],
    ['intravenous', 'Intravenous'],
    ['intravenously', 'Intravenous'],
    // Topical aliases
    ['topical', 'Topically'],
    ['skin', 'Topically'],
    ['cutaneous', 'Topically'],
    // Sublingual aliases
    ['sl', 'Sublingually'],
    ['sublingual', 'Sublingually'],
    ['under tongue', 'Sublingually'],
    // Nasal aliases
    ['nasal', 'Intranasal'],
    ['nose', 'Intranasal'],
    ['nostril', 'Intranasal'],
    // Rectal aliases
    ['rectal', 'Rectally'],
    ['pr', 'Rectally'],
    // Vaginal aliases
    ['vaginal', 'Vaginally'],
    ['pv', 'Vaginally'],
    // Transdermal aliases
    ['transdermal', 'Transdermal'],
    ['patch', 'Transdermal'],
    ['td', 'Transdermal'],
    // Inhalation aliases
    ['inhaled', 'Inhaled'],
    ['inhalation', 'Inhaled'],
    ['breathe', 'Inhaled'],
    // Scalp aliases
    ['scalp', 'On Scalp'],
    ['head', 'On Scalp']
]);
//# sourceMappingURL=RouteValidator.js.map