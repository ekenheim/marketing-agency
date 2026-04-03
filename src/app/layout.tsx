import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LocaleProvider from "@/i18n/LocaleProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LOCALE_COOKIE, DEFAULT_LOCALE, type Locale } from "@/i18n/locale";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Digitomara — Data-driven digital growth for Moroccan brands",
    template: "%s | Digitomara",
  },
  description:
    "Digitomara helps Moroccan brands attract high-value clients and scale with data-driven digital growth strategies — performance marketing, SEO, and more.",
  keywords: [
    "digital marketing Morocco",
    "performance marketing Casablanca",
    "SEO Morocco",
    "digital agency Morocco",
    "growth marketing MENA",
  ],
  authors: [{ name: "Digitomara" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digitomara",
    title: "Digitomara — Data-driven digital growth for Moroccan brands",
    description:
      "Helping Moroccan brands attract high-value clients and scale with data-driven digital growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitomara — Data-driven digital growth for Moroccan brands",
    description:
      "Helping Moroccan brands attract high-value clients and scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get(LOCALE_COOKIE)?.value ?? DEFAULT_LOCALE) as Locale;

  return (
    <html lang={locale} className={`scroll-smooth ${display.variable} ${body.variable}`}>
      <body className="antialiased font-[family-name:var(--font-body)]" suppressHydrationWarning>
        <LocaleProvider locale={locale}>
          {children}
          <WhatsAppButton />
        </LocaleProvider>
      </body>
      <Script
        src="https://rybbit.ekenhome.se/api/script.js"
        data-site-id="0efa8759375c"
        strategy="afterInteractive"
      />
    </html>
  );
}
