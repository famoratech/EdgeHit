// // app/api/blogs/[slug]/route.ts
// import { createServerSupabaseClient } from "@/lib/supabase/server";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { slug: string } }
// ) {
//   const supabase = createServerSupabaseClient();

//   const { data, error } = await (await supabase)
//     .from("blog_posts")
//     .select("*")
//     .eq("slug", params.slug)
//     .eq("is_draft", false)
//     .single();

//   // Add these logs right after the supabase query
//   console.log(`Supabase post (${params.slug}) data:`, data);
//   console.log(`Supabase post (${params.slug}) error:`, error);

//   if (error || !data) {
//     return NextResponse.json({ message: "Post not found" }, { status: 404 });
//   }

//   return NextResponse.json(data);
// }

import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const supabase = createServerSupabaseClient();

  const { slug } = await context.params;

  const { data, error } = await (await supabase)
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_draft", false)
    .single();

  console.log(`Supabase post (${slug}) data:`, data);
  console.log(`Supabase post (${slug}) error:`, error);

  if (error || !data) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
