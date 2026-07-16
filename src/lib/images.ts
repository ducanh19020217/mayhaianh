import type { ImageMetadata } from 'astro';

const imageModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/*.{png,jpg,jpeg,webp}', {
  eager: true
});

export function normalizeImageSource(source: string): string {
  const trimmed = source.trim();
  const markdownLink = trimmed.match(/^\[[^\]]*\]\((https?:\/\/[^)]+)\)$/);
  const normalized = markdownLink?.[1] ?? trimmed;

  try {
    const parsed = new URL(normalized);
    const nestedImage = parsed.searchParams.get('imgurl') || parsed.searchParams.get('mediaurl');
    if (nestedImage) {
      const decoded = decodeURIComponent(nestedImage);
      return /^https?:\/\//i.test(decoded) ? decoded : `https://${decoded}`;
    }
  } catch {
    return normalized;
  }

  return normalized;
}

export function isRemoteImage(source: string): boolean {
  return /^https?:\/\//i.test(normalizeImageSource(source));
}

export function getImageUrl(source: string): string {
  const normalized = normalizeImageSource(source);
  return isRemoteImage(normalized) ? normalized : `/assets/${normalized.split('/').pop()}`;
}

export function getAssetImage(fileName: string): ImageMetadata {
  const normalizedName = normalizeImageSource(fileName).split('/').pop();
  const image = imageModules[`/src/assets/${normalizedName}`]?.default;
  if (!image) {
    throw new Error(`Missing image asset: ${fileName}`);
  }
  return image;
}
