# Deployment Presets

Deployment presets provide pre-configured scenarios for common use cases. They combine user type configurations, feature settings, and integration preferences into ready-to-use packages.

## Available Presets

### Healthcare Presets
- **`traditional-healthcare.ts`** - Standard hospital/clinic configuration
- **`telehealth.ts`** - Telemedicine and remote care configuration
- **`research-facility.ts`** - Clinical research and trial management

### Business Presets
- **`business-crm.ts`** - Professional services and client management
- **`sales-organization.ts`** - Sales-focused lead and customer management
- **`e-commerce.ts`** - Online retail and customer service

### Specialized Presets
- **`wellness-center.ts`** - Fitness, spa, and wellness organizations
- **`membership-organization.ts`** - Clubs, associations, and member services

## Using Deployment Presets

### Environment Variable
```bash
# Use traditional healthcare preset
DEPLOYMENT_PRESET=traditional-healthcare pnpm dev

# Use business CRM preset
DEPLOYMENT_PRESET=business-crm pnpm dev
```

### Direct Import
```typescript
import { traditionalHealthcarePreset } from './deployment-presets/traditional-healthcare';
import { businessCrmPreset } from './deployment-presets/business-crm';
```

## Preset Structure

Each deployment preset includes:

```typescript
interface DeploymentPreset {
  // Basic information
  name: string;
  description: string;
  version: string;
  
  // Primary external user configuration
  primaryExternalUser: ExternalServiceRecipientConfig;
  
  // Internal user configurations (optional)
  internalUsers?: {
    medical?: InternalUserConfig[];
    administrative?: InternalUserConfig[];
    technical?: InternalUserConfig[];
    business?: InternalUserConfig[];
  };
  
  // Feature enablement
  features: {
    fhirCompliance: boolean;
    hipaaCompliance?: boolean;
    prescribing?: boolean;
    scheduling?: boolean;
    billing?: boolean;
    messaging?: boolean;
    reporting?: boolean;
    api?: boolean;
  };
  
  // Third-party integrations
  integrations?: {
    ehr?: string;
    pharmacy?: string;
    lab?: string;
    billing?: string;
    messaging?: string;
  };
  
  // UI/UX preferences
  uiPreferences?: {
    theme?: 'light' | 'dark' | 'auto';
    primaryColor?: string;
    layout?: 'sidebar' | 'top-nav' | 'compact';
    density?: 'comfortable' | 'compact' | 'spacious';
  };
  
  // Security and compliance settings
  security?: {
    mfaRequired?: boolean;
    sessionTimeout?: number;
    auditLogging?: boolean;
    dataEncryption?: boolean;
  };
}
```

## Creating Custom Presets

### 1. Copy Existing Preset
Start with the preset closest to your needs and modify:

```typescript
import { businessCrmPreset } from './business-crm';

export const consultingFirmPreset = {
  ...businessCrmPreset,
  name: "Consulting Firm",
  description: "Specialized configuration for consulting firms",
  // Override specific settings
  primaryExternalUser: {
    ...businessCrmPreset.primaryExternalUser,
    singular: "client",
    labels: {
      ...businessCrmPreset.primaryExternalUser.labels,
      management: "Client Portfolio"
    }
  }
};
```

### 2. Build from Scratch
Create a completely custom configuration:

```typescript
import { clientConfig } from '../user-types/external-users/primary/client';

export const customPreset: DeploymentPreset = {
  name: "Custom Configuration",
  description: "Tailored for specific business needs",
  version: "1.0.0",
  
  primaryExternalUser: clientConfig,
  
  features: {
    fhirCompliance: false,
    scheduling: true,
    billing: true,
    messaging: true,
    reporting: true
  },
  
  uiPreferences: {
    theme: 'light',
    layout: 'sidebar',
    density: 'comfortable'
  }
};
```

## Preset Selection Guide

### By Industry
| Industry | Recommended Preset | Key Features |
|----------|-------------------|--------------|
| Hospital/Health System | `traditional-healthcare` | FHIR, HIPAA, prescribing, clinical workflows |
| Telemedicine | `telehealth` | Remote care, video integration, simplified workflows |
| Clinical Research | `research-facility` | Study management, regulatory compliance, data collection |
| Professional Services | `business-crm` | Client management, project tracking, billing |
| Sales Organization | `sales-organization` | Lead management, sales pipeline, performance tracking |
| E-commerce | `e-commerce` | Customer service, order management, support workflows |
| Fitness/Wellness | `wellness-center` | Member management, class scheduling, health tracking |

### By Organization Size
| Size | Recommended Features | Suggested Presets |
|------|---------------------|-------------------|
| Small (1-10 users) | Basic CRM, simple workflows | `business-crm`, `wellness-center` |
| Medium (10-100 users) | Advanced features, integrations | `traditional-healthcare`, `sales-organization` |
| Large (100+ users) | Full feature set, compliance | `traditional-healthcare`, `research-facility` |

## Environment Integration

Deployment presets integrate with environment-based configuration loading:

```typescript
// Load preset from environment
const preset = loadDeploymentPreset(
  process.env.DEPLOYMENT_PRESET || 'business-crm'
);

// Override specific settings
const config = {
  ...preset,
  features: {
    ...preset.features,
    customFeature: true
  }
};
```

## Validation and Testing

All deployment presets are validated for:
- Configuration completeness
- Feature compatibility
- Integration requirements
- Security compliance
- User type consistency

### Validation Commands
```bash
# Validate specific preset
pnpm config:validate-preset traditional-healthcare

# Validate current environment preset
pnpm config:validate

# Test preset with sample data
pnpm config:test-preset business-crm
```

## Migration Between Presets

When switching between deployment presets:

1. **Backup Current Configuration**: Save current settings and data
2. **Analyze Differences**: Review changes in user types, features, and integrations
3. **Plan Migration**: Identify data migration needs and user training requirements
4. **Test in Development**: Thoroughly test new preset before production deployment
5. **Deploy Gradually**: Consider phased rollout for large organizations

## Customization Best Practices

1. **Start with Standard Preset**: Choose the closest standard preset as a starting point
2. **Document Changes**: Keep clear documentation of any customizations
3. **Version Control**: Track preset changes through version control
4. **Test Thoroughly**: Validate all customizations with real workflows
5. **Plan Updates**: Consider how to maintain customizations when base presets update

## Support and Troubleshooting

### Common Issues
- **Missing Features**: Check that required features are enabled in preset
- **Integration Conflicts**: Verify integration compatibility with chosen features
- **User Type Mismatches**: Ensure internal user types align with organization structure
- **Compliance Issues**: Validate that preset meets regulatory requirements

### Getting Help
1. Review preset documentation and examples
2. Check feature compatibility matrix
3. Run preset validation tools
4. Test configuration in development environment
5. Consult main configuration documentation