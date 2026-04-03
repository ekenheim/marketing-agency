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
      "Creative lead bridging European design precision with Moroccan market sensibilities. Fluent storytelling across Arabic, French, and English.",
    credentials: [],
  },
];

export default function TeamCredentialsSection() {
  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
            The founders
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Built by practitioners,{" "}
            <span className="text-amber-500">not theorists</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {founders.map((founder) => (
            <motion.div
              key={founder.name}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-navy-800/40 border border-white/5 rounded-2xl p-7"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-700 border border-white/10">
                  <User className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {founder.name}
                  </h3>
                  <p className="text-amber-500 text-sm font-medium">
                    {founder.role}
                  </p>
                </div>
              </div>

              <p className="text-slate-400 mb-5">{founder.description}</p>

              {founder.credentials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {founder.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="bg-amber-500/10 border border-amber-500/20 rounded text-xs text-amber-400 px-2 py-1"
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
