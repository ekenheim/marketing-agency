"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import type { TestimonialData, GlobalData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

function StarRating() {
  return (
    <div className="flex gap-1 mb-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

interface Props {
  testimonials: TestimonialData[] | null;
  globalData: GlobalData | null;
}

export default function TestimonialsSection({ testimonials, globalData }: Props) {
  const { t } = useLocale();

  const items: TestimonialData[] =
    testimonials && testimonials.length > 0
      ? testimonials
      : t.testimonials.items.map((item) => ({
          quote: item.quote,
          authorName: item.authorName,
          authorRole: item.authorRole,
          company: item.company,
          featured: true,
        }));

  const badges =
    globalData?.trustBadges && globalData.trustBadges.length > 0
      ? globalData.trustBadges.map((b) => b.label)
      : t.testimonials.badges;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + items.length) % items.length);
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % items.length);
  };

  const active = items[current];
  const avatarUrl = active.avatar?.url ?? null;

  return (
    <section id="testimonials" className="py-16 sm:py-28 bg-navy-950 overflow-hidden relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-amber-500/[0.02] blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em] mb-5">
            {t.testimonials.label}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 leading-tight">
            {t.testimonials.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">{t.testimonials.titleAccent}</span>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Large decorative quote mark */}
          <div className="absolute -top-8 -left-4 sm:-left-10 font-[family-name:var(--font-display)] text-[8rem] sm:text-[10rem] font-extrabold text-amber-500/[0.04] leading-none select-none pointer-events-none">
            &ldquo;
          </div>

          <div
            className="relative bg-navy-800/40 border border-white/[0.04] rounded-3xl p-6 sm:p-10 lg:p-14 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between touch-pan-y"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              (e.currentTarget as HTMLElement).dataset.touchX = String(touch.clientX);
            }}
            onTouchEnd={(e) => {
              const startX = Number((e.currentTarget as HTMLElement).dataset.touchX ?? 0);
              const endX = e.changedTouches[0].clientX;
              const diff = startX - endX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) next();
                else prev();
              }
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <StarRating />
                <blockquote className="font-[family-name:var(--font-display)] text-white/85 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium mb-8 sm:mb-10">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt={active.authorName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-600 to-navy-700 border-2 border-amber-500/15 flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-white/20" />
                    </div>
                  )}
                  <div>
                    <div className="text-white/90 font-semibold">{active.authorName}</div>
                    <div className="text-white/30 text-sm font-light">
                      {active.authorRole}
                      {active.company && (
                        <span className="text-amber-500/60"> · {active.company}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            <div className="flex gap-2.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 sm:h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
                    i === current
                      ? "bg-amber-500 w-8"
                      : "bg-white/10 w-2 sm:w-1.5 hover:bg-white/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-12 h-12 sm:w-11 sm:h-11 rounded-xl border border-white/[0.06] hover:border-amber-500/30 text-white/30 hover:text-amber-400 flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-amber-500/[0.04] active:bg-amber-500/[0.08]"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 sm:w-11 sm:h-11 rounded-xl border border-white/[0.06] hover:border-amber-500/30 text-white/30 hover:text-amber-400 flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-amber-500/[0.04] active:bg-amber-500/[0.08]"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 flex flex-wrap justify-center gap-4 items-center"
        >
          {badges.map((badge) => (
            <div
              key={badge}
              className="px-5 py-2.5 border border-white/[0.05] rounded-xl text-white/20 text-[0.75rem] font-medium tracking-wide hover:border-amber-500/15 hover:text-white/30 transition-all duration-300"
            >
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
