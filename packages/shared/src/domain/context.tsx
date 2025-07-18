/**
 * Domain Configuration React Context
 * 
 * Provides domain configuration throughout the React component tree
 * for dynamic terminology and routing.
 * 
 * @since 2.1.0
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { DomainEntityConfig, ExternalServiceRecipientConfig } from './config';

/**
 * Domain Configuration Context
 */
const DomainConfigContext = createContext<DomainEntityConfig | null>(null);

/**
 * Props for DomainConfigProvider
 */
interface DomainConfigProviderProps {
  /** Domain configuration object */
  config: DomainEntityConfig;
  /** Child components */
  children: ReactNode;
}

/**
 * Domain Configuration Provider Component
 * 
 * Provides domain configuration to all child components through React context.
 * Should be placed at the root of the application.
 * 
 * @example
 * ```tsx
 * import { DomainConfigProvider, CLIENT_CONFIG, createDomainConfig } from '@marek/shared';
 * 
 * const config = createDomainConfig(CLIENT_CONFIG);
 * 
 * function App() {
 *   return (
 *     <DomainConfigProvider config={config}>
 *       <Router>
 *         <Routes>
 *           // ... routes
 *         </Routes>
 *       </Router>
 *     </DomainConfigProvider>
 *   );
 * }
 * ```
 */
export function DomainConfigProvider({ config, children }: DomainConfigProviderProps) {
  return (
    <DomainConfigContext.Provider value={config}>
      {children}
    </DomainConfigContext.Provider>
  );
}

/**
 * Hook to access the complete domain configuration
 * 
 * @returns The complete domain configuration object
 * @throws Error if used outside of DomainConfigProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const config = useDomainConfig();
 *   const routes = config.externalServiceRecipient.routes;
 *   
 *   return <Link to={routes.list}>View All</Link>;
 * }
 * ```
 */
export function useDomainConfig(): DomainEntityConfig {
  const config = useContext(DomainConfigContext);
  
  if (!config) {
    throw new Error(
      'useDomainConfig must be used within a DomainConfigProvider. ' +
      'Make sure to wrap your app with <DomainConfigProvider config={yourConfig}>'
    );
  }
  
  return config;
}

/**
 * Hook to access external service recipient configuration
 * 
 * @returns External service recipient configuration
 * @throws Error if used outside of DomainConfigProvider
 * 
 * @example
 * ```tsx
 * function ServiceRecipientList() {
 *   const config = useServiceRecipientConfig();
 *   
 *   return (
 *     <div>
 *       <h1>{config.labels.management}</h1>
 *       <button>{config.labels.addNew}</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useServiceRecipientConfig(): ExternalServiceRecipientConfig {
  const config = useDomainConfig();
  return config.externalServiceRecipient;
}

/**
 * Hook to access external service recipient labels
 * 
 * @returns External service recipient labels object
 * @throws Error if used outside of DomainConfigProvider
 * 
 * @example
 * ```tsx
 * function SearchInput() {
 *   const labels = useServiceRecipientLabels();
 *   
 *   return (
 *     <input 
 *       type="text" 
 *       placeholder={labels.search}
 *       aria-label={labels.search}
 *     />
 *   );
 * }
 * ```
 */
export function useServiceRecipientLabels() {
  const config = useServiceRecipientConfig();
  return config.labels;
}

/**
 * Hook to access external service recipient routes
 * 
 * @returns External service recipient routes object
 * @throws Error if used outside of DomainConfigProvider
 * 
 * @example
 * ```tsx
 * function Navigation() {
 *   const routes = useServiceRecipientRoutes();
 *   
 *   return (
 *     <nav>
 *       <Link to={routes.list}>View All</Link>
 *       <Link to={routes.add}>Add New</Link>
 *     </nav>
 *   );
 * }
 * ```
 */
export function useServiceRecipientRoutes() {
  const config = useServiceRecipientConfig();
  return config.routes;
}

/**
 * Hook to access external service recipient terminology
 * 
 * @returns Object with singular, plural, and capitalized forms
 * @throws Error if used outside of DomainConfigProvider
 * 
 * @example
 * ```tsx
 * function StatusMessage({ count }: { count: number }) {
 *   const terminology = useServiceRecipientTerminology();
 *   
 *   return (
 *     <p>
 *       Showing {count} {count === 1 ? terminology.singular : terminology.plural}
 *     </p>
 *   );
 * }
 * ```
 */
export function useServiceRecipientTerminology() {
  const config = useServiceRecipientConfig();
  return {
    singular: config.singular,
    plural: config.plural,
    singularCap: config.singularCap,
    pluralCap: config.pluralCap,
    idField: config.idField
  };
}