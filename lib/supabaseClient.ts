import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function createSupabaseClient() {
  return createClientComponentClient();
}
