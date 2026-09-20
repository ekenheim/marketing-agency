import "server-only";

import { cache } from "react";
import { strapiGet } from "@/lib/strapi";
import type { BlogPostData, StrapiListResponse } from "@/types/strapi";

function resolvePost(post: BlogPostData): BlogPostData {
  const image = post.coverImage;
  return {
    ...post,
    coverImage: image?.url
      ? {
          ...image,
          url: image.url.startsWith("http")
            ? image.url
            : `${process.env.STRAPI_PUBLIC_URL ?? ""}${image.url}`,
        }
      : null,
  };
}

// Fetch every page so posts don't silently disappear at Strapi's default limit.
export async function fetchBlogPosts(locale: string): Promise<BlogPostData[] | null> {
  try {
    const posts: BlogPostData[] = [];
    let page = 1;
    let pageCount = 1;
    do {
      const res = await strapiGet<StrapiListResponse<BlogPostData>>(
        `/blog-posts?status=published&sort=publishedAt:desc&populate=coverImage&pagination[page]=${page}&pagination[pageSize]=100`,
        locale,
      );
      posts.push(...res.data.filter((post) => post.title?.trim() && post.slug?.trim()).map(resolvePost));
      pageCount = res.meta?.pagination?.pageCount ?? 1;
      page += 1;
    } while (page <= pageCount);
    return posts;
  } catch {
    return null;
  }
}

// Share the same request between page content and metadata.
export const fetchBlogPost = cache(async (slug: string, locale: string) => {
  try {
    const res = await strapiGet<StrapiListResponse<BlogPostData>>(
      `/blog-posts?status=published&filters[slug][$eq]=${encodeURIComponent(slug)}&populate=coverImage&pagination[pageSize]=1`,
      locale,
    );
    const post = res.data[0];
    return { post: post?.title?.trim() ? resolvePost(post) : null, unavailable: false };
  } catch {
    return { post: null, unavailable: true };
  }
});
