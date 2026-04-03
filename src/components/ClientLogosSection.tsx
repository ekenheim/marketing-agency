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
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ClientLogosSection() {
  const { t } = useLocale();

  return (
    <section className="py-12 bg-navy-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-slate-500 text-xs uppercase tracking-widest text-center mb-8">
          {t.logos.label}
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
        >
          {LOGOS.map((name) => (
            <motion.span
              key={name}
              variants={itemVariants}
              className="text-slate-500 text-lg font-bold tracking-wide opacity-40 hover:opacity-70 transition-opacity duration-300"
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
