"use client";

import Header from "@/components/Header";
import { useLocale } from "@/i18n/useLocale";

export default function Loading() {
  const { locale } = useLocale();
  return (
    <main>
      <Header />
      <div role="status" aria-live="polite" className="mx-auto min-h-screen max-w-7xl px-5 pt-40 sm:px-8 lg:px-10">
        <p className="mb-8 text-sm text-amber-400">{locale === "fr" ? "Chargement…" : "Loading…"}</p>
        <div aria-hidden="true" className="space-y-6 motion-safe:animate-pulse">
          <div className="h-12 w-3/4 rounded-lg bg-navy-700" />
          <div className="h-5 w-1/2 rounded bg-navy-800" />
          <div className="grid gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => <div key={item} className="h-60 rounded-2xl bg-navy-800" />)}
          </div>
        </div>
      </div>
    </main>
  );
}
