"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Linkedin, Mail, ArrowUp } from "lucide-react";
import type { GlobalData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

interface Props {
  globalData: GlobalData | null;
}

export default function Footer({ globalData }: Props) {
  const { t } = useLocale();

  const scrollLinks = [
    { label: t.header.services, href: "#services" },
    { label: t.header.work, href: "#case-studies" },
    { label: t.header.contact, href: "#contact" },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.assign(`/${href}`);
    }
  };

  return (
    <footer className="bg-navy-950 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-14"
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <button onClick={scrollTop} className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-[family-name:var(--font-display)] font-extrabold text-navy-900 text-xl shadow-lg shadow-amber-500/15">
                D
              </div>
              <span className="font-[family-name:var(--font-display)] font-bold text-[1.35rem] text-white/90 tracking-tight">
                digito<span className="text-amber-500">mara</span>
              </span>
            </button>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs font-light">
              {globalData?.tagline ??
                "We help Moroccan brands get more clients and grow online. That's it."}
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-7">
              {globalData?.instagramUrl && (
                <a
                  href={globalData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/[0.06] hover:border-amber-500/25 flex items-center justify-center text-white/25 hover:text-amber-400 transition-all duration-300"
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
                  className="w-10 h-10 rounded-xl border border-white/[0.06] hover:border-amber-500/25 flex items-center justify-center text-white/25 hover:text-amber-400 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {globalData?.email && (
                <a
                  href={`mailto:${globalData.email}`}
                  className="w-10 h-10 rounded-xl border border-white/[0.06] hover:border-amber-500/25 flex items-center justify-center text-white/25 hover:text-amber-400 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/50 font-semibold text-[0.7rem] uppercase tracking-[0.2em] mb-6">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3.5">
              {scrollLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 cursor-pointer font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link href="/about" className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 font-light">
                  {t.header.about}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 font-light">
                  {t.header.blog}
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 font-light">
                  {t.header.team}
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white/50 font-semibold text-[0.7rem] uppercase tracking-[0.2em] mb-6">
              {t.footer.industries}
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/industries/hospitality" className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 font-light">
                  {t.footer.hospitality}
                </Link>
              </li>
              <li>
                <Link href="/industries/ecommerce" className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 font-light">
                  {t.footer.ecommerce}
                </Link>
              </li>
              <li>
                <Link href="/industries/b2b" className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 font-light">
                  {t.footer.b2b}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/50 font-semibold text-[0.7rem] uppercase tracking-[0.2em] mb-6">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3.5">
              {globalData?.email && (
                <li>
                  <a
                    href={`mailto:${globalData.email}`}
                    className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 font-light"
                  >
                    {globalData.email}
                  </a>
                </li>
              )}
              {globalData?.phone && (
                <li>
                  <a
                    href={`tel:${globalData.phone}`}
                    className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300 font-light"
                  >
                    {globalData.phone}
                  </a>
                </li>
              )}
              <li className="text-white/20 text-sm font-light">
                {globalData?.location ?? "Casablanca, Morocco"}
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="editorial-line mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[0.75rem] font-light">
            © {new Date().getFullYear()}{" "}
            {globalData?.siteName ?? "Digitomara"}. {t.footer.allRights}
          </p>
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="text-white/15 text-[0.65rem] sm:text-[0.7rem] font-light hover:text-white/30 transition-colors cursor-pointer">{t.footer.privacyPolicy}</span>
            <span className="text-white/15 text-[0.65rem] sm:text-[0.7rem] font-light hover:text-white/30 transition-colors cursor-pointer">{t.footer.termsOfService}</span>
            <button
              onClick={scrollTop}
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl border border-white/[0.06] hover:border-amber-500/25 flex items-center justify-center text-white/25 hover:text-amber-400 transition-all duration-300 cursor-pointer flex-shrink-0"
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
