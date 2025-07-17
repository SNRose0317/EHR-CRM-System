/**
 * Async Route Validation System
 *
 * Database-backed route validation that integrates with the centralized
 * route management system. This complements the synchronous RouteValidator
 * for scenarios requiring real-time database validation.
 *
 * @since 2025-01-18
 */
import type { RouteValidationResult, RouteMetadata } from './RouteValidator';
/**
 * Async route validator using database-backed API
 */
export declare class AsyncRouteValidator {
    /**
     * Validate a route against the database
     */
    static validateRoute(route: string, doseForm?: string): Promise<RouteValidationResult>;
    /**
     * Check if a route is valid according to database
     */
    static isValidRoute(route: string): Promise<boolean>;
    /**
     * Get all available routes from database
     */
    static getAllRoutes(): Promise<RouteMetadata[]>;
    /**
     * Get route metadata from database
     */
    static getRouteMetadata(route: string): Promise<RouteMetadata | null>;
    /**
     * Get allowed routes for a specific dose form from database
     */
    static getAllowedRoutesForDoseForm(doseForm: string): Promise<string[]>;
    /**
     * Validate an array of routes against the database
     */
    static validateRouteArray(routes: string[]): Promise<RouteValidationResult>;
    /**
     * Get the default route for a dose form
     * Note: This requires the dose form to be defined with a default route
     */
    static getDefaultRouteForDoseForm(doseForm: string): Promise<string | null>;
    /**
     * Check if a route requires special instructions
     */
    static requiresSpecialInstructions(route: string): Promise<boolean>;
    /**
     * Get special instructions template for a route
     */
    static getSpecialInstructionsTemplate(route: string): Promise<string | null>;
    /**
     * Get suggested routes based on fuzzy search and aliases
     */
    private static getSuggestedRoutes;
    /**
     * Get route usage statistics
     */
    static getRouteUsage(routeId: string): Promise<any>;
    /**
     * Get route statistics for analytics
     */
    static getRouteStatistics(daysBack?: number): Promise<any[]>;
    /**
     * Track route usage for analytics
     */
    static trackRouteUsage(medicationId: string, routeName: string): Promise<void>;
}
//# sourceMappingURL=AsyncRouteValidator.d.ts.map