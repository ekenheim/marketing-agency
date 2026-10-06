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
    title: "Data over opinions",
    description:
      "We test and measure before we scale. If the numbers say we\u2019re wrong, we change course.",
  },
  {
    icon: Shield,
    title: "Ownership",
    description:
      "We treat your budget like our own. If something isn\u2019t working, we say so and fix it.",
  },
  {
    icon: TrendingUp,
    title: "Long-term thinking",
    description:
      "Quick wins are great, but we\u2019d rather build something that keeps growing six months from now.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-ivory-200 section-spacing relative">

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-burgundy-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
            What we stand for
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-ink/95 leading-tight">
            How we{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy-400 to-burgundy-300">actually operate</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-ivory-50/50 border border-ink/10 hover:border-burgundy-500/15 rounded-2xl p-8 transition-all duration-500"
            >
              <value.icon className="h-8 w-8 text-burgundy-500 mb-5" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink/90 mb-3">
                {value.title}
              </h3>
              <p className="text-ink/65 font-light leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
