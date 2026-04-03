export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { strapiGet } from "@/lib/strapi";
import { getLocale } from "@/i18n/getLocale";
import type { StrapiResponse, GlobalData } from "@/types/strapi";
import Header from "@/components/Header";
import BlogPostContent from "@/components/blog/BlogPostContent";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blog-posts";

function resolveUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.STRAPI_PUBLIC_URL ?? ""}${url}`;
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

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Post Not Found | Digitomara" };
  }
  return {
    title: `${post.title} | Digitomara`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const locale = await getLocale();
  const globalData = await fetchGlobal(locale);

  return (
    <main>
      <Header />
      <div className="pt-24">
        <BlogPostContent post={post} />
      </div>
      <Footer globalData={globalData} />
    </main>
  );
}
