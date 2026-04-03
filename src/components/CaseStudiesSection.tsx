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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
    <section id="case-studies" className="py-16 sm:py-28 bg-navy-950 relative overflow-hidden">
      {/* Diagonal accent */}
      <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16"
        >
          <div>
            <span className="inline-block text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em] mb-5">
              {t.caseStudies.label}
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 leading-tight">
              {t.caseStudies.title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">{t.caseStudies.titleAccent}</span>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-4">
            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-3 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 text-[0.8rem] uppercase tracking-wider cursor-pointer whitespace-nowrap"
            >
              {t.caseStudies.ctaLabel}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {items.map((cs, i) => {
            const coverUrl = cs.coverImage?.url ?? null;
            const tags = parseTags(cs.tags);

            return (
              <motion.article
                key={cs.slug || i}
                variants={cardVariants}
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative bg-navy-800/50 border border-white/[0.04] hover:border-amber-500/20 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Cover image / placeholder */}
                <div className="relative h-52 bg-gradient-to-br from-navy-700 to-navy-800 overflow-hidden">
                  {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={coverUrl}
                      alt={cs.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center relative z-10">
                        <div className="text-[0.65rem] font-semibold text-white/10 uppercase tracking-[0.3em]">
                          {cs.industry}
                        </div>
                        <div className="font-[family-name:var(--font-display)] text-amber-500/20 text-6xl font-extrabold mt-2">
                          {cs.results?.[0]?.value}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-amber-400 font-medium text-sm tracking-wide">
                      {t.caseStudies.viewCaseStudy} <ArrowUpRight size={15} />
                    </div>
                  </div>
                  {/* Industry badge */}
                  {cs.industry && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-navy-900/80 backdrop-blur-sm rounded-lg text-[0.65rem] text-white/50 font-medium uppercase tracking-wider">
                      {cs.industry}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="text-[0.65rem] text-amber-500 font-semibold uppercase tracking-[0.2em] mb-2">
                    {cs.client}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-white/90 font-bold text-base leading-snug mb-4">
                    {cs.title}
                  </h3>

                  {cs.summary && (
                    <p className="text-white/30 text-sm leading-relaxed mb-5 line-clamp-3 font-light">
                      {cs.summary}
                    </p>
                  )}

                  {/* Metrics */}
                  {cs.results && cs.results.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cs.results.slice(0, 3).map((r) => (
                        <div
                          key={r.id}
                          className="flex flex-col px-3.5 py-2.5 bg-amber-500/[0.05] border border-amber-500/10 rounded-xl"
                        >
                          <span className="font-[family-name:var(--font-display)] text-amber-400 font-extrabold text-base leading-none">
                            {r.value}
                          </span>
                          <span className="text-white/30 text-[0.65rem] mt-1 font-medium">{r.label}</span>
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
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/[0.03] rounded-lg text-[0.65rem] text-white/30 font-medium"
                        >
                          <Tag size={9} />
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
