/**
 * Client-Focused Deployment Configuration
 * 
 * Domain configuration for business/CRM-focused deployments
 * where external service recipients are referred to as "clients"
 * 
 * @since 2.1.0
 */

import { CLIENT_CONFIG, createDomainConfig } from '@marek/shared';

/**
 * Domain configuration for client-focused deployment
 * Use this configuration when deploying for business/CRM use cases
 */
export const clientDomainConfig = createDomainConfig(CLIENT_CONFIG);

export default clientDomainConfig;