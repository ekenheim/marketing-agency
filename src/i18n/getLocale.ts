import "server-only";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, DEFAULT_LOCALE, type Locale } from "./locale";

/** Read the current locale from cookies (server-side only). */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return (cookieStore.get(LOCALE_COOKIE)?.value ?? DEFAULT_LOCALE) as Locale;
}
