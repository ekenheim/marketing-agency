"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/useLocale";

export default function Header({ showAbout = false }: { showAbout?: boolean }) {
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

  const toggleLocale = () => setLocale(locale === "fr" ? "en" : "fr");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory-200/80 backdrop-blur-xl border-b border-ink/10 shadow-2xl shadow-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-burgundy-500 to-burgundy-600 flex items-center justify-center font-[family-name:var(--font-display)] font-extrabold text-ivory-100 text-xl select-none shadow-lg shadow-burgundy-500/20 group-hover:shadow-burgundy-500/40 transition-shadow duration-300">
              D
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-[1.35rem] text-ink/90 tracking-tight">
              digito<span className="text-burgundy-500">mara</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {scrollLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${link.href}`}
                onClick={() => setMenuOpen(false)}
                className="relative text-ink/65 hover:text-burgundy-400 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-burgundy-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            {showAbout && (<Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="relative text-ink/65 hover:text-burgundy-400 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 group"
            >
              {t.header.about}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-burgundy-500 group-hover:w-full transition-all duration-300" />
            </Link>)}
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="relative text-ink/65 hover:text-burgundy-400 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 group"
            >
              {t.header.blog}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-burgundy-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/team"
              onClick={() => setMenuOpen(false)}
              className="relative text-ink/65 hover:text-burgundy-400 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 group"
            >
              {t.header.team}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-burgundy-500 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Locale toggle */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-widest cursor-pointer"
              >
                <span className={`transition-colors duration-200 ${locale === "fr" ? "text-burgundy-400" : "text-ink/65 hover:text-ink/65"}`}>
                  FR
                </span>
                <span className="text-ink/65">·</span>
                <span className={`transition-colors duration-200 ${locale === "en" ? "text-burgundy-400" : "text-ink/65 hover:text-ink/65"}`}>
                  EN
                </span>
              </button>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2.5 bg-burgundy-500 hover:bg-burgundy-400 text-ivory-100 font-semibold text-[0.8rem] uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-burgundy-500/25 active:scale-95 cursor-pointer"
            >
              {t.header.cta}
            </Link>
          </div>

          {/* Mobile Locale Toggle */}
          <button
            onClick={toggleLocale}
            className="md:hidden flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-widest cursor-pointer"
          >
            <span className={`transition-colors duration-200 ${locale === "fr" ? "text-burgundy-400" : "text-ink/65"}`}>
              FR
            </span>
            <span className="text-ink/65">·</span>
            <span className={`transition-colors duration-200 ${locale === "en" ? "text-burgundy-400" : "text-ink/65"}`}>
              EN
            </span>
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-xl text-ink/65 hover:text-ink hover:bg-ink/5 transition-all"
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
            <div className="bg-ivory-200/95 backdrop-blur-xl border-t border-ink/10 px-5 py-5 flex flex-col gap-1">
              {scrollLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-left px-4 py-3.5 text-ink/70 hover:text-burgundy-400 hover:bg-ink/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
              {showAbout && (<Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-left px-4 py-3.5 text-ink/70 hover:text-burgundy-400 hover:bg-ink/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors"
              >
                {t.header.about}
              </Link>)}
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="text-left px-4 py-3.5 text-ink/70 hover:text-burgundy-400 hover:bg-ink/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors"
              >
                {t.header.blog}
              </Link>
              <Link
                href="/team"
                onClick={() => setMenuOpen(false)}
                className="text-left px-4 py-3.5 text-ink/70 hover:text-burgundy-400 hover:bg-ink/[0.03] rounded-xl text-sm font-medium tracking-wide transition-colors"
              >
                {t.header.team}
              </Link>
              <div className="editorial-line my-2" />
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-1 px-4 py-3.5 bg-burgundy-500 hover:bg-burgundy-400 text-ivory-100 font-semibold text-sm rounded-xl transition-colors cursor-pointer w-full text-center tracking-wide"
              >
                {t.header.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
