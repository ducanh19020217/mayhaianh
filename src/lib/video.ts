export function getYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const id =
      parsed.hostname.includes('youtu.be')
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop();

    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}
