export const dynamic = "force-dynamic";

import { strapiGet } from "@/lib/strapi";
import type { StrapiResponse, GlobalData } from "@/types/strapi";
import Header from "@/components/Header";
import BlogListingSection from "@/components/blog/BlogListingSection";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blog-posts";

export const metadata = {
  title: "Blog | Digitomara",
  description:
    "Digital marketing insights, guides, and strategies for Moroccan businesses.",
};

function resolveUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.STRAPI_PUBLIC_URL ?? ""}${url}`;
}

async function fetchGlobal() {
  try {
    const res = await strapiGet<StrapiResponse<GlobalData>>(
      "/global?populate=*"
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

export default async function BlogPage() {
  const globalData = await fetchGlobal();

  return (
    <main>
      <Header />
      <div className="pt-24">
        <BlogListingSection posts={BLOG_POSTS} />
      </div>
      <Footer globalData={globalData} />
    </main>
  );
}
