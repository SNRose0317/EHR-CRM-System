/**
 * Participant Configuration - Research Terminology
 * 
 * Research terminology for clinical trials, studies, and research programs.
 * Maintains research compliance and ethical standards.
 * 
 * Use this configuration for:
 * - Clinical research organizations
 * - Academic research institutions  
 * - Clinical trial management
 * - Research studies and surveys
 * - Scientific data collection
 * 
 * @since 2.1.0
 */

import { ExternalServiceRecipientConfig } from '@marek/shared';

export const participantConfig: ExternalServiceRecipientConfig = {
  // Core terminology
  singular: "participant",
  plural: "participants",
  singularCap: "Participant", 
  pluralCap: "Participants",
  idField: "participant_id",

  // Application routes
  routes: {
    list: "/participants",
    detail: "/participant",
    add: "/add-participant"
  },

  // User interface labels
  labels: {
    management: "Participant Management",
    addNew: "Add New Participant",
    search: "Search participants...",
    listTitle: "All Participants",
    entityId: "Participant ID"
  },

  // Business relationships
  relationships: {
    internalStaff: "research coordinator",
    secondaryUsers: "emergency contacts",
    primaryContact: "principal investigator"
  },

  // Industry and compliance context
  context: {
    industry: "research",
    domain: "clinical-trials",
    dataClassification: "research-data",
    regulatoryCompliance: ["hipaa", "fhir", "gcp", "irb"],
    accessLevel: "research-clinical"
  }
};

export default participantConfig;