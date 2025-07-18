# Configuration System Test Suite

This directory contains comprehensive tests for the domain terminology abstraction system, ensuring reliability, correctness, and performance across all configuration components.

## Test Structure

### Core Test Files

| File | Description | Coverage |
|------|-------------|----------|
| `environment.test.ts` | Environment configuration loading | 95%+ |
| `user-configurations.test.ts` | User type configurations validation | 90%+ |
| `deployment-presets.test.ts` | Deployment preset functionality | 85%+ |
| `validation-tools.test.ts` | Configuration validation utilities | 90%+ |
| `integration.test.ts` | End-to-end system integration | 80%+ |

### Test Categories

#### 1. Unit Tests
- **Environment Loading**: Tests for `loadDomainConfig()`, `validateEnvironmentConfig()`
- **User Configurations**: Individual user type validation (patient, client, contact, etc.)
- **Deployment Presets**: Healthcare, business CRM, and sales organization presets
- **Validation Tools**: Schema validation, error detection, suggestions

#### 2. Integration Tests
- **Complete Flow**: Environment → Configuration → Validation → Usage
- **Cross-Component**: User types ↔ Deployment presets ↔ Environment variables
- **FHIR Compliance**: Healthcare-specific functionality and mappings
- **Error Recovery**: Graceful handling of configuration issues

#### 3. Performance Tests
- **Loading Speed**: Configuration loading under 100ms
- **Memory Usage**: Efficient resource utilization
- **Concurrent Access**: Multiple configuration loading scenarios

## Running Tests

### Quick Commands

```bash
# Run all configuration tests
pnpm config:test:unit

# Run with coverage report
pnpm config:test:coverage

# Run specific test file
pnpm test environment.test.ts

# Run tests in watch mode
pnpm test:watch
```

### From Project Root

```bash
# All config tests
npm run config:test:unit

# With coverage
npm run config:test:coverage
```

## Test Coverage Requirements

### Minimum Coverage Targets
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

### Critical Path Coverage
- Environment variable handling: **95%+**
- User configuration validation: **90%+**
- FHIR compliance mapping: **90%+**
- Error handling and recovery: **85%+**

## Test Scenarios

### 1. Environment Configuration (`environment.test.ts`)

#### Core Functionality
- ✅ Load valid user types from environment
- ✅ Handle invalid environment variables
- ✅ Fallback to defaults gracefully
- ✅ Validate configuration completeness
- ✅ Environment variable overrides

#### Error Handling
- ✅ Missing environment variables
- ✅ Invalid user type values
- ✅ Configuration loading failures
- ✅ Validation error reporting

#### Edge Cases
- ✅ Empty environment variables
- ✅ Case sensitivity validation
- ✅ Whitespace handling
- ✅ Special character validation

### 2. User Configurations (`user-configurations.test.ts`)

#### Individual User Types
- ✅ Patient (healthcare) configuration
- ✅ Client (business) configuration
- ✅ Contact (sales) configuration
- ✅ Customer (e-commerce) configuration
- ✅ Member (membership) configuration
- ✅ Subscriber (subscription) configuration
- ✅ Participant (research) configuration

#### Consistency Validation
- ✅ Structure consistency across types
- ✅ Route format validation
- ✅ Label naming conventions
- ✅ Context information completeness

#### Integration Points
- ✅ FHIR resource mapping (patient)
- ✅ CRM system integration (client)
- ✅ Sales pipeline integration (contact)

### 3. Deployment Presets (`deployment-presets.test.ts`)

#### Preset Validation
- ✅ Traditional Healthcare preset
- ✅ Business CRM preset
- ✅ Sales Organization preset

#### Feature Configuration
- ✅ FHIR compliance settings
- ✅ HIPAA compliance requirements
- ✅ Security configuration levels
- ✅ Integration specifications

#### Consistency Checks
- ✅ Version alignment across presets
- ✅ Feature flag logical combinations
- ✅ Security level appropriateness
- ✅ Integration compatibility

### 4. Validation Tools (`validation-tools.test.ts`)

#### Schema Validation
- ✅ Required field validation
- ✅ Type checking and constraints
- ✅ Format validation (routes, labels)
- ✅ Consistency checking

#### Error Reporting
- ✅ Detailed error messages
- ✅ Field-specific feedback
- ✅ Severity categorization
- ✅ Suggestion generation

#### Analysis Tools
- ✅ Configuration completeness scoring
- ✅ Best practice recommendations
- ✅ Performance optimization hints
- ✅ Migration assistance

### 5. Integration Tests (`integration.test.ts`)

#### End-to-End Flows
- ✅ Environment → Configuration → Validation
- ✅ Preset selection → User type mapping
- ✅ FHIR compliance → Healthcare workflows
- ✅ Multi-tenant deployment scenarios

#### Real-World Usage
- ✅ Development environment switching
- ✅ Production deployment validation
- ✅ Migration between terminologies
- ✅ Performance under load

## Mock Strategy

### External Dependencies
```typescript
// @marek/shared package mock
export const createDomainConfig = jest.fn((config) => ({
  primaryExternalUser: config,
  version: '2.1.0',
  fhirMapping: config.singular === 'patient' ? {...} : undefined
}));
```

### Environment Variables
```typescript
// Clean environment setup/teardown
beforeEach(() => {
  originalEnv = { ...process.env };
  clearEnvironmentConfig();
});

afterEach(() => {
  process.env = originalEnv;
});
```

### Console Output
```typescript
// Controlled console testing
beforeEach(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});
```

## Custom Matchers

### Configuration Validation
```typescript
expect(config).toBeValidConfiguration();
expect(config).toHaveValidRoutes();
```

### Usage Examples
```typescript
// Test valid configuration
expect(patientConfig).toBeValidConfiguration();

// Test route validation
expect(clientConfig).toHaveValidRoutes();
```

## Debugging Tests

### Common Issues
1. **Environment Variable Conflicts**: Ensure clean environment between tests
2. **Mock Module Caching**: Clear module cache when needed
3. **Async Test Timing**: Use proper async/await patterns
4. **Console Output**: Check suppressed vs. expected warnings

### Debug Commands
```bash
# Run single test with debugging
pnpm test --testNamePattern="should load healthcare configuration" --verbose

# Run with additional logging
DEBUG=true pnpm test

# Generate detailed coverage report
pnpm test:coverage --verbose
```

## Performance Benchmarks

### Target Performance
- **Configuration Loading**: < 50ms per configuration
- **Validation**: < 100ms for complete preset
- **Memory Usage**: < 10MB for full test suite
- **Test Execution**: < 30 seconds for complete suite

### Performance Tests
```typescript
it('should load configurations efficiently', () => {
  const startTime = Date.now();
  // Load multiple configurations
  const endTime = Date.now();
  expect(endTime - startTime).toBeLessThan(1000);
});
```

## Continuous Integration

### CI Configuration
```yaml
# Test execution in CI
- name: Run Configuration Tests
  run: |
    cd config
    pnpm install
    pnpm test:ci
```

### Coverage Reporting
- **Local Development**: HTML coverage reports in `config/coverage/`
- **CI/CD**: LCOV format for integration with coverage services
- **Threshold Enforcement**: Build fails if coverage drops below 80%

## Contributing to Tests

### Adding New Tests
1. Follow existing test structure and naming conventions
2. Include both positive and negative test cases
3. Add performance benchmarks for new functionality
4. Update this README with new test descriptions

### Test Review Checklist
- [ ] Tests cover both success and failure scenarios
- [ ] Mock strategy is consistent with existing patterns
- [ ] Performance implications are tested
- [ ] Documentation is updated
- [ ] Coverage thresholds are maintained