"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function Services() {
  const services = [
    {
      title: "Video Telematics",
      description: "Surveillance vidéo intelligente pour monitorer le comportement du conducteur et détecter les situations à risque sur la route.",
      image: "/images/Vtelematic.png",
      features: ["Détection de fatigue", "Analyse comportementale", "Alertes en temps réel"]
    },
    {
      title: "Vehicle Telematics",
      description: "Gestion complète de votre flotte avec analyse des données et rapports détaillés sur la performance de vos véhicules.",
      image: "/images/Vtelemat.png",
      features: ["Analyse de performance", "Maintenance prédictive", "Rapports détaillés"]
    },
    {
      title: "Vehicle Tracking",
      description: "Suivi en temps réel de votre flotte avec détection d'événements critiques comme freinage brusque, excès de vitesse, détection d'impact et retournement.",
      image: "/images/Vtracking.png",
      features: ["Suivi GPS", "Détection d'incidents", "Historique des trajets"]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Nos Services</h2>
          <p className="text-gray-600">
            Des solutions de pointe pour optimiser la gestion de votre flotte et améliorer la sécurité routière
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <HoverCard>
                <HoverCardTrigger>
                  <Card className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-teal-200 group">
                    <CardHeader className="pb-4">
                      <div className="w-full h-48 relative mb-4 rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardTitle className="text-xl font-bold text-blue-900 group-hover:text-teal-600 transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-blue-900 text-white p-4">
                  <h4 className="font-semibold mb-2">Fonctionnalités clés:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-teal-400">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Optimisez votre investissement</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                <p className="text-white text-lg mb-4">
                  Notre solution AI-Karangué offre un retour sur investissement de{" "}
                  <span className="text-teal-400 font-bold text-3xl">10:1</span>
                </p>
                <p className="text-blue-100">
                  Grâce à la réduction des coûts opérationnels et l'amélioration de la sécurité
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {["Réduction de la consommation de carburant", 
                  "Diminution des accidents et incidents", 
                  "Optimisation des trajets"].map((benefit, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-teal-400 text-xl mb-2 block">✓</span>
                    <span className="text-white">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
