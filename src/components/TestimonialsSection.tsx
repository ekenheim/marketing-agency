"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import type { TestimonialData, GlobalData } from "@/types/strapi";

const FALLBACK_TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      "Digitomara doubled our qualified leads in 90 days. The reporting is crystal clear and their team is always a step ahead.",
    authorName: "Karim Benali",
    authorRole: "CEO",
    company: "Immo Maroc",
    featured: true,
  },
  {
    quote:
      "We went from barely breaking even on ads to an 8× ROAS in under 4 months. I wish we'd found them sooner.",
    authorName: "Fatima-Zahra Ouhbi",
    authorRole: "Founder",
    company: "Maroc Artisanat",
    featured: true,
  },
  {
    quote:
      "Unlike other agencies, Digitomara speaks the language of business — CAC, LTV, pipeline. No fluff, just results.",
    authorName: "Mehdi Alaoui",
    authorRole: "CMO",
    company: "TechMaroc",
    featured: true,
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

interface Props {
  testimonials: TestimonialData[] | null;
  globalData: GlobalData | null;
}

export default function TestimonialsSection({ testimonials, globalData }: Props) {
  const items =
    testimonials && testimonials.length > 0
      ? testimonials
      : FALLBACK_TESTIMONIALS;

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
    <section id="testimonials" className="py-24 bg-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Client stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Brands that{" "}
            <span className="text-amber-400">trust us to deliver</span>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Decorative quote mark */}
          <div className="absolute -top-4 -left-4 sm:-left-8 opacity-10">
            <Quote size={80} className="text-amber-500" />
          </div>

          <div className="relative bg-navy-800/40 border border-white/5 rounded-3xl p-8 sm:p-12 min-h-[280px] flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <StarRating />
                <blockquote className="text-white text-lg sm:text-xl leading-relaxed font-medium mb-8">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt={active.authorName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-600 to-navy-700 border-2 border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-slate-400" />
                    </div>
                  )}
                  <div>
                    <div className="text-white font-bold">{active.authorName}</div>
                    <div className="text-slate-400 text-sm">
                      {active.authorRole}
                      {active.company && (
                        <span className="text-amber-500/70"> · {active.company}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    i === current
                      ? "bg-amber-500 w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-amber-500/5"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-amber-500/5"
                aria-label="Next"
              >
                <ChevronRight size={18} />
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
          className="mt-16 flex flex-wrap justify-center gap-8 items-center"
        >
          {(globalData?.trustBadges && globalData.trustBadges.length > 0
            ? globalData.trustBadges.map((b) => b.label)
            : ["Google Partner", "Meta Business Partner", "HubSpot Certified", "ISO 27001 Aware"]
          ).map((badge) => (
            <div
              key={badge}
              className="px-4 py-2 border border-white/10 rounded-lg text-slate-500 text-sm font-medium"
            >
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
