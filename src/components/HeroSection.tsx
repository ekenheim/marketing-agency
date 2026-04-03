"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, BarChart2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { HeroData, StatData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

const FALLBACK_STAT_ICONS = [TrendingUp, Users, BarChart2];

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
  const { t } = useLocale();

  const hero = data ?? {
    headline: t.hero.headline,
    headlineAccent: t.hero.headlineAccent,
    subheadline: t.hero.subheadline,
    primaryCta: { label: t.hero.primaryCta, url: "#case-studies", variant: "primary" as const },
    secondaryCta: { label: t.hero.secondaryCta, url: "#contact", variant: "secondary" as const },
  };
  const bgUrl = (data?.backgroundMedia?.url) ?? null;

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
      {/* Background layers */}
      {bgUrl ? (
        bgUrl.endsWith(".mp4") || bgUrl.endsWith(".webm") ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-30"
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
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          {/* Dramatic gradient orbs */}
          <div className="absolute -top-60 -right-60 w-[900px] h-[900px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-terra-500/[0.03] blur-[100px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/[0.02] blur-[80px]" />

          {/* Zellige geometric pattern */}

          {/* Diagonal editorial line */}
          <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
          <div className="absolute top-0 right-[40%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/30 to-navy-950/80" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-32 pb-24">
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber-500/[0.08] border border-amber-500/15 text-amber-400 text-[0.75rem] font-medium tracking-wider uppercase mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {t.hero.badge}
          </motion.div>

          {/* Headline — editorial large type */}
          <h1 className="font-[family-name:var(--font-display)] text-[2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-extrabold text-white/95 leading-[1.05] tracking-tight mb-6 sm:mb-8">
            {hero.headline.split(" ").map((word, i) => (
              <motion.span
                key={`main-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: "easeOut" }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            {hero.headlineAccent && (
              <>
                <br className="hidden sm:block" />
                {hero.headlineAccent.split(" ").map((word, i) => (
                  <motion.span
                    key={`accent-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + (hero.headline.split(" ").length + i) * 0.06,
                      ease: "easeOut",
                    }}
                    className="inline-block mr-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300"
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
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="text-lg sm:text-xl text-white/40 max-w-2xl mb-12 leading-relaxed font-light"
            >
              {hero.subheadline}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
            className="flex flex-wrap gap-3 sm:gap-4 mb-14 sm:mb-24"
          >
            <button
              onClick={() => handleCta("#case-studies")}
              className="group flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 active:scale-95 text-[0.8rem] sm:text-[0.85rem] uppercase tracking-wider cursor-pointer"
            >
              {hero.primaryCta?.label ?? t.hero.primaryCta}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => handleCta("#contact")}
              className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 border border-white/10 hover:border-amber-500/30 text-white/70 hover:text-amber-400 font-medium rounded-xl transition-all duration-300 hover:bg-white/[0.02] text-[0.8rem] sm:text-[0.85rem] uppercase tracking-wider cursor-pointer"
            >
              {hero.secondaryCta?.label ?? t.hero.secondaryCta}
            </button>
          </motion.div>

          {/* Stats — editorial layout with dividers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-0"
          >
            {data?.stats && data.stats.length > 0
              ? data.stats.map((stat: StatData, i: number) => (
                  <div key={stat.id} className={`flex items-center gap-3 sm:gap-4 sm:pr-10 md:pr-12 ${i > 0 ? "sm:pl-10 md:pl-12 sm:border-l sm:border-white/[0.06]" : ""}`}>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/[0.08] border border-amber-500/15 flex items-center justify-center flex-shrink-0">
                      <StatIcon name={stat.icon} />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                      <div className="text-[0.6rem] sm:text-[0.7rem] text-white/30 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                ))
              : t.hero.stats.map((stat, i) => (
                  <div key={i} className={`flex items-center gap-3 sm:gap-4 sm:pr-10 md:pr-12 ${i > 0 ? "sm:pl-10 md:pl-12 sm:border-l sm:border-white/[0.06]" : ""}`}>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/[0.08] border border-amber-500/15 flex items-center justify-center flex-shrink-0">
                      {(() => {
                        const Icon = FALLBACK_STAT_ICONS[i] ?? TrendingUp;
                        return <Icon size={18} className="text-amber-400" />;
                      })()}
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                      <div className="text-[0.6rem] sm:text-[0.7rem] text-white/30 font-medium uppercase tracking-wider">{stat.label}</div>
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
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[0.65rem] text-white/20 font-medium tracking-[0.25em] uppercase">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-amber-500/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
