# Simplified UI Terminology Implementation Plan
*Expert Consensus: Gemini Pro + O3 Analysis*

## Problem Statement (Simplified)
**Goal**: When `DOMAIN_TYPE=client`, show "Client Management" and "client-001" throughout UI instead of "Patient Management" and "patient-001"

**Solution**: UI-only changes using React Context and hooks. No backend modifications needed.

## Expert Consensus Key Findings

### ✅ **What We DON'T Need (Overengineering Avoided)**
- ❌ API endpoint changes (`/api/patients` → `/api/service-recipients`)
- ❌ Database schema modifications  
- ❌ Complex mapping services
- ❌ Multi-layer abstraction pipeline
- ❌ FHIR compliance changes

### ✅ **What We DO Need (Minimal Viable Solution)**
- ✅ React Context for global terminology
- ✅ `useTerminology()` hook
- ✅ Component refactoring to use dynamic labels
- ✅ ID formatting for display purposes only

## Implementation Plan: 3 Steps, 1 Week

### **Step 1: Complete Terminology Configuration (Day 1)**
**Goal**: Ensure configuration covers ALL UI strings
**Duration**: 1 day

**Actions**:
1. **Audit current UI strings** - Find all hardcoded "Patient", "Client" text
2. **Expand configuration schema** - Add missing UI strings to config
3. **Validate completeness** - Ensure every UI string has config entry

**Files to modify**:
```
config/users/external/primary/client.ts
config/users/external/primary/patient.ts
+ Add missing fields for complete UI coverage
```

**Configuration schema expansion**:
```typescript
export const clientConfig = {
  // Existing fields
  singular: "client",
  plural: "clients",
  
  // NEW: Complete UI terminology
  labels: {
    management: "Client Management",
    addNew: "Add New Client",
    search: "Search clients...",
    listTitle: "All Clients",
    entityId: "Client ID",
    entityName: "Client Name"
  },
  
  // NEW: ID formatting
  display: {
    idPrefix: "client",
    idFormat: "client-{number}" // client-001, client-002
  }
};
```

### **Step 2: Create Global Terminology Provider (Day 2-3)**
**Goal**: Make terminology available to all React components
**Duration**: 2 days

**Actions**:
1. **Create TerminologyProvider** - React Context provider
2. **Create useTerminology hook** - Easy access to terminology
3. **Wrap App component** - Provide terminology globally
4. **Add TypeScript types** - Type-safe terminology access

**New files to create**:
```
packages/shared/src/hooks/useTerminology.tsx
packages/shared/src/providers/TerminologyProvider.tsx
packages/shared/src/types/terminology.ts
```

**Implementation**:
```typescript
// TerminologyProvider.tsx
const TerminologyProvider = ({ children }) => {
  const config = loadDomainConfig(); // Use existing config system
  const terminology = config.primaryExternalUser;
  
  return (
    <TerminologyContext.Provider value={terminology}>
      {children}
    </TerminologyContext.Provider>
  );
};

// useTerminology.tsx  
const useTerminology = () => {
  const terminology = useContext(TerminologyContext);
  
  return {
    t: (key: string) => terminology.labels[key],
    singular: terminology.singular,
    plural: terminology.plural,
    formatId: (number: number) => `${terminology.display.idPrefix}-${number.toString().padStart(3, '0')}`
  };
};
```

**Integration with App.tsx**:
```typescript
// App.tsx - wrap existing app
function App() {
  return (
    <TerminologyProvider>
      <DomainConfigProvider config={domainConfig}>
        <Router>
          {/* existing app content */}
        </Router>
      </DomainConfigProvider>
    </TerminologyProvider>
  );
}
```

### **Step 3: Refactor UI Components (Day 4-7, Ongoing)**
**Goal**: Convert hardcoded strings to use terminology
**Duration**: 3-4 days initial, ongoing

**Actions**:
1. **Start with high-impact components** - Navigation, page headers
2. **Convert hardcoded strings** - Use `t()` function and hooks
3. **Add ID formatting** - Display formatted IDs (client-001)
4. **Test terminology switching** - Verify `DOMAIN_TYPE` changes work
5. **Add ESLint rule** - Prevent future hardcoded terminology

**Component refactoring examples**:

**Before**:
```typescript
// PatientManagement.tsx
<h1>Patient Management</h1>
<button>Add New Patient</button>
<span>Patient ID: P001</span>
```

**After**:
```typescript
// ServiceRecipientManagement.tsx
const { t, formatId } = useTerminology();

<h1>{t('management')}</h1>
<button>{t('addNew')}</button>
<span>{t('entityId')}: {formatId(1)}</span>
```

**ESLint rule to add**:
```javascript
// .eslintrc.js - prevent hardcoded terminology
rules: {
  'no-hardcoded-terminology': 'error' // Custom rule to flag "Patient", "Client"
}
```

## Testing Strategy

### **Immediate Testing (Day 3)**
```bash
# Test terminology switching
DOMAIN_TYPE=client npm run dev    # Should show "Client Management"
DOMAIN_TYPE=patient npm run dev   # Should show "Patient Management"  
DOMAIN_TYPE=contact npm run dev   # Should show "Contact Management"
```

### **Regression Prevention**
1. **Visual diff testing** - Storybook with terminology variants
2. **Unit tests** - Test terminology provider and hooks
3. **ESLint rules** - Prevent hardcoded strings
4. **Documentation** - Clear refactoring guidelines

## Success Metrics

### **Day 3 Target** (After Step 2):
- ✅ Terminology provider working
- ✅ One page showing dynamic terminology
- ✅ `DOMAIN_TYPE` switching demonstrates concept

### **Week 1 Target** (After Step 3):
- ✅ Navigation and main pages use dynamic terminology
- ✅ IDs display with correct formatting (client-001, patient-001)
- ✅ No hardcoded "Patient" or "Client" strings in refactored components
- ✅ ESLint rule preventing regressions

### **Ongoing Targets**:
- ✅ All components gradually refactored
- ✅ New components use terminology from start
- ✅ Zero terminology inconsistencies in UI

## What This Approach Achieves

### ✅ **Immediate Value**
- **Week 1**: Core terminology working in UI
- **Incremental**: Each component refactored shows immediate improvement  
- **Switchable**: `DOMAIN_TYPE=customer` instantly changes all refactored components

### ✅ **Technical Benefits**
- **No breaking changes** - Backend APIs unchanged
- **Type safety** - TypeScript ensures terminology consistency
- **Maintainable** - Centralized terminology configuration
- **Testable** - Easy to verify terminology switching works

### ✅ **Business Benefits**
- **Fast delivery** - Working solution in 1 week vs 3 months
- **Low risk** - UI-only changes, easy to rollback
- **Flexible** - Easy to add new terminologies (customer, member)
- **Cost effective** - Minimal engineering effort for maximum impact

## Future Considerations (Separate Initiative)

### **Backend Terminology Audit** (Parallel Track)
- Inventory all server-side terminology usage (logs, emails, exports)
- Size the effort for full backend terminology abstraction
- Decide if backend refactor has sufficient ROI
- Keep as separate, explicitly costed initiative

### **Advanced Features** (If Needed Later)
- Multi-tenant terminology (per-organization settings)
- Email template terminology
- API response field terminology
- Database field terminology

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Components missed during refactor | Inconsistent UI | ESLint rule + visual QA |
| ID format confusion | Support issues | Clear documentation + consistent format |
| New components use hardcoded strings | Regression | ESLint rule + code review |
| Performance of React Context | UI slowness | Memoization + performance testing |

## Final Architecture

```
┌─────────────────────┐
│ UI Components       │ ← Dynamic terminology via useTerminology()
├─────────────────────┤
│ TerminologyProvider │ ← React Context with current terminology  
├─────────────────────┤
│ Configuration       │ ← Existing config system (client.ts, patient.ts)
├─────────────────────┤
│ Backend APIs        │ ← UNCHANGED - existing endpoints and data
├─────────────────────┤
│ Database            │ ← UNCHANGED - existing schema and data
└─────────────────────┘
```

**Result**: When `DOMAIN_TYPE=client`, UI shows "Client Management" and "client-001" throughout the interface, with zero backend changes needed.

This simplified approach delivers 100% of the stated goal with minimal engineering effort and maximum business value.