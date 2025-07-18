/**
 * Contact-Focused Deployment Configuration
 * 
 * Domain configuration for sales/marketing-focused deployments
 * where external service recipients are referred to as "contacts"
 * 
 * @since 2.1.0
 */

import { CONTACT_CONFIG, createDomainConfig } from '@marek/shared';

/**
 * Domain configuration for contact-focused deployment
 * Use this configuration when deploying for sales/marketing use cases
 */
export const contactDomainConfig = createDomainConfig(CONTACT_CONFIG);

export default contactDomainConfig;