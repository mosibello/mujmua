import { createClient } from "@/supabase/server";
const supabase = createClient();

export async function GET__getUser() {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}
