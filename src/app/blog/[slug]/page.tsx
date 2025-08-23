// app/blog/[slug]/page.tsx
import { Metadata } from "next";
// import { supabase } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, image, content")
    .eq("slug", slug)
    .single();

  if (!post) return {};

  const imageUrl = `https://ffpqnwdgctarhjikksnn.supabase.co/storage/v1/object/public/blog-media/${post.image}`;
  const description = post.content.slice(0, 160).replace(/\n/g, " ");

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post || error) return notFound();

  const imageUrl = `https://ffpqnwdgctarhjikksnn.supabase.co/storage/v1/object/public/blog-media/${post.image}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <Image
        src={imageUrl}
        alt={post.title}
        width={800}
        height={400}
        className="rounded-xl w-full mb-6 object-cover"
      />

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-table:my-8 prose-th:bg-gray-100 prose-th:font-semibold prose-td:p-3 prose-th:p-3 prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
