import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
