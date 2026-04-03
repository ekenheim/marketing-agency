"use client";

import { motion, type Variants } from "framer-motion";
import { useLocale } from "@/i18n/useLocale";

const LOGOS = [
  "Immo Maroc",
  "Maroc Artisanat",
  "TechMaroc",
  "CasaFinance",
  "Atlas Motors",
  "Riad Collection",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ClientLogosSection() {
  const { t } = useLocale();

  return (
    <section className="py-14 bg-navy-900 border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <p className="text-white/20 text-[0.65rem] uppercase tracking-[0.25em] text-center mb-10 font-medium">
          {t.logos.label}
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-14 md:gap-x-20 gap-y-5 sm:gap-y-6"
        >
          {LOGOS.map((name) => (
            <motion.span
              key={name}
              variants={itemVariants}
              className="font-[family-name:var(--font-display)] text-white/15 text-xl font-bold tracking-wide hover:text-amber-500/30 transition-all duration-500 cursor-default"
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
