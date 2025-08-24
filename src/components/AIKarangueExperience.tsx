"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Play, Pause, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAIKarangueAnalytics } from '@/hooks/useAIKarangueAnalytics';

interface ExperienceState {
  phase: 'opening' | 'exploration' | 'closing' | 'complete';
  openedBoxes: boolean[];
  currentBox: number | null;
  completedBoxes: number;
  showFinalMessage: boolean;
}

interface BoxContent {
  id: number;
  title: string;
  color: string;
  gradient: string;
  pulsColor: string;
  content: {
    type: 'reality' | 'transformation' | 'conscience';
    title: string;
    description: string;
    videoUrl?: string;
    stats?: { label: string; value: string; }[];
    finalMessage: string;
  };
}

export function AIKarangueExperience() {
  const [experienceState, setExperienceState] = useState<ExperienceState>({
    phase: 'opening',
    openedBoxes: [false, false, false],
    currentBox: null,
    completedBoxes: 0,
    showFinalMessage: false
  });

  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime] = useState(new Date());
  
  const hummingbirdControls = useAnimation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analytics = useAIKarangueAnalytics();

  // Mise à jour de l'heure pour la personnalisation contextuelle
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Gestion de l'audio ambiant
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/audio/senegal-nature.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }
  }, []);

  // Animation d'ouverture du colibri
  useEffect(() => {
    if (experienceState.phase === 'opening') {
      performOpeningSequence();
    }
  }, [experienceState.phase]);

  // Track page visit
  useEffect(() => {
    analytics.trackEvent('page_visit');
  }, []);

  const performOpeningSequence = async () => {
    // Séquence d'animation du colibri
    await hummingbirdControls.start({
      opacity: [0, 0.3, 0.7, 1],
      scale: [0.5, 0.8, 1.1, 1],
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 4,
        times: [0, 0.3, 0.7, 1],
        ease: "easeOut"
      }
    });

    // Pause psychologique d'une seconde
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Transition vers l'exploration
    setExperienceState(prev => ({ ...prev, phase: 'exploration' }));
  };

  const boxesContent: BoxContent[] = [
    {
      id: 0,
      title: "L'Électrochoc de la Réalité",
      color: "from-orange-500 to-red-600",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-600/20",
      pulsColor: "shadow-red-500/30",
      content: {
        type: 'reality',
        title: "La Réalité Brutale",
        description: "Une vidéo vaut mille mots. Préparez-vous à voir la vérité en face.",
        finalMessage: "Chaque jour d'attente a un coût humain"
      }
    },
    {
      id: 1,
      title: "La Révélation Transformatrice",
      color: "from-emerald-500 to-teal-600",
      gradient: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20",
      pulsColor: "shadow-emerald-500/30",
      content: {
        type: 'transformation',
        title: "Le Facteur Humain",
        description: "Un simple repos aurait pu éviter l'irréparable.",
        finalMessage: "Faisons en sorte que ça soit la dernière fois."
      }
    },
    {
      id: 2,
      title: "L'Appel à la Conscience",
      color: "from-amber-500 to-orange-600",
      gradient: "bg-gradient-to-br from-amber-500/20 to-orange-600/20",
      pulsColor: "shadow-amber-500/30",
      content: {
        type: 'conscience',
        title: "Le Moment de Vérité",
        description: "Vous venez de voir la réalité. Vous venez de voir les causes.",
        finalMessage: "L'inaction coûte parfois plus cher que l'action.\n\nAujourd'hui, vous avez le pouvoir de changer cela.\n\nLa question n'est plus \"Pourquoi ?\" mais \"Pourquoi pas maintenant ?\""
      }
    }
  ];

  const openBox = (boxIndex: number) => {
    const newOpenedBoxes = [...experienceState.openedBoxes];
    newOpenedBoxes[boxIndex] = true;
    
    setExperienceState(prev => ({
      ...prev,
      openedBoxes: newOpenedBoxes,
      currentBox: boxIndex,
      completedBoxes: newOpenedBoxes.filter(Boolean).length
    }));

    // Analytics tracking
    analytics.trackBoxOpened(boxIndex);
  };

  const closeBox = () => {
    setExperienceState(prev => ({
      ...prev,
      currentBox: null
    }));

    // Vérifier si toutes les boîtes ont été ouvertes
    if (experienceState.completedBoxes === 3) {
      analytics.trackExperienceCompleted();
      setTimeout(() => {
        setExperienceState(prev => ({ ...prev, phase: 'closing' }));
      }, 1000);
    }
  };

  const performClosingSequence = async () => {
    // Animation du colibri s'envolant en dessinant un cœur
    await hummingbirdControls.start({
      x: [0, 100, 200, 100, 0, -100, -200, -100, 0],
      y: [0, -50, -100, -150, -200, -150, -100, -50, 0],
      scale: [1, 1.2, 1, 0.8, 0.6, 0.8, 1, 1.2, 0],
      opacity: [1, 1, 1, 0.8, 0.6, 0.8, 1, 1, 0],
      transition: {
        duration: 6,
        ease: "easeInOut"
      }
    });

    setExperienceState(prev => ({ 
      ...prev, 
      showFinalMessage: true,
      phase: 'complete'
    }));
  };

  // Couleurs contextuelles selon l'heure
  const getContextualColors = () => {
    const hour = currentTime.getHours();
    if (hour < 6 || hour > 20) {
      return {
        bg: 'from-indigo-900 via-purple-900 to-pink-900',
        text: 'text-purple-100'
      };
    } else if (hour < 12) {
      return {
        bg: 'from-blue-600 via-cyan-600 to-teal-600',
        text: 'text-blue-100'
      };
    } else {
      return {
        bg: 'from-orange-600 via-pink-600 to-purple-600',
        text: 'text-orange-100'
      };
    }
  };

  const contextColors = getContextualColors();

  if (experienceState.phase === 'opening') {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${contextColors.bg}`}>
        <motion.div 
          className="text-center"
          animate={hummingbirdControls}
        >
          {/* Logo AI-Karangué avec colibri animé */}
          <motion.div className="relative mb-8">
            <motion.div
              className="w-32 h-32 mx-auto relative"
              whileHover={{ scale: 1.05 }}
            >
              {/* Colibri stylisé */}
              <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Corps du colibri */}
                <motion.ellipse
                  cx="50" cy="55"
                  rx="8" ry="20"
                  fill="url(#hummingbirdGradient)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                />
                {/* Ailes animées */}
                <motion.path
                  d="M35 45 Q25 35 20 45 Q25 55 35 50 Z"
                  fill="rgba(52, 211, 153, 0.8)"
                  animate={{ 
                    rotateZ: [0, -15, 15, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                />
                <motion.path
                  d="M65 45 Q75 35 80 45 Q75 55 65 50 Z"
                  fill="rgba(52, 211, 153, 0.8)"
                  animate={{ 
                    rotateZ: [0, 15, -15, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                />
                {/* Bec */}
                <motion.line
                  x1="50" y1="35"
                  x2="50" y2="25"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />
                
                <defs>
                  <linearGradient id="hummingbirdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
          </motion.div>

          <motion.h1 
            className={`text-4xl md:text-6xl font-bold mb-4 ${contextColors.text}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            AI-Karangué
          </motion.h1>
          
          <motion.p 
            className={`text-xl ${contextColors.text} opacity-80`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            L'expérience qui transforme votre vision
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (experienceState.phase === 'exploration') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${contextColors.bg} relative overflow-hidden`}>
        {/* Particules de fond */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="absolute top-6 left-6 z-50">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
              <ArrowLeft className="mr-2" size={16} />
              Retour
            </Button>
          </Link>
        </div>

        {/* Contrôles audio */}
        <div className="absolute top-6 right-6 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newState = !isAudioEnabled;
              setIsAudioEnabled(newState);
              if (audioRef.current) {
                if (newState) {
                  audioRef.current.play();
                } else {
                  audioRef.current.pause();
                }
              }
            }}
            className="text-white/80 hover:text-white"
          >
            {isAudioEnabled ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        </div>

        {/* Titre principal */}
        <motion.div 
          className="text-center pt-20 mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${contextColors.text}`}>
            Découvrez Votre Vérité
          </h1>
          <p className={`text-lg ${contextColors.text} opacity-80 max-w-2xl mx-auto px-4`}>
            Trois révélations vous attendent. Chacune changera votre perception de la gestion de flotte.
          </p>
        </motion.div>

        {/* Indicateur de progression */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2">
            {boxesContent.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  experienceState.openedBoxes[index] 
                    ? 'bg-teal-400 shadow-lg shadow-teal-400/50' 
                    : 'bg-white/30'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Les trois boîtes mystérieuses */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {boxesContent.map((box, index) => (
              <motion.div
                key={box.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              >
                <Card 
                  className={`relative overflow-hidden border-0 bg-white/10 backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-105 group ${
                    experienceState.openedBoxes[index] ? 'ring-2 ring-teal-400' : ''
                  }`}
                  onClick={() => !experienceState.openedBoxes[index] && openBox(index)}
                >
                  <CardContent className="p-8 h-80 flex flex-col items-center justify-center text-center">
                    {!experienceState.openedBoxes[index] ? (
                      <>
                        {/* Boîte fermée avec animation de pulsation */}
                        <motion.div
                          className={`w-24 h-24 rounded-xl mb-6 bg-gradient-to-br ${box.color} shadow-2xl ${box.pulsColor} group-hover:shadow-3xl`}
                          animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              `0 0 20px rgba(255,255,255,0.1)`,
                              `0 0 30px rgba(255,255,255,0.2)`,
                              `0 0 20px rgba(255,255,255,0.1)`
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <h3 className="text-xl font-bold text-white mb-4">
                          Révélation {index + 1}
                        </h3>
                        <p className="text-white/70 text-sm">
                          Cliquez pour découvrir
                        </p>
                      </>
                    ) : (
                      <>
                        {/* Boîte ouverte */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center"
                        >
                          <div className={`w-16 h-16 rounded-full mb-4 mx-auto bg-gradient-to-br ${box.color} flex items-center justify-center`}>
                            <span className="text-2xl">✓</span>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">
                            Découverte
                          </h4>
                          <p className="text-teal-400 text-sm">
                            {box.content.title}
                          </p>
                        </motion.div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal pour le contenu des boîtes */}
        <AnimatePresence>
          {experienceState.currentBox !== null && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBox}
            >
              <motion.div
                className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br ${boxesContent[experienceState.currentBox].gradient} backdrop-blur-md rounded-2xl p-8 relative`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <BoxContentDisplay 
                  content={boxesContent[experienceState.currentBox].content}
                  onClose={closeBox}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message final quand toutes les boîtes sont ouvertes */}
        {experienceState.completedBoxes === 3 && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Card className="bg-teal-600/90 backdrop-blur-md border-0 shadow-2xl">
              <CardContent className="p-6 text-center">
                <p className="text-white mb-4 font-medium">
                  Vous avez découvert les trois vérités. Êtes-vous prêt pour la transformation ?
                </p>
                <Button 
                  onClick={() => setExperienceState(prev => ({ ...prev, phase: 'closing' }))}
                  className="bg-white text-teal-600 hover:bg-white/90"
                >
                  Continuer l'expérience
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    );
  }

  if (experienceState.phase === 'closing' || experienceState.phase === 'complete') {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${contextColors.bg} relative overflow-hidden`}>
        {/* Animation du colibri s'envolant */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: experienceState.showFinalMessage ? 0.3 : 1 }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={experienceState.phase === 'closing' ? hummingbirdControls : {}}
            onAnimationComplete={() => {
              if (experienceState.phase === 'closing') {
                performClosingSequence();
              }
            }}
          >
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <ellipse cx="50" cy="55" rx="8" ry="20" fill="url(#hummingbirdGradient)" />
              <motion.path
                d="M35 45 Q25 35 20 45 Q25 55 35 50 Z"
                fill="rgba(52, 211, 153, 0.8)"
                animate={{ rotateZ: [0, -15, 15, 0] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
              />
              <motion.path
                d="M65 45 Q75 35 80 45 Q75 55 65 50 Z"
                fill="rgba(52, 211, 153, 0.8)"
                animate={{ rotateZ: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
              />
              <line x1="50" y1="35" x2="50" y2="25" stroke="#f59e0b" strokeWidth="2" />
              
              <defs>
                <linearGradient id="hummingbirdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Message final inspirant */}
        <AnimatePresence>
          {experienceState.showFinalMessage && (
            <motion.div
              className="text-center px-4 z-10 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <motion.h1 
                className={`text-4xl md:text-6xl font-bold mb-8 ${contextColors.text}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Je fais ma part.
              </motion.h1>
              
              <motion.h2
                className={`text-3xl md:text-5xl font-bold mb-12 ${contextColors.text}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                Et vous ?
              </motion.h2>

              <motion.div
                className="space-y-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                <p className={`text-lg ${contextColors.text} opacity-90 mb-8`}>
                  Vous détenez maintenant les clés pour transformer votre flotte et sauver des vies. 
                  L'inaction n'est plus une option.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4"
                      onClick={() => analytics.trackDemoRequested()}
                    >
                      Demander une démonstration
                    </Button>
                  </Link>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
                    onClick={() => {
                      analytics.trackShareClicked();
                      if (navigator.share) {
                        navigator.share({
                          title: 'Expérience AI-Karangué',
                          text: 'Je fais ma part pour des routes plus sûres au Sénégal',
                          url: window.location.href
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                  >
                    <Share2 className="mr-2" size={16} />
                    Partager l'inspiration
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <Link href="/">
                  <Button variant="ghost" className="text-white/70 hover:text-white">
                    <ArrowLeft className="mr-2" size={16} />
                    Retour à l'accueil
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}

// Composant pour afficher le contenu des boîtes
function BoxContentDisplay({ content, onClose }: { content: any; onClose: () => void }) {
  return (
    <div className="text-white">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{content.title}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          ✕
        </Button>
      </div>

      <div className="space-y-6">
        <p className="text-lg leading-relaxed opacity-90">
          {content.description}
        </p>

        {content.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.stats.map((stat: { label: string; value: string; }, index: number) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-2xl font-bold text-teal-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm opacity-80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="border-t border-white/20 pt-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xl font-semibold text-center italic">
            "{content.finalMessage}"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
