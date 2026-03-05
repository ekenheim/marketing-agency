// Strapi v5 returns flat responses — no "attributes" wrapper.

export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  name?: string;
}

export interface CtaData {
  label: string;
  url: string;
  variant: "primary" | "secondary";
}

export interface MetricData {
  id: number;
  value: string;
  label: string;
}

export interface FeatureData {
  id: number;
  label: string;
}

// Single type: { data: T | null }
export interface StrapiResponse<T> {
  data: T | null;
  meta?: Record<string, unknown>;
}

// Collection type: { data: T[], meta: { pagination: ... } }
export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    };
  };
}

export interface HeroData {
  id?: number;
  headline: string;
  subheadline?: string;
  primaryCta?: CtaData;
  secondaryCta?: CtaData;
  backgroundMedia?: StrapiMedia | null;
}

export interface ServiceData {
  id?: number;
  title: string;
  slug: string;
  icon?: string;
  shortDescription: string;
  fullDescription?: string;
  features?: FeatureData[];
  order: number;
}

export interface CaseStudyData {
  id?: number;
  title: string;
  slug: string;
  client: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: MetricData[];
  coverImage?: StrapiMedia | null;
  tags?: string;
  featured: boolean;
}

export interface TeamMemberData {
  id?: number;
  name: string;
  role: string;
  bio?: string;
  photo?: StrapiMedia | null;
  linkedIn?: string;
  order: number;
}

export interface TestimonialData {
  id?: number;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  avatar?: StrapiMedia | null;
  featured: boolean;
}

export interface GlobalData {
  id?: number;
  siteName: string;
  tagline?: string;
  logo?: StrapiMedia | null;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  email?: string;
  phone?: string;
  instagramUrl?: string;
  linkedinUrl?: string; // Strapi v5 lowercases: linkedinUrl not linkedInUrl
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
  service?: string;
}
