export function getSiteUrl() {
  const previewUrl = process.env.VERCEL_ENV === "preview"
    ? process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL
    : undefined;
  const rawUrl = previewUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
