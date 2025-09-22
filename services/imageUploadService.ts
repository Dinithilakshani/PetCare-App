import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from './config/cloudinary';

/**
 * Upload an image URI (from expo-image-picker) to Cloudinary using unsigned uploads.
 * Returns the hosted image URL.
 *
 * Requirements:
 * - Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in services/config/cloudinary.ts
 * - The upload preset must be UNSIGNED in your Cloudinary settings
 */
export async function uploadToCloudinary(uri: string): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET.');
  }

  const form = new FormData();
  // Best-effort content type; Cloudinary will detect type as well
  form.append('file', {
    // @ts-ignore - React Native FormData file type
    uri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const res = await fetch(endpoint, {
    method: 'POST',
    body: form,
  });

  const json = await res.json();
  if (!res.ok) {
    const message = json?.error?.message || 'Cloudinary upload failed';
    throw new Error(message);
  }

  const url: string | undefined = json.secure_url || json.url;
  if (!url) {
    throw new Error('Cloudinary did not return a URL');
  }
  return url;
}
