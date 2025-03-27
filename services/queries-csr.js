import { createClient } from "@/supabase/client";

export async function GET__getPhotos(
  rangeStart = 0,
  rangeEnd = 7,
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

export async function GET__getRelatedPhotos(
  excludePhotoId,
  categoryValues = [],
  authorId,
  rangeStart = 0,
  rangeEnd = 7
) {
  const supabase = createClient();
  let query = supabase
    .from("photos")
    .select("*, author(*)", { count: "exact" })
    .not("id", "eq", excludePhotoId)
    .range(rangeStart, rangeEnd)
    .order("created_at", { ascending: false });

  // Filter by author
  // if (authorId) {
  //   query = query.eq("author", authorId);
  // }

  // Filter by categories
  // if (categoryValues && categoryValues.length > 0) {
  //   query = query.or(
  //     categoryValues
  //       .map((category) => `category.cs.{\"value\":\"${category}\"}`)
  //       .join(",")
  //   );
  // }

  let { data: photos, count, error } = await query;
  if (error) return { photos: [], count: 0, error };
  // photos = photos.sort(() => Math.random() - 0.5);

  return { photos, error };
}
