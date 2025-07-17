/**
 * Database Route Integration Tests
 * 
 * Integration tests for builders with database-backed route validation
 * 
 * @since 2025-01-18
 */

import { SimpleTabletBuilder } from '../SimpleTabletBuilder';
import { SimpleLiquidBuilder } from '../SimpleLiquidBuilder';
import { AsyncRouteValidator } from '../../validation/AsyncRouteValidator';
import { routeAPI } from '../../../api/routes';
import { MedicationProfile, ScoringType } from '../../../types/MedicationProfile';
import type { RouteMetadata } from '../../validation/RouteValidator';

// Mock the route API
jest.mock('../../../api/routes', () => ({
  routeAPI: {
    getAllRoutes: jest.fn(),
    validateRouteCompatibility: jest.fn(),
    searchRoutesByAlias: jest.fn(),
    getRouteUsage: jest.fn(),
    trackRouteUsage: jest.fn()
  }
}));

const mockedRouteAPI = routeAPI as jest.Mocked<typeof routeAPI>;

describe('Database Route Integration', () => {
  // Sample test data matching database structure
  const mockRoutes: RouteMetadata[] = [
    {
      id: '1',
      name: 'Orally',
      code: 'PO',
      description: 'Administration by mouth',
      applicableForms: ['Tablet', 'Capsule', 'Solution'],
      humanReadable: 'by mouth',
      fhirCode: 'PO',
      requiresSpecialInstructions: false,
      verbMap: { Tablet: 'Take', Capsule: 'Take', Solution: 'Take' }
    },
    {
      id: '2',
      name: 'Sublingually',
      code: 'SL',
      description: 'Administration under the tongue',
      applicableForms: ['Tablet'],
      humanReadable: 'under the tongue',
      fhirCode: 'SL',
      requiresSpecialInstructions: false,
      verbMap: { Tablet: 'Place' }
    },
    {
      id: '3',
      name: 'Intramuscularly',
      code: 'IM',
      description: 'Injection into muscle tissue',
      applicableForms: ['Vial', 'Pen', 'Solution'],
      humanReadable: 'intramuscularly',
      fhirCode: 'IM',
      requiresSpecialInstructions: true,
      specialInstructionsTemplate: 'Inject {dose} {route} into {site} {frequency}.',
      verbMap: {}
    }
  ];

  const mockTabletMedication: MedicationProfile = {
    id: 'med-123',
    name: 'Metformin 500mg',
    type: 'medication',
    isActive: true,
    doseForm: 'Tablet',
    code: { 
      coding: [{ display: 'Metformin 500mg' }] 
    },
    ingredient: [{
      name: 'Metformin Hydrochloride',
      strengthRatio: {
        numerator: { value: 500, unit: 'mg' },
        denominator: { value: 1, unit: 'tablet' }
      }
    }],
    isScored: ScoringType.HALF
  };

  const mockLiquidMedication: MedicationProfile = {
    id: 'med-456',
    name: 'Amoxicillin Suspension',
    type: 'medication',
    isActive: true,
    doseForm: 'Solution',
    code: { 
      coding: [{ display: 'Amoxicillin 250mg/5mL' }] 
    },
    ingredient: [{
      name: 'Amoxicillin',
      strengthRatio: {
        numerator: { value: 250, unit: 'mg' },
        denominator: { value: 5, unit: 'mL' }
      }
    }]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockedRouteAPI.getAllRoutes.mockResolvedValue(mockRoutes);
    mockedRouteAPI.validateRouteCompatibility.mockImplementation(async (route, doseForm) => {
      // Handle aliases - map "by mouth" to "Orally"
      const aliasMap: Record<string, string> = {
        'by mouth': 'Orally',
        'orally': 'Orally',
        'po': 'Orally'
      };
      
      const normalizedRoute = aliasMap[route.toLowerCase()] || route;
      const routeData = mockRoutes.find(r => r.name.toLowerCase() === normalizedRoute.toLowerCase());
      
      // If no dose form provided, just check if route exists
      if (!doseForm) {
        return {
          isValid: !!routeData,
          errors: routeData ? [] : [`Invalid route: "${route}"`],
          warnings: [],
          suggestedRoutes: routeData ? [] : ['Orally']
        };
      }
      
      const isCompatible = routeData?.applicableForms.includes(doseForm) || false;
      
      return {
        isValid: isCompatible,
        errors: isCompatible ? [] : [`Route "${route}" is not compatible with dose form "${doseForm}"`],
        warnings: [],
        suggestedRoutes: isCompatible ? [] : ['Orally']
      };
    });
    mockedRouteAPI.searchRoutesByAlias.mockResolvedValue([]);
    mockedRouteAPI.trackRouteUsage.mockResolvedValue();
  });

  describe('AsyncRouteValidator Integration', () => {
    it('should validate tablet routes against database', async () => {
      const isValid = await AsyncRouteValidator.isValidRoute('Orally');
      expect(isValid).toBe(true);
      expect(mockedRouteAPI.validateRouteCompatibility).toHaveBeenCalledWith('Orally', '');
    });

    it('should reject invalid routes', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
        isValid: false,
        errors: ['Invalid route: "InvalidRoute"'],
        warnings: [],
        suggestedRoutes: ['Orally']
      });

      const result = await AsyncRouteValidator.validateRoute('InvalidRoute', 'Tablet');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid route: "InvalidRoute"');
    });

    it('should get route metadata from database', async () => {
      const metadata = await AsyncRouteValidator.getRouteMetadata('Orally');
      expect(metadata).not.toBeNull();
      expect(metadata!.name).toBe('Orally');
      expect(metadata!.code).toBe('PO');
      expect(metadata!.applicableForms).toContain('Tablet');
    });

    it('should get allowed routes for dose form', async () => {
      const allowedRoutes = await AsyncRouteValidator.getAllowedRoutesForDoseForm('Tablet');
      expect(allowedRoutes).toContain('Orally');
      expect(allowedRoutes).toContain('Sublingually');
      expect(allowedRoutes).not.toContain('Intramuscularly');
    });

    it('should handle route compatibility validation', async () => {
      const result = await AsyncRouteValidator.validateRoute('Orally', 'Tablet');
      expect(result.isValid).toBe(true);

      const invalidResult = await AsyncRouteValidator.validateRoute('Intramuscularly', 'Tablet');
      expect(invalidResult.isValid).toBe(false);
    });
  });

  describe('Builder Integration with Route Tracking', () => {
    it('should allow builders to work with database-validated routes', async () => {
      // This test shows how builders could integrate with database routes in the future
      const builder = new SimpleTabletBuilder(mockTabletMedication);
      
      // Verify the route exists in database first
      const isValidRoute = await AsyncRouteValidator.isValidRoute('Orally');
      expect(isValidRoute).toBe(true);
      
      // Then use it in the builder
      const result = builder
        .buildDose({ value: 1, unit: 'tablet' })
        .buildTiming({ frequency: 2, period: 1, periodUnit: 'd' })
        .buildRoute('by mouth')  // Current builders still use constants
        .getResult();

      expect(result).toHaveLength(1);
      expect(result[0].text).toBe('Take 1 tablet by mouth twice daily.');
      
      // Simulate tracking usage (this would be done in a middleware/interceptor)
      await AsyncRouteValidator.trackRouteUsage(mockTabletMedication.id, 'Orally');
      expect(mockedRouteAPI.trackRouteUsage).toHaveBeenCalledWith(mockTabletMedication.id, 'Orally');
    });

    it('should support liquid medication route validation', async () => {
      const builder = new SimpleLiquidBuilder(mockLiquidMedication);
      
      // Verify route compatibility
      const result = await AsyncRouteValidator.validateRoute('Orally', 'Solution');
      expect(result.isValid).toBe(true);
      
      // Use in builder
      const instructions = builder
        .buildDose({ value: 250, unit: 'mg' })
        .buildTiming({ frequency: 3, period: 1, periodUnit: 'd' })
        .buildRoute('by mouth')
        .getResult();

      expect(instructions).toHaveLength(1);
      expect(instructions[0].text).toContain('Take 250 mg by mouth three times daily');
    });

    it('should provide route suggestions for invalid combinations', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
        isValid: false,
        errors: ['Route "Intramuscularly" is not compatible with dose form "Tablet"'],
        warnings: [],
        suggestedRoutes: ['Orally', 'Sublingually']
      });

      const result = await AsyncRouteValidator.validateRoute('Intramuscularly', 'Tablet');
      expect(result.isValid).toBe(false);
      expect(result.suggestedRoutes).toContain('Orally');
      expect(result.suggestedRoutes).toContain('Sublingually');
    });
  });

  describe('Route Metadata Integration', () => {
    it('should provide special instructions requirements', async () => {
      const requiresSpecial = await AsyncRouteValidator.requiresSpecialInstructions('Intramuscularly');
      expect(requiresSpecial).toBe(true);

      const noSpecial = await AsyncRouteValidator.requiresSpecialInstructions('Orally');
      expect(noSpecial).toBe(false);
    });

    it('should provide special instructions templates', async () => {
      const template = await AsyncRouteValidator.getSpecialInstructionsTemplate('Intramuscularly');
      expect(template).toBe('Inject {dose} {route} into {site} {frequency}.');

      const noTemplate = await AsyncRouteValidator.getSpecialInstructionsTemplate('Orally');
      expect(noTemplate).toBeNull();
    });

    it('should validate route arrays for medication profiles', async () => {
      mockedRouteAPI.validateRouteCompatibility
        .mockResolvedValueOnce({
          isValid: true,
          errors: [],
          warnings: [],
          suggestedRoutes: []
        })
        .mockResolvedValueOnce({
          isValid: true,
          errors: [],
          warnings: [],
          suggestedRoutes: []
        });

      const result = await AsyncRouteValidator.validateRouteArray(['Orally', 'Sublingually']);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Usage Analytics Integration', () => {
    it('should track route usage for analytics', async () => {
      await AsyncRouteValidator.trackRouteUsage('med-123', 'Orally');
      expect(mockedRouteAPI.trackRouteUsage).toHaveBeenCalledWith('med-123', 'Orally');
    });

    it('should get route usage statistics', async () => {
      const mockUsage = {
        routeId: '1',
        totalUsage: 100,
        activeUsage: 20,
        lastUsed: '2025-01-18T10:00:00Z',
        topMedications: [{ name: 'Metformin', count: 50 }]
      };

      mockedRouteAPI.getRouteUsage.mockResolvedValue(mockUsage);

      const usage = await AsyncRouteValidator.getRouteUsage('1');
      expect(usage).toEqual(mockUsage);
    });

    it('should handle usage tracking failures gracefully', async () => {
      mockedRouteAPI.trackRouteUsage.mockRejectedValue(new Error('Tracking failed'));

      // Should not throw
      await expect(AsyncRouteValidator.trackRouteUsage('med-123', 'Orally')).resolves.toBeUndefined();
    });
  });

  describe('Database Error Handling', () => {
    it('should handle database connectivity issues', async () => {
      mockedRouteAPI.getAllRoutes.mockRejectedValue(new Error('Database connection failed'));

      const routes = await AsyncRouteValidator.getAllRoutes();
      expect(routes).toEqual([]);
    });

    it('should handle validation API failures', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockRejectedValue(new Error('Validation service unavailable'));

      const result = await AsyncRouteValidator.validateRoute('Orally', 'Tablet');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Validation failed: Validation service unavailable');
    });

    it('should degrade gracefully when route search fails', async () => {
      mockedRouteAPI.searchRoutesByAlias.mockRejectedValue(new Error('Search service down'));

      const metadata = await AsyncRouteValidator.getRouteMetadata('unknown route');
      expect(metadata).toBeNull();
    });
  });

  describe('Future Builder Enhancement Ideas', () => {
    it('should demonstrate how builders could use async validation', async () => {
      // This is a demonstration of how builders could be enhanced to use async validation
      // without breaking existing functionality
      
      const builder = new SimpleTabletBuilder(mockTabletMedication);
      
      // Current synchronous approach (still works)
      const currentResult = builder
        .buildDose({ value: 1, unit: 'tablet' })
        .buildTiming({ frequency: 1, period: 1, periodUnit: 'd' })
        .buildRoute('by mouth')
        .getResult();
      
      expect(currentResult[0].text).toBe('Take 1 tablet by mouth once daily.');
      
      // Future async validation approach could be added as an enhancement
      const routeValidation = await AsyncRouteValidator.validateRoute('by mouth', 'Tablet');
      expect(routeValidation.isValid).toBe(true);
      
      // This shows backward compatibility is maintained
      expect(currentResult).toBeDefined();
    });

    it('should show how dynamic fixtures could work with database routes', async () => {
      // Get available routes from database
      const availableRoutes = await AsyncRouteValidator.getAllRoutes();
      expect(availableRoutes.length).toBeGreaterThan(0);
      
      // Use them to create dynamic test scenarios
      const tabletRoutes = availableRoutes.filter(route => 
        route.applicableForms.includes('Tablet')
      );
      
      expect(tabletRoutes.length).toBeGreaterThan(0);
      
      // Test each applicable route
      for (const route of tabletRoutes) {
        const builder = new SimpleTabletBuilder(mockTabletMedication);
        // Map database route names to constants-compatible names
        const routeMap: Record<string, string> = {
          'by mouth': 'by mouth',
          'under the tongue': 'sublingually' // This exists in constants
        };
        
        const builderRoute = routeMap[route.humanReadable] || route.humanReadable;
        
        const result = builder
          .buildDose({ value: 1, unit: 'tablet' })
          .buildTiming({ frequency: 1, period: 1, periodUnit: 'd' })
          .buildRoute(builderRoute)
          .getResult();
        
        expect(result).toHaveLength(1);
        // The result will contain the actual route text used by the builder
        expect(result[0].text).toBeDefined();
      }
    });
  });
});