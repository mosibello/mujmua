import { createClient } from "@/supabase/server";

export async function GET__getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}

export async function GET__getProfileByHandle(handle) {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username_handle", handle)
    .single();
  return { profile, error };
}
