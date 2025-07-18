// Shared utilities and configurations for Marek Health platform
export * from './api';
export * from './utils';
export * from './types';
export * from './domain';

// Common database and API utilities
export { supabase } from './api/supabase';
export { default as errorLogger } from './utils/errorLogger';