"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Tag } from "lucide-react";
import type { CaseStudyData } from "@/types/strapi";
import { strapiMedia } from "@/lib/strapi";

const FALLBACK_CASES: CaseStudyData[] = [
  {
    title: "3× leads for Casablanca real estate brand",
    slug: "casablanca-real-estate",
    client: "Immo Maroc",
    industry: "Real Estate",
    results: [
      { id: 1, value: "3×", label: "Lead volume" },
      { id: 2, value: "−42%", label: "Cost per lead" },
      { id: 3, value: "90 days", label: "To results" },
    ],
    tags: "paid-social,real-estate,meta-ads",
    featured: true,
  },
  {
    title: "Scaling an e-commerce brand from 0 to MAD 2M revenue",
    slug: "ecommerce-scale",
    client: "Maroc Artisanat",
    industry: "E-commerce",
    results: [
      { id: 1, value: "MAD 2M", label: "Revenue in Y1" },
      { id: 2, value: "8×", label: "ROAS on Google Shopping" },
      { id: 3, value: "55%", label: "Repeat purchase rate" },
    ],
    tags: "google-ads,e-commerce,cro",
    featured: true,
  },
  {
    title: "SaaS startup reaches 500 qualified demos in 6 months",
    slug: "saas-demos",
    client: "TechMaroc",
    industry: "SaaS / B2B",
    results: [
      { id: 1, value: "500+", label: "Qualified demos" },
      { id: 2, value: "−60%", label: "CAC reduction" },
      { id: 3, value: "12%", label: "Demo-to-close rate" },
    ],
    tags: "b2b,linkedin,content-marketing",
    featured: true,
  },
];

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
  const items =
    caseStudies && caseStudies.length > 0 ? caseStudies : FALLBACK_CASES;

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
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Results that{" "}
              <span className="text-amber-400">speak for themselves</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-xs sm:text-right">
            Real numbers from real Moroccan brands we&apos;ve helped grow.
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
          {items.map((cs, i) => {
            const coverUrl = cs.coverImage?.data?.attributes.url
              ? strapiMedia(cs.coverImage.data.attributes.url)
              : null;
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
                      View case study <ArrowUpRight size={16} />
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
                  <h3 className="text-white font-bold text-base leading-snug mb-4">
                    {cs.title}
                  </h3>

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
