export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { strapiGet } from "@/lib/strapi";
import { getLocale } from "@/i18n/getLocale";
import type { StrapiResponse, GlobalData } from "@/types/strapi";
import Header from "@/components/Header";
import BlogPostContent from "@/components/blog/BlogPostContent";
import Footer from "@/components/Footer";
import { fetchBlogPost } from "@/lib/blog";
import Link from "next/link";

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
  const { post, unavailable } = await fetchBlogPost(slug, await getLocale());
  if (!post) {
    return { title: unavailable ? "Article Unavailable" : "Post Not Found", robots: { index: false } };
  }
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const { post, unavailable } = await fetchBlogPost(slug, locale);

  if (!post && !unavailable) {
    notFound();
  }

  const globalData = await fetchGlobal(locale);

  return (
    <main>
      <Header />
      <div className="pt-24">
        {post ? <BlogPostContent post={post} /> : (
          <section className="mx-auto max-w-3xl px-5 py-28 text-center">
            <h1 className="mb-6 text-3xl font-bold">{locale === "fr" ? "Article temporairement indisponible" : "Article temporarily unavailable"}</h1>
            <p className="mb-8 text-white/65">{locale === "fr" ? "Veuillez réessayer dans quelques instants." : "Please try again in a few moments."}</p>
            <Link href="/blog" className="text-amber-400">{locale === "fr" ? "Retour au blog" : "Back to blog"}</Link>
          </section>
        )}
      </div>
      <Footer globalData={globalData} />
    </main>
  );
}
