// Disable static pre-rendering. The build runs in CI where Strapi is unreachable
// (internal K8s URL), so ISR would bake stale fallbacks and broken image URLs into
// the static HTML. With force-dynamic every request is server-rendered fresh with
// the correct runtime env vars and live Strapi data.
export const dynamic = "force-dynamic";

import { strapiGet } from "@/lib/strapi";
import { getLocale } from "@/i18n/getLocale";
import type {
  StrapiResponse,
  StrapiListResponse,
  HeroData,
  ServiceData,
  CaseStudyData,
  TestimonialData,
  GlobalData,
} from "@/types/strapi";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientLogosSection from "@/components/ClientLogosSection";
import ServicesSection from "@/components/ServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Resolve relative Strapi media URLs to absolute ones server-side.
function resolveUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.STRAPI_PUBLIC_URL ?? ""}${url}`;
}

async function fetchHero(locale: string) {
  try {
    const res = await strapiGet<StrapiResponse<HeroData>>("/hero?populate=*", locale);
    const hero = res.data ?? null;
    if (hero?.backgroundMedia?.url) {
      hero.backgroundMedia.url = resolveUrl(hero.backgroundMedia.url);
    }
    return hero;
  } catch {
    return null;
  }
}

async function fetchServices(locale: string) {
  try {
    const res = await strapiGet<StrapiListResponse<ServiceData>>(
      "/services?sort=order:asc&populate=*",
      locale,
    );
    return res.data;
  } catch {
    return null;
  }
}

async function fetchCaseStudies(locale: string) {
  try {
    const res = await strapiGet<StrapiListResponse<CaseStudyData>>(
      "/case-studies?filters[featured][$eq]=true&populate=*",
      locale,
    );
    return res.data.map((cs) => ({
      ...cs,
      coverImage: cs.coverImage
        ? { ...cs.coverImage, url: resolveUrl(cs.coverImage.url) }
        : null,
    }));
  } catch {
    return null;
  }
}

async function fetchTestimonials(locale: string) {
  try {
    const res = await strapiGet<StrapiListResponse<TestimonialData>>(
      "/testimonials?filters[featured][$eq]=true&populate=*",
      locale,
    );
    return res.data.map((t) => ({
      ...t,
      avatar: t.avatar
        ? { ...t.avatar, url: resolveUrl(t.avatar.url) }
        : null,
    }));
  } catch {
    return null;
  }
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

export default async function HomePage() {
  const locale = await getLocale();

  const [hero, services, caseStudies, testimonials, globalData] =
    await Promise.all([
      fetchHero(locale),
      fetchServices(locale),
      fetchCaseStudies(locale),
      fetchTestimonials(locale),
      fetchGlobal(locale),
    ]);

  return (
    <main>
      <Header />
      <HeroSection data={hero} />
      <ClientLogosSection />
      <ServicesSection services={services} globalData={globalData} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <TestimonialsSection testimonials={testimonials} globalData={globalData} />
      <ContactSection globalData={globalData} services={services} />
      <Footer globalData={globalData} />
    </main>
  );
}
