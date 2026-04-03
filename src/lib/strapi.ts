const STRAPI_API_URL = process.env.STRAPI_API_URL!;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN!;

export async function strapiGet<T>(path: string, locale?: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  // Append locale param if provided
  const separator = path.includes("?") ? "&" : "?";
  const url = locale
    ? `${STRAPI_API_URL}/api${path}${separator}locale=${locale}`
    : `${STRAPI_API_URL}/api${path}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok)
      throw new Error(`Strapi fetch failed: ${path} → ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

export const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export function strapiMedia(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}
