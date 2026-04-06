export interface Dictionary {
  header: {
    services: string;
    work: string;
    contact: string;
    team: string;
    about: string;
    blog: string;
    cta: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    scroll: string;
    stats: { value: string; label: string }[];
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      features: string[];
    }[];
  };
  caseStudies: {
    label: string;
    title: string;
    titleAccent: string;
    ctaLabel: string;
    viewCaseStudy: string;
    items: {
      title: string;
      client: string;
      industry: string;
      results: { value: string; label: string }[];
      tags: string;
    }[];
  };
  testimonials: {
    label: string;
    title: string;
    titleAccent: string;
    items: {
      quote: string;
      authorName: string;
      authorRole: string;
      company: string;
    }[];
    badges: string[];
  };
  contact: {
    label: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    talkTitle: string;
    talkDescription: string;
    responseTitle: string;
    responseDetail: string;
    formLabels: {
      name: string;
      email: string;
      company: string;
      service: string;
      message: string;
    };
    formPlaceholders: {
      name: string;
      email: string;
      company: string;
      service: string;
      message: string;
    };
    formValidation: {
      nameMin: string;
      emailInvalid: string;
      messageMin: string;
    };
    submitButton: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    errorMessage: string;
    privacyNotice: string;
    notSureYet: string;
    auditHighlight: string;
    auditDescription: string;
  };
  team: {
    label: string;
    title: string;
    titleAccent: string;
    subtitle: string;
  };
  footer: {
    navigation: string;
    contact: string;
    industries: string;
    allRights: string;
    privacyPolicy: string;
    termsOfService: string;
    hospitality: string;
    ecommerce: string;
    b2b: string;
  };
  logos: {
    label: string;
  };
  whatsapp: {
    tooltip: string;
  };
}

const en: Dictionary = {
  header: {
    services: "Services",
    work: "Work",
    contact: "Contact",
    team: "Team",
    about: "About",
    blog: "Blog",
    cta: "Start a project",
  },
  hero: {
    badge: "Nordic performance standards · Moroccan market",
    headline: "We turn clicks into clients —",
    headlineAccent: "and clients into loyal fans",
    subheadline: "Performance marketing that actually moves your numbers.",
    primaryCta: "View Case Studies",
    secondaryCta: "Get a Free Audit",
    scroll: "Scroll",
    stats: [
      { value: "3×", label: "Average lead growth" },
      { value: "50+", label: "Moroccan brands served" },
      { value: "−42%", label: "Avg. cost per lead" },
    ],
  },
  services: {
    label: "What we do",
    title: "Services that move the needle",
    subtitle:
      "We do six things, and we do them well. Each one is aimed at getting you more clients and more revenue.",
    items: [
      {
        title: "Performance Marketing",
        description: "Paid campaigns on Meta and Google, managed for ROI.",
        features: ["Google Ads management", "Meta & Instagram campaigns", "Weekly performance reports"],
      },
      {
        title: "SEO & Content",
        description: "Rank higher and attract organic traffic that converts.",
        features: ["Technical SEO audits", "Arabic & French content", "Link building strategy"],
      },
      {
        title: "Social Media",
        description: "Grow a following that actually engages with your brand.",
        features: ["Content creation & scheduling", "Community management", "Influencer partnerships"],
      },
      {
        title: "Web & Landing Pages",
        description: "Pages built to convert visitors into leads, not just look pretty.",
        features: ["CRO-focused design", "A/B testing setup", "Analytics integration"],
      },
      {
        title: "Email & CRM",
        description: "Automated sequences that keep leads warm until they're ready to buy.",
        features: ["Email automation flows", "CRM setup & integration", "Lead scoring models"],
      },
      {
        title: "Analytics & Data",
        description: "Dashboards and reports that tell you what's working and what to cut.",
        features: ["Custom dashboards", "Attribution modelling", "Monthly strategy reviews"],
      },
    ],
  },
  caseStudies: {
    label: "Portfolio",
    title: "Results that",
    titleAccent: "speak for themselves",
    ctaLabel: "Start a project",
    viewCaseStudy: "View case study",
    items: [
      {
        title: "3× leads for Casablanca real estate brand",
        client: "Immo Maroc",
        industry: "Real Estate",
        results: [
          { value: "3×", label: "Lead volume" },
          { value: "−42%", label: "Cost per lead" },
          { value: "90 days", label: "To results" },
        ],
        tags: "paid-social,real-estate,meta-ads",
      },
      {
        title: "Scaling an e-commerce brand from 0 to MAD 2M revenue",
        client: "Maroc Artisanat",
        industry: "E-commerce",
        results: [
          { value: "MAD 2M", label: "Revenue in Y1" },
          { value: "8×", label: "ROAS on Google Shopping" },
          { value: "55%", label: "Repeat purchase rate" },
        ],
        tags: "google-ads,e-commerce,cro",
      },
      {
        title: "SaaS startup reaches 500 qualified demos in 6 months",
        client: "TechMaroc",
        industry: "SaaS / B2B",
        results: [
          { value: "500+", label: "Qualified demos" },
          { value: "−60%", label: "CAC reduction" },
          { value: "12%", label: "Demo-to-close rate" },
        ],
        tags: "b2b,linkedin,content-marketing",
      },
    ],
  },
  testimonials: {
    label: "Client stories",
    title: "Brands that",
    titleAccent: "trust us to deliver",
    items: [
      {
        quote: "Digitomara doubled our qualified leads in 90 days. The reporting is crystal clear and their team is always a step ahead.",
        authorName: "Karim Benali",
        authorRole: "CEO",
        company: "Immo Maroc",
      },
      {
        quote: "We went from barely breaking even on ads to an 8× ROAS in under 4 months. I wish we'd found them sooner.",
        authorName: "Fatima-Zahra Ouhbi",
        authorRole: "Founder",
        company: "Maroc Artisanat",
      },
      {
        quote: "Unlike other agencies, Digitomara speaks the language of business — CAC, LTV, pipeline. No fluff, just results.",
        authorName: "Mehdi Alaoui",
        authorRole: "CMO",
        company: "TechMaroc",
      },
    ],
    badges: ["Google Partner", "Meta Business Partner", "HubSpot Certified", "ISO 27001 Aware"],
  },
  contact: {
    label: "Get in touch",
    title: "Ready to",
    titleAccent: "grow your brand?",
    subtitle: "Tell us what you're working on. We'll come back with a plan.",
    talkTitle: "Let's talk growth",
    talkDescription:
      "We take on a limited number of clients so nobody gets half-assed service. Drop us a line and we'll see if it makes sense to work together.",
    responseTitle: "24-hour response guarantee.",
    responseDetail: "We reply to every message within one business day.",
    formLabels: {
      name: "Name",
      email: "Email",
      company: "Company",
      service: "Service interested in",
      message: "Message",
    },
    formPlaceholders: {
      name: "Sara El Amrani",
      email: "sara@example.com",
      company: "Startup Maroc",
      service: "Select a service…",
      message: "Tell us about your business, goals, and current challenges…",
    },
    formValidation: {
      nameMin: "Name must be at least 2 characters",
      emailInvalid: "Please enter a valid email address",
      messageMin: "Message must be at least 10 characters",
    },
    submitButton: "Send message",
    sending: "Sending…",
    successTitle: "Message sent!",
    successMessage: "We'll get back to you within 24 hours.",
    sendAnother: "Send another message",
    errorMessage: "Something went wrong. Please try again or email us directly.",
    privacyNotice: "By sending this form you agree to our privacy policy. We don't sell your data.",
    notSureYet: "Not sure yet",
    auditHighlight: "Free 15-minute audit",
    auditDescription: "Not ready for a full project? We'll review your current setup and tell you what we'd change. No pitch, no obligation.",
  },
  team: {
    label: "The team",
    title: "Strategists, not",
    titleAccent: "order-takers",
    subtitle:
      "Small team, big opinions about your numbers. We'd rather argue about your conversion rate than your follower count.",
  },
  footer: {
    navigation: "Navigation",
    contact: "Contact",
    industries: "Industries",
    allRights: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    hospitality: "Hospitality & Tourism",
    ecommerce: "E-Commerce",
    b2b: "B2B & SaaS",
  },
  logos: {
    label: "Marketing experience across global and regional brands",
  },
  whatsapp: {
    tooltip: "Chat with us",
  },
};

const fr: Dictionary = {
  header: {
    services: "Services",
    work: "Réalisations",
    contact: "Contact",
    team: "Équipe",
    about: "À propos",
    blog: "Blog",
    cta: "Démarrer un projet",
  },
  hero: {
    badge: "Standards nordiques · Marché marocain",
    headline: "On transforme les clics en clients —",
    headlineAccent: "et les clients en fans fidèles",
    subheadline: "Du marketing de performance qui fait vraiment bouger vos chiffres.",
    primaryCta: "Voir nos réalisations",
    secondaryCta: "Audit gratuit",
    scroll: "Défiler",
    stats: [
      { value: "3×", label: "Croissance moyenne des leads" },
      { value: "50+", label: "Marques marocaines servies" },
      { value: "−42%", label: "Coût par lead moyen" },
    ],
  },
  services: {
    label: "Nos services",
    title: "Des services qui font la différence",
    subtitle:
      "On fait six choses, et on les fait bien. Chacune vise à vous amener plus de clients et plus de chiffre d'affaires.",
    items: [
      {
        title: "Marketing de performance",
        description: "Campagnes pub sur Meta et Google, gérées pour le ROI.",
        features: ["Gestion Google Ads", "Campagnes Meta & Instagram", "Rapports hebdomadaires"],
      },
      {
        title: "SEO & Contenu",
        description: "Améliorez votre classement et attirez du trafic organique qui convertit.",
        features: ["Audits SEO techniques", "Contenu arabe & français", "Stratégie de netlinking"],
      },
      {
        title: "Réseaux sociaux",
        description: "Développez une audience qui interagit vraiment avec votre marque.",
        features: ["Création & planification de contenu", "Community management", "Partenariats influenceurs"],
      },
      {
        title: "Web & Landing pages",
        description: "Des pages faites pour convertir les visiteurs en leads, pas juste pour faire joli.",
        features: ["Design axé CRO", "Configuration A/B testing", "Intégration analytics"],
      },
      {
        title: "Email & CRM",
        description: "Des séquences automatisées qui gardent vos leads au chaud jusqu'à l'achat.",
        features: ["Flux d'automatisation email", "Configuration & intégration CRM", "Modèles de lead scoring"],
      },
      {
        title: "Analytics & Data",
        description: "Des tableaux de bord et rapports qui vous disent ce qui marche et ce qu'il faut couper.",
        features: ["Tableaux de bord personnalisés", "Modélisation d'attribution", "Revues stratégiques mensuelles"],
      },
    ],
  },
  caseStudies: {
    label: "Portfolio",
    title: "Des résultats qui",
    titleAccent: "parlent d'eux-mêmes",
    ctaLabel: "Démarrer un projet",
    viewCaseStudy: "Voir l'étude de cas",
    items: [
      {
        title: "3× de leads pour une marque immobilière de Casablanca",
        client: "Immo Maroc",
        industry: "Immobilier",
        results: [
          { value: "3×", label: "Volume de leads" },
          { value: "−42%", label: "Coût par lead" },
          { value: "90 jours", label: "Pour des résultats" },
        ],
        tags: "paid-social,immobilier,meta-ads",
      },
      {
        title: "Faire passer une marque e-commerce de 0 à 2M MAD de chiffre d'affaires",
        client: "Maroc Artisanat",
        industry: "E-commerce",
        results: [
          { value: "2M MAD", label: "CA en 1 an" },
          { value: "8×", label: "ROAS sur Google Shopping" },
          { value: "55%", label: "Taux de réachat" },
        ],
        tags: "google-ads,e-commerce,cro",
      },
      {
        title: "Une startup SaaS atteint 500 démos qualifiées en 6 mois",
        client: "TechMaroc",
        industry: "SaaS / B2B",
        results: [
          { value: "500+", label: "Démos qualifiées" },
          { value: "−60%", label: "Réduction du CAC" },
          { value: "12%", label: "Taux démo-closing" },
        ],
        tags: "b2b,linkedin,content-marketing",
      },
    ],
  },
  testimonials: {
    label: "Témoignages clients",
    title: "Des marques qui",
    titleAccent: "nous font confiance",
    items: [
      {
        quote: "Digitomara a doublé nos leads qualifiés en 90 jours. Les rapports sont d'une clarté exemplaire et leur équipe a toujours un coup d'avance.",
        authorName: "Karim Benali",
        authorRole: "PDG",
        company: "Immo Maroc",
      },
      {
        quote: "On est passé d'un point mort sur nos pubs à un ROAS de 8× en moins de 4 mois. J'aurais aimé les trouver plus tôt.",
        authorName: "Fatima-Zahra Ouhbi",
        authorRole: "Fondatrice",
        company: "Maroc Artisanat",
      },
      {
        quote: "Contrairement aux autres agences, Digitomara parle le langage du business — CAC, LTV, pipeline. Pas de blabla, que des résultats.",
        authorName: "Mehdi Alaoui",
        authorRole: "Directeur Marketing",
        company: "TechMaroc",
      },
    ],
    badges: ["Google Partner", "Meta Business Partner", "HubSpot Certified", "ISO 27001 Aware"],
  },
  contact: {
    label: "Contactez-nous",
    title: "Prêt à",
    titleAccent: "développer votre marque ?",
    subtitle: "Dites-nous sur quoi vous bossez. On revient avec un plan.",
    talkTitle: "Parlons croissance",
    talkDescription:
      "On prend un nombre limité de clients pour ne bâcler le travail de personne. Écrivez-nous et on verra si ça colle.",
    responseTitle: "Réponse garantie sous 24h.",
    responseDetail: "On répond à chaque message en un jour ouvré.",
    formLabels: {
      name: "Nom",
      email: "Email",
      company: "Entreprise",
      service: "Service souhaité",
      message: "Message",
    },
    formPlaceholders: {
      name: "Sara El Amrani",
      email: "sara@example.com",
      company: "Startup Maroc",
      service: "Sélectionnez un service…",
      message: "Parlez-nous de votre entreprise, vos objectifs et vos défis actuels…",
    },
    formValidation: {
      nameMin: "Le nom doit contenir au moins 2 caractères",
      emailInvalid: "Veuillez entrer une adresse email valide",
      messageMin: "Le message doit contenir au moins 10 caractères",
    },
    submitButton: "Envoyer le message",
    sending: "Envoi en cours…",
    successTitle: "Message envoyé !",
    successMessage: "Nous vous répondrons sous 24 heures.",
    sendAnother: "Envoyer un autre message",
    errorMessage: "Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.",
    privacyNotice: "En envoyant ce formulaire, vous acceptez notre politique de confidentialité. On ne vend pas vos données.",
    notSureYet: "Pas encore sûr(e)",
    auditHighlight: "Audit gratuit de 15 minutes",
    auditDescription: "Pas encore prêt pour un projet complet ? On analyse votre setup actuel et on vous dit ce qu'on changerait. Sans pitch, sans obligation.",
  },
  team: {
    label: "L'équipe",
    title: "Des stratèges, pas des",
    titleAccent: "exécutants",
    subtitle:
      "Petite équipe, grandes convictions sur vos chiffres. On préfère débattre de votre taux de conversion que de votre nombre de followers.",
  },
  footer: {
    navigation: "Navigation",
    contact: "Contact",
    industries: "Industries",
    allRights: "Tous droits réservés.",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    hospitality: "Hôtellerie & Tourisme",
    ecommerce: "E-Commerce",
    b2b: "B2B & SaaS",
  },
  logos: {
    label: "Expérience marketing avec des marques mondiales et régionales",
  },
  whatsapp: {
    tooltip: "Discutons sur WhatsApp",
  },
};

export const dictionaries: Record<string, Dictionary> = { en, fr };
