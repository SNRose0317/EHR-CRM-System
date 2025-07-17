# EHR/CRM System

Full-scale EHR/CRM platform for Marek Health featuring integrated patient management, appointment scheduling, lab results, and medication management.

## Architecture

This is a monorepo containing multiple packages:

### Core Packages

- **`packages/platform-core/`** - Main EHR/CRM application
- **`packages/medication-builder/`** - Advanced medication signature builder (extracted from Med Sig Builder)
- **`packages/ui-kit/`** - Shared Marek Health design system components
- **`packages/shared/`** - Common utilities, types, and configurations

### Development

```bash
# Install dependencies for all packages
npm install

# Start development server
npm run dev

# Run tests across all packages  
npm test

# Build all packages
npm run build

# Type checking
npm run typecheck

# Lint all packages
npm run lint
```

## Package Structure

Each package in `packages/` is a standalone npm package with its own:
- `package.json` with dependencies and scripts
- `tsconfig.json` for TypeScript configuration
- Independent build and test configurations
- Clear public API exports

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build**: Vite with monorepo support
- **Styling**: Tailwind CSS with Marek Health design system
- **Database**: Supabase (PostgreSQL)
- **Testing**: Jest + Testing Library
- **Performance**: Artillery load testing + CI/CD gates

## Getting Started

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the development server
4. Navigate to the platform-core application

## Contributing

Each package maintains its own development workflow while sharing common tooling and standards across the monorepo.