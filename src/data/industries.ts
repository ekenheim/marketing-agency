export interface IndustryPainPoint {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export interface IndustrySolution {
  title: string;
  description: string;
}

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  painPoints: IndustryPainPoint[];
  solutions: IndustrySolution[];
  stats: IndustryStat[];
  ctaHeadline: string;
  ctaDescription: string;
}

export const INDUSTRIES: Record<string, IndustryData> = {
  hospitality: {
    slug: "hospitality",
    name: "Hospitality & Tourism",
    headline: "Fill rooms and tables —",
    headlineAccent: "not just your social feed",
    subheadline:
      "Performance marketing and direct booking strategies for Moroccan hotels, riads, and restaurants preparing for the 2030 World Cup boom.",
    painPoints: [
      {
        icon: "Hotel",
        title: "OTA Dependency",
        description:
          "Booking.com and Expedia take 15-25% commission on every reservation. Your margins are shrinking.",
      },
      {
        icon: "CalendarX",
        title: "Seasonal Volatility",
        description:
          "Feast-or-famine occupancy rates make revenue planning nearly impossible.",
      },
      {
        icon: "TrendingDown",
        title: "Low Direct Bookings",
        description:
          "Your website exists but barely converts. Guests find you on OTAs instead.",
      },
    ],
    solutions: [
      {
        title: "Direct Booking Campaigns",
        description:
          "Google and Meta ads that drive bookings straight to your website — bypassing OTA commissions entirely.",
      },
      {
        title: "WhatsApp Booking Integration",
        description:
          "Automated WhatsApp flows that convert enquiries into confirmed reservations with zero manual effort.",
      },
      {
        title: "Reputation & Review Strategy",
        description:
          "A real system for collecting and managing reviews that pushes your Google and TripAdvisor rankings up.",
      },
      {
        title: "Seasonal Campaign Planning",
        description:
          "Pre-built campaign calendars for Ramadan, summer, and World Cup 2030 periods.",
      },
    ],
    stats: [
      { value: "3×", label: "Direct bookings increase" },
      { value: "-45%", label: "OTA dependency reduction" },
      { value: "90 days", label: "To measurable results" },
    ],
    ctaHeadline: "Ready to own your bookings?",
    ctaDescription:
      "Get a free audit of your current setup. We'll show you where the money is leaking.",
  },
  ecommerce: {
    slug: "ecommerce",
    name: "E-Commerce",
    headline: "Turn browsers into buyers —",
    headlineAccent: "and buyers into repeat customers",
    subheadline:
      "Full-funnel performance marketing for Moroccan e-commerce brands — from first click to fifth purchase.",
    painPoints: [
      {
        icon: "ShoppingCart",
        title: "High Cart Abandonment",
        description:
          "Moroccan e-commerce averages 75% cart abandonment. Most brands have no recovery strategy.",
      },
      {
        icon: "DollarSign",
        title: "Expensive Customer Acquisition",
        description:
          "CPAs keep climbing while ROAS keeps falling. Scaling profitably feels impossible.",
      },
      {
        icon: "UserMinus",
        title: "No Retention Strategy",
        description:
          "You spend everything acquiring new customers but nothing keeping the ones you have.",
      },
    ],
    solutions: [
      {
        title: "Google Shopping & Meta Catalogs",
        description:
          "Dynamic product ads that reach high-intent shoppers across Google and Instagram at optimal CPAs.",
      },
      {
        title: "Conversion Rate Optimization",
        description:
          "We fix your landing pages, run A/B tests, and clean up your checkout flow. Typical lift: 30-50%.",
      },
      {
        title: "Email & WhatsApp Retargeting",
        description:
          "Automated recovery sequences for abandoned carts, browse abandonment, and post-purchase upsells.",
      },
      {
        title: "Server-Side Tracking",
        description:
          "First-party data infrastructure that gives you accurate attribution even with iOS restrictions and ad blockers.",
      },
    ],
    stats: [
      { value: "8×", label: "ROAS on Google Shopping" },
      { value: "55%", label: "Repeat purchase rate" },
      { value: "MAD 2M", label: "Revenue generated in Y1" },
    ],
    ctaHeadline: "Ready to scale profitably?",
    ctaDescription:
      "Get a free audit of your ad accounts. We'll tell you where your budget is going and what to cut.",
  },
  b2b: {
    slug: "b2b",
    name: "B2B & SaaS",
    headline: "Generate demos, not just leads —",
    headlineAccent: "pipeline that actually closes",
    subheadline:
      "LinkedIn campaigns, content marketing, and lead scoring for Moroccan B2B companies and SaaS startups.",
    painPoints: [
      {
        icon: "Clock",
        title: "Long Sales Cycles",
        description:
          "B2B deals take months. Without nurturing, leads go cold before your sales team can follow up.",
      },
      {
        icon: "UserX",
        title: "Unqualified Leads",
        description:
          "Your forms fill up but most leads can't afford your product or aren't decision-makers.",
      },
      {
        icon: "BarChart2",
        title: "No Attribution",
        description:
          "You know you're spending on marketing but can't trace which channel actually drove the signed contract.",
      },
    ],
    solutions: [
      {
        title: "LinkedIn Advertising",
        description:
          "Campaigns targeted by job title, company size, and industry across Morocco and MENA. Your ads hit the people who sign the checks.",
      },
      {
        title: "Content that books demos",
        description:
          "Articles and guides that make prospects come to you instead of the other way around.",
      },
      {
        title: "Lead Scoring & CRM",
        description:
          "Automated qualification that routes hot leads to sales immediately and nurtures cold ones until they're ready.",
      },
      {
        title: "Full-funnel attribution",
        description:
          "Attribution that tracks all the way to a signed contract, not just a form fill.",
      },
    ],
    stats: [
      { value: "500+", label: "Qualified demos generated" },
      { value: "-60%", label: "CAC reduction" },
      { value: "12%", label: "Demo-to-close rate" },
    ],
    ctaHeadline: "Ready to fill your pipeline?",
    ctaDescription:
      "Get a free audit of your current lead gen. We'll tell you what's working, what's not, and where to focus next.",
  },
};
