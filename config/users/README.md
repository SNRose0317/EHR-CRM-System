# User Type Configuration System

This directory contains configurations for different user types in the EHR/CRM system, organized by their relationship to the platform.

## User Type Categories

### External Users (`/external-users/`)
Users who receive services from your organization:

- **Primary External Users** (`/primary/`): The main service recipients
- **Secondary External Users** (`/secondary/`): Family members, caregivers, proxies

### Internal Users (`/internal-users/`)
Staff and employees of your organization:

- **Medical Staff** (`/medical-staff/`): Clinical personnel
- **Administrative Staff** (`/administrative-staff/`): Non-clinical staff
- **Technical Staff** (`/technical-staff/`): IT and system administrators
- **Business Staff** (`/business-staff/`): Sales, marketing, management

## Configuration Structure

Each user type configuration includes:

```typescript
interface UserTypeConfig {
  // Basic terminology
  singular: string;           // "patient" | "client" | "physician"
  plural: string;             // "patients" | "clients" | "physicians"
  singularCap: string;        // "Patient" | "Client" | "Physician"
  pluralCap: string;          // "Patients" | "Clients" | "Physicians"
  idField: string;            // "patient_id" | "client_id" | "physician_id"
  
  // UI routing and navigation
  routes: {
    list: string;             // "/patients" | "/clients" | "/staff/physicians"
    detail: string;           // "/patient" | "/client" | "/staff/physician"
    add: string;              // "/add-patient" | "/add-client" | "/staff/add-physician"
  };
  
  // User interface labels
  labels: {
    management: string;       // "Patient Management" | "Client Management"
    addNew: string;           // "Add New Patient" | "Add New Client"
    search: string;           // "Search patients..." | "Search clients..."
    listTitle: string;        // "All Patients" | "All Clients"
    entityId: string;         // "Patient ID" | "Client ID"
  };
  
  // Contextual information
  relationships?: {
    [key: string]: string;    // Relationships to other user types
  };
  
  context?: {
    industry?: string;        // "healthcare" | "business" | "research"
    domain?: string;          // "clinical" | "crm" | "administrative"
    dataClassification?: string; // "phi" | "business-sensitive" | "public"
  };
}
```

## Primary External User Selection

The primary external user type determines the main terminology used throughout the application:

| Type | Industry | Use Case | FHIR Mapping |
|------|----------|----------|--------------|
| `patient` | Healthcare | Hospitals, clinics, medical practices | FHIR Patient |
| `client` | Business | CRM, consulting, professional services | FHIR Patient (mapped) |
| `contact` | Sales/Marketing | Lead management, customer outreach | FHIR Patient (mapped) |
| `customer` | E-commerce | Online retail, subscription services | FHIR Patient (mapped) |
| `member` | Membership | Gyms, clubs, organizations | FHIR Patient (mapped) |
| `subscriber` | Subscription | SaaS, media, recurring services | FHIR Patient (mapped) |
| `participant` | Research | Clinical trials, studies | FHIR Patient |

## Configuration Loading

### Environment-Based Loading
```typescript
import { loadPrimaryExternalUser } from '../config/user-types';

// Load based on environment variable
const config = loadPrimaryExternalUser(process.env.DOMAIN_TYPE || 'client');
```

### Direct Import
```typescript
import { patientConfig } from './external-users/primary/patient';
import { clientConfig } from './external-users/primary/client';
```

## Extending User Types

### Adding New Primary External User Type
1. Create configuration file in `/external-users/primary/`
2. Define complete user type configuration
3. Add to primary user registry in `/external-users/primary/index.ts`
4. Update environment loading in `/environment.ts`

### Adding New Internal User Type
1. Choose appropriate category (`medical-staff`, `administrative-staff`, etc.)
2. Create configuration file in appropriate directory
3. Add to category registry index file
4. Update deployment presets as needed

## Relationships Between User Types

User types can define relationships to other user types:

```typescript
// Example: Client configuration
relationships: {
  internalStaff: "account manager",        // "John's account manager"
  secondaryUsers: "authorized contacts"    // "John's authorized contacts"
}

// Example: Physician configuration  
relationships: {
  primaryUsers: "patients",                // "Dr. Smith's patients"
  reportsTo: "medical director",          // "Reports to medical director"
  collaboratesWith: ["nurses", "pharmacists"]
}
```

## Validation

All user type configurations are validated for:
- Required fields completeness
- Terminology consistency
- Route uniqueness
- Relationship validity
- FHIR compliance (for external users)

Run validation: `pnpm config:validate`

## Best Practices

1. **Consistent Terminology**: Use consistent terminology within each configuration
2. **Clear Routes**: Ensure routes are unique and intuitive
3. **Descriptive Labels**: Use clear, user-friendly labels
4. **Logical Relationships**: Define meaningful relationships between user types
5. **Context Information**: Provide context for data classification and compliance

## Examples

See individual directories for detailed examples:
- `/external-users/primary/` - Service recipient configurations
- `/external-users/secondary/` - Secondary user configurations
- `/internal-users/` - Staff and employee configurations