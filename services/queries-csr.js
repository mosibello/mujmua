import { createClient } from "@/supabase/client";

export async function GET__getPhotos(
  rangeStart = 0,
  rangeEnd = 7,
  filters = {},
  order,
  excludePhotoId = null,
  recommendedParams = null
) {
  const supabase = createClient();
  let query = supabase
    .from("photos")
    .select("*, author(*)", { count: "exact" })
    .range(rangeStart, rangeEnd);

  query = query.order(order?.column || "created_at", {
    ascending: order?.ascending ?? false,
  });

  if (excludePhotoId) {
    query = query.not("id", "eq", excludePhotoId);
  }

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

  if (recommendedParams) {
    const { authorId, categories } = recommendedParams;
    if (authorId) {
      query = query
        .order("author", { ascending: false })
        .eq("author", authorId);
    }
    if (categories.length > 0) {
      query = query
        .order("categories", {
          ascending: false,
          nullsFirst: false,
        })
        .contains(
          "categories",
          categories.map((value) => ({ value }))
        );
    }
  }

  const { data: photos, error } = await query;
  return { photos, error };
}
