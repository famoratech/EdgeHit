// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface UploadResult {
//   publicUrl: string;
//   filePath: string;
// }

// export async function uploadImage(file: File): Promise<UploadResult> {
//   try {
//     // 1. Generate unique filename
//     const fileExt = file.name.split(".").pop();
//     const fileName = `${crypto.randomUUID()}.${fileExt}`;
//     const filePath = `portfolio/${fileName}`;

//     // 2. Upload to Supabase Storage
//     const { error: uploadError } = await supabase.storage
//       .from("portfolio-images")
//       .upload(filePath, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (uploadError) throw uploadError;

//     // 3. Get public URL
//     const {
//       data: { publicUrl },
//     } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);

//     return { publicUrl, filePath };
//   } catch (error) {
//     console.error("Upload failed:", error);
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to upload image"
//     );
//   }
// }

// export async function deleteImage(filePath: string): Promise<void> {
//   const { error } = await supabase.storage
//     .from("portfolio-images")
//     .remove([filePath]);

//   if (error) throw error;
// }

import { supabase } from "./supabase";

export async function uploadImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `portfolio/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);

  return publicUrl;
}
