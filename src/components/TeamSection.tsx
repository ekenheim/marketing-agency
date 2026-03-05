"use client";

import { motion, type Variants } from "framer-motion";
import { Linkedin, User } from "lucide-react";
import type { TeamMemberData } from "@/types/strapi";

const FALLBACK_TEAM: TeamMemberData[] = [
  {
    name: "Youssef El Fassi",
    role: "Founder & Growth Strategist",
    bio: "10+ years helping Moroccan and MENA brands unlock digital revenue. Former head of performance at a leading Casablanca agency.",
    order: 1,
  },
  {
    name: "Salma Benhaddou",
    role: "Head of Paid Media",
    bio: "Google & Meta certified, with a track record of slashing CPAs for e-commerce and real estate brands across Morocco.",
    order: 2,
  },
  {
    name: "Amine Rachidi",
    role: "SEO & Content Lead",
    bio: "Specialist in Arabic and French SEO, building organic acquisition engines that deliver long-term compounding growth.",
    order: 3,
  },
  {
    name: "Nadia Tazi",
    role: "Data & Analytics Lead",
    bio: "Turns messy first-party data into clear dashboards and attribution models that guide every campaign decision.",
    order: 4,
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
            The team
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5">
            Strategists, not{" "}
            <span className="text-amber-400">order-takers</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A tight-knit team of specialists who obsess over your growth metrics —
            not vanity numbers.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {members.map((member, i) => {
            const photoUrl = member.photo?.url ?? null;

            return (
              <motion.div
                key={member.name + i}
                variants={cardVariants}
                className="group bg-navy-800/40 border border-white/5 hover:border-amber-500/20 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 mx-auto mb-5">
                  {photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoUrl}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-2 border-amber-500/20 group-hover:border-amber-500/50 transition-colors"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-navy-600 to-navy-700 border-2 border-amber-500/20 group-hover:border-amber-500/50 transition-colors flex items-center justify-center">
                      <User size={32} className="text-slate-400" />
                    </div>
                  )}
                  {/* Online dot */}
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-navy-900" />
                </div>

                {/* Info */}
                <h3 className="text-white font-bold text-base mb-1">{member.name}</h3>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wide mb-3">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
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
