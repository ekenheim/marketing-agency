"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { IntroductionData } from "@/types/strapi";

export default function IntroductionSection({ data }: { data: IntroductionData | null }) {
  const reduceMotion = useReducedMotion();
  const headline = data?.headline?.trim();
  const introduction = data?.introduction?.trim();
  const whyText = data?.whyText?.trim();

  // Unpublished, disabled, or empty content must not leave a blank section.
  if (!data || data.enabled === false || !headline || (!introduction && !whyText)) {
    return null;
  }

  return (
    <section id="introduction" aria-labelledby="introduction-title" className="bg-navy-950 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 h-px bg-amber-500/25 sm:mb-14" />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className={`grid min-w-0 gap-10 lg:gap-20 ${data.image?.url ? "md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" : "max-w-3xl"}`}
        >
          {data.image?.url && (
            <figure className="min-w-0">
              <div className="aspect-[4/5] overflow-hidden bg-navy-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.image.url}
                  alt={data.image.alternativeText ?? data.name ?? ""}
                  width={data.image.width || 800}
                  height={data.image.height || 1000}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              {(data.name || data.role) && (
                <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-white/10 pt-4 text-sm break-words">
                  {data.name && <span className="font-semibold text-white/90">{data.name}</span>}
                  {data.role && <span className="text-white/60">{data.role}</span>}
                </figcaption>
              )}
            </figure>
          )}
          <div className="min-w-0 self-center break-words">
            {data.label && (
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">{data.label}</p>
            )}
            <h2 id="introduction-title" className="mb-7 font-[family-name:var(--font-display)] text-3xl leading-[1.1] font-extrabold tracking-tight text-white/95 sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
            {introduction && <p className="whitespace-pre-line text-lg leading-relaxed font-light text-white/75">{introduction}</p>}
            {whyText && (
              <div className="mt-8 border-l-2 border-amber-500/60 pl-5 sm:pl-6">
                {data.whyTitle && <h3 className="mb-3 font-[family-name:var(--font-display)] text-xl font-semibold text-amber-300">{data.whyTitle}</h3>}
                <p className="whitespace-pre-line text-base leading-relaxed text-white/65">{whyText}</p>
              </div>
            )}
            {!data.image?.url && (data.name || data.role) && (
              <p className="mt-8 text-sm text-white/65">
                {data.name && <span className="font-semibold text-white/90">{data.name}</span>}
                {data.name && data.role && " · "}
                {data.role}
              </p>
            )}
            {data.contactLabel?.trim() && (
              <a href="#contact" className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-amber-500/50 py-2 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300">
                {data.contactLabel}<ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
