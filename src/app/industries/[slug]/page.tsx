export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import IndustryPage from "@/components/industries/IndustryPage";
import Footer from "@/components/Footer";
import { INDUSTRIES } from "@/data/industries";
import { strapiGet } from "@/lib/strapi";
import type { StrapiResponse, GlobalData } from "@/types/strapi";

function resolveUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.STRAPI_PUBLIC_URL ?? ""}${url}`;
}

async function fetchGlobal() {
  try {
    const res = await strapiGet<StrapiResponse<GlobalData>>(
      "/global?populate=*"
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

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) return {};
  return {
    title: `${industry.name} Marketing`,
    description: industry.subheadline,
  };
}

export default async function IndustryLandingPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) notFound();

  const globalData = await fetchGlobal();

  return (
    <main>
      <Header />
      <div className="pt-24">
        <IndustryPage industry={industry} />
      </div>
      <Footer globalData={globalData} />
    </main>
  );
}
