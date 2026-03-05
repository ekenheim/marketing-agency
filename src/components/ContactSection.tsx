"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import type { GlobalData, ServiceData } from "@/types/strapi";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const SERVICE_OPTIONS = [
  "Performance Marketing",
  "SEO & Content",
  "Social Media",
  "Web & Landing Pages",
  "Email & CRM",
  "Analytics & Data",
  "Not sure yet",
];

interface Props {
  globalData: GlobalData | null;
  services: ServiceData[] | null;
}

export default function ContactSection({ globalData, services }: Props) {
  const serviceOptions =
    services && services.length > 0
      ? [...services.map((s) => s.title), "Not sure yet"]
      : SERVICE_OPTIONS;
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
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";
      const res = await fetch(`${baseUrl}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
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
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
            Ready to{" "}
            <span className="text-amber-400">grow your brand?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tell us about your business and we&apos;ll map out a data-driven growth
            strategy tailored to your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Let&apos;s talk growth</h3>
              <p className="text-slate-400 leading-relaxed">
                We work with a select group of Moroccan brands at a time to
                ensure every client gets our full attention. Reach out to see
                if we&apos;re a fit.
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
                  <strong className="text-amber-400">24-hour response guarantee.</strong>{" "}
                  Every enquiry gets a thoughtful reply within one business day.
                </p>
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
            <div className="bg-navy-800/40 border border-white/5 rounded-2xl p-7 sm:p-9">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Message sent!</h3>
                  <p className="text-slate-400 mb-6">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 border border-white/15 rounded-lg text-slate-300 hover:text-white hover:border-white/30 text-sm transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Sara El Amrani"
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
                        Email <span className="text-amber-500">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="sara@example.com"
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
                        Company
                      </label>
                      <input
                        {...register("company")}
                        placeholder="Startup Maroc"
                        className="w-full px-4 py-3 bg-navy-900/60 border border-white/10 focus:border-amber-500/40 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Service interested in
                      </label>
                      <select
                        {...register("service")}
                        className="w-full px-4 py-3 bg-navy-900/60 border border-white/10 focus:border-amber-500/40 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select a service…</option>
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
                      Message <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us about your business, goals, and current challenges…"
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

                  {/* Error state */}
                  {status === "error" && (
                    <div className="flex items-center gap-2.5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again or email us directly.
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
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By sending this form you agree to our privacy policy. We never sell your data.
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
