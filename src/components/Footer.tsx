"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, ArrowUp } from "lucide-react";
import type { GlobalData } from "@/types/strapi";

const scrollLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

interface Props {
  globalData: GlobalData | null;
}

export default function Footer({ globalData }: Props) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <button onClick={scrollTop} className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-black text-navy-900 text-lg">
                D
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                digito<span className="text-amber-500">mara</span>
              </span>
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {globalData?.tagline ??
                "Helping Moroccan brands attract high-value clients and scale with data-driven digital growth."}
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {globalData?.instagramUrl && (
                <a
                  href={globalData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 hover:border-amber-500/40 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {globalData?.linkedinUrl && (
                <a
                  href={globalData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/10 hover:border-amber-500/40 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {globalData?.email && (
                <a
                  href={`mailto:${globalData.email}`}
                  className="w-9 h-9 rounded-lg border border-white/10 hover:border-amber-500/40 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {scrollLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-slate-400 hover:text-amber-400 text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/team"
                  className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                >
                  Team
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              {globalData?.email && (
                <li>
                  <a
                    href={`mailto:${globalData.email}`}
                    className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {globalData.email}
                  </a>
                </li>
              )}
              {globalData?.phone && (
                <li>
                  <a
                    href={`tel:${globalData.phone}`}
                    className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {globalData.phone}
                  </a>
                </li>
              )}
              <li className="text-slate-500 text-sm">
                {globalData?.location ?? "Casablanca, Morocco"}
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()}{" "}
            {globalData?.siteName ?? "Digitomara"}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-600 text-xs">Privacy Policy</span>
            <span className="text-slate-600 text-xs">Terms of Service</span>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg border border-white/10 hover:border-amber-500/40 flex items-center justify-center text-slate-500 hover:text-amber-400 transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
