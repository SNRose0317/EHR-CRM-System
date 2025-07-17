/**
 * RouteValidator Tests
 * 
 * Comprehensive test suite for the centralized route validation system
 * 
 * @since 2025-01-17
 */

import { RouteValidator } from '../RouteValidator';
import type { RouteValidationResult, RouteMetadata } from '../RouteValidator';

describe('RouteValidator', () => {
  describe('validateRoute', () => {
    it('should validate valid routes', () => {
      const result = RouteValidator.validateRoute('Orally');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate routes with aliases', () => {
      const result = RouteValidator.validateRoute('by mouth');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle case insensitive routes', () => {
      const result = RouteValidator.validateRoute('ORALLY');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty routes', () => {
      const result = RouteValidator.validateRoute('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Route is required');
    });

    it('should reject invalid routes', () => {
      const result = RouteValidator.validateRoute('InvalidRoute');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Invalid route');
      expect(result.suggestedRoutes).toBeDefined();
    });

    it('should provide route suggestions for invalid routes', () => {
      const result = RouteValidator.validateRoute('oral');
      expect(result.isValid).toBe(true);
      
      const invalidResult = RouteValidator.validateRoute('oraly');
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.suggestedRoutes).toBeDefined();
      expect(invalidResult.suggestedRoutes!.length).toBeGreaterThan(0);
      expect(invalidResult.suggestedRoutes).toContain('Orally');
    });
  });

  describe('validateRoute with doseForm', () => {
    it('should validate route compatibility with dose form', () => {
      const result = RouteValidator.validateRoute('Orally', 'Tablet');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject incompatible route-dose form combinations', () => {
      const result = RouteValidator.validateRoute('Intramuscularly', 'Tablet');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('not applicable for dose form');
    });

    it('should validate injection routes with compatible dose forms', () => {
      const result = RouteValidator.validateRoute('Intramuscularly', 'Vial');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate topical routes with compatible dose forms', () => {
      const result = RouteValidator.validateRoute('Topically', 'Cream');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('isValidRoute', () => {
    it('should return true for valid routes', () => {
      expect(RouteValidator.isValidRoute('Orally')).toBe(true);
      expect(RouteValidator.isValidRoute('Intramuscularly')).toBe(true);
      expect(RouteValidator.isValidRoute('Topically')).toBe(true);
    });

    it('should return true for route aliases', () => {
      expect(RouteValidator.isValidRoute('by mouth')).toBe(true);
      expect(RouteValidator.isValidRoute('im')).toBe(true);
      expect(RouteValidator.isValidRoute('topical')).toBe(true);
    });

    it('should return false for invalid routes', () => {
      expect(RouteValidator.isValidRoute('InvalidRoute')).toBe(false);
      expect(RouteValidator.isValidRoute('')).toBe(false);
    });

    it('should handle case insensitive validation', () => {
      expect(RouteValidator.isValidRoute('ORALLY')).toBe(true);
      expect(RouteValidator.isValidRoute('orally')).toBe(true);
      expect(RouteValidator.isValidRoute('Orally')).toBe(true);
    });
  });

  describe('getAllowedRoutesForDoseForm', () => {
    it('should return allowed routes for tablets', () => {
      const routes = RouteValidator.getAllowedRoutesForDoseForm('Tablet');
      expect(routes).toContain('Orally');
      expect(routes).toContain('Sublingually');
      expect(routes).not.toContain('Intramuscularly');
    });

    it('should return allowed routes for vials', () => {
      const routes = RouteValidator.getAllowedRoutesForDoseForm('Vial');
      expect(routes).toContain('Intramuscularly');
      expect(routes).toContain('Subcutaneous');
      expect(routes).not.toContain('Orally');
    });

    it('should return allowed routes for creams', () => {
      const routes = RouteValidator.getAllowedRoutesForDoseForm('Cream');
      expect(routes).toContain('Topically');
      expect(routes).toContain('Rectally');
      expect(routes).toContain('Vaginally');
      expect(routes).not.toContain('Orally');
    });

    it('should throw error for invalid dose form', () => {
      expect(() => {
        RouteValidator.getAllowedRoutesForDoseForm('InvalidDoseForm');
      }).toThrow('Invalid dose form');
    });
  });

  describe('getRouteMetadata', () => {
    it('should return metadata for valid routes', () => {
      const metadata = RouteValidator.getRouteMetadata('Orally');
      expect(metadata).not.toBeNull();
      expect(metadata!.name).toBe('Orally');
      expect(metadata!.code).toBe('PO');
      expect(metadata!.fhirCode).toBe('PO');
      expect(metadata!.humanReadable).toBe('by mouth');
    });

    it('should return metadata for route aliases', () => {
      const metadata = RouteValidator.getRouteMetadata('by mouth');
      expect(metadata).not.toBeNull();
      expect(metadata!.name).toBe('Orally');
    });

    it('should return null for invalid routes', () => {
      const metadata = RouteValidator.getRouteMetadata('InvalidRoute');
      expect(metadata).toBeNull();
    });

    it('should include applicable forms in metadata', () => {
      const metadata = RouteValidator.getRouteMetadata('Orally');
      expect(metadata!.applicableForms).toContain('Tablet');
      expect(metadata!.applicableForms).toContain('Capsule');
      expect(metadata!.applicableForms).toContain('Solution');
    });
  });

  describe('getAllRoutes', () => {
    it('should return all available routes', () => {
      const routes = RouteValidator.getAllRoutes();
      expect(routes.length).toBeGreaterThan(0);
      expect(routes.some(r => r.name === 'Orally')).toBe(true);
      expect(routes.some(r => r.name === 'Intramuscularly')).toBe(true);
      expect(routes.some(r => r.name === 'Topically')).toBe(true);
    });

    it('should return routes with complete metadata', () => {
      const routes = RouteValidator.getAllRoutes();
      const oralRoute = routes.find(r => r.name === 'Orally');
      expect(oralRoute).toBeDefined();
      expect(oralRoute!.code).toBe('PO');
      expect(oralRoute!.fhirCode).toBe('PO');
      expect(oralRoute!.humanReadable).toBe('by mouth');
      expect(oralRoute!.applicableForms).toContain('Tablet');
    });
  });

  describe('validateRouteArray', () => {
    it('should validate valid route arrays', () => {
      const routes = ['Orally', 'Sublingually'];
      const result = RouteValidator.validateRouteArray(routes);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject non-array inputs', () => {
      const result = RouteValidator.validateRouteArray('not an array' as any);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Routes must be an array');
    });

    it('should warn about empty arrays', () => {
      const result = RouteValidator.validateRouteArray([]);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('No routes specified');
    });

    it('should validate each route in array', () => {
      const routes = ['Orally', 'InvalidRoute'];
      const result = RouteValidator.validateRouteArray(routes);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('InvalidRoute'))).toBe(true);
    });

    it('should handle route aliases in arrays', () => {
      const routes = ['by mouth', 'im'];
      const result = RouteValidator.validateRouteArray(routes);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('getDefaultRouteForDoseForm', () => {
    it('should return default route for tablets', () => {
      const defaultRoute = RouteValidator.getDefaultRouteForDoseForm('Tablet');
      expect(defaultRoute).toBe('Orally');
    });

    it('should return default route for vials', () => {
      const defaultRoute = RouteValidator.getDefaultRouteForDoseForm('Vial');
      expect(defaultRoute).toBe('Intramuscularly');
    });

    it('should return default route for creams', () => {
      const defaultRoute = RouteValidator.getDefaultRouteForDoseForm('Cream');
      expect(defaultRoute).toBe('Topically');
    });

    it('should return null for invalid dose form', () => {
      const defaultRoute = RouteValidator.getDefaultRouteForDoseForm('InvalidDoseForm');
      expect(defaultRoute).toBeNull();
    });
  });

  describe('requiresSpecialInstructions', () => {
    it('should return true for routes requiring special instructions', () => {
      expect(RouteValidator.requiresSpecialInstructions('Intramuscularly')).toBe(true);
      expect(RouteValidator.requiresSpecialInstructions('Subcutaneous')).toBe(true);
      expect(RouteValidator.requiresSpecialInstructions('Topically')).toBe(true);
    });

    it('should return false for routes not requiring special instructions', () => {
      expect(RouteValidator.requiresSpecialInstructions('Orally')).toBe(false);
      expect(RouteValidator.requiresSpecialInstructions('Intranasal')).toBe(false);
    });

    it('should handle route aliases', () => {
      expect(RouteValidator.requiresSpecialInstructions('im')).toBe(true);
      expect(RouteValidator.requiresSpecialInstructions('by mouth')).toBe(false);
    });
  });

  describe('getSpecialInstructionsTemplate', () => {
    it('should return template for routes with special instructions', () => {
      const template = RouteValidator.getSpecialInstructionsTemplate('Intramuscularly');
      expect(template).toBe('Inject {dose} {route} into {site} {frequency}.');
    });

    it('should return template for topical routes', () => {
      const template = RouteValidator.getSpecialInstructionsTemplate('Topically');
      expect(template).toBe('Apply {dose} {route} {frequency}.');
    });

    it('should return null for routes without special instructions', () => {
      const template = RouteValidator.getSpecialInstructionsTemplate('Orally');
      expect(template).toBeNull();
    });

    it('should handle route aliases', () => {
      const template = RouteValidator.getSpecialInstructionsTemplate('im');
      expect(template).toBe('Inject {dose} {route} into {site} {frequency}.');
    });
  });

  describe('Route Alias Normalization', () => {
    const testCases = [
      // Oral aliases
      { input: 'oral', expected: 'Orally' },
      { input: 'po', expected: 'Orally' },
      { input: 'by mouth', expected: 'Orally' },
      { input: 'mouth', expected: 'Orally' },
      
      // Injection aliases
      { input: 'im', expected: 'Intramuscularly' },
      { input: 'intramuscular', expected: 'Intramuscularly' },
      { input: 'sc', expected: 'Subcutaneous' },
      { input: 'sq', expected: 'Subcutaneous' },
      { input: 'subcut', expected: 'Subcutaneous' },
      { input: 'subcutaneous', expected: 'Subcutaneous' },
      
      // Topical aliases
      { input: 'topical', expected: 'Topically' },
      { input: 'skin', expected: 'Topically' },
      { input: 'cutaneous', expected: 'Topically' },
      
      // Other aliases
      { input: 'sl', expected: 'Sublingually' },
      { input: 'nasal', expected: 'Intranasal' },
      { input: 'rectal', expected: 'Rectally' },
      { input: 'vaginal', expected: 'Vaginally' },
      { input: 'transdermal', expected: 'Transdermal' },
      { input: 'inhaled', expected: 'Inhaled' },
      { input: 'scalp', expected: 'On Scalp' }
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should normalize "${input}" to "${expected}"`, () => {
        const result = RouteValidator.validateRoute(input);
        expect(result.isValid).toBe(true);
        
        const metadata = RouteValidator.getRouteMetadata(input);
        expect(metadata!.name).toBe(expected);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle null/undefined routes gracefully', () => {
      const result = RouteValidator.validateRoute(null as any);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Route is required');
    });

    it('should handle whitespace-only routes', () => {
      const result = RouteValidator.validateRoute('   ');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Route is required');
    });

    it('should provide helpful error messages', () => {
      const result = RouteValidator.validateRoute('InvalidRoute');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Invalid route');
      expect(result.errors[0]).toContain('InvalidRoute');
      expect(result.errors[0]).toContain('not found in system definitions');
    });
  });

  describe('Integration with Constants', () => {
    it('should use actual route definitions from constants', () => {
      // Test that we're using real constants, not hardcoded values
      const metadata = RouteValidator.getRouteMetadata('Orally');
      expect(metadata!.fhirCode).toBe('PO');
      expect(metadata!.description).toBe('Administration by mouth');
    });

    it('should use actual dose form definitions from constants', () => {
      const routes = RouteValidator.getAllowedRoutesForDoseForm('Tablet');
      expect(routes).toContain('Orally');
      expect(routes).toContain('Sublingually');
    });

    it('should match dose form applicability rules', () => {
      const result = RouteValidator.validateRoute('Orally', 'Tablet');
      expect(result.isValid).toBe(true);
      
      const invalidResult = RouteValidator.validateRoute('Intramuscularly', 'Tablet');
      expect(invalidResult.isValid).toBe(false);
    });
  });
});