export function vimeoId(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = /^https?:\/\/(?:www\.|player\.)?vimeo\.com\/(?:video\/)?(\d+)(?:[/?#]|$)/i.exec(
    url.trim(),
  );
  return m ? m[1] : null;
}

export function vimeoEmbedUrl(url: string | null | undefined): string | null {
  const id = vimeoId(url);
  return id ? `https://player.vimeo.com/video/${id}?dnt=1` : null;
}
