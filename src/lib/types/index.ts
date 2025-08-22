export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  description?: string;
  image_url: string;
  url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  domain_url?: string | null; // Add this
}
