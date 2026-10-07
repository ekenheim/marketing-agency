"use client";

import { createElement, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { AboutBlock, AboutPageData } from "@/types/strapi";

function blocks(nodes: AboutBlock[] | undefined, mediaBase: string): ReactNode {
  if (!Array.isArray(nodes)) return null;
  return nodes.map((node, index) => {
    if (node.type === "text") {
      let text: ReactNode = node.text ?? "";
      if (node.bold) text = <strong>{text}</strong>;
      if (node.italic) text = <em>{text}</em>;
      if (node.underline) text = <u>{text}</u>;
      if (node.strikethrough) text = <s>{text}</s>;
      if (node.code) text = <code className="rounded bg-burgundy-500/5 px-1">{text}</code>;
      return <span key={index}>{text}</span>;
    }
    const children = blocks(node.children, mediaBase);
    switch (node.type) {
      case "image": {
        const source = node.image?.url ?? "";
        const url = source.startsWith("/") && !source.startsWith("//") ? `${mediaBase}${source}` : source;
        if (!/^https?:\/\//i.test(url)) return null;
        // eslint-disable-next-line @next/next/no-img-element
        return <img key={index} src={url} alt={node.image?.alternativeText ?? ""} loading="lazy" className="my-8 h-auto max-w-full rounded-xl" />;
      }
      case "heading":
        return createElement(`h${Math.max(2, Math.min(6, node.level ?? 2))}`, {
          key: index, className: "mt-10 mb-4 text-2xl sm:text-3xl font-bold text-burgundy-500",
        }, children);
      case "list":
        return createElement(node.format === "ordered" ? "ol" : "ul", {
          key: index, className: `my-5 pl-6 space-y-2 ${node.format === "ordered" ? "list-decimal" : "list-disc"}`,
        }, children);
      case "list-item": return <li key={index}>{children}</li>;
      case "quote": return <blockquote key={index} className="my-6 border-l-2 border-burgundy-500 pl-6 italic">{children}</blockquote>;
      case "code": return <pre key={index} className="my-6 overflow-x-auto rounded-xl bg-ivory-200 p-5"><code>{children}</code></pre>;
      case "link": {
        const url = node.url?.trim() ?? "";
        const safe = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(url);
        return safe ? <a key={index} href={url} className="text-burgundy-500 underline underline-offset-4">{children}</a> : <span key={index}>{children}</span>;
      }
      default: return <p key={index} className="my-5 whitespace-pre-wrap">{children}</p>;
    }
  });
}

export default function AboutContent({ page, mediaBase }: { page: AboutPageData; mediaBase: string }) {
  return (
    <motion.article initial={{ y: 12 }} whileInView={{ y: 0 }} viewport={{ once: true }}
      className="mx-auto max-w-4xl px-5 sm:px-8 pt-32 pb-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-ink">{page.title}</h1>
      {page.description && <p className="mt-6 text-xl leading-relaxed text-ink/75 whitespace-pre-line">{page.description}</p>}
      <div className="mt-10 border-t border-burgundy-500/20 pt-4 text-lg leading-relaxed text-ink/80">{blocks(page.content ?? undefined, mediaBase)}</div>
    </motion.article>
  );
}
