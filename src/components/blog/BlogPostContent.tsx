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
    <section className="py-24 bg-navy-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm font-medium transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>

          {/* Category badge */}
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-500 bg-amber-500/10 rounded-full mb-5">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-10 pb-8 border-b border-white/5">
            <span className="flex items-center gap-1.5">
              <User size={15} />
              {post.author}
              <span className="text-slate-600 ml-1">{post.authorRole}</span>
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

          {/* Content */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-slate-300 text-base sm:text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA card */}
          <div className="mt-14 p-8 bg-navy-800/60 border border-white/5 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-3">
              Ready to apply these strategies?
            </h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Let our team help you implement what you&apos;ve learned. Get a
              free consultation on your digital growth strategy.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold text-sm rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Start a project
            </Link>
          </div>

          {/* Bottom back link */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm font-medium transition-colors duration-200"
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
