"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Tag } from "lucide-react";
import type { CaseStudyData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

function parseTags(tags?: string): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

interface Props {
  caseStudies: CaseStudyData[] | null;
}

export default function CaseStudiesSection({ caseStudies }: Props) {
  const { t } = useLocale();

  const items: CaseStudyData[] =
    caseStudies && caseStudies.length > 0
      ? caseStudies
      : t.caseStudies.items.map((cs) => ({
          title: cs.title,
          slug: cs.title.toLowerCase().replace(/\s+/g, "-"),
          client: cs.client,
          industry: cs.industry,
          results: cs.results.map((r, ri) => ({ id: ri + 1, value: r.value, label: r.label })),
          tags: cs.tags,
          featured: true,
        }));

  return (
    <section id="case-studies" className="py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
              {t.caseStudies.label}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              {t.caseStudies.title}{" "}
              <span className="text-amber-400">{t.caseStudies.titleAccent}</span>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-4">
            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-sm shadow-lg shadow-amber-500/25 cursor-pointer whitespace-nowrap"
            >
              {t.caseStudies.ctaLabel}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((cs, i) => {
            const coverUrl = cs.coverImage?.url ?? null;
            const tags = parseTags(cs.tags);

            return (
              <motion.article
                key={cs.slug || i}
                variants={cardVariants}
                className="group relative bg-navy-800/40 border border-white/5 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
              >
                {/* Cover image / placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-navy-700 to-navy-800 overflow-hidden">
                  {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={coverUrl}
                      alt={cs.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-black text-white/10 uppercase tracking-widest">
                          {cs.industry}
                        </div>
                        <div className="text-amber-500/30 text-6xl font-black mt-1">
                          {cs.results?.[0]?.value}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                      {t.caseStudies.viewCaseStudy} <ArrowUpRight size={16} />
                    </div>
                  </div>
                  {/* Industry badge */}
                  {cs.industry && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-navy-900/90 backdrop-blur-sm rounded-md text-xs text-slate-300 font-medium">
                      {cs.industry}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs text-amber-500 font-semibold uppercase tracking-wider mb-2">
                    {cs.client}
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug mb-3">
                    {cs.title}
                  </h3>

                  {cs.summary && (
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {cs.summary}
                    </p>
                  )}

                  {/* Metrics */}
                  {cs.results && cs.results.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cs.results.slice(0, 3).map((r) => (
                        <div
                          key={r.id}
                          className="flex flex-col px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg"
                        >
                          <span className="text-amber-400 font-black text-base leading-none">
                            {r.value}
                          </span>
                          <span className="text-slate-400 text-xs mt-0.5">{r.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-xs text-slate-400"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
