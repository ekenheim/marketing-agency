"use client";

import { motion, type Variants } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CheckCircle2, type LucideProps } from "lucide-react";
import type { ServiceData, GlobalData } from "@/types/strapi";

const FALLBACK_SERVICES: ServiceData[] = [
  {
    title: "Performance Marketing",
    slug: "performance-marketing",
    icon: "BarChart2",
    shortDescription: "ROI-focused paid campaigns across Meta and Google.",
    features: [
      { id: 1, label: "Google Ads management" },
      { id: 2, label: "Meta & Instagram campaigns" },
      { id: 3, label: "Weekly performance reports" },
    ],
    order: 1,
  },
  {
    title: "SEO & Content",
    slug: "seo-content",
    icon: "Search",
    shortDescription: "Rank higher and attract organic traffic that converts.",
    features: [
      { id: 1, label: "Technical SEO audits" },
      { id: 2, label: "Arabic & French content" },
      { id: 3, label: "Link building strategy" },
    ],
    order: 2,
  },
  {
    title: "Social Media",
    slug: "social-media",
    icon: "Share2",
    shortDescription: "Build engaged communities and grow brand awareness.",
    features: [
      { id: 1, label: "Content creation & scheduling" },
      { id: 2, label: "Community management" },
      { id: 3, label: "Influencer partnerships" },
    ],
    order: 3,
  },
  {
    title: "Web & Landing Pages",
    slug: "web-landing-pages",
    icon: "Layout",
    shortDescription: "Conversion-optimised pages that turn visitors into leads.",
    features: [
      { id: 1, label: "CRO-focused design" },
      { id: 2, label: "A/B testing setup" },
      { id: 3, label: "Analytics integration" },
    ],
    order: 4,
  },
  {
    title: "Email & CRM",
    slug: "email-crm",
    icon: "Mail",
    shortDescription: "Nurture leads with personalised automated campaigns.",
    features: [
      { id: 1, label: "Email automation flows" },
      { id: 2, label: "CRM setup & integration" },
      { id: 3, label: "Lead scoring models" },
    ],
    order: 5,
  },
  {
    title: "Analytics & Data",
    slug: "analytics-data",
    icon: "PieChart",
    shortDescription: "Turn raw data into actionable growth insights.",
    features: [
      { id: 1, label: "Custom dashboards" },
      { id: 2, label: "Attribution modelling" },
      { id: 3, label: "Monthly strategy reviews" },
    ],
    order: 6,
  },
];

type IconComponent = React.ComponentType<LucideProps>;

function ServiceIcon({ name }: { name?: string }) {
  if (!name) return <LucideIcons.Zap size={22} className="text-amber-400" />;
  const Icon = (LucideIcons as unknown as Record<string, IconComponent>)[name];
  if (!Icon) return <LucideIcons.Zap size={22} className="text-amber-400" />;
  return <Icon size={22} className="text-amber-400" />;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Props {
  services: ServiceData[] | null;
  globalData?: GlobalData | null;
}

export default function ServicesSection({ services, globalData }: Props) {
  const items = (services && services.length > 0) ? services : FALLBACK_SERVICES;
  const sectionLabel = globalData?.servicesSectionLabel ?? "What we do";
  const sectionTitle = globalData?.servicesSectionTitle ?? "Services built for measurable growth";
  const sectionSubtitle = globalData?.servicesSectionSubtitle ?? "Every service is designed around one goal: attracting high-value clients and delivering returns you can see.";

  return (
    <section id="services" className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
            {sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
            {sectionTitle}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((service, i) => (
            <motion.div
              key={service.slug || i}
              variants={cardVariants}
              className="group relative bg-navy-800/50 border border-white/5 hover:border-amber-500/30 rounded-2xl p-7 transition-all duration-300 hover:bg-navy-800/80 hover:-translate-y-1 cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                <ServiceIcon name={service.icon} />
              </div>

              {/* Title & description */}
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                {service.shortDescription}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2">
                  {service.features.map((feat) => (
                    <li key={feat.id} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2
                        size={15}
                        className="text-amber-500 flex-shrink-0"
                      />
                      {feat.label}
                    </li>
                  ))}
                </ul>
              )}

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
