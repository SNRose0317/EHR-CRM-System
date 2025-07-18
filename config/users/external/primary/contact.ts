/**
 * Contact Configuration - Sales & Marketing Terminology
 * 
 * Sales and marketing terminology for lead management, customer outreach,
 * and relationship building activities.
 * 
 * Use this configuration for:
 * - Sales organizations
 * - Marketing agencies
 * - Lead generation companies
 * - Customer acquisition focused businesses
 * - CRM-heavy operations
 * 
 * @since 2.1.0
 */

import { ExternalServiceRecipientConfig } from '@marek/shared';

export const contactConfig: ExternalServiceRecipientConfig = {
  // Core terminology
  singular: "contact",
  plural: "contacts",
  singularCap: "Contact",
  pluralCap: "Contacts",
  idField: "contact_id",

  // Application routes
  routes: {
    list: "/contacts",
    detail: "/contact", 
    add: "/add-contact"
  },

  // User interface labels
  labels: {
    management: "Contact Management",
    addNew: "Add New Contact",
    search: "Search contacts...",
    listTitle: "All Contacts", 
    entityId: "Contact ID"
  },

  // Business relationships
  relationships: {
    internalStaff: "sales representative",
    secondaryUsers: "decision makers",
    primaryContact: "lead sales rep"
  },

  // Industry and compliance context
  context: {
    industry: "sales",
    domain: "customer-acquisition",
    dataClassification: "marketing-data",
    regulatoryCompliance: ["gdpr", "ccpa", "can-spam"],
    accessLevel: "sales-marketing"
  }
};

export default contactConfig;