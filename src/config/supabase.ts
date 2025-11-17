import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Supabase client configuration
 * Uses service_role key for server-side operations
 */

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing required environment variables: SUPABASE_URL and SUPABASE_KEY must be set'
  );
}

/**
 * Initialize Supabase client
 * This client has elevated permissions using the service_role key
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Test database connection
 * Returns true if connection is successful, false otherwise
 */
export async function testConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('miro_events').select('id').limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}

