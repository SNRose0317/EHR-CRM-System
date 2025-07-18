/**
 * Member Configuration - Membership Organization Terminology
 * 
 * Membership organization terminology for gyms, clubs, associations,
 * and community-based organizations.
 * 
 * Use this configuration for:
 * - Fitness centers and gyms
 * - Country clubs and social clubs
 * - Professional associations
 * - Community organizations
 * - Membership-based wellness centers
 * 
 * @since 2.1.0
 */

import { ExternalServiceRecipientConfig } from '@marek/shared';

export const memberConfig: ExternalServiceRecipientConfig = {
  // Core terminology
  singular: "member",
  plural: "members",
  singularCap: "Member",
  pluralCap: "Members",
  idField: "member_id",

  // Application routes
  routes: {
    list: "/members",
    detail: "/member",
    add: "/add-member"
  },

  // User interface labels
  labels: {
    management: "Member Management",
    addNew: "Add New Member",
    search: "Search members...",
    listTitle: "All Members",
    entityId: "Member ID"
  },

  // Business relationships
  relationships: {
    internalStaff: "membership coordinator",
    secondaryUsers: "family members",
    primaryContact: "membership advisor"
  },

  // Industry and compliance context
  context: {
    industry: "membership",
    domain: "community-services",
    dataClassification: "membership-data",
    regulatoryCompliance: ["gdpr", "ccpa"],
    accessLevel: "membership-services"
  }
};

export default memberConfig;