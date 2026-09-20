"use client";

import { motion, type Variants } from "framer-motion";
import { Clock, User, Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogPostData, GlobalData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface Props {
  posts: BlogPostData[] | null;
  globalData: GlobalData | null;
}

export default function BlogListingSection({ posts, globalData }: Props) {
  const { locale } = useLocale();
  const french = locale === "fr";
  const label = globalData?.blogSectionLabel ?? (french ? "Le blog" : "Insights");
  const title = globalData?.blogSectionTitle?.trim() || (french ? "Conseils pour votre croissance digitale" : "Digital growth insights");
  const subtitle = globalData?.blogSectionSubtitle ?? (french ? "Des guides pratiques et des stratégies pour développer votre entreprise en ligne." : "Practical guides and strategies for Moroccan businesses looking to scale digitally.");
  return (
    <section className="py-28 bg-navy-900 relative overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em] mb-5">
            {label}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 mb-5 leading-tight">
            {title}
          </h2>
          <p className="text-white/35 text-lg max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </motion.div>

        {(!posts || posts.length === 0) && (
          <p role="status" className="py-12 text-center text-white/65">
            {posts === null
              ? (french ? "Les articles sont temporairement indisponibles. Veuillez réessayer dans quelques instants." : "Articles are temporarily unavailable. Please try again in a few moments.")
              : (french ? "De nouveaux articles arrivent bientôt." : "New articles are coming soon.")}
          </p>
        )}
        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {(posts ?? []).map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link href={`/blog/${encodeURIComponent(post.slug ?? "")}`} className="block group">
                <article className="bg-navy-800/50 border border-white/[0.04] hover:border-amber-500/20 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1">
                  {post.coverImage?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverImage.url} alt={post.coverImage.alternativeText ?? ""} width={post.coverImage.width || 1200} height={post.coverImage.height || 675} loading="lazy" className="mb-6 aspect-video w-full rounded-xl object-cover" />
                  )}
                  {post.category && <span className="inline-block px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-500 bg-amber-500/[0.06] border border-amber-500/10 rounded-lg mb-5">
                    {post.category}
                  </span>}

                  <h3 className="font-[family-name:var(--font-display)] text-white/90 font-bold text-lg sm:text-xl mb-3 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-white/30 text-sm leading-relaxed line-clamp-3 mb-6 font-light">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-white/25 text-[0.7rem]">
                    {post.author && <span className="flex items-center gap-1.5">
                      <User size={12} />
                      {post.author}
                    </span>}
                    {post.readingTime != null && post.readingTime > 0 && <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readingTime} {french ? "min de lecture" : "min read"}
                    </span>}
                    {post.publishedAt && Number.isFinite(Date.parse(post.publishedAt)) && <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(post.publishedAt, locale)}
                    </span>}
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
