const STRAPI_API_URL = process.env.STRAPI_API_URL!;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN!;

export async function strapiGet<T>(
  path: string,
  revalidate: number = 60
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${STRAPI_API_URL}/api${path}`, {
      headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
      next: { revalidate },
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
