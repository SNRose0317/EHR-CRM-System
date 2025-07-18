# EHR/CRM System - Claude AI Context

## Project Overview
The EHR/CRM System is a full-scale healthcare platform for Marek Health, built as a monorepo that includes patient management, appointment scheduling, lab results, and medication management capabilities.

## Project Status: **Enhanced Configuration System - Phase 2.1 ✅**

### Successfully Completed (Phase 1.1)
- ✅ **New GitHub Repository**: Created `EHR-CRM-System` 
- ✅ **Monorepo Structure**: npm workspaces with 4 packages
- ✅ **Medication Builder Package**: Extracted as `@marek/medication-builder`
- ✅ **UI Kit Package**: Extracted as `@marek/ui-kit` 
- ✅ **Shared Utilities**: Created `@marek/shared` package
- ✅ **Platform Core**: Main application shell with routing
- ✅ **Build System**: TypeScript project references and Vite configuration

### Successfully Completed (Phase 2.1) - Domain Configuration System
- ✅ **Hierarchical Configuration Structure**: Organized by user types and deployment scenarios
- ✅ **Multi-Terminology Support**: Patient/Client/Contact/Customer/Member/Subscriber/Participant
- ✅ **Environment-Based Loading**: `DOMAIN_TYPE=client pnpm dev` for easy switching
- ✅ **Deployment Presets**: Pre-configured scenarios for different industries
- ✅ **FHIR Compliance Maintained**: Automatic mapping preserves clinical standards
- ✅ **Comprehensive Validation**: Built-in configuration validation and testing tools

## Monorepo Architecture

```
├── config/                # Domain configuration system
│   ├── users/            # User type configurations
│   │   ├── external/     # Service recipients (patient/client/contact)
│   │   └── internal/     # Staff configurations
│   ├── deployment-presets/  # Industry-specific presets
│   └── tools/            # Configuration utilities
└── packages/
    ├── medication-builder/  # Advanced medication signature builder
    ├── ui-kit/             # Marek Health design system
    ├── shared/            # Common utilities and domain abstractions
    └── platform-core/    # Main EHR/CRM application
```

### Package Details

#### @marek/medication-builder
- **Purpose**: Advanced medication signature builder with FHIR compliance
- **Features**: 8 builder types, 500+ test cases, performance optimized
- **Status**: Extracted from original Med Sig Builder project
- **Dependencies**: `@lhncbc/ucum-lhc` for unit conversion

#### @marek/ui-kit  
- **Purpose**: Shared Marek Health design system
- **Features**: Radix UI components, Tailwind CSS, dark theme
- **Status**: Extracted from original UI components
- **Dependencies**: Radix UI primitives, class-variance-authority

#### @marek/shared
- **Purpose**: Common utilities, types, API configurations, and domain abstractions
- **Features**: Supabase client, error handling, shared types, domain configuration system
- **Status**: Enhanced with domain terminology abstraction system
- **Dependencies**: `@supabase/supabase-js`

#### Domain Configuration System (`/config/`)
- **Purpose**: Centralized domain terminology and user type management
- **Features**: Multi-terminology support, environment-based loading, deployment presets
- **User Types**: Patient/Client/Contact/Customer/Member/Subscriber/Participant
- **Deployment Presets**: Traditional Healthcare, Business CRM, Sales Organization
- **Status**: Comprehensive hierarchical configuration system with validation tools

#### @marek/platform-core
- **Purpose**: Main EHR/CRM application with routing and layout
- **Features**: Dashboard, Patient Management, Medication Builder integration
- **Status**: Basic shell with demonstration pages
- **Dependencies**: React 18, React Router, package references

## Current Application Structure

### Navigation & Layout
- **Sidebar Navigation**: Dashboard, Patients, Appointments, Lab Results, Medications, Communications, Reports
- **Dark Theme**: Marek Health brand colors (gray-900 sidebar, gray-800 content)
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS

### Implemented Pages
1. **Dashboard**: Overview with stats, quick actions, recent activity
2. **Patient Management**: Patient list with search, filters, basic CRUD operations  
3. **Medication Builder**: Integration demo showing extracted package functionality
4. **Coming Soon Pages**: Placeholders for Appointments, Lab Results, Communications, Reports

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + Radix UI
- **Database**: Supabase (PostgreSQL) 
- **Package Management**: npm workspaces
- **Build System**: TypeScript project references
- **Testing**: Jest (configured but needs implementation)

## Development Commands

### Root Level
```bash
npm install          # Install all dependencies
npm run dev         # Start platform-core dev server
npm run build       # Build all packages
npm run typecheck   # Type check all packages
npm test            # Run tests
```

### Domain Configuration
```bash
# Switch terminology
DOMAIN_TYPE=client pnpm dev      # Use client terminology
DOMAIN_TYPE=patient pnpm dev     # Use patient terminology  
DOMAIN_TYPE=contact pnpm dev     # Use contact terminology

# Use deployment presets
DEPLOYMENT_PRESET=traditional-healthcare pnpm dev
DEPLOYMENT_PRESET=business-crm pnpm dev

# Configuration management
pnpm config:validate            # Validate current configuration
pnpm config:list-presets        # List available deployment presets
pnpm config:list-user-types     # List available user types
```

### Individual Packages
```bash
# Navigate to specific package
cd packages/medication-builder
npm run build       # Build package
npm test           # Run package tests
```

## Next Steps (Phase 2-4)

### Phase 2: Patient Management Core
- Complete patient profiles and demographics
- Medical history and allergies
- FHIR Patient resource compliance

### Phase 3: Appointment System  
- Calendar integration and scheduling
- Provider availability management
- Appointment booking workflows

### Phase 4: Clinical Workflows
- Lab results integration (HL7 FHIR)
- E-prescribing system integration
- Clinical notes and documentation

## Known Issues & Technical Debt

### TypeScript Errors (To Fix)
- Import path resolution in extracted packages
- Missing environment variable types
- Component export/import mismatches
- Test file type errors

### Architecture Improvements
- Complete package dependency resolution
- Implement proper workspace imports
- Add comprehensive testing setup
- Configure CI/CD pipelines

## Integration Success

The monorepo successfully demonstrates:
- ✅ **Package Extraction**: Medication builder works as standalone package
- ✅ **UI Component Sharing**: Design system components render correctly
- ✅ **Navigation Structure**: Full EHR/CRM layout implemented
- ✅ **Modular Architecture**: Clear separation of concerns across packages

## Development Workflow

1. **Planning Documents**: Use `/planning/*.md` for living tickets with execution logs
2. **Technical Docs**: Keep `/docs/*.md` current with implementation state  
3. **Package Development**: Each package has independent build and test workflow
4. **Integration Testing**: Platform-core imports and uses all packages

This foundation is ready for Phase 2 development focusing on patient management core functionality.