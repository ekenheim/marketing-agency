"use client";

import { motion, type Variants } from "framer-motion";
import { Clock, User, Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogPostData } from "@/data/blog-posts";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface Props {
  posts: BlogPostData[];
}

export default function BlogListingSection({ posts }: Props) {
  return (
    <section className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Insights
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
            Digital growth{" "}
            <span className="text-amber-500">insights</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Practical guides and strategies for Moroccan businesses looking to
            scale digitally.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <article className="bg-navy-800/40 border border-white/5 hover:border-amber-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                  {/* Category badge */}
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-500 bg-amber-500/10 rounded-full mb-4">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-3 group-hover:text-amber-400 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 text-xs">
                    <span className="flex items-center gap-1.5">
                      <User size={13} />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {post.readingTime} min read
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
