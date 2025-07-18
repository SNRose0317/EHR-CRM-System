/**
 * Customer Configuration - E-commerce & Retail Terminology
 * 
 * E-commerce and retail terminology for purchasers, buyers,
 * and transaction-focused relationships.
 * 
 * Use this configuration for:
 * - E-commerce platforms
 * - Retail businesses
 * - Online marketplaces
 * - Product-focused companies
 * - Transaction-heavy operations
 * 
 * @since 2.1.0
 */

import { ExternalServiceRecipientConfig } from '@marek/shared';

export const customerConfig: ExternalServiceRecipientConfig = {
  // Core terminology
  singular: "customer",
  plural: "customers",
  singularCap: "Customer",
  pluralCap: "Customers",
  idField: "customer_id",

  // Application routes
  routes: {
    list: "/customers",
    detail: "/customer",
    add: "/add-customer"
  },

  // User interface labels
  labels: {
    management: "Customer Management",
    addNew: "Add New Customer",
    search: "Search customers...",
    listTitle: "All Customers",
    entityId: "Customer ID"
  },

  // Business relationships
  relationships: {
    internalStaff: "customer service representative",
    secondaryUsers: "household members",
    primaryContact: "customer success manager"
  },

  // Industry and compliance context
  context: {
    industry: "retail",
    domain: "e-commerce",
    dataClassification: "customer-data",
    regulatoryCompliance: ["gdpr", "ccpa", "pci-dss"],
    accessLevel: "customer-service"
  }
};

export default customerConfig;