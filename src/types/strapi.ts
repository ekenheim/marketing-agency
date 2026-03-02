export interface StrapiMediaAttributes {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  name?: string;
}

export interface StrapiMedia {
  data: {
    id: number;
    attributes: StrapiMediaAttributes;
  } | null;
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

export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  } | null;
  meta?: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
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
  headline: string;
  subheadline?: string;
  primaryCta?: CtaData;
  secondaryCta?: CtaData;
  backgroundMedia?: StrapiMedia;
}

export interface ServiceData {
  title: string;
  slug: string;
  icon?: string;
  shortDescription: string;
  fullDescription?: string;
  features?: FeatureData[];
  order: number;
}

export interface CaseStudyData {
  title: string;
  slug: string;
  client: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: MetricData[];
  coverImage?: StrapiMedia;
  tags?: string;
  featured: boolean;
}

export interface TeamMemberData {
  name: string;
  role: string;
  bio?: string;
  photo?: StrapiMedia;
  linkedIn?: string;
  order: number;
}

export interface TestimonialData {
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  avatar?: StrapiMedia;
  featured: boolean;
}

export interface GlobalData {
  siteName: string;
  tagline?: string;
  logo?: StrapiMedia;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  email?: string;
  phone?: string;
  instagramUrl?: string;
  linkedInUrl?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
  service?: string;
}
