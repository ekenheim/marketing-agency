"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-black text-navy-900 text-lg select-none">
              D
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              digito<span className="text-amber-500">mara</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/about"
              className="text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors duration-200"
            >
              {t.header.about}
            </Link>
            <Link
              href="/blog"
              className="text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors duration-200"
            >
              {t.header.blog}
            </Link>
            <Link
              href="/team"
              className="text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors duration-200"
            >
              {t.header.team}
            </Link>

            {/* Locale toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 text-xs font-semibold tracking-wide cursor-pointer"
            >
              <span className={locale === "fr" ? "text-amber-400" : "text-slate-500 hover:text-slate-300"}>
                FR
              </span>
              <span className="text-slate-600">|</span>
              <span className={locale === "en" ? "text-amber-400" : "text-slate-500 hover:text-slate-300"}>
                EN
              </span>
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold text-sm rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {t.header.cta}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-navy-900/98 backdrop-blur-md border-t border-white/5 px-4 py-4 flex flex-col gap-2">
          {scrollLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-3 text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/about"
            className="text-left px-4 py-3 text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
          >
            {t.header.about}
          </Link>
          <Link
            href="/blog"
            className="text-left px-4 py-3 text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
          >
            {t.header.blog}
          </Link>
          <Link
            href="/team"
            className="text-left px-4 py-3 text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
          >
            {t.header.team}
          </Link>
          {/* Mobile locale toggle */}
          <button
            onClick={toggleLocale}
            className="text-left px-4 py-3 text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            {locale === "fr" ? "English" : "Français"}
          </button>
          <button
            onClick={() => handleNavClick("#contact")}
            className="mt-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-navy-900 font-semibold text-sm rounded-lg transition-colors cursor-pointer w-full text-center"
          >
            {t.header.cta}
          </button>
        </div>
      </div>
    </header>
  );
}
