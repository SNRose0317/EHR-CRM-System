/**
 * Client Configuration - Business/Professional Services Terminology
 * 
 * Business and professional services terminology for consulting, legal, 
 * financial services, and other client-focused organizations.
 * 
 * Use this configuration for:
 * - Consulting firms
 * - Legal practices
 * - Financial advisory services
 * - Professional service organizations
 * - B2B service providers
 * 
 * @since 2.1.0
 */

import { ExternalServiceRecipientConfig } from '@marek/shared';

export const clientConfig: ExternalServiceRecipientConfig = {
  // Core terminology
  singular: "client",
  plural: "clients",
  singularCap: "Client",
  pluralCap: "Clients", 
  idField: "client_id",

  // Application routes
  routes: {
    list: "/clients",
    detail: "/client",
    add: "/add-client"
  },

  // User interface labels
  labels: {
    management: "Client Management",
    addNew: "Add New Client",
    search: "Search clients...",
    listTitle: "All Clients",
    entityId: "Client ID"
  },

  // Business relationships
  relationships: {
    internalStaff: "account manager",
    secondaryUsers: "authorized contacts",
    primaryContact: "primary account manager"
  },

  // Industry and compliance context
  context: {
    industry: "business",
    domain: "professional-services",
    dataClassification: "business-sensitive",
    regulatoryCompliance: ["gdpr", "ccpa"],
    accessLevel: "business-standard"
  }
};

export default clientConfig;