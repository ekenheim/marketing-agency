"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/useLocale";

export default function Header() {
  const { t, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollLinks = [
    { label: t.header.services, href: "#services" },
    { label: t.header.work, href: "#case-studies" },
    { label: t.header.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.assign(`/${href}`);
    }
  };

  const toggleLocale = () => setLocale(locale === "fr" ? "en" : "fr");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/80 backdrop-blur-xl border-b border-white/[0.04] shadow-2xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-[family-name:var(--font-display)] font-extrabold text-navy-900 text-xl select-none shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow duration-300">
              D
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-[1.35rem] text-white/90 tracking-tight">
              digito<span className="text-amber-500">mara</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative text-white/50 hover:text-amber-400 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <Link
              href="/about"
              className="relative text-white/50 hover:text-amber-400 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 group"
            >
              {t.header.about}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/blog"
              className="relative text-white/50 hover:text-amber-400 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 group"
            >
              {t.header.blog}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/team"
              className="relative text-white/50 hover:text-amber-400 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 group"
            >
              {t.header.team}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Locale toggle */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-widest cursor-pointer"
              >
                <span className={`transition-colors duration-200 ${locale === "fr" ? "text-amber-400" : "text-white/30 hover:text-white/50"}`}>
                  FR
                </span>
                <span className="text-white/10">·</span>
                <span className={`transition-colors duration-200 ${locale === "en" ? "text-amber-400" : "text-white/30 hover:text-white/50"}`}>
                  EN
                </span>
              </button>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold text-[0.8rem] uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95 cursor-pointer"
            >
              {t.header.cta}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-navy-900/95 backdrop-blur-xl border-t border-white/[0.04] px-5 py-5 flex flex-col gap-1">
              {scrollLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3.5 text-white/70 hover:text-amber-400 hover:bg-white/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <Link
                href="/about"
                className="text-left px-4 py-3.5 text-white/70 hover:text-amber-400 hover:bg-white/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors"
              >
                {t.header.about}
              </Link>
              <Link
                href="/blog"
                className="text-left px-4 py-3.5 text-white/70 hover:text-amber-400 hover:bg-white/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors"
              >
                {t.header.blog}
              </Link>
              <Link
                href="/team"
                className="text-left px-4 py-3.5 text-white/70 hover:text-amber-400 hover:bg-white/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors"
              >
                {t.header.team}
              </Link>
              <button
                onClick={toggleLocale}
                className="text-left px-4 py-3.5 text-white/70 hover:text-amber-400 hover:bg-white/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                {locale === "fr" ? "English" : "Français"}
              </button>
              <div className="editorial-line my-2" />
              <button
                onClick={() => handleNavClick("#contact")}
                className="mt-1 px-4 py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold text-sm rounded-xl transition-colors cursor-pointer w-full text-center tracking-wide"
              >
                {t.header.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
