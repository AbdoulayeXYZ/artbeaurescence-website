"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import Link from "next/link";

export function ServicesShowcase() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  const services = [
    {
      title: "Video Telematics",
      subtitle: "Surveillance intelligente",
      description: "Surveillance vidéo intelligente pour monitorer le comportement du conducteur et détecter les situations à risque sur la route.",
      image: "/images/Vtelematic.png",
      video: "/videos/video-telematics.mp4", // Placeholder - remplacer par la vraie vidéo
      color: "from-blue-600 to-blue-800",
      features: [
        "Détection de fatigue et de distraction",
        "Analyse comportementale en temps réel",
        "Alertes immédiates pour les situations à risque",
        "Enregistrement des incidents pour analyse ultérieure"
      ],
      benefits: [
        "Réduction des accidents jusqu'à 60%",
        "Amélioration du comportement des conducteurs",
        "Diminution des coûts d'assurance",
        "Protection juridique avec preuves vidéo"
      ]
    },
    {
      title: "Vehicle Telematics",
      subtitle: "Gestion de flotte optimisée",
      description: "Gestion complète de votre flotte avec analyse des données et rapports détaillés sur la performance de vos véhicules.",
      image: "/images/Vtelemat.png",
      video: "/videos/vehicle-telematics.mp4", // Placeholder - remplacer par la vraie vidéo
      color: "from-teal-600 to-teal-800",
      features: [
        "Analyse de performance des véhicules",
        "Maintenance prédictive basée sur l'IA",
        "Rapports détaillés et personnalisables",
        "Intégration avec vos systèmes existants"
      ],
      benefits: [
        "Réduction des coûts de maintenance de 25%",
        "Prolongation de la durée de vie des véhicules",
        "Optimisation de la consommation de carburant",
        "Planification efficace des ressources"
      ]
    },
    {
      title: "Vehicle Tracking",
      subtitle: "Suivi en temps réel",
      description: "Suivi en temps réel de votre flotte avec détection d'événements critiques comme freinage brusque, excès de vitesse, détection d'impact et retournement.",
      image: "/images/Vtracking.png",
      video: "/videos/vehicle-tracking.mp4", // Placeholder - remplacer par la vraie vidéo
      color: "from-purple-600 to-purple-800",
      features: [
        "Suivi GPS haute précision",
        "Détection d'incidents automatique",
        "Historique complet des trajets",
        "Géofencing et alertes de zone"
      ],
      benefits: [
        "Visibilité totale sur votre flotte 24/7",
        "Réponse rapide aux situations d'urgence",
        "Optimisation des itinéraires et économies",
        "Amélioration du service client"
      ]
    }
  ];

  // Animations parallaxes
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Effet de changement automatique des services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [services.length]);

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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">Nos Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 font-light">
              Des solutions innovantes pour transformer votre gestion de flotte
            </p>
            <p className="text-md text-blue-200 mb-8">
              Powered by <span className="font-semibold">AI-Karangué</span> & Art'Beau-Rescence
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeService}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-blue-700/30 mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent z-10"></div>
              <Image
                src={services[activeService].image}
                alt={services[activeService].title}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h2 className="text-3xl font-bold mb-2">{services[activeService].title}</h2>
                <p className="text-blue-100 text-xl">{services[activeService].subtitle}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-row gap-4 justify-center mb-16"
          >
            {services.map((service, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveService(index)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeService === index 
                    ? "bg-teal-600 text-white" 
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.title}
              </motion.button>
            ))}
          </motion.div>

          <motion.button
            onClick={scrollToFeatures}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col items-center text-blue-200 hover:text-white transition-colors"
          >
            <span className="mb-2">Découvrir</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Services Showcase - Apple Style */}
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
              Des solutions qui transforment votre activité
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment nos services innovants peuvent optimiser vos opérations et améliorer votre rentabilité
            </p>
          </motion.div>

          {services.map((service, index) => (
            <div key={index} className={`mb-32 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Service Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`text-center mb-16 max-w-3xl mx-auto`}
              >
                <h3 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${service.color} mb-4`}>
                  {service.title}
                </h3>
                <p className="text-xl text-gray-600">{service.description}</p>
              </motion.div>

              {/* Service Content */}
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="space-y-6"
                >
                  <h4 className="text-2xl font-bold text-blue-900">Fonctionnalités principales</h4>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-teal-500 text-xl mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <h4 className="text-2xl font-bold text-blue-900 pt-4">Avantages</h4>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-teal-500 text-xl mt-1">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Link href="/contact">
                    <Button className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-white mt-6`}>
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-200"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${service.color} opacity-20`}></div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={toggleVideo}
                  >
                    <div className="bg-white/30 backdrop-blur-md rounded-full p-4">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={toggleVideo}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
              >
                <source src={services[activeService].video} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Ce que nos clients disent
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment nos services ont transformé les opérations de nos clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Grâce à la solution de Video Telematics, nous avons réduit nos accidents de 45% en seulement 6 mois.",
                author: "Yancoba Diéme",
                company: "Ministre du Transport",
                image: "/images/testimonial1.jpg" // Placeholder
              },
              {
                quote: "Le Vehicle Tracking nous a permis d'optimiser nos itinéraires et de réduire notre consommation de carburant de 20%.",
                author: "Olivier Boucal",
                company: "Ministre de la Fonction Publique",
                image: "/images/testimonial2.jpg" // Placeholder
              },
              {
                quote: "La maintenance prédictive de Vehicle Telematics nous a fait économiser des millions en réparations évitées.",
                author: "Amadou Diallo",
                company: "Dakar Logistics",
                image: "/images/testimonial3.jpg" // Placeholder
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                      {/* Placeholder for testimonial images */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-teal-500"></div>
                    </div>
                    <div>
                      <p className="font-bold text-blue-900">{testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white mb-8"
              >
                Prêt à transformer votre gestion de flotte?
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-blue-100 text-xl mb-12 max-w-3xl mx-auto"
              >
                Contactez-nous dès aujourd'hui pour une démonstration personnalisée de nos services
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/contact">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg">
                    Demander une démo
                  </Button>
                </Link>
                <Link href="/produits">
                  <Button size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-6 text-lg">
                    Découvrir nos produits
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}