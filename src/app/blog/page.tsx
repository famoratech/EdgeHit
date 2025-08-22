"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// export const revalidate = 2592000; // 30 days in seconds

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  created_at: string;
  category?: string;
  is_draft: boolean;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_draft", false)
        .order("created_at", { ascending: false });

      if (!error && data) setPosts(data as BlogPost[]);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getPublicImageUrl = (path: string) => {
    const { data } = supabase.storage.from("blog-media").getPublicUrl(path);
    return data?.publicUrl;
  };

  return (
    <div className="w-[80%] max-w-7xl mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Insights & Articles
      </h1>

      <div className="mb-10">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <article className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-52 grayscale hover:grayscale-0 transition-all duration-500 ease-in-out">
                  {/* <Image
                    src={post.image || "/images/default-thumbnail.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  /> */}

                  <Image
                    src={
                      post.image
                        ? getPublicImageUrl(post.image)
                        : "/images/default-thumbnail.jpg"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-700 text-sm">
                    {post.excerpt || post.content.slice(0, 100)}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No blog posts found.
          </p>
        )}
      </article>
    </div>
  );
};

export default BlogPage;
