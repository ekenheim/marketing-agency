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

// Strapi v5: response is flat — data IS the object, no .attributes wrapper.

async function fetchHero() {
  try {
    const res = await strapiGet<StrapiResponse<HeroData>>("/hero?populate=*");
    return res.data ?? null;
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
    return res.data;
  } catch {
    return null;
  }
}

async function fetchTeam() {
  try {
    const res = await strapiGet<StrapiListResponse<TeamMemberData>>(
      "/team-members?sort=order:asc&populate=*"
    );
    return res.data;
  } catch {
    return null;
  }
}

async function fetchTestimonials() {
  try {
    const res = await strapiGet<StrapiListResponse<TestimonialData>>(
      "/testimonials?filters[featured][$eq]=true&populate=*"
    );
    return res.data;
  } catch {
    return null;
  }
}

async function fetchGlobal() {
  try {
    const res = await strapiGet<StrapiResponse<GlobalData>>(
      "/global?populate=*"
    );
    return res.data ?? null;
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
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection globalData={globalData} />
      <Footer globalData={globalData} />
    </main>
  );
}
