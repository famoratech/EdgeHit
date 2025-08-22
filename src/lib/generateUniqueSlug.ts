import { supabase } from "@/lib/supabase";

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default async function generateUniqueSlug(
  title: string
): Promise<string> {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const { data } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!data) break;
    slug = `${baseSlug}-${suffix++}`;
  }

  return slug;
}
