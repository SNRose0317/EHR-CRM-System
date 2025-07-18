/**
 * Patient-Focused Deployment Configuration
 * 
 * Domain configuration for traditional healthcare/medical deployments
 * where external service recipients are referred to as "patients"
 * 
 * @since 2.1.0
 */

import { PATIENT_CONFIG, createDomainConfig } from '@marek/shared';

/**
 * Domain configuration for patient-focused deployment
 * Use this configuration when deploying for traditional healthcare use cases
 */
export const patientDomainConfig = createDomainConfig(PATIENT_CONFIG);

export default patientDomainConfig;