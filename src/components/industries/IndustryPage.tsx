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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface Props {
  industry: IndustryData;
}

export default function IndustryPage({ industry }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="py-28 bg-navy-950 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-500/[0.03] blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em] mb-5">
              {industry.name}
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-[3.75rem] font-extrabold text-white/95 mb-7 leading-tight">
              {industry.headline}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">{industry.headlineAccent}</span>
            </h1>
            <p className="text-white/35 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl font-light">
              {industry.subheadline}
            </p>

            <div className="flex flex-wrap gap-6 sm:gap-10 mb-12">
              {industry.stats.map((stat, i) => (
                <div key={i} className={`${i > 0 ? "pl-6 sm:pl-10 border-l border-white/[0.06]" : ""}`}>
                  <div className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-white/30 text-[0.75rem] mt-1 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold text-[0.8rem] uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
            >
              Get a Free Audit
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-28 bg-navy-900 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em] mb-5">
              Sound familiar?
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 mb-5 leading-tight">
              The challenges{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">{industry.name}</span> brands
              face
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {industry.painPoints.map((point, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative bg-navy-800/50 border border-white/[0.04] hover:border-amber-500/20 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/[0.06] border border-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500/[0.1] group-hover:border-amber-500/20 transition-all duration-500">
                  <IndustryIcon name={point.icon} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white/90 mb-3">
                  {point.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed font-light">
                  {point.description}
                </p>
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-28 bg-navy-950 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em] mb-5">
              Our approach
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 mb-5 leading-tight">
              How we <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">solve it</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {industry.solutions.map((solution, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative bg-navy-800/50 border border-white/[0.04] hover:border-amber-500/20 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/[0.06] border border-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-[family-name:var(--font-display)] text-amber-400 font-bold text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white/90 mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-white/35 text-sm leading-relaxed font-light">
                      {solution.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-navy-900 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-navy-800/50 border border-white/[0.04] rounded-2xl p-12 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-white/95 mb-5">
                {industry.ctaHeadline}
              </h2>
              <p className="text-white/35 text-lg max-w-2xl mx-auto mb-10 font-light">
                {industry.ctaDescription}
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold text-[0.8rem] uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
              >
                Get a Free Audit
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
