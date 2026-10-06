"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const steps = [
  {
    number: "01",
    title: "Audit & Discovery",
    description:
      "We dissect your current digital presence, competitors, and market opportunity. No assumptions \u2014 just data.",
  },
  {
    number: "02",
    title: "Strategy & Setup",
    description:
      "We build you a roadmap with real KPIs, set up tracking, and structure your campaigns.",
  },
  {
    number: "03",
    title: "Launch & Optimize",
    description:
      "Campaigns go live with daily monitoring. We iterate fast based on real performance data.",
  },
  {
    number: "04",
    title: "Scale & Report",
    description:
      "We put more money behind what works and less behind what doesn't. Monthly reports show you exactly where every dirham went.",
  },
];

export default function MethodologySection() {
  return (
    <section className="bg-ivory-100 section-spacing relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-burgundy-500/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-burgundy-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
            How we work
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-ink/95 leading-tight">
            Four steps,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy-400 to-burgundy-300">no mystery</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-ivory-50/50 border border-ink/10 rounded-2xl p-8 relative overflow-hidden group hover:border-burgundy-500/15 transition-all duration-500"
            >
              <span className="font-[family-name:var(--font-display)] text-6xl font-extrabold text-burgundy-500/[0.06] absolute top-4 right-6 group-hover:text-burgundy-500/[0.1] transition-colors duration-500">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink/90 mb-3">
                {step.title}
              </h3>
              <p className="text-ink/65 font-light leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
