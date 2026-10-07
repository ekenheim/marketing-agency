export const dynamic = "force-dynamic";

import { strapiGet } from "@/lib/strapi";
import { getLocale } from "@/i18n/getLocale";
import type { StrapiResponse, GlobalData } from "@/types/strapi";
import Header from "@/components/Header";
import { notFound } from "next/navigation";
import { getAboutPage, isAboutVisible } from "@/lib/about";
import AboutContent from "@/components/about/AboutContent";
import Footer from "@/components/Footer";

function resolveUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.STRAPI_PUBLIC_URL ?? ""}${url}`;
}

async function fetchGlobal(locale: string) {
  try {
    const res = await strapiGet<StrapiResponse<GlobalData>>(
      "/global?populate=*",
      locale,
    );
    const global = res.data ?? null;
    if (global?.logo?.url) {
      global.logo.url = resolveUrl(global.logo.url);
    }
    return global;
  } catch {
    return null;
  }
}

export async function generateMetadata() {
  const page = await getAboutPage(await getLocale());
  return isAboutVisible(page)
    ? { title: page?.title, description: page?.description ?? undefined }
    : { title: "Page not found", robots: { index: false, follow: false } };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const page = await getAboutPage(locale);
  if (!page || !isAboutVisible(page)) notFound();
  const globalData = await fetchGlobal(locale);
  return (
    <main>
      <Header />
      <AboutContent page={page} mediaBase={process.env.STRAPI_PUBLIC_URL ?? ""} />
      <Footer globalData={globalData} />
    </main>
  );
}
