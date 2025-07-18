/**
 * Domain Entity Configuration System
 * 
 * Provides configurable terminology for different user types across the application.
 * Allows the same codebase to be deployed with different terminology (patient/client/contact)
 * while maintaining FHIR compliance and type safety.
 * 
 * @since 2.1.0
 */

/**
 * Configuration for external service recipients
 * (the primary users receiving services - patients, clients, contacts, customers)
 */
export interface ExternalServiceRecipientConfig {
  /** Singular form: "patient" | "client" | "contact" | "customer" */
  singular: string;
  /** Plural form: "patients" | "clients" | "contacts" | "customers" */
  plural: string;
  /** Capitalized singular: "Patient" | "Client" | "Contact" | "Customer" */
  singularCap: string;
  /** Capitalized plural: "Patients" | "Clients" | "Contacts" | "Customers" */
  pluralCap: string;
  /** Database ID field: "patient_id" | "client_id" | "contact_id" | "customer_id" */
  idField: string;
  /** Route configurations */
  routes: {
    /** List view route: "/patients" | "/clients" | "/contacts" */
    list: string;
    /** Detail view route: "/patient" | "/client" | "/contact" */
    detail: string;
    /** Add new route: "/add-patient" | "/add-client" | "/add-contact" */
    add: string;
  };
  /** UI label configurations */
  labels: {
    /** Management page title: "Patient Management" | "Client Management" */
    management: string;
    /** Add button text: "Add New Patient" | "Add New Client" */
    addNew: string;
    /** Search placeholder: "Search patients..." | "Search clients..." */
    search: string;
    /** List filter option: "All Patients" | "All Clients" */
    listTitle: string;
    /** Individual entity reference: "Patient ID" | "Client ID" */
    entityId: string;
  };
}

/**
 * Main domain entity configuration interface
 * Extensible for future user types (medical staff, administrative staff, etc.)
 */
export interface DomainEntityConfig {
  /** Configuration for external service recipients */
  externalServiceRecipient: ExternalServiceRecipientConfig;
  
  // Future expansion ready:
  // medicalStaff?: MedicalStaffConfig;
  // administrativeStaff?: AdministrativeStaffConfig;
  // secondaryExternalUser?: SecondaryExternalUserConfig; // family members, etc.
}

/**
 * Predefined configurations for common deployment scenarios
 */

/** Traditional medical/healthcare terminology */
export const PATIENT_CONFIG: ExternalServiceRecipientConfig = {
  singular: "patient",
  plural: "patients",
  singularCap: "Patient",
  pluralCap: "Patients",
  idField: "patient_id",
  routes: {
    list: "/patients",
    detail: "/patient",
    add: "/add-patient"
  },
  labels: {
    management: "Patient Management",
    addNew: "Add New Patient",
    search: "Search patients...",
    listTitle: "All Patients",
    entityId: "Patient ID"
  }
};

/** Business/CRM client terminology */
export const CLIENT_CONFIG: ExternalServiceRecipientConfig = {
  singular: "client",
  plural: "clients",
  singularCap: "Client",
  pluralCap: "Clients",
  idField: "client_id",
  routes: {
    list: "/clients",
    detail: "/client",
    add: "/add-client"
  },
  labels: {
    management: "Client Management",
    addNew: "Add New Client", 
    search: "Search clients...",
    listTitle: "All Clients",
    entityId: "Client ID"
  }
};

/** Sales/marketing contact terminology */
export const CONTACT_CONFIG: ExternalServiceRecipientConfig = {
  singular: "contact",
  plural: "contacts",
  singularCap: "Contact",
  pluralCap: "Contacts",
  idField: "contact_id",
  routes: {
    list: "/contacts",
    detail: "/contact",
    add: "/add-contact"
  },
  labels: {
    management: "Contact Management",
    addNew: "Add New Contact",
    search: "Search contacts...",
    listTitle: "All Contacts",
    entityId: "Contact ID"
  }
};

/** E-commerce customer terminology */
export const CUSTOMER_CONFIG: ExternalServiceRecipientConfig = {
  singular: "customer",
  plural: "customers", 
  singularCap: "Customer",
  pluralCap: "Customers",
  idField: "customer_id",
  routes: {
    list: "/customers",
    detail: "/customer",
    add: "/add-customer"
  },
  labels: {
    management: "Customer Management",
    addNew: "Add New Customer",
    search: "Search customers...",
    listTitle: "All Customers", 
    entityId: "Customer ID"
  }
};

/**
 * Factory function to create domain configurations
 */
export function createDomainConfig(
  externalServiceRecipient: ExternalServiceRecipientConfig
): DomainEntityConfig {
  return {
    externalServiceRecipient
  };
}

/**
 * Type guard to validate domain configuration
 */
export function isDomainEntityConfig(obj: any): obj is DomainEntityConfig {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const { externalServiceRecipient } = obj;
  if (!externalServiceRecipient || typeof externalServiceRecipient !== 'object') {
    return false;
  }

  // Validate required string fields
  const requiredStringFields = [
    'singular', 'plural', 'singularCap', 'pluralCap', 'idField'
  ];
  
  for (const field of requiredStringFields) {
    if (typeof externalServiceRecipient[field] !== 'string') {
      return false;
    }
  }

  // Validate routes object
  if (!externalServiceRecipient.routes || 
      typeof externalServiceRecipient.routes.list !== 'string' ||
      typeof externalServiceRecipient.routes.detail !== 'string' ||
      typeof externalServiceRecipient.routes.add !== 'string') {
    return false;
  }

  // Validate labels object
  const { labels } = externalServiceRecipient;
  if (!labels ||
      typeof labels.management !== 'string' ||
      typeof labels.addNew !== 'string' ||
      typeof labels.search !== 'string' ||
      typeof labels.listTitle !== 'string' ||
      typeof labels.entityId !== 'string') {
    return false;
  }

  return true;
}