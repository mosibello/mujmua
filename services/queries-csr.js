import { createClient } from "@/supabase/client";

export async function GET__getPhotos(
  rangeStart = 0,
  rangeEnd = 8,
  filters = {}
) {
  const supabase = createClient();
  let query = supabase
    .from("photos")
    .select("*, author(*)", { count: "exact" })
    .range(rangeStart, rangeEnd)
    .order("created_at", { ascending: false });
  if (filters && typeof filters === "object") {
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        const [operator, filterValue] = value;
        query = query[operator](key, filterValue);
      } else {
        query = query.eq(key, value);
      }
    }
  }
  const { data: photos, error } = await query;
  return { photos, error };
}
