"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, BarChart2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { HeroData, StatData } from "@/types/strapi";

const FALLBACK: HeroData = {
  headline: "We turn clicks into clients —",
  headlineAccent: "and clients into loyal fans",
  subheadline: "Data-driven digital growth strategies that scale.",
  primaryCta: { label: "See our work", url: "#case-studies", variant: "primary" },
  secondaryCta: { label: "Get in touch", url: "#contact", variant: "secondary" },
};

const FALLBACK_STATS = [
  { icon: TrendingUp, value: "3×", label: "Average lead growth" },
  { icon: Users, value: "50+", label: "Moroccan brands served" },
  { icon: BarChart2, value: "−42%", label: "Avg. cost per lead" },
];

type IconComponent = React.ComponentType<LucideProps>;

function StatIcon({ name }: { name?: string }) {
  if (!name) return <TrendingUp size={18} className="text-amber-400" />;
  const Icon = (LucideIcons as unknown as Record<string, IconComponent>)[name];
  if (!Icon) return <TrendingUp size={18} className="text-amber-400" />;
  return <Icon size={18} className="text-amber-400" />;
}

interface Props {
  data: HeroData | null;
}

export default function HeroSection({ data }: Props) {
  const hero = data ?? FALLBACK;
  const bgUrl = hero.backgroundMedia?.url ?? null;

  const handleCta = (url: string) => {
    if (url.startsWith("#")) {
      const el = document.querySelector(url);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(url, "_blank", "noopener");
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-950"
    >
      {/* Background */}
      {bgUrl ? (
        bgUrl.endsWith(".mp4") || bgUrl.endsWith(".webm") ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            autoPlay
            muted
            loop
            playsInline
            src={bgUrl}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )
      ) : (
        /* Geometric background pattern */
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/3 blur-3xl" />
          {/* Grid lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Data-driven digital growth for Moroccan brands
          </motion.div>

          {/* Headline — staggered word animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            {hero.headline.split(" ").map((word, i) => (
              <motion.span
                key={`main-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
            {hero.headlineAccent && (
              <>
                {hero.headlineAccent.split(" ").map((word, i) => (
                  <motion.span
                    key={`accent-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + (hero.headline.split(" ").length + i) * 0.05,
                    }}
                    className="inline-block mr-3 text-amber-400"
                  >
                    {word}
                  </motion.span>
                ))}
              </>
            )}
          </h1>

          {/* Subheadline */}
          {hero.subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed"
            >
              {hero.subheadline}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            {hero.primaryCta && (
              <button
                onClick={() => handleCta(hero.primaryCta!.url)}
                className="group flex items-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-base shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                {hero.primaryCta.label}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            )}
            {hero.secondaryCta && (
              <button
                onClick={() => handleCta(hero.secondaryCta!.url)}
                className="flex items-center gap-2 px-7 py-4 border border-white/20 hover:border-amber-500/50 text-white hover:text-amber-400 font-semibold rounded-xl transition-all duration-200 hover:bg-white/5 text-base cursor-pointer"
              >
                {hero.secondaryCta.label}
              </button>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-6 sm:gap-10"
          >
            {hero.stats && hero.stats.length > 0
              ? hero.stats.map((stat: StatData) => (
                  <div key={stat.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <StatIcon name={stat.icon} />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))
              : FALLBACK_STATS.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <stat.icon size={18} className="text-amber-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
