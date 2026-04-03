"use client";

import { motion, type Variants } from "framer-motion";
import { Linkedin, User } from "lucide-react";
import type { TeamMemberData } from "@/types/strapi";
import { useLocale } from "@/i18n/useLocale";

const FALLBACK_TEAM: TeamMemberData[] = [
  {
    name: "Robin",
    role: "CRO & Tracking",
    bio: "Former Avanza Bank, EA, and Embark Studios. Machine learning and conversion optimization background from Sweden's most data-intensive tech companies.",
    credentials: ["Avanza Bank", "EA", "Embark Studios"],
    specialties: ["Conversion Rate Optimization", "Server-Side Tracking", "Machine Learning"],
    order: 1,
  },
  {
    name: "Randa",
    role: "Strategy & Operations",
    bio: "Former PriceRunner and Pulsen Group. Built and scaled multi-million SEK growth campaigns across the Nordics before bringing that playbook to Morocco.",
    credentials: ["PriceRunner", "Pulsen Group"],
    specialties: ["Growth Strategy", "Campaign Operations", "Performance Marketing"],
    order: 2,
  },
  {
    name: "Nizar",
    role: "Design & Content",
    bio: "Runs our creative output. European design eye, Moroccan market instinct. Works natively in Arabic, French, and English.",
    specialties: ["Visual Design", "Content Strategy", "Multilingual Creative"],
    order: 3,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface Props {
  team: TeamMemberData[] | null;
}

export default function TeamSection({ team }: Props) {
  const { t } = useLocale();
  const members = team && team.length > 0 ? team : FALLBACK_TEAM;

  return (
    <section id="team" className="py-28 bg-navy-900 relative overflow-hidden">

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
            {t.team.label}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white/95 mb-5 leading-tight">
            {t.team.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">{t.team.titleAccent}</span>
          </h2>
          <p className="text-white/35 text-lg max-w-2xl mx-auto font-light">
            {t.team.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {members.map((member, i) => {
            const photoUrl = member.photo?.url ?? null;

            return (
              <motion.div
                key={member.name + i}
                variants={cardVariants}
                className="group bg-navy-800/50 border border-white/[0.04] hover:border-amber-500/20 rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-1"
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  {photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoUrl}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-2 border-amber-500/15 group-hover:border-amber-500/40 transition-colors duration-500"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-navy-600 to-navy-700 border-2 border-amber-500/15 group-hover:border-amber-500/40 transition-colors duration-500 flex items-center justify-center">
                      <User size={36} className="text-white/20" />
                    </div>
                  )}
                  {/* Online dot */}
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-navy-900" />
                </div>

                {/* Info */}
                <h3 className="font-[family-name:var(--font-display)] text-white/90 font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-amber-500 text-[0.65rem] font-semibold uppercase tracking-[0.2em] mb-4">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-white/30 text-sm leading-relaxed mb-5 font-light">
                    {member.bio}
                  </p>
                )}

                {/* Credentials */}
                {member.credentials && member.credentials.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                    {member.credentials.map((c) => (
                      <span
                        key={c}
                        className="inline-block px-2.5 py-1 bg-amber-500/[0.06] border border-amber-500/10 rounded-lg text-[0.65rem] text-amber-400"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Specialties */}
                {member.specialties && member.specialties.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="inline-block px-2.5 py-1 bg-white/[0.03] rounded-lg text-[0.65rem] text-white/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* LinkedIn */}
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.7rem] text-white/25 hover:text-amber-400 transition-colors duration-300"
                  >
                    <Linkedin size={13} />
                    LinkedIn
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
