// app/api/blogs/route.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_draft", false)
    .order("created_at", { ascending: false })
    .limit(10);

  // Add these logs right after the supabase query
  console.log("Supabase blog list data:", data);
  console.log("Supabase blog list error:", error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
