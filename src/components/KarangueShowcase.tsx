"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Fuel, 
  Settings, 
  MapPin, 
  ShieldCheck, 
  Thermometer, 
  Weight,
  User,
  Video,
  Cog,
  Puzzle
} from "lucide-react";

export function KarangueShowcase() {
  const serviceCategories = [
    {
      title: "Gestion du carburant",
      subtitle: "Fuel Management",
      description: "Contrôlez vos coûts, éliminez les vols, optimisez la consommation",
      icon: Fuel,
      color: "from-red-600 to-orange-600",
      services: [
        {
          name: "Contrôle niveau carburant",
          features: ["Surveillance temps réel", "Alertes niveau bas", "Historique détaillé"]
        },
        {
          name: "Surveillance consommation", 
          features: ["Analyse comportementale", "Rapports d'efficacité", "Comparaisons véhicules"]
        },
        {
          name: "Détection et prévention vol",
          features: ["Alertes instantanées", "Géolocalisation événements", "Preuves documentées"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise",
        benefits: [
          "Réduction des vols de carburant",
          "Optimisation de l'efficacité de la flotte", 
          "Diminution des coûts carburant",
          "ROI mesurable immédiatement"
        ]
      }
    },
    {
      title: "Maintenance de flotte",
      subtitle: "Fleet Maintenance", 
      description: "Anticipez, planifiez, économisez sur vos coûts opérationnels",
      icon: Settings,
      color: "from-blue-600 to-cyan-600",
      services: [
        {
          name: "Intervalles de service",
          features: ["Planification automatique", "Alertes préventives", "Suivi kilométrage/heures"]
        },
        {
          name: "Rapports maintenance",
          features: ["Historique complet", "Coûts par véhicule", "Tendances prédictives"]
        },
        {
          name: "Notifications intelligentes",
          features: ["Multi-canal", "Personnalisables", "Escalade automatique"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise", 
        benefits: [
          "Contrôle des coûts opérationnels",
          "Réduction temps immobilisation",
          "Prolongation durée vie véhicules",
          "Maintenance prédictive efficace"
        ]
      }
    },
    {
      title: "Suivi de flotte",
      subtitle: "Fleet Location Tracking",
      description: "Visibilité totale, sécurité renforcée, planification optimisée",
      icon: MapPin,
      color: "from-green-600 to-emerald-600", 
      services: [
        {
          name: "Détection de position",
          features: ["GPS haute précision", "Mise à jour temps réel", "Historique complet"]
        },
        {
          name: "Historique des trajets",
          features: ["Recherche avancée", "Export données", "Analyse comportementale"]
        },
        {
          name: "Rapports de voyage",
          features: ["Détails kilométrage", "Temps de conduite", "Arrêts et pauses"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise",
        benefits: [
          "Amélioration planification routes",
          "Sécurité flotte renforcée", 
          "Service client optimisé",
          "Réduction coûts carburant"
        ]
      }
    },
    {
      title: "Contrôle sécurité cargo",
      subtitle: "Cargo Safety Control",
      description: "Protégez vos marchandises, évitez les pertes financières",
      icon: ShieldCheck,
      color: "from-purple-600 to-violet-600",
      services: [
        {
          name: "Suivi du cargo",
          features: ["Surveillance continue", "Alertes mouvement", "Géolocalisation précise"]
        },
        {
          name: "Capteurs de porte", 
          features: ["Ouverture/fermeture", "Accès non autorisé", "Journal d'événements"]
        },
        {
          name: "Notifications sécurité",
          features: ["Temps réel", "Multi-destinataires", "Preuves photo/vidéo"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise",
        benefits: [
          "Prévention pertes financières",
          "Sécurisation marchandises",
          "Amélioration confiance client",
          "Réduction coûts assurance"
        ]
      }
    },
    {
      title: "Surveillance température",
      subtitle: "Temperature Monitoring", 
      description: "Préservez la qualité, respectez la chaîne du froid",
      icon: Thermometer,
      color: "from-cyan-600 to-blue-600",
      services: [
        {
          name: "Lectures capteurs",
          features: ["Précision ±0.1°C", "Calibration automatique", "Redondance capteurs"]
        },
        {
          name: "Rapports température",
          features: ["Graphiques détaillés", "Alertes seuils", "Conformité réglementaire"]
        },
        {
          name: "Notifications critiques",
          features: ["Seuils personnalisés", "Escalade urgente", "Preuve conformité"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise",
        benefits: [
          "Sécurité produits périssables",
          "Qualité marchandises préservée",
          "Conformité réglementaire",
          "Réduction pertes produits"
        ]
      }
    },
    {
      title: "Contrôle charge essieu",
      subtitle: "Axle Load Control",
      description: "Évitez les amendes, respectez la réglementation",
      icon: Weight,
      color: "from-amber-600 to-yellow-600",
      services: [
        {
          name: "Lectures capteurs poids",
          features: ["Mesure temps réel", "Calibration précise", "Multi-essieux"]
        },
        {
          name: "Rapports de charge", 
          features: ["Historique poids", "Dépassements seuils", "Conformité légale"]
        },
        {
          name: "Alertes dépassement",
          features: ["Prévention amendes", "Notification conducteur", "Rapport autorités"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise",
        benefits: [
          "Éviter amendes surcharge",
          "Conformité réglementaire",
          "Protection infrastructure",
          "Optimisation chargement"
        ]
      }
    },
    {
      title: "Contrôle comportement",
      subtitle: "Driver Behavior Control",
      description: "Conduite éco-responsable, sécurité renforcée, économies carburant",
      icon: User,
      color: "from-teal-600 to-green-600",
      services: [
        {
          name: "Paramètres éco-conduite",
          features: ["Seuils personnalisables", "Scores conducteurs", "Gamification"]
        },
        {
          name: "Rapports détaillés",
          features: ["Analyse comportementale", "Tendances mensuelles", "Comparaisons"]
        },
        {
          name: "Scoring conducteurs",
          features: ["Évaluation objective", "Programmes formation", "Récompenses"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise",
        benefits: [
          "Identification conduite dangereuse",
          "Réduction consommation carburant",
          "Amélioration sécurité routière",
          "Formation ciblée conducteurs"
        ]
      }
    },
    {
      title: "Surveillance vidéo",
      subtitle: "Video Monitoring",
      description: "Sécurité conducteur, prévention accidents, preuves légales",
      icon: Video,
      color: "from-pink-600 to-rose-600",
      services: [
        {
          name: "Streaming live",
          features: ["HD temps réel", "Multi-caméras", "Vision nocturne"]
        },
        {
          name: "Enregistrements événements",
          features: ["Déclenchement automatique", "Stockage sécurisé", "Preuves légales"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise",
        benefits: [
          "Sécurité conducteurs assurée",
          "Prévention accidents routiers", 
          "Preuves légales disponibles",
          "Réduction coûts assurance"
        ]
      }
    },
    {
      title: "Efficacité processus",
      subtitle: "Business Process Efficiency",
      description: "Optimisation logistique, visibilité totale, efficacité maximale",
      icon: Cog,
      color: "from-indigo-600 to-purple-600",
      services: [
        {
          name: "Logistique optimisée",
          features: ["Planification routes", "Gestion livraisons", "Optimisation temps"]
        },
        {
          name: "Surveillance conducteurs",
          features: ["Identification RFID", "Temps service", "Performance individuelle"]
        },
        {
          name: "Intégration iButton/RFID",
          features: ["Authentification", "Suivi personnalisé", "Rapports détaillés"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise",
        benefits: [
          "Optimisation efficacité flotte",
          "Visibilité complète opérations",
          "Réduction coûts logistiques",
          "Amélioration productivité"
        ]
      }
    },
    {
      title: "Solutions sur mesure",
      subtitle: "Unique Solutions", 
      description: "Personnalisation totale, intégration ERP, applications dédiées",
      icon: Puzzle,
      color: "from-gray-600 to-slate-600",
      services: [
        {
          name: "Rapports personnalisés",
          features: ["KPI sur mesure", "Tableaux de bord", "Export automatisé"]
        },
        {
          name: "Intégration ERP",
          features: ["APIs ouvertes", "Synchronisation données", "Workflow automatisés"]
        },
        {
          name: "Applications dédiées",
          features: ["Développement spécifique", "Interface personnalisée", "Formation incluse"]
        }
      ],
      businessEffect: {
        title: "Impact sur votre entreprise", 
        benefits: [
          "Solutions adaptées besoins",
          "Intégration systèmes existants",
          "Avantage concurrentiel",
          "ROI maximisé"
        ]
      }
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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
            Découvrez le potentiel de{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
              Karangué 221
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Transformez votre gestion de flotte avec des solutions complètes et personnalisées
          </p>
          <p className="text-lg text-gray-500">
            10 domaines d'expertise pour une efficacité opérationnelle maximale
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-2 gap-12 mb-20"
        >
          {serviceCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
              >
                {/* Category Header */}
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-blue-900 mb-1">{category.title}</h3>
                    <p className="text-sm text-gray-500 font-medium mb-2">{category.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{category.description}</p>
                  </div>
                </div>

                {/* Services List */}
                <div className="space-y-4 mb-6">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="border-l-2 border-gray-100 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <span 
                            key={featureIndex}
                            className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Business Effect */}
                <div className={`bg-gradient-to-r ${category.color} rounded-xl p-4 text-white`}>
                  <h4 className="font-bold mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {category.businessEffect.title}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {category.businessEffect.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 opacity-80"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-r from-blue-900 to-teal-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Plateforme Karangué 221 en chiffres</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-teal-300 mb-2">10+</div>
              <div className="text-blue-100">Domaines d'expertise</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-300 mb-2">30+</div>
              <div className="text-blue-100">Fonctionnalités intégrées</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-300 mb-2">99.9%</div>
              <div className="text-blue-100">Uptime garanti</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-300 mb-2">24/7</div>
              <div className="text-blue-100">Support technique</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
