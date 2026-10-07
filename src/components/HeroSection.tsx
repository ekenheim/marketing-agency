"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Globe2, Users, Gem } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { HeroData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

const FALLBACK_STAT_ICONS = [Award, Globe2, Users, Gem];

type IconComponent = React.ComponentType<LucideProps>;

function StatIcon({ name, index }: { name?: string; index: number }) {
  const Icon = (name && (LucideIcons as unknown as Record<string, IconComponent>)[name.trim()])
    || FALLBACK_STAT_ICONS[index % FALLBACK_STAT_ICONS.length];
  return <Icon aria-hidden="true" strokeWidth={1.4} className="h-6 w-6 shrink-0 text-burgundy-500 sm:h-7 sm:w-7" />;
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
  const pillars: { label: string; icon?: string }[] = (data?.stats?.length ? data.stats : t.hero.stats).filter((stat) => stat.label?.trim());
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
      className="relative min-h-[36rem] overflow-hidden bg-ivory-100"
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

      </div>
      {pillars.length > 0 && (
        <div className="border-y border-burgundy-500/15 bg-ivory-50/70">
          <ul className="hero-pillars mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:flex lg:items-center lg:justify-between lg:px-10">
            {pillars.map((pillar, index) => (
              <li key={index} className="hero-pillar flex min-w-0 items-center gap-3 py-5 sm:py-7 lg:gap-3">
                <StatIcon name={pillar.icon} index={index} />
                <span className="text-[0.65rem] leading-relaxed font-medium uppercase tracking-[0.08em] text-ink sm:text-xs lg:whitespace-nowrap lg:text-[0.65rem] xl:text-xs">{pillar.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
}
