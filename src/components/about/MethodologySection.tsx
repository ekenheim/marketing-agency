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
    <section className="bg-navy-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
            How we work
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Four steps,{" "}
            <span className="text-amber-500">no mystery</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-navy-800/40 border border-white/5 rounded-2xl p-7 relative overflow-hidden"
            >
              <span className="text-5xl font-black text-amber-500/20 absolute top-4 right-6">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
