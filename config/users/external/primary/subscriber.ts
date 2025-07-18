/**
 * Subscriber Configuration - Subscription Service Terminology
 * 
 * Subscription service terminology for SaaS platforms, media services,
 * and recurring billing scenarios.
 * 
 * Use this configuration for:
 * - SaaS platforms and software services
 * - Streaming and media services
 * - Subscription box services
 * - Newsletter and content platforms
 * - Recurring billing businesses
 * 
 * @since 2.1.0
 */

import { ExternalServiceRecipientConfig } from '@marek/shared';

export const subscriberConfig: ExternalServiceRecipientConfig = {
  // Core terminology
  singular: "subscriber",
  plural: "subscribers",
  singularCap: "Subscriber",
  pluralCap: "Subscribers",
  idField: "subscriber_id",

  // Application routes
  routes: {
    list: "/subscribers",
    detail: "/subscriber",
    add: "/add-subscriber"
  },

  // User interface labels
  labels: {
    management: "Subscriber Management",
    addNew: "Add New Subscriber",
    search: "Search subscribers...",
    listTitle: "All Subscribers",
    entityId: "Subscriber ID"
  },

  // Business relationships
  relationships: {
    internalStaff: "customer success manager",
    secondaryUsers: "team members",
    primaryContact: "account manager"
  },

  // Industry and compliance context
  context: {
    industry: "saas",
    domain: "subscription-services",
    dataClassification: "subscriber-data",
    regulatoryCompliance: ["gdpr", "ccpa"],
    accessLevel: "subscription-management"
  }
};

export default subscriberConfig;