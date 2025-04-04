"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Clock, Globe, Shield, Truck, Users, ChevronDown } from "lucide-react";

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeScreen, setActiveScreen] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const screensRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });
  const isScreensInView = useInView(screensRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  const dashboardScreens = [
    {
      image: "/images/produits/dash1.png",
      title: "Tableau de bord principal",
      description: "Vue d'ensemble complète de votre flotte avec indicateurs clés de performance et alertes en temps réel."
    },
    {
      image: "/images/produits/dash2.png",
      title: "Suivi des véhicules",
      description: "Localisez et suivez tous vos véhicules en temps réel avec historique des trajets et analyse des itinéraires."
    },
    {
      image: "/images/produits/dash3.png",
      title: "Analyse de conduite",
      description: "Évaluez le comportement des conducteurs et identifiez les opportunités d'amélioration pour une conduite plus sûre."
    },
    {
      image: "/images/produits/dash4.png",
      title: "Gestion des alertes",
      description: "Système d'alertes intelligent pour détecter les incidents et comportements à risque sur la route."
    },
    {
      image: "/images/produits/dash5.png",
      title: "Rapports détaillés",
      description: "Générez des rapports personnalisés sur la performance de votre flotte et l'efficacité opérationnelle."
    },
    {
      image: "/images/produits/dash6.png",
      title: "Maintenance prédictive",
      description: "Anticipez les besoins de maintenance de vos véhicules grâce à l'analyse des données et aux alertes préventives."
    },
    {
      image: "/images/produits/dash7.png",
      title: "Administration simplifiée",
      description: "Interface intuitive pour gérer les utilisateurs, les permissions et les paramètres de votre plateforme."
    }
  ];

  const features = [
    {
      icon: Globe,
      title: "Suivi en temps réel",
      description: "Localisez vos véhicules à tout moment et suivez leurs déplacements en direct sur une carte interactive."
    },
    {
      icon: Shield,
      title: "Sécurité avancée",
      description: "Détection des comportements à risque et alertes immédiates pour prévenir les accidents."
    },
    {
      icon: BarChart2,
      title: "Analyse de données",
      description: "Visualisez et analysez les performances de votre flotte avec des graphiques et tableaux de bord intuitifs."
    },
    {
      icon: Truck,
      title: "Gestion de flotte",
      description: "Gérez l'ensemble de vos véhicules, leur maintenance et leur utilisation depuis une interface centralisée."
    },
    {
      icon: Users,
      title: "Gestion des conducteurs",
      description: "Suivez les performances des conducteurs et proposez des formations ciblées pour améliorer la sécurité."
    },
    {
      icon: Clock,
      title: "Optimisation des trajets",
      description: "Réduisez les coûts opérationnels grâce à l'optimisation des itinéraires et à la réduction de la consommation."
    }
  ];

//   const tabs = [
//     "Vue d'ensemble",
//     "Fonctionnalités",
//     "Avantages",
//     "Tarification"
//   ];

  // Animations parallaxes
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Effet de changement automatique des écrans
  useEffect(() => {
    if (!isScreensInView) return;
    
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % dashboardScreens.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [dashboardScreens.length, isScreensInView]);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">Karangué 221</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 font-light">
              La plateforme SaaS qui révolutionne la gestion de flottes
            </p>
            <p className="text-md text-blue-200 mb-8">
              Powered by <span className="font-semibold">AI-Karangué</span> & Art'Beau-Rescence
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-blue-700/30 mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent z-10"></div>
            <Image
              src={dashboardScreens[0].image}
              alt="Karangué 221 Dashboard"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <h2 className="text-2xl font-bold mb-2">Plateforme intelligente de gestion de flottes</h2>
              <p className="text-blue-100">Optimisez vos opérations, améliorez la sécurité et réduisez vos coûts</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg">
              Demander une démo
            </Button>
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

      {/* Tabs Navigation */}
      {/* <section ref={featuresRef} className="sticky top-0 z-30 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto scrollbar-hide space-x-4 justify-center">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  activeTab === index
                    ? "bg-blue-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Product Showcase - Apple Style */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Une expérience utilisateur exceptionnelle
            </h2>
            <p className="text-xl text-gray-600">
              Karangué 221 redéfinit la gestion de flotte avec une interface intuitive et des fonctionnalités avancées
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
              <h3 className="text-3xl font-bold text-blue-900">Tableau de bord intelligent</h3>
              <p className="text-lg text-gray-600">
                Visualisez en un coup d'œil toutes les informations essentielles sur votre flotte. Notre tableau de bord 
                présente les KPIs les plus importants et vous alerte en temps réel des situations qui nécessitent votre attention.
              </p>
              <ul className="space-y-3">
                {[
                  "Vue d'ensemble complète de votre flotte",
                  "Indicateurs de performance en temps réel",
                  "Alertes intelligentes et personnalisables",
                  "Interface adaptative selon vos besoins"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-blue-900 hover:bg-blue-800 mt-4">
                Explorer le tableau de bord <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-200"
            >
              <Image
                src={dashboardScreens[0].image}
                alt="Tableau de bord Karangué 221"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-200 md:order-1 order-2"
            >
              <Image
                src={dashboardScreens[1].image}
                alt="Suivi des véhicules Karangué 221"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-teal-600/20 to-transparent"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6 md:order-2 order-1"
            >
              <h3 className="text-3xl font-bold text-blue-900">Suivi en temps réel</h3>
              <p className="text-lg text-gray-600">
                Localisez et suivez tous vos véhicules en temps réel sur une carte interactive. Analysez les itinéraires, 
                identifiez les retards et optimisez les trajets pour une efficacité maximale.
              </p>
              <ul className="space-y-3">
                {[
                  "Localisation GPS précise de chaque véhicule",
                  "Historique détaillé des trajets",
                  "Détection automatique des déviations d'itinéraire",
                  "Optimisation des routes en fonction du trafic"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-teal-600 hover:bg-teal-700 mt-4">
                Découvrir le suivi GPS <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Showcase */}
      <section ref={screensRef} className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Une plateforme complète
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez toutes les fonctionnalités de Karangué 221 conçues pour simplifier la gestion de votre flotte
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 mb-16">
            <div className="lg:col-span-2 space-y-1">
              {dashboardScreens.map((screen, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`p-2 rounded-xl cursor-pointer transition-all ${
                    activeScreen === index 
                      ? "bg-blue-900 text-white shadow-lg" 
                      : "bg-white hover:bg-blue-50 text-gray-700 border border-gray-200"
                  }`}
                  onClick={() => setActiveScreen(index)}
                >
                  <h3 className={`text-xl font-bold mb-2 ${activeScreen === index ? "text-white" : "text-blue-900"}`}>
                    {screen.title}
                  </h3>
                  {/* <p className={activeScreen === index ? "text-blue-100" : "text-gray-600"}>
                    {screen.description}
                  </p> */}
                </motion.div>
              ))}
            </div>
            
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-blue-200"
                >
                  <Image
                    src={dashboardScreens[activeScreen].image}
                    alt={dashboardScreens[activeScreen].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{dashboardScreens[activeScreen].title}</h3>
                    <p className="text-blue-100">{dashboardScreens[activeScreen].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Modernized */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-gray-600">
              Karangué 221 offre un ensemble complet d'outils pour optimiser la gestion de votre flotte
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-4 rounded-lg inline-block mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Avantages concurrentiels
            </h2>
            <p className="text-xl text-blue-100">
              Pourquoi Karangué 221 surpasse toutes les autres solutions du marché
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-10 border border-white/20 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-teal-300 mb-6">Retour sur investissement exceptionnel</h3>
              <p className="text-white text-lg mb-8">
                Notre solution offre un ROI exceptionnel de <span className="text-teal-300 font-bold text-4xl">10:1</span> grâce à:
              </p>
              <ul className="space-y-5">
                {[
                  "Réduction de 15% de la consommation de carburant",
                  "Diminution de 30% des accidents et incidents",
                  "Optimisation des trajets et réduction des temps d'arrêt",
                  "Prolongation de la durée de vie des véhicules"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-teal-300 text-xl mt-1">✓</span>
                    <span className="text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-10 border border-white/20 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-teal-300 mb-6">Témoignages clients</h3>
              
              <div className="space-y-8">
                {[
                  {
                    quote: "Nous avons réduit nos coûts opérationnels de 25% en seulement 6 mois d'utilisation de Karangué 221.",
                    author: "Yancoba Diéme, Directeur des Opérations, Ministre du Transport"
                  },
                  {
                    quote: "La plateforme nous a permis d'améliorer considérablement la sécurité de nos conducteurs et de réduire les incidents.",
                    author: "Olivier Boucal, Responsable Flotte, Ministre de la Fonction Publique"
                  },
                  {
                    quote: "L'interface intuitive et les rapports détaillés nous ont aidés à prendre de meilleures décisions stratégiques.",
                    author: "Amadou Diallo, CEO, Dakar Logistics"
                  }
                ].map((testimonial, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="border-l-4 border-teal-400 pl-6"
                  >
                    <p className="italic text-xl text-blue-100 mb-3">"{testimonial.quote}"</p>
                    <p className="text-teal-200">{testimonial.author}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
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
                Prêt à transformer la gestion de votre flotte avec Karangué 221?
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-blue-100 text-xl mb-12 max-w-3xl mx-auto"
              >
                Rejoignez les entreprises qui optimisent leurs opérations et améliorent leur rentabilité grâce à notre plateforme innovante.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg">
                  Demander une démo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}