"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Fuel, 
  Wrench, 
  User, 
  Zap, 
  TrendingUp, 
  Check, 
  Star,
  Calculator,
  Phone,
  ChevronDown,
  Target,
  Shield,
  BarChart3,
  Settings
} from "lucide-react";
import Link from "next/link";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  priceDetail: string;
  popular?: boolean;
  features: {
    icon: React.ElementType;
    name: string;
    included: boolean;
    description?: string;
  }[];
  benefits: string[];
  targetAudience: string;
  color: string;
  gradient: string;
}

export function PricingShowcase() {
  const [selectedTier, setSelectedTier] = useState<string>("standard");
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [roiData, setRoiData] = useState({
    vehicles: 10,
    sector: "transport",
    fuelCost: 500000,
    accidents: 2,
    maintenanceCost: 300000
  });
  const [calculatedROI, setCalculatedROI] = useState<any>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.2 });

  const pricingTiers: PricingTier[] = [
    {
      id: "basic",
      name: "Basic",
      description: "Solution essentielle pour débuter",
      price: "15,000",
      priceDetail: "FCFA / véhicule / mois",
      targetAudience: "PME, Taxis, Petites flottes (1-20 véhicules)",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      features: [
        {
          icon: MapPin,
          name: "Localisation GPS",
          included: true,
          description: "Suivi en temps réel de vos véhicules"
        },
        {
          icon: Fuel,
          name: "Suivi consommation carburant",
          included: true,
          description: "Monitoring et alertes de consommation"
        },
        {
          icon: Wrench,
          name: "Gestion maintenance",
          included: false
        },
        {
          icon: User,
          name: "Analyse comportement conducteur",
          included: false
        },
        {
          icon: Zap,
          name: "Intégration ERP",
          included: false
        },
        {
          icon: TrendingUp,
          name: "Optimisation processus métier",
          included: false
        }
      ],
      benefits: [
        "Réduction 10% coûts carburant",
        "Amélioration 25% ponctualité",
        "Dashboard simple et intuitif",
        "Support téléphonique 9h-17h"
      ]
    },
    {
      id: "standard",
      name: "Standard",
      description: "Solution complète pour la plupart des entreprises",
      price: "25,000",
      priceDetail: "FCFA / véhicule / mois",
      popular: true,
      targetAudience: "Entreprises moyennes, Transport public (20-100 véhicules)",
      color: "teal",
      gradient: "from-teal-500 to-teal-600",
      features: [
        {
          icon: MapPin,
          name: "Localisation GPS",
          included: true,
          description: "Suivi en temps réel + historiques détaillés"
        },
        {
          icon: Fuel,
          name: "Suivi consommation carburant",
          included: true,
          description: "Analytics avancées et prédictions"
        },
        {
          icon: Wrench,
          name: "Gestion maintenance",
          included: true,
          description: "Maintenance préventive et alertes"
        },
        {
          icon: User,
          name: "Analyse comportement conducteur",
          included: true,
          description: "Scoring et formation ciblée"
        },
        {
          icon: Zap,
          name: "Intégration ERP",
          included: false
        },
        {
          icon: TrendingUp,
          name: "Optimisation processus métier",
          included: false
        }
      ],
      benefits: [
        "Réduction 20% coûts carburant",
        "Diminution 35% accidents",
        "Réduction 30% coûts maintenance",
        "Rapports automatisés hebdomadaires",
        "Support prioritaire 7j/7"
      ]
    },
    {
      id: "advanced",
      name: "Avancé",
      description: "Solution premium avec intégrations métier",
      price: "45,000",
      priceDetail: "FCFA / véhicule / mois",
      targetAudience: "Grandes entreprises, Groupes (100+ véhicules)",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      features: [
        {
          icon: MapPin,
          name: "Localisation GPS",
          included: true,
          description: "Multi-sites, géofencing avancé"
        },
        {
          icon: Fuel,
          name: "Suivi consommation carburant",
          included: true,
          description: "IA prédictive et optimisation routes"
        },
        {
          icon: Wrench,
          name: "Gestion maintenance",
          included: true,
          description: "Maintenance prédictive par IA"
        },
        {
          icon: User,
          name: "Analyse comportement conducteur",
          included: true,
          description: "Coaching personnalisé et gamification"
        },
        {
          icon: Zap,
          name: "Intégration ERP",
          included: true,
          description: "APIs complètes et connecteurs"
        },
        {
          icon: TrendingUp,
          name: "Optimisation processus métier",
          included: true,
          description: "Workflows automatisés et BI"
        }
      ],
      benefits: [
        "Réduction 30% coûts opérationnels totaux",
        "ROI 12:1 en moyenne",
        "Diminution 50% accidents",
        "Intégration complète écosystème IT",
        "Support dédié 24/7 + CSM",
        "Formations équipes incluses"
      ]
    },
    {
      id: "custom",
      name: "Personnalisé",
      description: "Solution sur-mesure avec étude approfondie",
      price: "Sur devis",
      priceDetail: "Selon besoins spécifiques",
      targetAudience: "Secteurs spécialisés, Besoins complexes",
      color: "gradient",
      gradient: "from-blue-500 via-teal-500 to-purple-500",
      features: [
        {
          icon: Target,
          name: "Étude de cas personnalisée",
          included: true,
          description: "Analyse complète de votre environnement"
        },
        {
          icon: Calculator,
          name: "Calcul ROI détaillé",
          included: true,
          description: "Projection sur 3 ans avec garanties"
        },
        {
          icon: Shield,
          name: "Solution sur-mesure",
          included: true,
          description: "Développements spécifiques inclus"
        },
        {
          icon: BarChart3,
          name: "Toutes fonctionnalités Avancé",
          included: true,
          description: "+ modules custom selon besoins"
        },
        {
          icon: Settings,
          name: "Intégrations complexes",
          included: true,
          description: "Systèmes legacy, APIs propriétaires"
        },
        {
          icon: User,
          name: "Support white-label",
          included: true,
          description: "Votre marque, notre technologie"
        }
      ],
      benefits: [
        "ROI garanti contractuellement",
        "Délai implémentation optimisé",
        "Formation complète équipes",
        "Support technique dédié",
        "Évolutions produit prioritaires",
        "Partenariat technologique long terme"
      ]
    }
  ];

  const calculateROI = () => {
    const multipliers = {
      transport: 1.2,
      logistique: 1.5,
      entreprise: 1.0,
      construction: 2.0
    };

    const sectorMultiplier = multipliers[roiData.sector as keyof typeof multipliers];
    const monthlyFuel = roiData.fuelCost;
    const monthlyMaintenance = roiData.maintenanceCost;
    const accidentCost = roiData.accidents * 800000; // Coût moyen accident au Sénégal

    // Économies avec Karangué 221
    const fuelSavings = monthlyFuel * 0.18; // 18% économies carburant
    const maintenanceSavings = monthlyMaintenance * 0.25; // 25% réduction maintenance
    const accidentSavings = accidentCost * 0.4; // 40% réduction accidents

    const monthlyTotalSavings = (fuelSavings + maintenanceSavings + accidentSavings) * sectorMultiplier;
    const annualSavings = monthlyTotalSavings * 12;

    // Coût solution (Standard package pour calcul)
    const monthlyCost = roiData.vehicles * 25000;
    const annualCost = monthlyCost * 12;

    const roi = annualSavings / annualCost;
    const paybackMonths = Math.ceil(annualCost / monthlyTotalSavings);

    setCalculatedROI({
      monthlyTotalSavings,
      annualSavings,
      annualCost,
      roi,
      paybackMonths,
      netProfit: annualSavings - annualCost
    });
  };

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
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-950 to-black text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/pattern.jpg')] bg-repeat opacity-10"></div>
        
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">
                Nos Tarifs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light leading-relaxed">
              Solutions Karangué 221 adaptées à chaque besoin et budget
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-md text-blue-200 mb-12 max-w-2xl mx-auto"
            >
              Du package Basic pour débuter aux solutions personnalisées pour les grands groupes,
              trouvez la formule parfaite pour optimiser votre flotte
            </motion.p>
          </motion.div>

          {/* ROI Calculator Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mb-16"
          >
            <Button
              onClick={() => setShowROICalculator(!showROICalculator)}
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-xl"
            >
              <Calculator className="mr-2 h-5 w-5" />
              {showROICalculator ? "Masquer" : "Calculer mon ROI"}
            </Button>
          </motion.div>

          {/* ROI Calculator */}
          {showROICalculator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-16 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Calculateur ROI Personnalisé</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Secteur d'activité</label>
                    <select
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      value={roiData.sector}
                      onChange={(e) => setRoiData({...roiData, sector: e.target.value})}
                    >
                      <option value="transport" className="text-black">Transport Public</option>
                      <option value="logistique" className="text-black">Logistique</option>
                      <option value="entreprise" className="text-black">Entreprise</option>
                      <option value="construction" className="text-black">Construction/Mining</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre de véhicules</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200"
                      value={roiData.vehicles}
                      onChange={(e) => setRoiData({...roiData, vehicles: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Coût carburant/mois (FCFA)</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200"
                      value={roiData.fuelCost}
                      onChange={(e) => setRoiData({...roiData, fuelCost: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Accidents par an</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200"
                      value={roiData.accidents}
                      onChange={(e) => setRoiData({...roiData, accidents: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Coût maintenance/mois (FCFA)</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200"
                      value={roiData.maintenanceCost}
                      onChange={(e) => setRoiData({...roiData, maintenanceCost: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <Button
                    onClick={calculateROI}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
                  >
                    Calculer mon ROI
                  </Button>
                </div>
                
                {calculatedROI && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-xl p-6 border border-white/30"
                  >
                    <h4 className="text-xl font-bold mb-4 text-teal-300">Vos Résultats</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>ROI :</span>
                        <span className="font-bold text-2xl text-green-400">{calculatedROI.roi.toFixed(1)}:1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Économies annuelles :</span>
                        <span className="font-bold text-green-400">{calculatedROI.annualSavings.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coût annuel solution :</span>
                        <span>{calculatedROI.annualCost.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit net annuel :</span>
                        <span className="font-bold text-green-400">{calculatedROI.netProfit.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retour sur investissement :</span>
                        <span className="font-bold text-teal-300">{calculatedROI.paybackMonths} mois</span>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-white/10 rounded-lg">
                      <p className="text-sm text-blue-100">
                        💡 Ces calculs sont basés sur des moyennes sectorielles. 
                        Contactez-nous pour une étude personnalisée plus précise.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Choisissez votre formule
            </h2>
            <p className="text-xl text-gray-600">
              Solutions évolutives pour accompagner votre croissance
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16"
          >
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                variants={cardVariants}
                whileHover="hover"
                className={`relative ${tier.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Plus populaire
                    </div>
                  </div>
                )}
                
                <Card className={`h-full border-2 ${tier.popular ? 'border-teal-300 shadow-xl' : 'border-gray-200'} hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.gradient} flex items-center justify-center text-white`}>
                      {tier.id === 'custom' ? (
                        <Settings className="h-8 w-8" />
                      ) : tier.id === 'advanced' ? (
                        <Zap className="h-8 w-8" />
                      ) : tier.id === 'standard' ? (
                        <Star className="h-8 w-8" />
                      ) : (
                        <MapPin className="h-8 w-8" />
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-900 mb-2">{tier.name}</CardTitle>
                    <CardDescription className="text-gray-600 mb-4">{tier.description}</CardDescription>
                    
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-900 mb-1">{tier.price}</div>
                      <div className="text-sm text-gray-500">{tier.priceDetail}</div>
                    </div>
                    
                    <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700 font-medium">{tier.targetAudience}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Fonctionnalités incluses :</h4>
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`p-1 rounded-full ${feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {feature.included ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <div className="h-4 w-4 rounded-full bg-gray-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                              {feature.name}
                            </div>
                            {feature.description && feature.included && (
                              <div className="text-xs text-gray-500 mt-1">{feature.description}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Bénéfices clés :</h4>
                      {tier.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      {tier.id === 'custom' ? (
                        <>
                          <Button className="w-full bg-gradient-to-r from-blue-900 via-teal-600 to-purple-600 hover:from-blue-800 hover:via-teal-500 hover:to-purple-500 text-white">
                            Demander un devis
                          </Button>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/contact">
                              <Phone className="h-4 w-4 mr-2" />
                              Consulter un expert
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className={`w-full ${tier.popular ? 'bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700' : 'bg-blue-900 hover:bg-blue-800'} text-white`}>
                            Commencer l'essai gratuit
                          </Button>
                          <Button variant="outline" className="w-full">
                            Demander une démo
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-900 to-teal-600 text-white p-6">
              <h3 className="text-2xl font-bold text-center mb-2">Comparatif détaillé des fonctionnalités</h3>
              <p className="text-blue-100 text-center">Trouvez la solution parfaitement adaptée à vos besoins</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Fonctionnalité</th>
                    <th className="px-6 py-4 text-center font-semibold text-blue-600">Basic</th>
                    <th className="px-6 py-4 text-center font-semibold text-teal-600">Standard</th>
                    <th className="px-6 py-4 text-center font-semibold text-purple-600">Avancé</th>
                    <th className="px-6 py-4 text-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Personnalisé</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pricingTiers[0].features.map((feature, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{feature.name}</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="px-6 py-4 text-center">
                          {tier.features[idx]?.included ? (
                            <Check className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden mt-16"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
              <h3 className="text-4xl md:text-5xl font-bold mb-8">
                Prêt à optimiser votre flotte ?
              </h3>
              <p className="text-blue-100 text-xl mb-12 max-w-3xl mx-auto">
                Rejoignez plus de 500 entreprises qui ont choisi Karangué 221 pour transformer leur gestion de flotte
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg">
                  Essai gratuit 30 jours
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-6 text-lg">
                  Parler à un expert
                </Button>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-teal-300 mb-2">30 jours</div>
                  <div className="text-blue-100">Essai gratuit</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-300 mb-2">10:1</div>
                  <div className="text-blue-100">ROI moyen</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-300 mb-2">24/7</div>
                  <div className="text-blue-100">Support dédié</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
