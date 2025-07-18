# External Users Configuration

External users are individuals who receive services from your organization. They are the primary focus of most interactions within the EHR/CRM system.

## User Categories

### Primary External Users (`/primary/`)
The main service recipients who are the focus of your business operations:

- **Patient** - Healthcare settings (hospitals, clinics, medical practices)
- **Client** - Business/professional services (consulting, legal, financial)
- **Contact** - Sales and marketing (leads, prospects, potential customers)
- **Customer** - E-commerce and retail (purchasers, subscribers)
- **Member** - Membership organizations (gyms, clubs, associations)
- **Subscriber** - Subscription services (SaaS, media, recurring billing)
- **Participant** - Research settings (clinical trials, studies)

### Secondary External Users (`/secondary/`)
Individuals associated with primary users who may need limited access:

- **Family Member** - Relatives of primary users
- **Caregiver** - Professional or personal caregivers
- **Guardian** - Legal guardians (especially for minors or incapacitated individuals)
- **Proxy** - Healthcare proxies, power of attorney holders

## Configuration Guidelines

### Primary External User Selection
Choose the primary external user type that best matches your organization's terminology and industry:

| Industry/Sector | Recommended Type | Alternative Options |
|-----------------|------------------|-------------------|
| Healthcare | `patient` | `member` (wellness centers) |
| Business Services | `client` | `contact` (if sales-focused) |
| Sales & Marketing | `contact` | `client` (if service-focused) |
| E-commerce | `customer` | `subscriber` (if subscription-based) |
| Membership Orgs | `member` | `client` (if service-focused) |
| SaaS/Subscriptions | `subscriber` | `customer`, `client` |
| Research | `participant` | `patient` (clinical research) |

### FHIR Compliance
All primary external user types map to FHIR Patient resources for:
- Medical data storage
- Clinical workflows
- Healthcare interoperability
- Regulatory compliance

The medication-builder package always receives FHIR-compliant PatientContext regardless of your chosen terminology.

### Relationships
External users can have relationships with:
- **Internal Users**: Staff members who serve them
- **Secondary External Users**: Family members, caregivers, proxies
- **Other Primary Users**: In multi-tenant or referral scenarios

### Data Classification
External user data is typically classified as:
- **PHI** (Protected Health Information) - Healthcare settings
- **PII** (Personally Identifiable Information) - Business settings
- **Customer Data** - E-commerce and subscription services
- **Research Data** - Clinical trials and studies

## Usage Examples

### Healthcare Organization
```typescript
// Use patient terminology
import { patientConfig } from './primary/patient';
```

### Business Consultancy
```typescript
// Use client terminology
import { clientConfig } from './primary/client';
```

### Sales Organization
```typescript
// Use contact terminology  
import { contactConfig } from './primary/contact';
```

### E-commerce Platform
```typescript
// Use customer terminology
import { customerConfig } from './primary/customer';
```

## Secondary User Management

Secondary external users provide controlled access to primary user information:

### Family Members
- View basic information
- Receive updates and notifications
- Schedule appointments (with permissions)

### Caregivers
- Access care plans and medical information
- Update care notes and observations
- Coordinate with healthcare team

### Legal Guardians
- Full access to primary user information
- Make decisions on behalf of primary user
- Manage consent and permissions

### Healthcare Proxies
- Make healthcare decisions when primary user cannot
- Access medical information as authorized
- Communicate with healthcare providers

## Configuration File Structure

Each external user type configuration includes:

```typescript
export const userTypeConfig: ExternalServiceRecipientConfig = {
  // Terminology
  singular: "patient",
  plural: "patients", 
  singularCap: "Patient",
  pluralCap: "Patients",
  idField: "patient_id",
  
  // Navigation
  routes: {
    list: "/patients",
    detail: "/patient", 
    add: "/add-patient"
  },
  
  // User Interface
  labels: {
    management: "Patient Management",
    addNew: "Add New Patient",
    search: "Search patients...",
    listTitle: "All Patients",
    entityId: "Patient ID"
  },
  
  // Business Context
  relationships: {
    internalStaff: "healthcare provider",
    secondaryUsers: "family members"
  },
  
  context: {
    industry: "healthcare",
    domain: "clinical",
    dataClassification: "phi"
  }
};
```

## Best Practices

1. **Industry Alignment**: Choose terminology that matches your industry and organization
2. **User Expectations**: Use terms your users are familiar with
3. **Consistency**: Maintain consistent terminology throughout the application
4. **Compliance**: Ensure data classification matches regulatory requirements
5. **Relationships**: Define clear relationships with internal staff and secondary users
6. **Accessibility**: Use inclusive and accessible language in all configurations