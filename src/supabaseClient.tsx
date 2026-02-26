// Import the `createClient` function from the Supabase JavaScript library.
import { createClient } from "@supabase/supabase-js"; // This function is used to initialise a connection to your Supabase backend instance.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Retrieve the Supabase project URL from environment variables.
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Retrieve the Supabase anonymous public API key from environment variables.

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!); // The `!` after each variable tells TypeScript that you're sure these values are not `null` or `undefined`.
