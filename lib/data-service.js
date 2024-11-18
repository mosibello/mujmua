import { createClient } from "@/supabase/server";
export async function GET__getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}
