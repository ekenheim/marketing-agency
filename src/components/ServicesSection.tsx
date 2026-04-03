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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          className="flex flex-wrap justify-center gap-6"
        >
          {items.map((service, i) => (
            <motion.div
              key={service.slug || i}
              variants={cardVariants}
              className="group relative bg-navy-800/50 border border-white/5 hover:border-amber-500/30 rounded-2xl p-7 transition-all duration-300 hover:bg-navy-800/80 hover:-translate-y-1 cursor-default w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
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
                      <CheckCircle2 size={15} className="text-amber-500 flex-shrink-0" />
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
