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
            Our edge
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Swedish pedigree,{" "}
            <span className="text-amber-500">Moroccan execution</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-navy-800/50 border border-white/5 hover:border-amber-500/30 rounded-2xl p-7 transition-colors"
            >
              <card.icon className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-slate-400">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
