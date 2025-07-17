/**
 * AsyncRouteValidator Tests
 * 
 * Test suite for the database-backed async route validation system
 * 
 * @since 2025-01-18
 */

import { AsyncRouteValidator } from '../AsyncRouteValidator';
import { routeAPI } from '../../../api/routes';
import type { RouteValidationResult, RouteMetadata } from '../RouteValidator';
import type { ValidationResult, RouteUsageStats } from '../../../api/routes';

// Mock the route API
jest.mock('../../../api/routes', () => ({
  routeAPI: {
    getAllRoutes: jest.fn(),
    validateRouteCompatibility: jest.fn(),
    searchRoutesByAlias: jest.fn(),
    getRouteUsage: jest.fn(),
    getRouteStatistics: jest.fn(),
    trackRouteUsage: jest.fn()
  }
}));

const mockedRouteAPI = routeAPI as jest.Mocked<typeof routeAPI>;

describe('AsyncRouteValidator', () => {
  // Sample test data
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
      name: 'Intramuscularly',
      code: 'IM',
      description: 'Injection into muscle tissue',
      applicableForms: ['Vial', 'Pen', 'Solution'],
      humanReadable: 'intramuscularly',
      fhirCode: 'IM',
      requiresSpecialInstructions: true,
      specialInstructionsTemplate: 'Inject {dose} {route} into {site} {frequency}.',
      verbMap: {}
    },
    {
      id: '3',
      name: 'Topically',
      code: 'TOP',
      description: 'Application to skin surface',
      applicableForms: ['Cream', 'Gel', 'Solution'],
      humanReadable: 'topically',
      fhirCode: 'TOP',
      requiresSpecialInstructions: true,
      specialInstructionsTemplate: 'Apply {dose} {route} {frequency}.',
      verbMap: {}
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockedRouteAPI.getAllRoutes.mockResolvedValue(mockRoutes);
    mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
      isValid: true,
      errors: [],
      warnings: [],
      suggestedRoutes: []
    });
    mockedRouteAPI.searchRoutesByAlias.mockResolvedValue([]);
  });

  describe('validateRoute', () => {
    it('should validate valid routes', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
        isValid: true,
        errors: [],
        warnings: [],
        suggestedRoutes: []
      });

      const result = await AsyncRouteValidator.validateRoute('Orally');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(mockedRouteAPI.validateRouteCompatibility).toHaveBeenCalledWith('Orally', '');
    });

    it('should reject empty routes', async () => {
      const result = await AsyncRouteValidator.validateRoute('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Route is required');
      expect(mockedRouteAPI.validateRouteCompatibility).not.toHaveBeenCalled();
    });

    it('should handle validation with dose form', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
        isValid: true,
        errors: [],
        warnings: [],
        suggestedRoutes: []
      });

      const result = await AsyncRouteValidator.validateRoute('Orally', 'Tablet');
      expect(result.isValid).toBe(true);
      expect(mockedRouteAPI.validateRouteCompatibility).toHaveBeenCalledWith('Orally', 'Tablet');
    });

    it('should handle invalid routes with suggestions', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
        isValid: false,
        errors: ['Invalid route: "InvalidRoute"'],
        warnings: [],
        suggestedRoutes: []
      });

      mockedRouteAPI.searchRoutesByAlias.mockResolvedValue([
        { id: '1', name: 'Orally', code: 'PO', description: 'Administration by mouth', applicableForms: ['Tablet'], humanReadable: 'by mouth', fhirCode: 'PO', requiresSpecialInstructions: false }
      ]);

      const result = await AsyncRouteValidator.validateRoute('InvalidRoute');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid route: "InvalidRoute"');
      expect(result.suggestedRoutes).toContain('Orally');
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockRejectedValue(new Error('API Error'));

      const result = await AsyncRouteValidator.validateRoute('Orally');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Validation failed: API Error');
    });
  });

  describe('isValidRoute', () => {
    it('should return true for valid routes', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
        isValid: true,
        errors: [],
        warnings: [],
        suggestedRoutes: []
      });

      const isValid = await AsyncRouteValidator.isValidRoute('Orally');
      expect(isValid).toBe(true);
    });

    it('should return false for invalid routes', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
        isValid: false,
        errors: ['Invalid route'],
        warnings: [],
        suggestedRoutes: []
      });

      const isValid = await AsyncRouteValidator.isValidRoute('InvalidRoute');
      expect(isValid).toBe(false);
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockRejectedValue(new Error('API Error'));

      const isValid = await AsyncRouteValidator.isValidRoute('Orally');
      expect(isValid).toBe(false);
    });
  });

  describe('getAllRoutes', () => {
    it('should return all routes from API', async () => {
      const routes = await AsyncRouteValidator.getAllRoutes();
      expect(routes).toEqual(mockRoutes);
      expect(mockedRouteAPI.getAllRoutes).toHaveBeenCalled();
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.getAllRoutes.mockRejectedValue(new Error('API Error'));

      const routes = await AsyncRouteValidator.getAllRoutes();
      expect(routes).toEqual([]);
    });
  });

  describe('getRouteMetadata', () => {
    it('should return metadata for valid routes', async () => {
      const metadata = await AsyncRouteValidator.getRouteMetadata('Orally');
      expect(metadata).not.toBeNull();
      expect(metadata!.name).toBe('Orally');
      expect(metadata!.code).toBe('PO');
    });

    it('should return metadata using alias search', async () => {
      mockedRouteAPI.searchRoutesByAlias.mockResolvedValue([mockRoutes[0]]);

      const metadata = await AsyncRouteValidator.getRouteMetadata('by mouth');
      expect(metadata).not.toBeNull();
      expect(metadata!.name).toBe('Orally');
      expect(mockedRouteAPI.searchRoutesByAlias).toHaveBeenCalledWith('by mouth');
    });

    it('should return null for invalid routes', async () => {
      mockedRouteAPI.getAllRoutes.mockResolvedValue([]);
      mockedRouteAPI.searchRoutesByAlias.mockResolvedValue([]);

      const metadata = await AsyncRouteValidator.getRouteMetadata('InvalidRoute');
      expect(metadata).toBeNull();
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.getAllRoutes.mockRejectedValue(new Error('API Error'));

      const metadata = await AsyncRouteValidator.getRouteMetadata('Orally');
      expect(metadata).toBeNull();
    });
  });

  describe('getAllowedRoutesForDoseForm', () => {
    it('should return routes applicable for dose form', async () => {
      const routes = await AsyncRouteValidator.getAllowedRoutesForDoseForm('Tablet');
      expect(routes).toContain('Orally');
      expect(routes).not.toContain('Intramuscularly');
    });

    it('should return routes for injection dose forms', async () => {
      const routes = await AsyncRouteValidator.getAllowedRoutesForDoseForm('Vial');
      expect(routes).toContain('Intramuscularly');
      expect(routes).not.toContain('Orally');
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.getAllRoutes.mockRejectedValue(new Error('API Error'));

      const routes = await AsyncRouteValidator.getAllowedRoutesForDoseForm('Tablet');
      expect(routes).toEqual([]);
    });
  });

  describe('validateRouteArray', () => {
    it('should validate valid route arrays', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockResolvedValue({
        isValid: true,
        errors: [],
        warnings: [],
        suggestedRoutes: []
      });

      const result = await AsyncRouteValidator.validateRouteArray(['Orally', 'Topically']);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject non-array inputs', async () => {
      const result = await AsyncRouteValidator.validateRouteArray('not an array' as any);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Routes must be an array');
    });

    it('should warn about empty arrays', async () => {
      const result = await AsyncRouteValidator.validateRouteArray([]);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('No routes specified');
    });

    it('should validate each route in array', async () => {
      mockedRouteAPI.validateRouteCompatibility
        .mockResolvedValueOnce({
          isValid: true,
          errors: [],
          warnings: [],
          suggestedRoutes: []
        })
        .mockResolvedValueOnce({
          isValid: false,
          errors: ['Invalid route: "InvalidRoute"'],
          warnings: [],
          suggestedRoutes: []
        });

      const result = await AsyncRouteValidator.validateRouteArray(['Orally', 'InvalidRoute']);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid route: "InvalidRoute"');
    });
  });

  describe('getDefaultRouteForDoseForm', () => {
    it('should return first allowed route as default', async () => {
      const defaultRoute = await AsyncRouteValidator.getDefaultRouteForDoseForm('Tablet');
      expect(defaultRoute).toBe('Orally');
    });

    it('should return null when no routes are allowed', async () => {
      mockedRouteAPI.getAllRoutes.mockResolvedValue([]);

      const defaultRoute = await AsyncRouteValidator.getDefaultRouteForDoseForm('InvalidDoseForm');
      expect(defaultRoute).toBeNull();
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.getAllRoutes.mockRejectedValue(new Error('API Error'));

      const defaultRoute = await AsyncRouteValidator.getDefaultRouteForDoseForm('Tablet');
      expect(defaultRoute).toBeNull();
    });
  });

  describe('requiresSpecialInstructions', () => {
    it('should return true for routes requiring special instructions', async () => {
      const requires = await AsyncRouteValidator.requiresSpecialInstructions('Intramuscularly');
      expect(requires).toBe(true);
    });

    it('should return false for routes not requiring special instructions', async () => {
      const requires = await AsyncRouteValidator.requiresSpecialInstructions('Orally');
      expect(requires).toBe(false);
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.getAllRoutes.mockRejectedValue(new Error('API Error'));

      const requires = await AsyncRouteValidator.requiresSpecialInstructions('Orally');
      expect(requires).toBe(false);
    });
  });

  describe('getSpecialInstructionsTemplate', () => {
    it('should return template for routes with special instructions', async () => {
      const template = await AsyncRouteValidator.getSpecialInstructionsTemplate('Intramuscularly');
      expect(template).toBe('Inject {dose} {route} into {site} {frequency}.');
    });

    it('should return null for routes without special instructions', async () => {
      const template = await AsyncRouteValidator.getSpecialInstructionsTemplate('Orally');
      expect(template).toBeNull();
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.getAllRoutes.mockRejectedValue(new Error('API Error'));

      const template = await AsyncRouteValidator.getSpecialInstructionsTemplate('Intramuscularly');
      expect(template).toBeNull();
    });
  });

  describe('getRouteUsage', () => {
    it('should return usage statistics from API', async () => {
      const mockUsage: RouteUsageStats = {
        routeId: '1',
        totalUsage: 100,
        activeUsage: 20,
        lastUsed: '2025-01-18T10:00:00Z',
        topMedications: [{ name: 'Medication A', count: 50 }]
      };

      mockedRouteAPI.getRouteUsage.mockResolvedValue(mockUsage);

      const usage = await AsyncRouteValidator.getRouteUsage('1');
      expect(usage).toEqual(mockUsage);
      expect(mockedRouteAPI.getRouteUsage).toHaveBeenCalledWith('1');
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.getRouteUsage.mockRejectedValue(new Error('API Error'));

      const usage = await AsyncRouteValidator.getRouteUsage('1');
      expect(usage.totalUsage).toBe(0);
      expect(usage.routeId).toBe('1');
    });
  });

  describe('getRouteStatistics', () => {
    it('should return statistics from API', async () => {
      const mockStats = [
        { routeName: 'Orally', totalUsage: 100, totalMedications: 10 },
        { routeName: 'Intramuscularly', totalUsage: 50, totalMedications: 5 }
      ];

      mockedRouteAPI.getRouteStatistics.mockResolvedValue(mockStats);

      const stats = await AsyncRouteValidator.getRouteStatistics(30);
      expect(stats).toEqual(mockStats);
      expect(mockedRouteAPI.getRouteStatistics).toHaveBeenCalledWith(30);
    });

    it('should handle API errors gracefully', async () => {
      mockedRouteAPI.getRouteStatistics.mockRejectedValue(new Error('API Error'));

      const stats = await AsyncRouteValidator.getRouteStatistics();
      expect(stats).toEqual([]);
    });
  });

  describe('trackRouteUsage', () => {
    it('should track usage via API', async () => {
      await AsyncRouteValidator.trackRouteUsage('med-123', 'Orally');
      expect(mockedRouteAPI.trackRouteUsage).toHaveBeenCalledWith('med-123', 'Orally');
    });

    it('should handle API errors gracefully without throwing', async () => {
      mockedRouteAPI.trackRouteUsage.mockRejectedValue(new Error('API Error'));

      // Should not throw
      await expect(AsyncRouteValidator.trackRouteUsage('med-123', 'Orally')).resolves.toBeUndefined();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null/undefined route names', async () => {
      const result = await AsyncRouteValidator.validateRoute(null as any);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Route is required');
    });

    it('should handle whitespace-only routes', async () => {
      const result = await AsyncRouteValidator.validateRoute('   ');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Route is required');
    });

    it('should handle network timeouts and API failures', async () => {
      mockedRouteAPI.validateRouteCompatibility.mockRejectedValue(new Error('Network timeout'));

      const result = await AsyncRouteValidator.validateRoute('Orally');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Validation failed: Network timeout');
    });

    it('should handle partial API responses', async () => {
      mockedRouteAPI.getAllRoutes.mockResolvedValue([
        { id: '1', name: 'Orally', code: 'PO', description: '', applicableForms: [], humanReadable: '', fhirCode: '', requiresSpecialInstructions: false }
      ]);

      const metadata = await AsyncRouteValidator.getRouteMetadata('Orally');
      expect(metadata).not.toBeNull();
      expect(metadata!.name).toBe('Orally');
    });
  });
});