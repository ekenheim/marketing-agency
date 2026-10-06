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
  if (!name) return <TrendingUp size={18} className="text-burgundy-400" />;
  const Icon = (LucideIcons as unknown as Record<string, IconComponent>)[name];
  if (!Icon) return <TrendingUp size={18} className="text-burgundy-400" />;
  return <Icon size={18} className="text-burgundy-400" />;
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
    primaryCta: { label: t.hero.primaryCta, url: "#contact", variant: "primary" as const },
    secondaryCta: { label: t.hero.secondaryCta, url: "#services", variant: "secondary" as const },
  };
  const media = data?.backgroundMedia;
  const mediaUrl = media?.url;
  const isVideo = /\.(mp4|webm)(?:[?#]|$)/i.test(mediaUrl ?? "");

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
      className="relative min-h-[36rem] flex items-center overflow-hidden bg-ivory-100"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className={mediaUrl ? "grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-x-4 gap-y-6 sm:gap-x-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8" : "max-w-5xl"}>
          <div className="contents">
          {/* Headline — editorial large type */}
          <h1 className={`font-[family-name:var(--font-display)] ${mediaUrl ? "col-start-1 row-start-1 min-w-0 text-[clamp(1.5rem,5vw,2rem)] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem] lg:self-end" : "text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] mb-6 sm:mb-8"} font-extrabold text-ink leading-[1.08] tracking-tight`}>
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
                    className="inline-block mr-[0.25em] text-burgundy-500"
                  >
                    {word}
                  </motion.span>
                ))}
              </>
            )}
          </h1>

          <div className={mediaUrl ? "col-span-2 row-start-2 min-w-0 lg:col-span-1 lg:self-start" : ""}>
          {/* Subheadline */}
          {hero.subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="text-lg sm:text-xl text-ink/65 max-w-2xl mb-8 leading-relaxed font-light"
            >
              {hero.subheadline}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <button
              onClick={() => handleCta("#contact")}
              className="group flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 bg-burgundy-500 hover:bg-burgundy-400 text-ivory-100 font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-burgundy-500/20 active:scale-95 text-[0.8rem] sm:text-[0.85rem] uppercase tracking-wider cursor-pointer"
            >
              {hero.primaryCta?.label ?? t.hero.primaryCta}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => handleCta("#services")}
              className="flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 border border-burgundy-500/40 hover:border-burgundy-500 text-ink/70 hover:text-burgundy-400 font-medium rounded-full transition-all duration-300 hover:bg-ink/[0.02] text-[0.8rem] sm:text-[0.85rem] uppercase tracking-wider cursor-pointer"
            >
              {hero.secondaryCta?.label ?? t.hero.secondaryCta}
            </button>
          </motion.div>

          </div>
          </div>
          {mediaUrl && (
            <figure className="relative col-start-2 row-start-1 self-stretch overflow-hidden min-h-56 w-full lg:row-span-2 lg:min-h-[36rem]">
              {isVideo ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  src={mediaUrl}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={media?.alternativeText || undefined}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediaUrl}
                  alt={media?.alternativeText ?? ""}
                  width={media?.width ?? undefined}
                  height={media?.height ?? undefined}
                  fetchPriority="high"
                  className="hero-portrait absolute inset-0 h-full w-full object-cover object-center"
                />
              )}
            </figure>
          )}
        </div>

          {/* Stats — editorial layout with dividers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-10 sm:mt-12 pt-8 border-t border-burgundy-500/20 grid grid-cols-2 sm:flex sm:flex-wrap gap-y-6 gap-x-4 sm:gap-x-0"
          >
            {data?.stats && data.stats.length > 0
              ? data.stats.map((stat: StatData, i: number) => (
                  <div key={stat.id} className={`flex items-center gap-3 sm:gap-4 sm:pr-10 md:pr-12 ${i > 0 ? "sm:pl-10 md:pl-12 sm:border-l sm:border-ink/15" : ""}`}>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-burgundy-500/[0.08] border border-burgundy-500/15 flex items-center justify-center flex-shrink-0">
                      <StatIcon name={stat.icon} />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl font-extrabold text-ink">{stat.value}</div>
                      <div className="text-[0.6rem] sm:text-[0.7rem] text-ink/65 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                ))
              : t.hero.stats.map((stat, i) => (
                  <div key={i} className={`flex items-center gap-3 sm:gap-4 sm:pr-10 md:pr-12 ${i > 0 ? "sm:pl-10 md:pl-12 sm:border-l sm:border-ink/15" : ""}`}>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-burgundy-500/[0.08] border border-burgundy-500/15 flex items-center justify-center flex-shrink-0">
                      {(() => {
                        const Icon = FALLBACK_STAT_ICONS[i] ?? TrendingUp;
                        return <Icon size={18} className="text-burgundy-400" />;
                      })()}
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl font-extrabold text-ink">{stat.value}</div>
                      <div className="text-[0.6rem] sm:text-[0.7rem] text-ink/65 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                ))}
          </motion.div>
      </div>

    </section>
  );
}
