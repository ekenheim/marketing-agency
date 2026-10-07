import { Suspense } from "react";
import FooterClient from "./FooterClient";
import { getAboutPage, isAboutVisible } from "@/lib/about";
import { getLocale } from "@/i18n/getLocale";
import type { GlobalData } from "@/types/strapi";

async function Navigation(props: { globalData: GlobalData | null }) {
  const about = await getAboutPage(await getLocale());
  return <FooterClient {...props} showAbout={isAboutVisible(about)} />;
}

export default function Footer(props: { globalData: GlobalData | null }) {
  return <Suspense fallback={<FooterClient {...props} />}><Navigation {...props} /></Suspense>;
}
