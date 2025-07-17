import { createClient } from '@supabase/supabase-js';

// Handle environment variables in both Vite and Node.js environments
let supabaseUrl: string | undefined;
let supabaseAnonKey: string | undefined;

if (typeof window !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.env) {
  // Browser environment with Vite
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
} else {
  // Node.js environment
  supabaseUrl = process.env.VITE_SUPABASE_URL;
  supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);