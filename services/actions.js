import { loginPageUrl } from "@/lib/constants";
import { createClient } from "@/supabase/client";
const supabase = createClient();

export async function POST__signOut() {
  const { error } = await supabase.auth.signOut();
  if (!error && typeof window !== "undefined") {
    window.location.href = loginPageUrl;
  }
  return error;
}

export async function POST__uploadFile(file, bucketName, filePath) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);
  return { data, error };
}

export async function POST__insertPhotos(arr) {
  const { data, error } = await supabase.from("photos").insert(arr).select();
  return { data, error };
}
