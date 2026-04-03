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

export default function AboutHeroSection() {
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
            Who we are
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Nordic precision.{" "}
            <span className="text-amber-500">Moroccan ambition.</span>
          </h1>
          <p className="mt-6 text-slate-400 text-lg max-w-3xl mx-auto">
            We started Digitomara because we thought Moroccan brands deserved
            the same performance-first approach we used to grow some of
            Scandinavia&apos;s biggest digital companies. So we brought it here.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            className="bg-navy-800/40 border border-white/5 rounded-2xl p-7"
          >
            <h3 className="text-xl font-bold text-white mb-3">Mission</h3>
            <p className="text-slate-400">
              Help Moroccan businesses grow online with performance marketing,
              proper analytics, and CRM that actually gets used.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            className="bg-navy-800/40 border border-white/5 rounded-2xl p-7"
          >
            <h3 className="text-xl font-bold text-white mb-3">Vision</h3>
            <p className="text-slate-400">
              Be the agency Moroccan brands call when they want results, not
              slide decks.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
