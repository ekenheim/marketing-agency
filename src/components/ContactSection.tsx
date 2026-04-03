"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import type { GlobalData, ServiceData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

type ContactForm = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
};

interface Props {
  globalData: GlobalData | null;
  services: ServiceData[] | null;
}

export default function ContactSection({ globalData, services }: Props) {
  const { t } = useLocale();

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t.contact.formValidation.nameMin),
        email: z.string().email(t.contact.formValidation.emailInvalid),
        company: z.string().optional(),
        service: z.string().optional(),
        message: z.string().min(10, t.contact.formValidation.messageMin),
      }),
    [t],
  );

  const serviceOptions =
    services && services.length > 0
      ? [...services.map((s) => s.title), t.contact.notSureYet]
      : [...t.services.items.map((s) => s.title), t.contact.notSureYet];

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-navy-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
            {t.contact.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
            {t.contact.title}{" "}
            <span className="text-amber-400">{t.contact.titleAccent}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-white font-bold text-xl mb-2">{t.contact.talkTitle}</h3>
              <p className="text-slate-400 leading-relaxed">
                {t.contact.talkDescription}
              </p>
            </div>

            <div className="space-y-4">
              {globalData?.email && (
                <a
                  href={`mailto:${globalData.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Mail size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Email</div>
                    <div className="text-slate-200 group-hover:text-amber-400 transition-colors text-sm">
                      {globalData.email}
                    </div>
                  </div>
                </a>
              )}
              {globalData?.phone && (
                <a
                  href={`tel:${globalData.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Phone size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Phone</div>
                    <div className="text-slate-200 group-hover:text-amber-400 transition-colors text-sm">
                      {globalData.phone}
                    </div>
                  </div>
                </a>
              )}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Based in</div>
                  <div className="text-slate-200 text-sm">
                    {globalData?.location ?? "Casablanca, Morocco"}
                  </div>
                </div>
              </div>
            </div>

            {/* Response time promise */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm leading-relaxed">
                  <strong className="text-amber-400">{t.contact.responseTitle}</strong>{" "}
                  {t.contact.responseDetail}
                </p>
              </div>
            </div>

            {/* Free audit highlight */}
            <div className="p-4 bg-navy-800/60 border border-white/5 rounded-xl">
              <div className="flex items-start gap-3">
                <Sparkles size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{t.contact.auditHighlight}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t.contact.auditDescription}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-navy-800/40 border border-white/5 rounded-2xl p-5 sm:p-7 md:p-9">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">{t.contact.successTitle}</h3>
                  <p className="text-slate-400 mb-6">{t.contact.successMessage}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 border border-white/15 rounded-lg text-slate-300 hover:text-white hover:border-white/30 text-sm transition-colors cursor-pointer"
                  >
                    {t.contact.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t.contact.formLabels.name} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register("name")}
                        placeholder={t.contact.formPlaceholders.name}
                        className={`w-full px-4 py-3 bg-navy-900/60 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                          errors.name
                            ? "border-red-500/60"
                            : "border-white/10 focus:border-amber-500/40"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t.contact.formLabels.email} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder={t.contact.formPlaceholders.email}
                        className={`w-full px-4 py-3 bg-navy-900/60 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors ${
                          errors.email
                            ? "border-red-500/60"
                            : "border-white/10 focus:border-amber-500/40"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t.contact.formLabels.company}
                      </label>
                      <input
                        {...register("company")}
                        placeholder={t.contact.formPlaceholders.company}
                        className="w-full px-4 py-3 bg-navy-900/60 border border-white/10 focus:border-amber-500/40 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t.contact.formLabels.service}
                      </label>
                      <select
                        {...register("service")}
                        className="w-full px-4 py-3 bg-navy-900/60 border border-white/10 focus:border-amber-500/40 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">{t.contact.formPlaceholders.service}</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {t.contact.formLabels.message} <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder={t.contact.formPlaceholders.message}
                      className={`w-full px-4 py-3 bg-navy-900/60 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors resize-none ${
                        errors.message
                          ? "border-red-500/60"
                          : "border-white/10 focus:border-amber-500/40"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2.5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
                      <AlertCircle size={16} />
                      {t.contact.errorMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 disabled:cursor-not-allowed text-navy-900 font-bold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                        {t.contact.sending}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {t.contact.submitButton}
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    {t.contact.privacyNotice}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
