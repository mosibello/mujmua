import { createClient } from "@/supabase/client";
const supabase = createClient();

export async function POST__signOut() {
  const { error } = await supabase.auth.signOut();
  if (!error && typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
  return error;
}
