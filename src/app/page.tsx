// Disable static pre-rendering. The build runs in CI where Strapi is unreachable
// (internal K8s URL), so ISR would bake stale fallbacks and broken image URLs into
// the static HTML. With force-dynamic every request is server-rendered fresh with
// the correct runtime env vars and live Strapi data.
export const dynamic = "force-dynamic";

import { strapiGet } from "@/lib/strapi";
import type {
  StrapiResponse,
  StrapiListResponse,
  HeroData,
  ServiceData,
  CaseStudyData,
  TeamMemberData,
  TestimonialData,
  GlobalData,
} from "@/types/strapi";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Resolve relative Strapi media URLs to absolute ones server-side.
// IMPORTANT: Must use STRAPI_PUBLIC_URL (no NEXT_PUBLIC_ prefix), NOT
// NEXT_PUBLIC_STRAPI_URL. Next.js inlines all NEXT_PUBLIC_ vars at build time
// so their value is frozen to whatever was set when `npm run build` ran inside
// Docker — the K8s runtime env var is never read. A plain env var like
// STRAPI_PUBLIC_URL is read from process.env at request time by the server
// component, so it always reflects the live runtime value.
function resolveUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.STRAPI_PUBLIC_URL ?? ""}${url}`;
}

async function fetchHero() {
  try {
    const res = await strapiGet<StrapiResponse<HeroData>>("/hero?populate=*");
    const hero = res.data ?? null;
    if (hero?.backgroundMedia?.url) {
      hero.backgroundMedia.url = resolveUrl(hero.backgroundMedia.url);
    }
    return hero;
  } catch {
    return null;
  }
}

async function fetchServices() {
  try {
    const res = await strapiGet<StrapiListResponse<ServiceData>>(
      "/services?sort=order:asc&populate=*"
    );
    return res.data;
  } catch {
    return null;
  }
}

async function fetchCaseStudies() {
  try {
    const res = await strapiGet<StrapiListResponse<CaseStudyData>>(
      "/case-studies?filters[featured][$eq]=true&populate=*"
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

async function fetchTeam() {
  try {
    const res = await strapiGet<StrapiListResponse<TeamMemberData>>(
      "/team-members?sort=order:asc&populate=*"
    );
    return res.data.map((m) => ({
      ...m,
      photo: m.photo ? { ...m.photo, url: resolveUrl(m.photo.url) } : null,
    }));
  } catch {
    return null;
  }
}

async function fetchTestimonials() {
  try {
    const res = await strapiGet<StrapiListResponse<TestimonialData>>(
      "/testimonials?filters[featured][$eq]=true&populate=*"
    );
    return res.data.map((t) => ({
      ...t,
      avatar: t.avatar ? { ...t.avatar, url: resolveUrl(t.avatar.url) } : null,
    }));
  } catch {
    return null;
  }
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

export default async function HomePage() {
  const [hero, services, caseStudies, team, testimonials, globalData] =
    await Promise.all([
      fetchHero(),
      fetchServices(),
      fetchCaseStudies(),
      fetchTeam(),
      fetchTestimonials(),
      fetchGlobal(),
    ]);

  return (
    <main>
      <Header />
      <HeroSection data={hero} />
      <ServicesSection services={services} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <TeamSection team={team} />
      <TestimonialsSection testimonials={testimonials} globalData={globalData} />
      <ContactSection globalData={globalData} services={services} />
      <Footer globalData={globalData} />
    </main>
  );
}
