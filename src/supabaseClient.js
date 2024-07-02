import { createClient } from '@supabase/supabase-js';

/**
 * Initializes the Supabase client with the provided URL and Key from environment variables.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
