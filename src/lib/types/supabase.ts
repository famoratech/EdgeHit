// src/lib/types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      ad_connections: {
        Row: {
          id: string;
          user_id: string;
          platform: string;
          access_token: string;
          refresh_token: string | null;
          expires_at: number | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          platform: string;
          access_token: string;
          refresh_token?: string | null;
          expires_at?: number | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["ad_connections"]["Insert"]
        >;
      };

      predictions: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          platform: string;
          budget: number;
          impressions: number;
          clicks: number;
          conversions: number;
          roi: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["predictions"]["Row"],
          "id"
        > & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["predictions"]["Insert"]>;
      };

      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          author_id: string;
          created_at: string;
          updated_at: string | null;
          is_draft: boolean;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          author_id: string;
          created_at?: string;
          updated_at?: string | null;
          is_draft?: boolean;
          image_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
      };
    };

    Views: { [key: string]: unknown };
    Functions: { [key: string]: unknown };
  };
}
