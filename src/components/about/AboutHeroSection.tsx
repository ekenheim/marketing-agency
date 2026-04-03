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
    <section className="bg-navy-900 py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
            Who we are
          </span>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 leading-tight">
            Nordic precision.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Moroccan ambition.</span>
          </h1>
          <p className="mt-7 text-white/35 text-lg max-w-3xl mx-auto font-light leading-relaxed">
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
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            className="bg-navy-800/50 border border-white/[0.04] rounded-2xl p-8"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white/90 mb-3">Mission</h3>
            <p className="text-white/35 font-light leading-relaxed">
              Help Moroccan businesses grow online with performance marketing,
              proper analytics, and CRM that actually gets used.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            className="bg-navy-800/50 border border-white/[0.04] rounded-2xl p-8"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white/90 mb-3">Vision</h3>
            <p className="text-white/35 font-light leading-relaxed">
              Be the agency Moroccan brands call when they want results, not
              slide decks.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
