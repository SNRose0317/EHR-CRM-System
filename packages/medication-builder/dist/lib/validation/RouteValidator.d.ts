/**
 * Centralized Route Validation System
 *
 * This class provides centralized validation for administration routes,
 * replacing the fragmented validation logic across individual builders.
 *
 * @since 2025-01-17
 */
export interface RouteValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    suggestedRoutes?: string[];
}
export interface RouteMetadata {
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
/**
 * Centralized route validation using constants file
 */
export declare class RouteValidator {
    private static readonly ROUTE_ALIASES;
    /**
     * Validate a route against the centralized route definitions
     */
    static validateRoute(route: string, doseForm?: string): RouteValidationResult;
    /**
     * Check if a route is valid according to central definitions
     */
    static isValidRoute(route: string): boolean;
    /**
     * Get all allowed routes for a specific dose form
     */
    static getAllowedRoutesForDoseForm(doseForm: string): string[];
    /**
     * Get route metadata from central definitions
     */
    static getRouteMetadata(route: string): RouteMetadata | null;
    /**
     * Get all available routes
     */
    static getAllRoutes(): RouteMetadata[];
    /**
     * Validate route compatibility with dose form
     */
    private static validateRouteCompatibility;
    /**
     * Normalize route name using aliases
     */
    private static normalizeRoute;
    /**
     * Get suggested routes based on partial match
     */
    private static getSuggestedRoutes;
    /**
     * Simple edit distance calculation for fuzzy matching
     */
    private static getEditDistance;
    /**
     * Validate an array of routes (for medication.allowedRoutes)
     */
    static validateRouteArray(routes: string[]): RouteValidationResult;
    /**
     * Get the default route for a dose form
     */
    static getDefaultRouteForDoseForm(doseForm: string): string | null;
    /**
     * Check if a route requires special instructions
     */
    static requiresSpecialInstructions(route: string): boolean;
    /**
     * Get special instructions template for a route
     */
    static getSpecialInstructionsTemplate(route: string): string | null;
}
//# sourceMappingURL=RouteValidator.d.ts.map