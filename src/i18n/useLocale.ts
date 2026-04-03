"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./locale";
import type { Dictionary } from "./dictionaries";

export interface LocaleContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (l: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
