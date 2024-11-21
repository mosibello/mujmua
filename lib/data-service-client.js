import { createClient as createBrowserClient } from "@/supabase/client";

export async function GET__getPhotos(
  ssr = true,
  rangeStart = 0,
  rangeEnd = 8,
  filters = {}
) {
  const supabase = ssr ? await createClient() : createBrowserClient();
  let query = supabase
    .from("photos")
    .select("*, author(*)")
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

// export async function GET__getPhotos() {
//   const supabase = createBrowserClient();
//   console.log(supabase);
//   const { data: photos, error } = await supabase.from("photos").select("*");

//   if (error) {
//     console.error("Error fetching photos:", error);
//     return { photos: null, error }; // Return error for debugging
//   }

//   return { photos, error: null };
// }
