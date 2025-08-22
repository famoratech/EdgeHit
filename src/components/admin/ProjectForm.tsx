"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface ProjectFormProps {
  onSubmit: (data: {
    title: string;
    category: string;
    description?: string;
    image: File;
    is_published: boolean;
    domain_url?: string; // Add domain_url
  }) => Promise<void>;
  isLoading: boolean;
}

export default function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const imageFile = formData.get("image") as File;

    await onSubmit({
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string | undefined,
      image: imageFile,
      is_published: formData.get("is_published") === "on",
      domain_url: formData.get("domain_url") as string | undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div>
        <Label htmlFor="image">Project Image</Label>
        <div className="mt-2 flex items-center gap-4">
          {preview && (
            <div className="w-32 h-32 rounded-md overflow-hidden border">
              <Image
                src={preview}
                width={128}
                height={128}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            accept="image/*"
            className="hidden"
            required
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? "Change Image" : "Upload Image"}
          </Button>
        </div>
      </div>

      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" required />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} />
      </div>

      {/* Domain URL */}
      <div>
        <Label htmlFor="domain_url">Project Website URL (optional)</Label>
        <Input
          id="domain_url"
          name="domain_url"
          type="url"
          placeholder="https://example.com"
        />
        <p className="mt-1 text-sm text-gray-500">
          Leave empty if this isn&apos;t a web project
        </p>
      </div>

      {/* Published Status */}
      <div className="flex items-center gap-2">
        <Checkbox id="is_published" name="is_published" />
        <Label htmlFor="is_published">Publish Immediately</Label>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Project"}
      </Button>
    </form>
  );
}
