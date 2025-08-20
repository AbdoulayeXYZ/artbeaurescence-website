"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HardwareShowcase() {
  const devices = [
    {
      name: "Teltonika DSM",
      category: "Surveillance conducteur",
      description: "Votre tranquillité d'esprit sur la route. Ce système veille discrètement sur vos conducteurs, détectant la fatigue avant qu'elle ne devienne dangereuse, vous évitant stress et incidents coûteux.",
      benefits: ["Prévient les accidents", "Protège vos conducteurs", "Réduit vos assurances", "Améliore votre réputation"],
      features: ["Détection fatigue", "200 profils conducteurs", "Stockage 128GB", "Preuves photo/vidéo"],
      image: "https://hwdb-api.gurtam.com/images/other/64942baa489ce.png",
      link: "https://wialon.com/fr/sensors/teltonika-dsm"
    },
    {
      name: "Teltonika ADAS",
      category: "Assistant sécurité",
      description: "Votre copilote intelligent qui veille 24h/24. Il vous aide à éviter les collisions et capture automatiquement les preuves en cas d'incident, vous protégeant juridiquement.",
      benefits: ["Évite les collisions", "Preuves automatiques", "Protection juridique", "Conduite plus sereine"],
      features: ["Caméra 1280x720 HD", "Vision 60°", "Enregistrement H264", "Alertes temps réel"],
      image: "https://hwdb-api.gurtam.com/images/other/64be3c8700546.png",
      link: "https://wialon.com/fr/sensors/adas"
    },
    {
      name: "Teltonika DUALCAM",
      category: "Protection complète",
      description: "Vos yeux partout, tout le temps. Cette double caméra capture ce qui se passe devant ET derrière, vous donnant une vision complète pour résoudre rapidement tout litige ou incident.",
      benefits: ["Vision 360° complète", "Preuves irréfutables", "Résolution rapide litiges", "Sécurité renforcée"],
      features: ["Vision jour/nuit", "Angle 120°/70°", "Codec H265", "Double surveillance"],
      image: "https://hwdb-api.gurtam.com/images/other/64bfd553967fe.png",
      link: "https://wialon.com/fr/sensors/teltonika-dualcam"
    },
    {
      name: "Teltonika FMB140",
      category: "Suivi essentiel",
      description: "La base solide de votre tranquillité. Ce traceur vous permet de toujours savoir où sont vos véhicules, avec une fiabilité à toute épreuve qui vous épargne stress et incertitudes.",
      benefits: ["Localisation précise", "Récupération vol facile", "Optimisation trajets", "Économies carburant"],
      features: ["2G/4G LTE", "GPS GLONASS", "Capteurs intégrés", "Compatible CAN"],
      image: "https://hwdb-api.gurtam.com/images/20135680/5dcbd1a9a8e4a.png",
      link: "https://wialon.com/fr/gps-hardware/auto/teltonika-fmb140"
    },
    {
      name: "Teltonika FMC650",
      category: "Solution premium",
      description: "Le nec plus ultra pour votre flotte. Cette solution haut de gamme vous offre une visibilité et un contrôle total, transformant la gestion de flotte en un jeu d'enfant.",
      benefits: ["Contrôle total flotte", "Décisions éclairées", "Efficacité maximale", "ROI exceptionnel"],
      features: ["Double SIM", "Bluetooth 5.0", "Caméra intégrée", "Multi-serveurs"],
      image: "https://hwdb-api.gurtam.com/images/26816887/6450e3dbb800a.png",
      link: "https://wialon.com/fr/gps-hardware/auto/teltonika-fmc650#main"
    },
    {
      name: "Teltonika FMC125",
      category: "Efficacité compacte",
      description: "Petit mais puissant, ce traceur vous donne l'essentiel sans complication. Communication directe avec vos conducteurs et suivi précis, pour une gestion simple et efficace.",
      benefits: ["Installation simple", "Communication directe", "Gestion sans stress", "Rapport qualité/prix"],
      features: ["4G/LTE", "Appels vocaux", "ID conducteur", "Configuration GPRS"],
      image: "https://hwdb-api.gurtam.com/images/22847685/60378a041fdfe.png",
      link: "https://wialon.com/fr/gps-hardware/auto/teltonika-fmc125"
    }
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

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Votre tranquillité d'esprit, notre technologie
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Ces équipements ne sont pas là pour vous surveiller, mais pour vous protéger
          </p>
          <p className="text-lg text-gray-500">
            Chaque dispositif Teltonika est conçu pour vous faciliter la vie et sécuriser votre activité
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {devices.map((device, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200 group"
            >
              {/* Image du dispositif */}
              <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <Image
                  src={device.image}
                  alt={device.name}
                  width={200}
                  height={120}
                  className="object-contain max-h-32 group-hover:scale-105 transition-transform duration-300"
                  priority={index < 3}
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {device.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                {/* Titre */}
                <h3 className="text-xl font-bold text-blue-900 mb-3">{device.name}</h3>
                
                {/* Description orientée bénéfices */}
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">{device.description}</p>
                
                {/* Bénéfices utilisateur */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Vos avantages :
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {device.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-700">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fonctionnalités techniques */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Caractéristiques :</h4>
                  <div className="flex flex-wrap gap-1">
                    {device.features.map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-xs text-gray-600 font-medium">Compatible Karangué 221</p>
                  </div>
                  <a 
                    href={device.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center hover:underline transition-colors"
                  >
                    Fiche technique
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-r from-blue-900 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Écosystème Teltonika intégré</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Tous nos dispositifs Teltonika sont certifiés et parfaitement intégrés à la plateforme Karangué 221 
            pour une expérience utilisateur optimale et des données fiables.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-300 mb-2">6</div>
              <div className="text-blue-100">Modèles certifiés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-300 mb-2">99.9%</div>
              <div className="text-blue-100">Fiabilité</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-300 mb-2">24/7</div>
              <div className="text-blue-100">Support technique</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
