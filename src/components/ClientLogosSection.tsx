"use client";

import { motion, type Variants } from "framer-motion";
import { useLocale } from "@/i18n/useLocale";
import type { ClientBrandData } from "@/types/strapi";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Props {
  brands: ClientBrandData[] | null;
}

export default function ClientLogosSection({ brands }: Props) {
  const { t } = useLocale();

  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-10 sm:py-12 bg-ivory-200 border-y border-ink/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <p className="text-ink/65 text-[0.65rem] uppercase tracking-[0.25em] text-center mb-6 sm:mb-8 font-medium">
          {t.logos.label}
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-14 md:gap-x-20 gap-y-5 sm:gap-y-6"
        >
          {brands.map((brand) => (
            <motion.span
              key={brand.id ?? brand.name}
              variants={itemVariants}
              className="font-[family-name:var(--font-display)] text-ink/65 text-xl font-bold tracking-wide hover:text-burgundy-500 transition-all duration-500 cursor-default"
            >
              {brand.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
