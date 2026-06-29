import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldjlujubthlehyhruqfp.supabase.co';
// We need the service_role key to query auth.users, which I don't have.
// I will check if I can read profiles instead, but that doesn't show auth.users.
// Wait, I can't read auth.users without service_role key.
