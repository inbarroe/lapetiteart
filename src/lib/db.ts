import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

// Server-side Supabase client using the secret key. It bypasses Row Level
// Security, so it must never be imported into client components ("server-only"
// makes the build fail if that happens). Returns null when not configured.
export function getDb(): SupabaseClient | null {
  if (client === undefined) {
    // Accept the REST endpoint too (".../rest/v1/"), which is easy to copy by mistake.
    const url = process.env.SUPABASE_URL?.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
    const key = process.env.SUPABASE_SECRET_KEY;
    client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  }
  return client;
}
