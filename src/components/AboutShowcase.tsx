"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Play, Sparkles, Trophy, Award, Medal, Star } from "lucide-react";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface Achievement {
  title: string;
  position: string;
  icon: React.ElementType;
  color: string;
  description: string;
  image: string;
}

export function AboutShowcase() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  const values = [
    {
      title: "Collaboration",
      description: "Nous travaillons avec des acteurs locaux pour maximiser notre impact.",
      icon: "",
      detail: "Notre approche collaborative nous permet de créer des solutions adaptées aux besoins spécifiques du marché sénégalais."
    },
    {
      title: "Leadership",
      description: "Nous aspirons à faire du Sénégal un hub incontournable de l'innovation technologique.",
      icon: "",
      detail: "En tant que pionniers, nous ouvrons la voie à une nouvelle génération d'entrepreneurs technologiques au Sénégal."
    },
    {
      title: "Innovation",
      description: "Nous créons des solutions technologiques innovantes pour répondre aux défis locaux.",
      icon: "",
      detail: "Notre équipe de jeunes talents développe des technologies de pointe adaptées aux réalités africaines."
    },
  ];
  
  const partners = [
    {
      name: 'Bold Gainde Group',
      logo: '/images/partners/bold-gainde.png',
      description: "Partenaire stratégique dans le développement de solutions innovantes"
    },
    {
      name: 'MITTA',
      logo: '/images/partners/mitta.png',
      description: "Collaboration sur des projets d'impact social"
    },
    {
      name: 'Gov\'Athon',
      logo: '/images/partners/govathon.png',
      description: "Partenaire d'innovation dans le secteur public"
    },
    {
      name: 'MFPRSP',
      logo: '/images/partners/mfprsp.png',
      description: "Soutien institutionnel pour nos initiatives"
    },
    {
      name: 'Star Group',
      logo: '/images/partners/star-group.png',
      description: "Alliance stratégique pour le déploiement de nos solutions"
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

  const milestones = [
    {
      year: "2022",
      title: "Création d'Art'Beau-Rescence",
      description: "Fondation de l'entreprise par de jeunes innovateurs sénégalais"
    },
    {
      year: "2023",
      title: "Lancement d'AI-Karangué",
      description: "Notre première solution de gestion de flotte intelligente"
    },
    {
      year: "2023",
      title: "Premier partenariat stratégique",
      description: "Collaboration avec Bold Gainde Group pour étendre notre impact"
    },
    {
      year: "2024",
      title: "Reconnaissance nationale",
      description: "Lauréat du Gov'athon 2024, confirmant notre excellence technologique"
    }
  ];

  // Animations parallaxes
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Animation variants
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

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Style Apple */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <motion.div 
          style={{ y, opacity, scale }}
          className="container mx-auto px-4 md:px-8 relative z-10 py-20 flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">Notre Histoire</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 font-light">
              Découvrez l'entreprise qui révolutionne la technologie au Sénégal
            </p>
            <p className="text-md text-blue-200 mb-8">
              <span className="font-semibold">Art'Beau-Rescence</span> - Façonner le monde de demain
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-blue-700/30 mb-12 float-animation"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent z-10"></div>
            <Image
              src="/images/test.jpeg"
              alt="L'équipe Art'Beau-Rescence"
              fill
              className="object-cover"
              priority
              style={{ filter: 'brightness(0.9)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <h2 className="text-2xl font-bold mb-2">Une équipe de jeunes innovateurs sénégalais</h2>
              <p className="text-blue-100">Créée en 2022 pour transformer le paysage technologique africain</p>
            </div>
          </motion.div>

          <motion.button
            onClick={scrollToFeatures}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col items-center text-blue-200 hover:text-white transition-colors"
          >
            <span className="mb-2">Découvrir notre histoire</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Vision & Mission Section */}
      <section ref={featuresRef} className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Notre Vision
            </h2>
            <p className="text-xl text-gray-600">
              Faire du Sénégal un hub incontournable de l'innovation technologique en Afrique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-blue-900">Art'Beau-Rescence S.A.S</h3>
              <p className="text-lg text-gray-600">
                Une entreprise d'innovation technologique créée en 2022 par de jeunes innovateurs Sénégalais pour parfaire le monde de demain. Notre mission est de transformer la sécurité routière et de créer un écosystème propice à l'innovation.
              </p>
              <ul className="space-y-3">
                {[
                  "Créer un écosystème propice à l'innovation",
                  "Servir de modèle en matière d'innovation",
                  "Transformer la sécurité routière sénégalaise",
                  "Développer des solutions adaptées aux réalités africaines"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-teal-500 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button className="bg-blue-900 hover:bg-blue-800 mt-4">
                En savoir plus <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-blue-100"
            >
              <div className="aspect-w-4 aspect-h-3 relative h-[400px]">
                <Image
                  src="/images/did.jpeg"
                  alt="L'équipe Art'Beau-Rescence"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-xl font-bold">Notre équipe</h4>
                  <p>Jeunes talents sénégalais passionnés par l'innovation</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-32"
          >
            <h3 className="text-3xl font-bold text-blue-900 mb-12 text-center">Notre Parcours</h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-900 to-teal-500"></div>
              
              {/* Timeline items */}
              <div className="space-y-24 relative">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16 text-right' : 'md:pl-16 text-left'}`}>
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:border-teal-300 transition-all group">
                        <div className="text-teal-600 font-bold text-xl mb-2">{milestone.year}</div>
                        <h4 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-teal-600 transition-colors">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-teal-500 border-4 border-white shadow-lg pulse-animation"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-32"
          >
            <h3 className="text-3xl font-bold text-blue-900 mb-12 text-center">Nos Valeurs</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-100 hover:border-teal-300 transition-all group h-full">
                        <div className="mb-6 text-5xl">
                          {value.icon}
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
                          {value.detail}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-10 text-white relative overflow-hidden mb-32"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
            <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 backdrop-blur-[2px]" />
            
            <motion.div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-12">
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
                    whileInView="animate"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center group"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <Image
                        src={achievement.image}
                        alt={achievement.title}
                        fill
                        className="object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]"
                      />
                      <motion.div
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3,
                          delay: index * 0.5
                        }}
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-400/20 to-transparent rounded-full"
                      />
                    </div>
                    <h4 className={`font-bold text-lg mb-1 ${achievement.color}`}>{achievement.position}</h4>
                    <p className="text-white font-medium">{achievement.title}</p>
                    <p className="text-blue-200 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-blue-900 mb-12 text-center">Nos Partenaires</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-teal-200 transition-all flex flex-col items-center text-center"
                >
                  <div className="relative w-24 h-24 mb-4">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-bold text-blue-900 mb-2">{partner.name}</h4>
                  <p className="text-sm text-gray-600">{partner.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-3xl font-bold text-blue-900 mb-6">Rejoignez notre aventure</h3>
            <p className="text-lg text-gray-600 mb-8">
              Découvrez comment nous pouvons collaborer pour créer un impact durable au Sénégal et en Afrique
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8">
                  Contactez-nous
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50 px-8">
                  Nos services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}