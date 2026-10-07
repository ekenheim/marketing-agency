import "server-only";
import { strapiGet } from "./strapi";
import type { AboutPageData, StrapiResponse } from "@/types/strapi";

export async function getAboutPage(locale: string): Promise<AboutPageData | null> {
  try {
    const response = await strapiGet<StrapiResponse<AboutPageData>>("/about-page", locale);
    return response.data ?? null;
  } catch {
    return null;
  }
}

export function isAboutVisible(page: AboutPageData | null): boolean {
  return page?.enabled === true && Boolean(page.title?.trim());
}
