"use client";

import { motion, type Variants } from "framer-motion";
import { Target, LineChart, Globe } from "lucide-react";

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

const cards = [
  {
    icon: Target,
    title: "Conversion-first thinking",
    description:
      "Learned at Sweden\u2019s top fintech and gaming studios, where every pixel gets measured against revenue.",
  },
  {
    icon: LineChart,
    title: "Tracking that actually works",
    description:
      "The same attribution and analytics stack that Nordic tech companies run on, set up for Morocco.",
  },
  {
    icon: Globe,
    title: "We know this market",
    description:
      "Moroccan consumer behavior, Arabic/French content, regional ad platforms. Not guesswork from abroad.",
  },
];

export default function NordicEdgeSection() {
  return (
    <section className="bg-ivory-100 section-spacing relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/[0.04] to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-burgundy-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
            Our edge
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-ink/95 leading-tight">
            Swedish pedigree,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy-400 to-burgundy-300">Moroccan execution</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-ivory-50/50 border border-ink/10 hover:border-burgundy-500/20 rounded-2xl p-8 transition-all duration-500"
            >
              <card.icon className="h-8 w-8 text-burgundy-500 mb-5" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink/90 mb-3">
                {card.title}
              </h3>
              <p className="text-ink/65 font-light leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
