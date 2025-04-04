"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

import { Trophy, Award, Medal, Star, Sparkles } from "lucide-react";
interface Achievement {
  title: string;
  position: string;
  icon: React.ElementType;
  color: string;
  description: string;
  image: string;
};

export function About() {
  const values = [
    {
      title: "Collaboration",
      description: "Nous travaillons avec des acteurs locaux pour maximiser notre impact."
    },
    {
      title: "Leadership",
      description: "Nous aspirons à faire du Sénégal un hub incontournable de l'innovation technologique."
    },
    {
      title: "Innovation",
      description: "Nous créons des solutions technologiques innovantes pour répondre aux défis locaux."
    },
  ];
  
  const partners = [
    {
      name: 'Bold Gainde Group',
      logo: '/images/partners/bold-gainde.png'
    },
    {
      name: 'MITTA',
      logo: '/images/partners/mitta.png'
    },
    {
      name: 'Gov\'Athon',
      logo: '/images/partners/govathon.png'
    },
    {
      name: 'MFPRSP',
      logo: '/images/partners/mfprsp.png'
    },
    {
      name: 'Star Group',
      logo: '/images/partners/star-group.png'
    }
  ];

  const achievements: Achievement[] = [
    {
      title: "Gov'athon 2024",
      position: "1er Prix",
      icon: Trophy,
      color: "text-yellow-400",
      description: "Excellence en Innovation Technologique",
      image: "/images/trophies/trophy-gold.png"
    },
    {
      title: "AfriTech",
      position: "4ème Prix",
      icon: Trophy,
      color: "text-blue-400",
      description: "Innovation Impact Continental",
      image: "/images/trophies/trophy-bronze.png"
    },
    {
      title: "Dakar Innovation Days",
      position: "2ème Prix",
      icon: Trophy,
      color: "text-teal-400",
      description: "Innovation Locale Exceptionnelle",
      image: "/images/trophies/trophy-silver.png"
    },
    {
      title: "Concours National d'Innovation",
      position: "2ème Prix",
      icon: Trophy,
      color: "text-purple-400",
      description: "Excellence Nationale",
      image: "/images/trophies/trophy-silver.png"
    }
  ];

  const valueIcons = {
    Collaboration: "",
    Leadership: "",
    Innovation: "",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  // Animation variant pour les trophées
  const trophyAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Qui sommes nous ?</h2>
          <p className="text-gray-600 text-lg">
            Découvrez l'histoire de notre entreprise et notre vision pour l'avenir de la technologie au Sénégal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div 
            className="order-2 md:order-1 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <span className="text-teal-500">⚡</span>
                Notre Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Nous aspirons à faire du Sénégal un hub incontournable de l'innovation technologique pour répondre aux défis locaux.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-teal-400">🌟</span>
                Art'Beau-Rescence S.A.S
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Une entreprise d'innovation technologique créée en 2022 par de jeunes innovateurs Sénégalais pour parfaire le monde de demain.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <span className="text-teal-500">🎯</span>
                Nos Missions
              </h3>
              <ul className="space-y-4">
                {["Créer un écosystème propice à l'innovation",
                  "Servir de modèle en matière d'innovation",
                  "Transformer la sécurité routière sénégalaise"].map((mission, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <span className="text-teal-500 text-xl">✓</span>
                    <span className="leading-tight">{mission}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div 
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-w-4 aspect-h-3 relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/images/1-pitch.jpeg"
                alt="L'équipe Art'Beau-Rescence"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.9)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-teal-500 opacity-20 blur-3xl z-0" />
            <div className="absolute -top-6 -right-6 w-48 h-48 rounded-full bg-blue-900 opacity-20 blur-3xl z-0" />
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-blue-900 mb-8 text-center">Nos Valeurs</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-100 hover:border-teal-300 transition-all group">
                      <div className="mb-4 text-4xl">
                        {valueIcons[value.title as keyof typeof valueIcons]}
                      </div>
                      <h4 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-teal-600 transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-gradient-to-br from-blue-900/95 to-blue-800/95 backdrop-blur-md text-white p-6 shadow-xl border border-white/10 rounded-xl transition-all duration-300 animate-in slide-in-from-bottom-2 hover:shadow-teal-500/20">
                    <div className="relative">
                      <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
                      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                      <h5 className="font-semibold text-teal-300 mb-3 relative z-10">Impact de {value.title}</h5>
                      <p className="text-blue-100 text-sm leading-relaxed relative z-10">
                        Cette valeur guide nos actions quotidiennes et façonne notre approche de l'innovation technologique au Sénégal.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section des distinctions avec la nouvelle animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-10 text-white relative overflow-hidden mb-20"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[url('/images/pattern.jpg')] opacity-5" />
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 backdrop-blur-[2px]" />
          
          <motion.div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h3 className="text-3xl font-bold text-center">Nos Distinctions</h3>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  variants={trophyAnimation}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="text-center group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <motion.div 
                      className="relative w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src={achievement.image}
                          alt={achievement.title}
                          fill
                          className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.h4 
                    className={`text-lg font-medium mb-2 ${achievement.color} group-hover:text-white transition-colors`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {achievement.title}
                  </motion.h4>
                  
                  <p className="text-sm text-blue-100 opacity-80 group-hover:opacity-100 transition-opacity">
                    {achievement.position}
                  </p>
                  
                  <p className="text-xs text-blue-200/70 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {achievement.description}
                  </p>

                  <motion.div 
                    className="h-1 w-12 mx-auto mt-4 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
                    style={{ color: achievement.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Nos Partenaires Privilégiés</h3>
            <p className="text-gray-600 text-lg">
              Ensemble, nous innovons pour un Sénégal plus technologique
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
                className="flex flex-col items-center justify-center group relative"
              >
                <motion.div 
                  className="relative w-40 h-20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-teal-500/5 to-blue-900/5 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-all duration-300" />
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      fill
                      className="object-contain filter drop-shadow-[0_0_8px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_0_12px_rgba(0,128,128,0.2)] transition-all duration-300"
                      sizes="(max-width: 768px) 40vw, 160px"
                    />
                  </div>
                </motion.div>
                <motion.span 
                  className="text-center font-medium text-gray-700 group-hover:text-blue-900 transition-colors relative mt-4"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {partner.name}
                </motion.span>
                <motion.div
                  className="h-0.5 w-0 bg-gradient-to-r from-teal-500 to-blue-900 rounded-full mt-2 group-hover:w-24 transition-all duration-300"
                  initial={{ width: 0 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}