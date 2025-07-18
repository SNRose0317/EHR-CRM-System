# Primary External Users Configuration

Primary external users are the main service recipients in your organization. They are the focus of most workflows, data collection, and service delivery within the EHR/CRM system.

## Available Configurations

### Healthcare Terminology
- **`patient.ts`** - Traditional healthcare terminology for hospitals, clinics, medical practices

### Business Terminology  
- **`client.ts`** - Professional services terminology for consulting, legal, financial services
- **`contact.ts`** - Sales and marketing terminology for lead management and customer outreach
- **`customer.ts`** - E-commerce and retail terminology for purchasers and buyers

### Specialized Terminology
- **`member.ts`** - Membership organizations like gyms, clubs, associations
- **`subscriber.ts`** - Subscription services, SaaS platforms, recurring billing scenarios
- **`participant.ts`** - Research settings, clinical trials, studies

## Configuration Selection Guide

### By Industry
| Industry | Primary Choice | Secondary Choice | Notes |
|----------|---------------|------------------|-------|
| **Healthcare** | `patient` | `member` | Use `member` for wellness centers, fitness-focused clinics |
| **Professional Services** | `client` | `contact` | Use `contact` if heavily sales-focused |
| **Sales & Marketing** | `contact` | `client` | Use `client` if providing ongoing services |
| **E-commerce** | `customer` | `subscriber` | Use `subscriber` for subscription models |
| **SaaS/Software** | `subscriber` | `customer` | Use `customer` for one-time purchases |
| **Research** | `participant` | `patient` | Use `patient` for clinical research |
| **Membership Orgs** | `member` | `client` | Use `client` if providing professional services |

### By Business Model
| Business Model | Recommended Configuration |
|----------------|-------------------------|
| Fee-for-service | `client` |
| Subscription-based | `subscriber` |
| Product sales | `customer` |
| Lead generation | `contact` |
| Healthcare services | `patient` |
| Research studies | `participant` |
| Membership dues | `member` |

## Configuration Features

Each primary external user configuration provides:

### 1. **Terminology Management**
- Singular and plural forms
- Capitalized versions for titles
- Database field naming conventions

### 2. **Route Configuration**
- List view routes (`/patients`, `/clients`, `/contacts`)
- Detail view routes (`/patient/:id`, `/client/:id`) 
- Add new routes (`/add-patient`, `/add-client`)

### 3. **UI Label Management**
- Page titles and headings
- Button text and actions
- Search placeholders
- Navigation menu items

### 4. **Relationship Definitions**
- How they relate to internal staff
- Secondary user relationships
- Business context and industry alignment

### 5. **Data Classification**
- Industry-appropriate data handling
- Compliance requirements (HIPAA, GDPR, etc.)
- Security and access control context

## FHIR Compliance

All primary external user types maintain FHIR compliance through automatic mapping:

```typescript
// Application layer uses your chosen terminology
const serviceRecipient: ExternalServiceRecipientContext = {
  id: "client-123",
  age: 45,
  // ... other fields
};

// Medication builder receives FHIR-compliant data
const patientContext = toPatientContext(serviceRecipient);
// patientContext is now FHIR Patient resource compatible
```

This ensures:
- Medical data remains standards-compliant
- Integration with healthcare systems works seamlessly  
- Regulatory requirements are met
- No breaking changes to clinical workflows

## Environment Integration

Primary external user configurations integrate with environment-based loading:

```bash
# Use patient terminology
DOMAIN_TYPE=patient pnpm dev

# Use client terminology  
DOMAIN_TYPE=client pnpm dev

# Use contact terminology
DOMAIN_TYPE=contact pnpm dev
```

## Customization

### Creating Custom Configurations
1. Copy an existing configuration file that's closest to your needs
2. Modify terminology, routes, and labels
3. Update relationships and context information
4. Add to the primary user registry in `index.ts`
5. Test thoroughly with your workflows

### Extending Existing Configurations
```typescript
import { clientConfig } from './client';

export const consultantConfig = {
  ...clientConfig,
  singular: "consultant",
  plural: "consultants",
  // Override specific fields while keeping the rest
};
```

## Testing Configurations

Always test your configuration changes:

1. **UI Testing**: Verify all labels appear correctly
2. **Navigation Testing**: Ensure all routes work properly
3. **Integration Testing**: Confirm FHIR compliance is maintained
4. **Workflow Testing**: Test complete user workflows with new terminology
5. **Performance Testing**: Ensure no performance impact from configuration changes

## Migration Between Configurations

When changing primary external user types:

1. **Data Migration**: Update database records if field names change
2. **Route Updates**: Update any hardcoded routes in frontend code
3. **Documentation**: Update user-facing documentation
4. **Training**: Train staff on new terminology
5. **Integration Testing**: Test all integrations with new configuration

## Support and Troubleshooting

### Common Issues
- **Missing Labels**: Check that all required label fields are defined
- **Route Conflicts**: Ensure routes don't conflict with existing application routes
- **FHIR Mapping Errors**: Verify that mapping functions handle all required fields
- **Type Errors**: Run TypeScript validation after configuration changes

### Validation
Run configuration validation:
```bash
pnpm config:validate
```

### Getting Help
1. Check configuration examples in this directory
2. Review the main configuration documentation in `/config/README.md`
3. Run validation tools to identify issues
4. Test changes in development environment before deploying