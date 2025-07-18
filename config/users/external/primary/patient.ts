/**
 * Patient Configuration - Healthcare Terminology
 * 
 * Traditional healthcare terminology for hospitals, clinics, medical practices.
 * Maintains FHIR compliance and healthcare industry standards.
 * 
 * Use this configuration for:
 * - Hospitals and health systems
 * - Medical clinics and practices  
 * - Specialty healthcare providers
 * - Telehealth platforms
 * - Clinical research organizations
 * 
 * @since 2.1.0
 */

import { ExternalServiceRecipientConfig } from '@marek/shared';

export const patientConfig: ExternalServiceRecipientConfig = {
  // Core terminology
  singular: "patient",
  plural: "patients",
  singularCap: "Patient", 
  pluralCap: "Patients",
  idField: "patient_id",

  // Application routes
  routes: {
    list: "/patients",
    detail: "/patient",
    add: "/add-patient"
  },

  // User interface labels
  labels: {
    management: "Patient Management",
    addNew: "Add New Patient", 
    search: "Search patients...",
    listTitle: "All Patients",
    entityId: "Patient ID"
  },

  // Business relationships
  relationships: {
    internalStaff: "healthcare provider",
    secondaryUsers: "family members",
    primaryContact: "primary care physician"
  },

  // Industry and compliance context
  context: {
    industry: "healthcare",
    domain: "clinical", 
    dataClassification: "phi", // Protected Health Information
    regulatoryCompliance: ["hipaa", "fhir"],
    accessLevel: "clinical-full"
  }
};

export default patientConfig;