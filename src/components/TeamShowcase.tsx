"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  skills?: string[];
  featured?: boolean;
  quote?: string;
}

export function TeamShowcase() {
  const heroRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });
  
  // Ajout d'un nouvel état pour les animations de défilement
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  
  // Détection de la direction du défilement
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  // Animations
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Données de l'équipe
  const founders: TeamMember[] = [
    {
      id: "founder-1",
      name: "Cheikh Awa Balla Mbacké CISSE",
      role: "Project Manager & Co-Founder",
      bio: "Passionné par l'automatisation industrielle et entrepreneur visionnaire, Cheikh Awa Balla Mbacké Cissé a fondé Art'Beau-Rescence avec l'ambition de révolutionner les processus industriels au Sénégal. Son expertise en gestion de projets technologiques et en systèmes d'automatisation lui permet de transformer des opérations complexes en solutions efficientes et évolutives. Son leadership et sa vision stratégique sont les moteurs d'innovation qui propulsent l'entreprise vers de nouveaux horizons.",
      image: "/images/team/founder1.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/cheikh-awa-balla-mback%C3%A9-cisse-363342240/",
        email: "cheikhawaballambacke.cisse@artbeaurescence.sn"
      },
      skills: ["Gestion de projet agile", "Automatisation des processus industriels", "Programmation d'automates (PLC)"],
      featured: true,
      quote:"La véritable automatisation ne remplace pas l'humain, elle amplifie ses capacités et libère sa créativité."
    },
    {
      id: "founder-2",
      name: "Abdoulaye NIASSE",
      role: "CEO & Co-Founder",
      bio: "Eleve Ingénieur en informatique et entrepreneur passionné, Abdoulaye a fondé Art'Beau-Rescence avec la vision de transformer le paysage technologique sénégalais. Sa passion en IA et en développement de solutions innovantes guide l'entreprise vers l'excellence.",
      image: "/images/team/founder2.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/abdoulaye-niasse/",
        twitter: "https://x.com/Abdoulaye_XYZ",
        email: "abdoulaye.niasse@artbeaurescence.sn"
      },
      skills: ["Stratégie d'entreprise", "Innovation technologique"],
      featured: true,
      quote: "Une solution technologique n'est pas forcement numérique, mais une solution qui favorise l'aspect humain !"
    },
    {
      id: "founder-3",
      name: "El Hadji Samba NIANG",
      role: "R&D Manager & Co-Founder",
      bio: "Spécialiste en recherche et développement, El Hadji Samba NIANG apporte à Art'Beau-Rescence son expertise en conception de systèmes innovants. Sa vision technique et sa maîtrise des technologies émergentes sont essentielles pour transformer des idées audacieuses en solutions concrètes, particulièrement dans le domaine de la sécurité routière.",
      image: "/images/team/founder3.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/by-sn/",
        email: "elhadjisamba.niang@artbeaurescence.sn"
      },
      skills: ["Innovation technologique", "Conception de systèmes AIoT", "Développement de prototypes"],
      featured: true,
      quote: "L'innovation ne réside pas seulement dans la technologie, mais dans notre capacité à résoudre des problèmes locaux avec des solutions adaptées."
    },
    {
      id: "founder-4",
      name: "Moussa MBAYE",
      role: "Chief Logistics Officer & Co-Founder",
      bio: "Expert en logistique et en optimisation des chaînes d'approvisionnement, Moussa MBAYE assure l'efficacité opérationnelle d'Art'Beau-Rescence. Son expertise en gestion de la distribution et en coordination logistique est un atout majeur pour le déploiement des solutions technologiques de l'entreprise à travers le Sénégal.",
      image: "/images/team/founder4.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/moussa-mbaye-b47a6b237/",
        email: "moussa.mbaye@artbeaurescence.sn"
      },
      skills: ["Gestion de chaîne logistique", "Optimisation des opérations", "Planification stratégique"],
      featured: true,
      quote: "Une innovation ne vaut que par sa capacité à être déployée efficacement là où elle est nécessaire."
    },
    {
      id: "founder-5",
      name: "Aminatou Djiri DIALLO",
      role: "R&D Manager Co-Founder",
      bio: "Ingénieure spécialisée en technologies embarquées, Aminatou Djiri DIALLO dirige les initiatives de recherche et développement chez Art'Beau-Rescence. Son expertise en systèmes intelligents et en traitement de données temps réel contribue significativement au développement de solutions de télématique avancées pour la sécurité routière.",
      image: "/images/team/founder6.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/aminatou-djiri-diallo/",
        email: "aminatoudjiri.diallo@artbeaurescence.sn"
      },
      skills: ["Systèmes embarqués", "Intelligence artificielle appliquée", "Télématique avancée"],
      featured: true,
      quote: "La technologie la plus puissante est celle qui s'efface derrière son utilité pour sauver des vies."
    },
    {
      id: "founder-6",
      name: "Fatima Fall NDIAYE",
      role: "R&D Manager Co-Founder",
      bio: "Experte en intelligence artificielle et en analyse de données, Fatima Fall NDIAYE pilote le développement des algorithmes qui alimentent la plateforme AI-Karangué. Sa passion pour l'application de l'IA aux défis de sécurité routière locale fait d'elle une force motrice dans l'innovation technologique sénégalaise.",
      image: "/images/team/founder5.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/fatima-fall-ndiaye-90429125a/",
        email: "fatimafall.ndiaye@artbeaurescence.sn"
      },
      skills: ["Intelligence artificielle", "Analyse prédictive", "Vision par ordinateur"],
      featured: true,
      quote: "L'intelligence artificielle n'est pas qu'une technologie, c'est un outil de transformation sociale quand elle est mise au service de la sécurité collective."
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "team-1",
      name: "Mariama FALL",
      role: "COO & Data Engineer",
      bio: "En tant que Directrice des Opérations, Mariama FALL supervise l'ensemble des activités quotidiennes d'Art'Beau-Rescence. Ses compétences en ingénierie des données lui permettent d'optimiser les flux d'information et de transformer les données brutes en insights stratégiques pour guider les décisions opérationnelles de l'entreprise.",
      image: "/images/team/team1.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/mariama-fall-54537b257/",
        email: "mariama.fall@artbeaurescence.sn"
      },
      skills: ["Gestion opérationnelle", "Ingénierie des données", "Business Intelligence"]
    },
    {
      id: "team-2",
      name: "Ndeye Aïssa DIOP",
      role: "CFO & Data Scientist",
      bio: "Ndeye Aïssa DIOP allie expertise financière et science des données pour optimiser la gestion financière d'Art'Beau-Rescence. Son approche analytique permet d'identifier les opportunités de croissance tout en assurant la viabilité économique des projets innovants de l'entreprise.",
      image: "/images/team/team2.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/ndeye-aissa-diop-347050330/",
        email: "ndeyeaissa.diop@artbeaurescence.sn"
      },
      skills: ["Gestion financière", "Analyse prédictive", "Modélisation économique"]
    },
    {
      id: "team-3",
      name: "Aïcha MBAYE",
      role: "CTO & Data Analyste",
      bio: "Directrice Technique visionnaire, Aïcha MBAYE pilote l'infrastructure technologique d'Art'Beau-Rescence. Sa double expertise en architecture système et en analyse de données lui permet de concevoir des solutions robustes et évolutives qui répondent aux défis complexes de la sécurité routière.",
      image: "/images/team/team3.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/a%C3%AFcha-mbaye-175b57197/",
        email: "aicha.mbaye@artbeaurescence.sn"
      },
      skills: ["Architecture technique", "Analyse de données", "Gestion de l'innovation IT"]
    },
    {
      id: "team-4",
      name: "Mouhamadou SARR",
      role: "CSO & Pentester",
      bio: "Stratège technologique et expert en cybersécurité, Mouhamadou SARR veille à l'alignement des initiatives d'Art'Beau-Rescence avec les objectifs à long terme. Ses compétences en tests de pénétration assurent que les solutions de l'entreprise respectent les plus hauts standards de sécurité informatique.",
      image: "/images/team/team4.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/el-mahmoud-sarr-458905296/",
        email: "mouhamadou.sarr@artbeaurescence.sn"
      },
      skills: ["Planification stratégique", "Cybersécurité", "Gestion des risques"]
    },
    {
      id: "team-5",
      name: "Fatou Bintou SARR",
      role: "Chief Marketing Officer",
      bio: "Spécialiste du marketing digital, Fatou Bintou SARR orchestre la stratégie de communication et de positionnement d'Art'Beau-Rescence. Sa compréhension approfondie des dynamiques du marché technologique sénégalais lui permet de créer des campagnes percutantes qui valorisent l'impact social des innovations de l'entreprise.",
      image: "/images/team/team5.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/fatou-bintou-s-b48133304/",
        email: "fatoubintou.sarr@artbeaurescence.sn"
      },
      skills: ["Marketing digital", "Communication stratégique", "Gestion de marque"]
    },
    {
      id: "team-6",
      name: "Mominatou MBACKÉ",
      role: "Product Manager",
      bio: "En tant que Chef de Produit, Mominatou MBACKÉ assure le développement et l'évolution des solutions AI-Karangué. Son expertise en automatisation industrielle apporte une dimension pratique aux innovations d'Art'Beau-Rescence, garantissant des produits qui répondent précisément aux besoins des utilisateurs.",
      image: "/images/team/team6.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/mominatou-mbacke-ab4b3528a/",
        email: "mominatou.mbacke@artbeaurescence.sn"
      },
      skills: ["Gestion de produit", "Automatisation industrielle", "Expérience utilisateur"]
    },
    {
      id: "team-7",
      name: "Yacine DIOP",
      role: "Office Manager Officer",
      bio: "Yacine DIOP coordonne l'environnement de travail chez Art'Beau-Rescence tout en contribuant au développement logiciel. Sa double compétence garantit une intégration harmonieuse entre les opérations administratives et les activités techniques de l'entreprise.",
      image: "/images/team/team7.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/yacine-diop-026b4b325/",
        email: "yacine.diop@artbeaurescence.sn"
      },
      skills: ["Gestion administrative", "Développement logiciel", "Coordination d'équipe"]
    },
    {
      id: "team-8",
      name: "Khady NDIAYE",
      role: "Chief Sales Officer",
      bio: "Experte en développement commercial, Khady NDIAYE pilote la stratégie de vente et d'expansion d'Art'Beau-Rescence. Sa formation en commerce international lui permet d'identifier des opportunités de déploiement des solutions de l'entreprise au-delà des frontières sénégalaises.",
      image: "/images/team/team8.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/khady-ndiaye-b66b6b321/",
        email: "khady.ndiaye@artbeaurescence.sn"
      },
      skills: ["Développement commercial", "Négociation B2B", "Stratégie d'expansion internationale"]
    },
    {
      id: "team-9",
      name: "Yaye Ramatoulaye BA",
      role: "R&D Officer",
      bio: "Au sein du département R&D, Yaye Ramatoulaye BA apporte son expertise en électromécanique pour le développement des composants matériels des solutions d'Art'Beau-Rescence. Sa compréhension des systèmes mécaniques et électroniques est essentielle dans la conception de dispositifs robustes pour la sécurité routière.",
      image: "/images/team/team9.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/yaye-ramatoulaye-ba-niang-a66102172/",
        email: "yayeramatoulaye.ba@artbeaurescence.sn"
      },
      skills: ["Conception électromécanique", "Prototypage", "Tests de fiabilité"]
    },
    {
      id: "team-10",
      name: "Baye Daouda SEYE",
      role: "IT Manager",
      bio: "Baye Daouda SEYE supervise l'infrastructure informatique d'Art'Beau-Rescence tout en contribuant au développement des solutions logicielles. Son expertise technique assure la fiabilité des systèmes d'information et la qualité des applications développées par l'entreprise.",
      image: "/images/team/team10.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/baye-daouda-seye-6088a2249/",
        email: "bayedaouda.seye@artbeaurescence.sn"
      },
      skills: ["Gestion d'infrastructure IT", "Développement logiciel", "Administration système"]
    }
  ];
  
  const departments = [
    { 
      name: "Art'Beau-Team", 
      description: "Les experts qui construisent nos solutions innovantes",
      color: "from-indigo-600 to-blue-500"
    },
    { 
      name: "Art'Beau-Founder", 
      description: "Les visionnaires qui ont créé Art'Beau-Rescence",
      color: "from-blue-600 to-teal-500"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const scrollToTeam = () => {
    teamRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openMemberModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMemberModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Fermer le modal avec la touche Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMemberModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Style Apple */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-950 to-black text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/pattern.jpg')] bg-repeat opacity-10"></div>
        
        {/* Cercles lumineux améliorés */}
        <motion.div 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.7, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-teal-500/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[35vw] h-[35vw] bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
        ></motion.div>
        
        <motion.div 
          style={{ y, opacity, scale }}
          className="container mx-auto px-4 md:px-8 relative z-10 py-20 flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400">Notre Équipe</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light leading-relaxed">
              Des talents passionnés qui façonnent l'avenir technologique du Sénégal
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-md text-blue-200 mb-12 max-w-2xl mx-auto"
            >
              Découvrez les visionnaires derrière Art'Beau-Rescence, une équipe diverse et talentueuse unie par la passion de l'innovation
            </motion.p>
          </motion.div>

          {/* Founders Showcase - Style Apple */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mb-16"
          >
            {founders.slice(0, 3).map((founder, index) => (
              <motion.div
                key={founder.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative group"
                onClick={() => openMemberModal(founder)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent z-10"></div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-1">{founder.name}</h3>
                    <p className="text-teal-300 mb-3">{founder.role}</p>
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: 'auto' }}
                      className="text-blue-100 text-sm overflow-hidden"
                    >
                      {founder.quote}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            onClick={scrollToTeam}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-2 text-blue-100 hover:text-teal-300 transition-colors"
          >
            <span className="font-light tracking-wide">Découvrir toute l'équipe</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Team Section - Style Apple */}
      <section ref={teamRef} className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-teal-600 bg-clip-text text-transparent mb-6"
            >
              Une équipe talentueuse et diversifiée
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Chaque membre apporte son expertise unique pour créer des solutions innovantes qui transforment le paysage technologique africain.
            </motion.p>
          </div>

          {/* Department Tabs - Style Apple */}
          <div className="flex flex-col items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex p-1.5 bg-blue-50/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-md mb-4"
            >
              {departments.map((dept, index) => (
                <motion.button
                  key={dept.name}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: activeTab !== index ? 1.05 : 1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === index 
                      ? `bg-gradient-to-r ${dept.color} text-white shadow-lg` 
                      : "text-blue-800 hover:bg-blue-100"
                  }`}
                >
                  {dept.name}
                </motion.button>
              ))}
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={activeTab}
              className="text-gray-600 italic text-sm max-w-md text-center"
            >
              {departments[activeTab].description}
            </motion.p>
          </div>

          {/* Team Members Grid - Style Apple */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(activeTab === 0 ? teamMembers : 
              activeTab === 1 ? founders : 
              teamMembers.filter(m => ["Business Developer", "Project Manager"].includes(m.role))
            ).map((member, index) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                custom={index}
                onClick={() => openMemberModal(member)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs font-medium text-teal-300 mb-1">{member.role}</p>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.skills?.slice(0, 3).map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {member.socialLinks?.linkedin && (
                        <Link href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                          className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      )}
                      {member.socialLinks?.twitter && (
                        <Link href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          <Twitter className="h-4 w-4" />
                        </Link>
                      )}
                      {member.socialLinks?.email && (
                        <Link href={`mailto:${member.socialLinks.email}`}
                          className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          <Mail className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      <span className="mr-1 text-xs">Détails</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Member Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeMemberModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-2/5 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-600 opacity-90"></div>
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedMember.name}</h3>
                    <p className="text-teal-300 font-medium mb-6">{selectedMember.role}</p>
                    
                    {selectedMember.quote && (
                      <div className="mb-8">
                        <p className="italic text-blue-100 border-l-2 border-teal-400 pl-4 py-1">
                          "{selectedMember.quote}"
                        </p>
                      </div>
                    )}
                    
                    {selectedMember.skills && selectedMember.skills.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-sm uppercase tracking-wider text-blue-200 mb-3">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.skills.map((skill, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs px-2 py-1 rounded-full bg-white/10 text-white"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-200 mb-3">Contact</h4>
                    <div className="flex space-x-3">
                      {selectedMember.socialLinks?.linkedin && (
                        <Link href={selectedMember.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </Link>
                      )}
                      {selectedMember.socialLinks?.twitter && (
                        <Link href={selectedMember.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <Twitter className="h-5 w-5" />
                        </Link>
                      )}
                      {selectedMember.socialLinks?.email && (
                        <Link href={`mailto:${selectedMember.socialLinks.email}`}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <Mail className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/5 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-semibold text-gray-900">Biographie</h4>
                  <button 
                    onClick={closeMemberModal}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="prose prose-blue max-w-none">
                  <p>{selectedMember.bio}</p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Membre de l'équipe Art'Beau-Rescence</h4>
                  <Button variant="outline" className="w-full justify-between" onClick={closeMemberModal}>
                    <span>Retour à l'équipe</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}