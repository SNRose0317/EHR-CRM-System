# Domain Configuration System

This directory contains the centralized configuration system for domain terminology and user types across the EHR/CRM platform. The system allows the same codebase to be deployed with different terminology while maintaining functionality and FHIR compliance.

## Quick Start

### Switch Configuration
```bash
# Use client terminology (business/CRM focus)
DOMAIN_TYPE=client pnpm dev

# Use patient terminology (healthcare focus)
DOMAIN_TYPE=patient pnpm dev

# Use contact terminology (sales/marketing focus)  
DOMAIN_TYPE=contact pnpm dev
```

### Use Deployment Presets
```bash
# Traditional healthcare setup
DEPLOYMENT_PRESET=traditional-healthcare pnpm dev

# Business CRM setup
DEPLOYMENT_PRESET=business-crm pnpm dev
```

## Directory Structure

```
config/
├── users/                   # User type configurations  
│   ├── external/            # Users receiving services
│   │   ├── primary/         # Main service recipients (patients/clients/contacts)
│   │   └── secondary/       # Family members, caregivers, proxies
│   └── internal/            # Staff and employees
│       ├── medical-staff/   # Clinical personnel
│       ├── administrative-staff/  # Non-clinical staff
│       ├── technical-staff/ # IT and system administrators
│       └── business-staff/  # Sales, marketing, management
├── deployment-presets/      # Pre-configured scenarios
└── tools/                   # Configuration utilities
```

## User Type Categories

### External Users (Service Recipients)
- **Primary**: The main person receiving services
  - `patient` - Healthcare terminology (FHIR compliant)
  - `client` - Business/CRM terminology
  - `contact` - Sales/marketing terminology
  - `customer` - E-commerce terminology
  - `member` - Membership terminology
  - `subscriber` - Subscription terminology
  - `participant` - Research terminology

- **Secondary**: Family members, caregivers with portal access
  - `family-member` - Family members
  - `caregiver` - Professional caregivers
  - `guardian` - Legal guardians
  - `proxy` - Healthcare proxies

### Internal Users (Staff & Employees)
- **Medical Staff**: Clinical personnel
- **Administrative Staff**: Non-clinical personnel  
- **Technical Staff**: IT and system administrators
- **Business Staff**: Sales, marketing, management

## Configuration Files

Each user type has its own configuration file with:
- Terminology (singular/plural forms)
- Routes and navigation
- UI labels and text
- Relationships to other user types
- Role-specific permissions and context

## Environment Variables

| Variable | Description | Default | Examples |
|----------|-------------|---------|----------|
| `DOMAIN_TYPE` | Primary external user type | `client` | `patient`, `client`, `contact` |
| `DEPLOYMENT_PRESET` | Complete deployment configuration | `business-crm` | `traditional-healthcare`, `telehealth` |
| `CONFIG_VALIDATION` | Enable config validation | `true` | `true`, `false` |

## Development Workflow

1. **Choose Configuration**: Select user type or deployment preset
2. **Set Environment**: Use environment variables for configuration
3. **Validate**: Run configuration validation before deployment
4. **Test**: Ensure functionality works with chosen terminology
5. **Deploy**: Use validated configuration for deployment

## FHIR Compliance

The system maintains FHIR compliance regardless of terminology choice:
- External user configurations map to FHIR Patient resources
- Internal medical staff maps to FHIR Practitioner resources
- All clinical data remains FHIR-compliant at the API layer

## Next Steps

- See `/users/README.md` for user type configuration details
- See `/deployment-presets/README.md` for preset configuration options
- See `/tools/README.md` for configuration management utilities

## Support

For questions or issues with domain configuration:
1. Check the README files in each directory
2. Run configuration validation: `pnpm config:validate`
3. Review example configurations in `/user-types/`
4. Consult the main project documentation