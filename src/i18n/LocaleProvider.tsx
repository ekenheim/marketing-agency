"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { Locale } from "./locale";
import { LOCALE_COOKIE } from "./locale";
import { dictionaries } from "./dictionaries";
import { LocaleContext } from "./useLocale";

export default function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const setLocale = useCallback(
    (l: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;SameSite=Lax`;
      router.refresh();
    },
    [router],
  );

  return (
    <LocaleContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
