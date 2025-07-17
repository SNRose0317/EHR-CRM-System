# @marek/medication-builder

Advanced medication signature builder with FHIR compliance, comprehensive testing, and support for complex dosing scenarios.

## Features

- **8 Specialized Builder Types**: Simple tablets/liquids, complex PRN dosing, multi-ingredient compounds, tapering schedules, fractional dosing, and special dispensers
- **FHIR R4 Compliance**: Full healthcare standard compatibility
- **Performance Optimized**: Sub-20ms P50 latency with comprehensive monitoring
- **Comprehensive Testing**: 500+ golden master test cases with 94.1% pass rate
- **Advanced Dosing Support**: Unit conversion, tablet fractioning, special dispensers (Topiclick, nasal sprays)

## Quick Start

```bash
npm install @marek/medication-builder
```

### Basic Usage

```typescript
import { createBuilder } from '@marek/medication-builder';

// Create builder for tablet medication
const medication = {
  id: 'med-123',
  name: 'Metformin 500mg',
  doseForm: 'Tablet',
  ingredient: [{
    name: 'Metformin',
    strengthRatio: {
      numerator: { value: 500, unit: 'mg' },
      denominator: { value: 1, unit: 'tablet' }
    }
  }]
};

const builder = createBuilder(medication);

const instructions = builder
  .buildDose({ value: 1, unit: 'tablet' })
  .buildTiming({ frequency: 2, period: 1, periodUnit: 'd' })
  .buildRoute('by mouth')
  .buildSpecialInstructions(['with food'])
  .getResult();

// Output: "Take 1 tablet by mouth twice daily with food"
console.log(instructions[0].text);
```

### Advanced Builders

#### Complex PRN Dosing
```typescript
import { ComplexPRNBuilder } from '@marek/medication-builder/builders';

const prnBuilder = new ComplexPRNBuilder(medication);
const result = prnBuilder
  .buildDoseRange({ minValue: 1, maxValue: 2, unit: 'tablet' })
  .buildFrequencyRange({ minFrequency: 1, maxFrequency: 1, period: 4, maxPeriod: 6, periodUnit: 'h' })
  .buildAsNeeded({ asNeeded: true, indication: 'for pain' })
  .getComplexResult();
```

#### Tapering Schedules
```typescript
import { TaperingDoseBuilder } from '@marek/medication-builder/builders';

const taperingBuilder = new TaperingDoseBuilder(medication);
const result = taperingBuilder
  .buildTaperingSchedule([
    { phase: 1, dose: { value: 4, unit: 'tablet' }, duration: { value: 3, unit: 'day' } },
    { phase: 2, dose: { value: 2, unit: 'tablet' }, duration: { value: 3, unit: 'day' } }
  ])
  .getTaperingResult();
```

## Builder Types

### Core Builders
- **SimpleTabletBuilder** - Tablets, capsules with fractional support
- **SimpleLiquidBuilder** - Solutions, suspensions with concentration handling

### Advanced Builders
- **ComplexPRNBuilder** - Flexible PRN dosing with dose ranges
- **MultiIngredientBuilder** - Compound medications
- **TaperingDoseBuilder** - Complex withdrawal schedules
- **FractionalTabletBuilder** - Precise fractional dosing

### Special Dispensers
- **TopiclickBuilder** - Topiclick dispenser support (4 clicks = 1 mL)
- **NasalSprayBuilder** - Nasal spray medications

## API Reference

### Factory Function
```typescript
createBuilder(medication: MedicationProfile): ISignatureBuilder
```

Automatically selects the appropriate builder based on medication properties.

### Common Methods
```typescript
builder
  .buildDose(dose: Dose)
  .buildTiming(timing: Timing)
  .buildRoute(route: string)
  .buildSpecialInstructions(instructions: string[])
  .buildAsNeeded(asNeeded: AsNeededInfo)
  .getResult(): SignatureInstruction[]
```

### Audit Trail
```typescript
builder.explain(): string[]
```

Returns detailed audit trail of builder decisions and transformations.

## Testing

```bash
# Run all tests
npm test

# Run golden master tests
npm run test:golden

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Performance

- **P50 Latency**: < 20ms
- **P95 Latency**: < 50ms
- **P99 Latency**: < 100ms
- **Test Coverage**: 94.1% pass rate across 500+ test cases

## FHIR Compliance

All output follows FHIR R4 standards for medication requests and signature instructions, ensuring seamless integration with healthcare systems.

## Contributing

This package is part of the Marek Health EHR/CRM platform. See the main repository for contribution guidelines.