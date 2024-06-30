// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otcvuykcrkhffxskjwjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90Y3Z1eWtjcmtoZmZ4c2tqd2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1NzA0NjgsImV4cCI6MjAzNTE0NjQ2OH0.b10BkfmBvE6zamVwxP9qMLnW763PBxF71HCAVeXxvqc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
