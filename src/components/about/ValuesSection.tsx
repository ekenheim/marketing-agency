"use client";

import { motion, type Variants } from "framer-motion";
import { Eye, BarChart2, Shield, TrendingUp } from "lucide-react";

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

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No hidden fees, no vanity metrics. You see exactly where every dirham goes and what it produces.",
  },
  {
    icon: BarChart2,
    title: "Data Over Opinions",
    description:
      "Every decision is backed by data. We test, measure, and optimise \u2014 gut feelings don\u2019t run campaigns.",
  },
  {
    icon: Shield,
    title: "Ownership",
    description:
      "We treat your budget like our own. If something isn\u2019t working, we say so and fix it.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Thinking",
    description:
      "Quick wins matter, but we build systems that compound. Sustainable growth over overnight spikes.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
            What we stand for
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Values that drive{" "}
            <span className="text-amber-500">every decision</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-navy-800/40 border border-white/5 rounded-2xl p-7"
            >
              <value.icon className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
