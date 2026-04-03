export const dynamic = "force-dynamic";

import { strapiGet } from "@/lib/strapi";
import { getLocale } from "@/i18n/getLocale";
import type { StrapiListResponse, StrapiResponse, TeamMemberData, GlobalData } from "@/types/strapi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";

function resolveUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.STRAPI_PUBLIC_URL ?? ""}${url}`;
}

async function fetchTeam(locale: string) {
  try {
    const res = await strapiGet<StrapiListResponse<TeamMemberData>>(
      "/team-members?sort=order:asc&populate=*",
      locale,
    );
    return res.data.map((m) => ({
      ...m,
      photo: m.photo ? { ...m.photo, url: resolveUrl(m.photo.url) } : null,
    }));
  } catch {
    return null;
  }
}

async function fetchGlobal(locale: string) {
  try {
    const res = await strapiGet<StrapiResponse<GlobalData>>(
      "/global?populate=*",
      locale,
    );
    const global = res.data ?? null;
    if (global?.logo?.url) {
      global.logo.url = resolveUrl(global.logo.url);
    }
    return global;
  } catch {
    return null;
  }
}

export default async function TeamPage() {
  const locale = await getLocale();
  const [team, globalData] = await Promise.all([fetchTeam(locale), fetchGlobal(locale)]);

  return (
    <main>
      <Header />
      <div className="pt-24">
        <TeamSection team={team} />
      </div>
      <Footer globalData={globalData} />
    </main>
  );
}
