"use client";

import { motion, type Variants } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CheckCircle2, type LucideProps } from "lucide-react";
import type { ServiceData, GlobalData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

const ICON_NAMES = ["BarChart2", "Search", "Share2", "Layout", "Mail", "PieChart"];

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface Props {
  services: ServiceData[] | null;
  globalData?: GlobalData | null;
}

export default function ServicesSection({ services, globalData }: Props) {
  const { t } = useLocale();

  const items: ServiceData[] =
    services && services.length > 0
      ? services
      : t.services.items.map((s, i) => ({
          title: s.title,
          slug: s.title.toLowerCase().replace(/\s+/g, "-"),
          icon: ICON_NAMES[i],
          shortDescription: s.description,
          features: s.features.map((f, fi) => ({ id: fi + 1, label: f })),
          order: i + 1,
        }));

  const sectionLabel = globalData?.servicesSectionLabel ?? t.services.label;
  const sectionTitle = globalData?.servicesSectionTitle ?? t.services.title;
  const sectionSubtitle = globalData?.servicesSectionSubtitle ?? t.services.subtitle;

  return (
    <section id="services" className="py-16 sm:py-28 bg-navy-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em] mb-5">
            {sectionLabel}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 mb-5 leading-tight">
            {sectionTitle}
          </h2>
          <p className="text-white/35 text-lg max-w-2xl mx-auto font-light">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-5"
        >
          {items.map((service, i) => (
            <motion.div
              key={service.slug || i}
              variants={cardVariants}
              className="group relative bg-navy-800/60 border border-white/[0.04] hover:border-amber-500/20 rounded-2xl p-8 transition-all duration-500 hover:bg-navy-800/90 hover:-translate-y-1 cursor-default w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              {/* Number watermark */}
              <div className="absolute top-6 right-6 font-[family-name:var(--font-display)] text-[4rem] font-extrabold text-white/[0.02] leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-amber-500/[0.06] border border-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500/[0.1] group-hover:border-amber-500/20 transition-all duration-500">
                <ServiceIcon name={service.icon} />
              </div>

              {/* Title & description */}
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white/90 mb-3">{service.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-6 font-light">
                {service.shortDescription}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2.5">
                  {service.features.map((feat) => (
                    <li key={feat.id} className="flex items-center gap-3 text-sm text-white/50">
                      <CheckCircle2 size={14} className="text-amber-500/70 flex-shrink-0" />
                      {feat.label}
                    </li>
                  ))}
                </ul>
              )}

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
