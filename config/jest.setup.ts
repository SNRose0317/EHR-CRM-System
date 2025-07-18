/**
 * Jest Setup File for Configuration Tests
 * 
 * Global test setup and configuration for the domain configuration system tests.
 */

// Extend Jest matchers if needed
expect.extend({
  toBeValidConfiguration(received: any) {
    const hasRequiredFields = 
      received &&
      typeof received.singular === 'string' &&
      typeof received.plural === 'string' &&
      received.routes &&
      received.labels &&
      received.context;

    if (hasRequiredFields) {
      return {
        message: () => `expected ${JSON.stringify(received)} not to be a valid configuration`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${JSON.stringify(received)} to be a valid configuration with required fields (singular, plural, routes, labels, context)`,
        pass: false,
      };
    }
  },

  toHaveValidRoutes(received: any) {
    const hasValidRoutes = 
      received &&
      received.routes &&
      typeof received.routes.list === 'string' &&
      received.routes.list.startsWith('/') &&
      typeof received.routes.detail === 'string' &&
      received.routes.detail.startsWith('/') &&
      typeof received.routes.add === 'string' &&
      received.routes.add.startsWith('/');

    if (hasValidRoutes) {
      return {
        message: () => `expected ${JSON.stringify(received.routes)} not to have valid routes`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${JSON.stringify(received.routes)} to have valid routes (all starting with /)`,
        pass: false,
      };
    }
  }
});

// Declare the custom matchers for TypeScript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidConfiguration(): R;
      toHaveValidRoutes(): R;
    }
  }
}

// Console spy setup for testing warning/error output
const originalConsole = { ...console };

beforeEach(() => {
  // Reset console methods before each test
  console.warn = jest.fn();
  console.error = jest.fn();
  console.log = jest.fn();
});

afterEach(() => {
  // Restore console methods after each test
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
  console.log = originalConsole.log;
});

// Global test timeout
jest.setTimeout(10000);

// Suppress expected console warnings in tests
const suppressedWarnings = [
  'Configuration validation is disabled',
  'DOMAIN_TYPE environment variable not set'
];

const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const message = args.join(' ');
  if (!suppressedWarnings.some(warning => message.includes(warning))) {
    originalWarn(...args);
  }
};