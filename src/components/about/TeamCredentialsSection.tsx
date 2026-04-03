"use client";

import { motion, type Variants } from "framer-motion";
import { User } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const founders = [
  {
    name: "Robin",
    role: "CRO & Tracking",
    description:
      "Former Avanza Bank, EA, and Embark Studios. Machine learning and conversion optimization background from Sweden\u2019s most data-intensive tech companies.",
    credentials: ["Avanza Bank", "EA", "Embark Studios"],
  },
  {
    name: "Randa",
    role: "Strategy & Operations",
    description:
      "Former PriceRunner and Pulsen Group. Built and scaled multi-million SEK growth campaigns across the Nordics before bringing that playbook to Morocco.",
    credentials: ["PriceRunner", "Pulsen Group"],
  },
  {
    name: "Nizar",
    role: "Design & Content",
    description:
      "Runs our creative output. European design eye, Moroccan market instinct. Works natively in Arabic, French, and English.",
    credentials: [],
  },
];

export default function TeamCredentialsSection() {
  return (
    <section className="bg-navy-900 py-28 relative">

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-amber-500 text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
            The founders
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 leading-tight">
            Built by practitioners,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">not theorists</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {founders.map((founder) => (
            <motion.div
              key={founder.name}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-navy-800/50 border border-white/[0.04] rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 border border-white/[0.06]">
                  <User className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white/90">
                    {founder.name}
                  </h3>
                  <p className="text-amber-500 text-[0.7rem] font-medium uppercase tracking-wider">
                    {founder.role}
                  </p>
                </div>
              </div>

              <p className="text-white/35 font-light leading-relaxed mb-5">{founder.description}</p>

              {founder.credentials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {founder.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="bg-amber-500/[0.06] border border-amber-500/10 rounded-lg text-[0.7rem] text-amber-400 px-2.5 py-1"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
