import { Suspense } from "react";
import HeaderClient from "./HeaderClient";
import { getAboutPage, isAboutVisible } from "@/lib/about";
import { getLocale } from "@/i18n/getLocale";

async function Navigation() {
  const about = await getAboutPage(await getLocale());
  return <HeaderClient showAbout={isAboutVisible(about)} />;
}

export default function Header() {
  return <Suspense fallback={<HeaderClient />}><Navigation /></Suspense>;
}
