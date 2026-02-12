/**
 * Cloudinary unsigned upload service.
 *
 * Requires two env vars:
 *   VITE_CLOUDINARY_CLOUD_NAME  – your cloud name (e.g. "dxyz1234")
 *   VITE_CLOUDINARY_UPLOAD_PRESET – an *unsigned* upload preset name
 *
 * Create the preset in Cloudinary Dashboard → Settings → Upload → Upload presets → Add unsigned preset.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
}

/**
 * Upload a file to Cloudinary using an unsigned upload preset.
 * Works for images, PDFs, and other file types.
 *
 * @param file - The file to upload
 * @param folder - Optional folder path in Cloudinary (e.g. "slides", "team")
 * @returns The upload result containing the secure URL
 */
export async function uploadToCloudinary(
  file: File,
  folder?: string
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (folder) formData.append("folder", folder);

  // Use "auto" resource type so Cloudinary auto-detects (image, raw pdf, etc.)
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Upload failed");
  }

  return res.json();
}
