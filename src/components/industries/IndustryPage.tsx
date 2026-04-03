"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight, type LucideProps } from "lucide-react";
import type { IndustryData } from "@/data/industries";

type IconComponent = React.ComponentType<LucideProps>;

function IndustryIcon({ name }: { name: string }) {
  const Icon = (LucideIcons as unknown as Record<string, IconComponent>)[name];
  if (!Icon) return <LucideIcons.Zap size={24} className="text-amber-400" />;
  return <Icon size={24} className="text-amber-400" />;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Props {
  industry: IndustryData;
}

export default function IndustryPage({ industry }: Props) {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
              {industry.name}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              {industry.headline}{" "}
              <span className="text-amber-400">{industry.headlineAccent}</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              {industry.subheadline}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mb-10">
              {industry.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-sm rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Get a Free Audit
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Pain Points ─── */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Sound familiar?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
              The challenges{" "}
              <span className="text-amber-400">{industry.name}</span> brands
              face
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {industry.painPoints.map((point, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative bg-navy-800/40 border border-white/5 hover:border-amber-500/30 rounded-2xl p-7 transition-all duration-300 hover:bg-navy-800/80 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                  <IndustryIcon name={point.icon} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {point.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Solutions ─── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Our approach
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
              How we <span className="text-amber-400">solve it</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {industry.solutions.map((solution, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative bg-navy-800/50 border border-white/5 hover:border-amber-500/30 rounded-2xl p-7 transition-all duration-300 hover:bg-navy-800/80 hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 font-bold text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-navy-800/50 border border-white/5 rounded-2xl p-10 sm:p-14 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {industry.ctaHeadline}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
              {industry.ctaDescription}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-sm rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Get a Free Audit
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
