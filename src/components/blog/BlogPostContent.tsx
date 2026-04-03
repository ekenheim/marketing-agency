"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogPostData } from "@/data/blog-posts";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  post: BlogPostData;
}

export default function BlogPostContent({ post }: Props) {
  const paragraphs = post.content
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <section className="py-28 bg-navy-900">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/30 hover:text-amber-400 text-sm font-medium transition-colors duration-300 mb-10"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>

          <span className="inline-block px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-500 bg-amber-500/[0.06] border border-amber-500/10 rounded-lg mb-6">
            {post.category}
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold text-white/95 mb-7 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/30 text-sm mb-12 pb-8 border-b border-white/[0.04]">
            <span className="flex items-center gap-1.5">
              <User size={15} />
              {post.author}
              <span className="text-white/15 ml-1">{post.authorRole}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-white/50 text-base sm:text-lg leading-relaxed font-light"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 p-10 bg-navy-800/50 border border-white/[0.04] rounded-2xl text-center">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white/90 mb-3">
              Ready to apply these strategies?
            </h3>
            <p className="text-white/30 text-sm mb-7 max-w-md mx-auto font-light">
              Let our team help you implement what you&apos;ve learned. Get a
              free consultation on your digital growth strategy.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold text-[0.8rem] uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
            >
              Start a project
            </Link>
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.04]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/30 hover:text-amber-400 text-sm font-medium transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              Back to all articles
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
