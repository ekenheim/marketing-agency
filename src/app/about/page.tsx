export const dynamic = "force-dynamic";

import { strapiGet } from "@/lib/strapi";
import type { StrapiResponse, GlobalData } from "@/types/strapi";
import Header from "@/components/Header";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import NordicEdgeSection from "@/components/about/NordicEdgeSection";
import TeamCredentialsSection from "@/components/about/TeamCredentialsSection";
import MethodologySection from "@/components/about/MethodologySection";
import ValuesSection from "@/components/about/ValuesSection";
import Footer from "@/components/Footer";

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

export const metadata = {
  title: "About Us",
  description:
    "Digitomara brings Nordic performance standards to the Moroccan market. Meet the team behind data-driven digital growth.",
};

export default async function AboutPage() {
  const globalData = await fetchGlobal();
  return (
    <main>
      <Header />
      <div className="pt-24">
        <AboutHeroSection />
        <NordicEdgeSection />
        <TeamCredentialsSection />
        <MethodologySection />
        <ValuesSection />
      </div>
      <Footer globalData={globalData} />
    </main>
  );
}
