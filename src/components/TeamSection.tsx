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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Props {
  team: TeamMemberData[] | null;
}

export default function TeamSection({ team }: Props) {
  const { t } = useLocale();
  const members = team && team.length > 0 ? team : FALLBACK_TEAM;

  return (
    <section id="team" className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4">
            {t.team.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
            {t.team.title}{" "}
            <span className="text-amber-400">{t.team.titleAccent}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t.team.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {members.map((member, i) => {
            const photoUrl = member.photo?.url ?? null;

            return (
              <motion.div
                key={member.name + i}
                variants={cardVariants}
                className="group bg-navy-800/40 border border-white/5 hover:border-amber-500/20 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                  {photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoUrl}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-2 border-amber-500/20 group-hover:border-amber-500/50 transition-colors"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-navy-600 to-navy-700 border-2 border-amber-500/20 group-hover:border-amber-500/50 transition-colors flex items-center justify-center">
                      <User size={36} className="text-slate-400" />
                    </div>
                  )}
                  {/* Online dot */}
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-navy-900" />
                </div>

                {/* Info */}
                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wide mb-3">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                )}

                {/* Credentials */}
                {member.credentials && member.credentials.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                    {member.credentials.map((c) => (
                      <span
                        key={c}
                        className="inline-block px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-xs text-amber-400"
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
                        className="inline-block px-2 py-0.5 bg-white/5 rounded text-xs text-slate-400"
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
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors"
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
