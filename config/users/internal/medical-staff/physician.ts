/**
 * Physician Configuration - Medical Staff
 * 
 * Configuration for physicians and attending doctors in healthcare settings.
 * Includes clinical privileges and patient care responsibilities.
 * 
 * Use this configuration for:
 * - Attending physicians
 * - Specialists and consultants
 * - Resident physicians
 * - Medical directors
 * 
 * @since 2.1.0
 */

export interface InternalUserConfig {
  singular: string;
  plural: string;
  singularCap: string;
  pluralCap: string;
  idField: string;
  routes: {
    list: string;
    detail: string;
    add: string;
  };
  labels: {
    management: string;
    addNew: string;
    search: string;
    listTitle: string;
    entityId: string;
  };
  permissions?: {
    prescribe?: boolean;
    diagnose?: boolean;
    accessLevel: string;
    dataAccess?: string[];
  };
  relationships?: {
    primaryUsers?: string;
    reportsTo?: string;
    collaboratesWith?: string[];
  };
  context?: {
    department?: string;
    licenseRequired?: boolean;
    certifications?: string[];
    specialties?: string[];
  };
}

export const physicianConfig: InternalUserConfig = {
  // Core terminology
  singular: "physician",
  plural: "physicians",
  singularCap: "Physician",
  pluralCap: "Physicians",
  idField: "physician_id",

  // Application routes
  routes: {
    list: "/staff/physicians",
    detail: "/staff/physician",
    add: "/staff/add-physician"
  },

  // User interface labels
  labels: {
    management: "Physician Management",
    addNew: "Add New Physician",
    search: "Search physicians...",
    listTitle: "All Physicians",
    entityId: "Physician ID"
  },

  // Clinical permissions
  permissions: {
    prescribe: true,
    diagnose: true,
    accessLevel: "full-clinical",
    dataAccess: ["clinical", "administrative", "financial"]
  },

  // Professional relationships
  relationships: {
    primaryUsers: "patients",
    reportsTo: "medical director",
    collaboratesWith: ["nurses", "pharmacists", "therapists"]
  },

  // Professional context
  context: {
    department: "clinical",
    licenseRequired: true,
    certifications: ["board-certification", "dea-license"],
    specialties: [
      "internal-medicine",
      "family-medicine", 
      "cardiology",
      "oncology",
      "pediatrics",
      "psychiatry",
      "surgery"
    ]
  }
};

export default physicianConfig;