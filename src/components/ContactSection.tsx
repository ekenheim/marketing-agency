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

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-navy-950/80 border rounded-xl text-white/90 placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all duration-300 font-light ${
      hasError ? "border-red-500/40" : "border-white/[0.06] focus:border-amber-500/30"
    }`;

  return (
    <section id="contact" className="py-16 sm:py-28 bg-navy-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-amber-500/[0.02] blur-[120px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-terra-500/[0.02] blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

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
            {t.contact.label}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 mb-5 leading-tight">
            {t.contact.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">{t.contact.titleAccent}</span>
          </h2>
          <p className="text-white/35 text-lg max-w-xl mx-auto font-light">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-white/90 font-bold text-xl mb-3">{t.contact.talkTitle}</h3>
              <p className="text-white/35 leading-relaxed font-light">
                {t.contact.talkDescription}
              </p>
            </div>

            <div className="space-y-4">
              {globalData?.email && (
                <a
                  href={`mailto:${globalData.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/[0.06] border border-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/[0.1] group-hover:border-amber-500/20 transition-all duration-300">
                    <Mail size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] text-white/20 font-medium uppercase tracking-[0.2em] mb-0.5">Email</div>
                    <div className="text-white/60 group-hover:text-amber-400 transition-colors duration-300 text-sm">
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
                  <div className="w-12 h-12 rounded-xl bg-amber-500/[0.06] border border-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/[0.1] group-hover:border-amber-500/20 transition-all duration-300">
                    <Phone size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] text-white/20 font-medium uppercase tracking-[0.2em] mb-0.5">Phone</div>
                    <div className="text-white/60 group-hover:text-amber-400 transition-colors duration-300 text-sm">
                      {globalData.phone}
                    </div>
                  </div>
                </a>
              )}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/[0.06] border border-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-[0.65rem] text-white/20 font-medium uppercase tracking-[0.2em] mb-0.5">Based in</div>
                  <div className="text-white/60 text-sm">
                    {globalData?.location ?? "Casablanca, Morocco"}
                  </div>
                </div>
              </div>
            </div>

            {/* Response time promise */}
            <div className="p-5 bg-amber-500/[0.04] border border-amber-500/10 rounded-2xl">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/50 text-sm leading-relaxed font-light">
                  <strong className="text-amber-400 font-semibold">{t.contact.responseTitle}</strong>{" "}
                  {t.contact.responseDetail}
                </p>
              </div>
            </div>

            {/* Free audit highlight */}
            <div className="p-5 bg-navy-800/60 border border-white/[0.04] rounded-2xl">
              <div className="flex items-start gap-3">
                <Sparkles size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80 font-semibold text-sm mb-1">{t.contact.auditHighlight}</p>
                  <p className="text-white/30 text-sm leading-relaxed font-light">
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
            <div className="bg-navy-800/40 border border-white/[0.04] rounded-2xl p-6 sm:p-8 md:p-10">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-white/90 font-bold text-xl mb-2">{t.contact.successTitle}</h3>
                  <p className="text-white/35 mb-8 font-light">{t.contact.successMessage}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 border border-white/10 rounded-xl text-white/50 hover:text-white/80 hover:border-white/20 text-sm transition-all duration-300 cursor-pointer"
                  >
                    {t.contact.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[0.75rem] font-medium text-white/40 mb-2.5 uppercase tracking-wider">
                        {t.contact.formLabels.name} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register("name")}
                        placeholder={t.contact.formPlaceholders.name}
                        className={inputClasses(!!errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-2 text-xs text-red-400/80">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[0.75rem] font-medium text-white/40 mb-2.5 uppercase tracking-wider">
                        {t.contact.formLabels.email} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder={t.contact.formPlaceholders.email}
                        className={inputClasses(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-400/80">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[0.75rem] font-medium text-white/40 mb-2.5 uppercase tracking-wider">
                        {t.contact.formLabels.company}
                      </label>
                      <input
                        {...register("company")}
                        placeholder={t.contact.formPlaceholders.company}
                        className={inputClasses(false)}
                      />
                    </div>
                    <div>
                      <label className="block text-[0.75rem] font-medium text-white/40 mb-2.5 uppercase tracking-wider">
                        {t.contact.formLabels.service}
                      </label>
                      <select
                        {...register("service")}
                        className={`${inputClasses(false)} appearance-none cursor-pointer`}
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

                  <div>
                    <label className="block text-[0.75rem] font-medium text-white/40 mb-2.5 uppercase tracking-wider">
                      {t.contact.formLabels.message} <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder={t.contact.formPlaceholders.message}
                      className={`${inputClasses(!!errors.message)} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-2 text-xs text-red-400/80">{errors.message.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/[0.06] border border-red-500/20 rounded-xl text-sm text-red-400/80">
                      <AlertCircle size={16} />
                      {t.contact.errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/40 disabled:cursor-not-allowed text-navy-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] cursor-pointer text-[0.85rem] uppercase tracking-wider"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                        {t.contact.sending}
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        {t.contact.submitButton}
                      </>
                    )}
                  </button>

                  <p className="text-[0.7rem] text-white/20 text-center font-light">
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
