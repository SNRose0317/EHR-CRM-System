/**
 * Async Route Validation System
 *
 * Database-backed route validation that integrates with the centralized
 * route management system. This complements the synchronous RouteValidator
 * for scenarios requiring real-time database validation.
 *
 * @since 2025-01-18
 */
import { routeAPI } from '../../api/routes';
/**
 * Async route validator using database-backed API
 */
export class AsyncRouteValidator {
    /**
     * Validate a route against the database
     */
    static async validateRoute(route, doseForm) {
        const result = {
            isValid: false,
            errors: [],
            warnings: []
        };
        if (!route || route.trim() === '') {
            result.errors.push('Route is required');
            return result;
        }
        try {
            // Use database API for validation
            const validation = await routeAPI.validateRouteCompatibility(route, doseForm || '');
            result.isValid = validation.isValid;
            result.errors = validation.errors;
            result.warnings = validation.warnings;
            result.suggestedRoutes = validation.suggestedRoutes;
            // If no dose form was provided but route is invalid, try to find suggestions
            if (!validation.isValid && !doseForm) {
                try {
                    const suggestedRoutes = await this.getSuggestedRoutes(route);
                    result.suggestedRoutes = suggestedRoutes;
                }
                catch (error) {
                    // Continue without suggestions if lookup fails
                    console.warn('Failed to get route suggestions:', error);
                }
            }
            return result;
        }
        catch (error) {
            result.errors.push(`Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return result;
        }
    }
    /**
     * Check if a route is valid according to database
     */
    static async isValidRoute(route) {
        try {
            const validation = await this.validateRoute(route);
            return validation.isValid;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Get all available routes from database
     */
    static async getAllRoutes() {
        try {
            return await routeAPI.getAllRoutes();
        }
        catch (error) {
            console.error('Failed to get all routes:', error);
            return [];
        }
    }
    /**
     * Get route metadata from database
     */
    static async getRouteMetadata(route) {
        try {
            const allRoutes = await this.getAllRoutes();
            // First try exact name match
            let foundRoute = allRoutes.find(r => r.name.toLowerCase() === route.toLowerCase());
            if (!foundRoute) {
                // Try alias search
                const aliasResults = await routeAPI.searchRoutesByAlias(route);
                if (aliasResults.length > 0) {
                    foundRoute = aliasResults[0];
                }
            }
            return foundRoute || null;
        }
        catch (error) {
            console.error('Failed to get route metadata:', error);
            return null;
        }
    }
    /**
     * Get allowed routes for a specific dose form from database
     */
    static async getAllowedRoutesForDoseForm(doseForm) {
        try {
            const allRoutes = await this.getAllRoutes();
            return allRoutes
                .filter(route => route.applicableForms.includes(doseForm))
                .map(route => route.name);
        }
        catch (error) {
            console.error('Failed to get allowed routes for dose form:', error);
            return [];
        }
    }
    /**
     * Validate an array of routes against the database
     */
    static async validateRouteArray(routes) {
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
        // Validate each route
        for (const route of routes) {
            const validation = await this.validateRoute(route);
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
     * Note: This requires the dose form to be defined with a default route
     */
    static async getDefaultRouteForDoseForm(doseForm) {
        try {
            const allowedRoutes = await this.getAllowedRoutesForDoseForm(doseForm);
            // Return the first allowed route as default, or implement more sophisticated logic
            return allowedRoutes.length > 0 ? allowedRoutes[0] : null;
        }
        catch (error) {
            console.error('Failed to get default route for dose form:', error);
            return null;
        }
    }
    /**
     * Check if a route requires special instructions
     */
    static async requiresSpecialInstructions(route) {
        try {
            const metadata = await this.getRouteMetadata(route);
            return metadata?.requiresSpecialInstructions || false;
        }
        catch (error) {
            console.error('Failed to check special instructions requirement:', error);
            return false;
        }
    }
    /**
     * Get special instructions template for a route
     */
    static async getSpecialInstructionsTemplate(route) {
        try {
            const metadata = await this.getRouteMetadata(route);
            return metadata?.specialInstructionsTemplate || null;
        }
        catch (error) {
            console.error('Failed to get special instructions template:', error);
            return null;
        }
    }
    /**
     * Get suggested routes based on fuzzy search and aliases
     */
    static async getSuggestedRoutes(route) {
        try {
            const aliasResults = await routeAPI.searchRoutesByAlias(route);
            return aliasResults.map(r => r.name).slice(0, 3);
        }
        catch (error) {
            console.error('Failed to get suggested routes:', error);
            return [];
        }
    }
    /**
     * Get route usage statistics
     */
    static async getRouteUsage(routeId) {
        try {
            return await routeAPI.getRouteUsage(routeId);
        }
        catch (error) {
            console.error('Failed to get route usage:', error);
            return {
                routeId,
                totalUsage: 0,
                activeUsage: 0,
                lastUsed: null,
                topMedications: []
            };
        }
    }
    /**
     * Get route statistics for analytics
     */
    static async getRouteStatistics(daysBack = 30) {
        try {
            return await routeAPI.getRouteStatistics(daysBack);
        }
        catch (error) {
            console.error('Failed to get route statistics:', error);
            return [];
        }
    }
    /**
     * Track route usage for analytics
     */
    static async trackRouteUsage(medicationId, routeName) {
        try {
            await routeAPI.trackRouteUsage(medicationId, routeName);
        }
        catch (error) {
            console.error('Failed to track route usage:', error);
            // Don't throw - this is analytics, not critical functionality
        }
    }
}
//# sourceMappingURL=AsyncRouteValidator.js.map