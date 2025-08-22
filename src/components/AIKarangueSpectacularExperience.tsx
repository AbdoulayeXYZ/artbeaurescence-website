"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAIKarangueAnalytics } from '@/hooks/useAIKarangueAnalytics';

interface ExperienceState {
  phase: 'opening' | 'exploration' | 'revelation' | 'closing' | 'complete';
  openedBoxes: boolean[];
  currentBox: number | null;
  completedBoxes: number;
  showFinalMessage: boolean;
  isTransitioning: boolean;
}

export function AIKarangueSpectacularExperience() {
  const [experienceState, setExperienceState] = useState<ExperienceState>({
    phase: 'opening',
    openedBoxes: [false, false, false],
    currentBox: null,
    completedBoxes: 0,
    showFinalMessage: false,
    isTransitioning: false
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const hummingbirdControls = useAnimation();
  const screenShakeControls = useAnimation();
  const analytics = useAIKarangueAnalytics();

  // Suivi de la souris pour les effets dynamiques
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Mise à jour de l'heure pour la personnalisation contextuelle
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Animation d'ouverture dramatique
  useEffect(() => {
    if (experienceState.phase === 'opening') {
      performOpeningSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceState.phase]);

  // Track page visit
  useEffect(() => {
    analytics.trackEvent('page_visit');
  }, [analytics]);

  const performOpeningSequence = async () => {
    // Apparition progressive du colibri
    await hummingbirdControls.start({
      opacity: [0, 1],
      scale: [0.1, 1.5, 1],
      rotate: [0, 360],
      transition: { duration: 3, ease: "easeOut" }
    });

    await screenShakeControls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 0.5, repeat: 3 }
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Transition vers l'exploration
    setExperienceState(prev => ({ ...prev, phase: 'exploration' }));
  };

  const boxesContent = [
    {
      id: 0,
      title: "L'ÉLECTROCHOC",
      emoji: "⚡",
      color: "from-blue-900 via-blue-700 to-teal-600",
      shadowColor: "shadow-blue-500/50",
      glowColor: "shadow-blue-600/30",
      accentColor: "text-blue-300",
      content: {
        title: "LA RÉALITÉ BRUTALE",
        description: "Une vidéo vaut mille mots. Préparez-vous à voir la vérité en face.",
        videoUrl: "/images/optimized/BOX_1_web.mp4",
        message: "Chaque jour d'attente a un coût humain"
      }
    },
    {
      id: 1, 
      title: "LA RÉVÉLATION",
      emoji: "💡",
      color: "from-teal-600 via-teal-500 to-blue-600",
      shadowColor: "shadow-teal-500/50",
      glowColor: "shadow-teal-400/30",
      accentColor: "text-teal-300",
      content: {
        title: "LE FACTEUR HUMAIN",
        description: "Un simple repos aurait pu éviter l'irréparable. ",
        videoUrl: "/images/optimized/BOX_2_web.mp4",
        message: "Faisons en sorte que ça soit la dernière fois."
      }
    },
    {
      id: 2,
      title: "L'APPEL",
      emoji: "🔥",
      color: "from-blue-800 via-teal-700 to-blue-900",
      shadowColor: "shadow-blue-700/50",
      glowColor: "shadow-teal-500/30",
      accentColor: "text-blue-200",
      content: {
        title: "LE MOMENT DE VÉRITÉ",
        description: "Vous venez de voir la réalité. Vous venez de voir la solution.",
        message: `L'inaction coûte parfois plus cher que l'action.

Aujourd'hui, vous avez le pouvoir de changer cela.

La question n'est plus "Pourquoi ?" mais "Pourquoi pas maintenant ?"`
      }
    }
  ];

  const openBox = async (boxIndex: number) => {
    setExperienceState(prev => ({ ...prev, isTransitioning: true }));

    await screenShakeControls.start({
      x: [-2, 2, -2, 2, 0],
      y: [-1, 1, -1, 1, 0],
      transition: { duration: 0.5 }
    });

    const newOpenedBoxes = [...experienceState.openedBoxes];
    newOpenedBoxes[boxIndex] = true;
    
    setExperienceState(prev => ({
      ...prev,
      openedBoxes: newOpenedBoxes,
      currentBox: boxIndex,
      completedBoxes: newOpenedBoxes.filter(Boolean).length,
      isTransitioning: false
    }));

    analytics.trackBoxOpened(boxIndex);
  };

  const closeBox = () => {
    setExperienceState(prev => ({ ...prev, currentBox: null }));

    if (experienceState.completedBoxes === 3) {
      analytics.trackExperienceCompleted();
      setTimeout(() => {
        setExperienceState(prev => ({ ...prev, phase: 'revelation' }));
      }, 1000);
    }
  };

  const performRevelationSequence = async () => {
    // Animation spectaculaire de révélation finale
    await hummingbirdControls.start({
      scale: [1, 2, 1],
      rotate: [0, 720],
      transition: { duration: 2 }
    });

    setExperienceState(prev => ({ ...prev, phase: 'closing' }));
  };

  const performClosingSequence = async () => {
    // Animation finale épique
    await hummingbirdControls.start({
      x: [0, 100, 200, 100, 0, -100, -200, -100, 0],
      y: [0, -50, -100, -150, -200, -150, -100, -50, 0],
      scale: [1, 1.5, 1, 0.8, 0.5, 0.8, 1, 1.5, 0],
      opacity: [1, 1, 1, 0.8, 0.5, 0.8, 1, 1, 0],
      transition: { duration: 8, ease: "easeInOut" }
    });

    setExperienceState(prev => ({ 
      ...prev, 
      showFinalMessage: true,
      phase: 'complete'
    }));
  };

  // Couleurs dynamiques selon l'heure et la position de la souris (adaptées au thème du site)
  const getDynamicColors = () => {
    const hour = currentTime.getHours();
    const mouseInfluence = Math.sin(mousePosition.x * 0.01) * 0.1;
    
    if (hour < 6 || hour > 20) {
      return {
        bg: `from-slate-900 via-blue-900 to-blue-950`,
        text: 'text-blue-100',
        accent: 'text-teal-300'
      };
    } else if (hour < 12) {
      return {
        bg: `from-blue-900 via-blue-800 to-teal-800`,
        text: 'text-blue-100',
        accent: 'text-teal-300'
      };
    } else {
      return {
        bg: `from-blue-800 via-blue-900 to-teal-900`,
        text: 'text-blue-100',
        accent: 'text-teal-400'
      };
    }
  };

  const colors = getDynamicColors();

  // Phase d'ouverture SPECTACULAIRE
  if (experienceState.phase === 'opening') {
    return (
      <motion.div 
        animate={screenShakeControls}
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${colors.bg} relative overflow-hidden`}
      >
        {/* Effet de particules cosmiques adaptées au thème */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => {
            const colors = ['bg-teal-400', 'bg-blue-400', 'bg-white', 'bg-blue-300'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${randomColor} rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: 'drop-shadow(0 0 4px currentColor)'
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  x: Math.random() * 300 - 150,
                  y: Math.random() * 300 - 150,
                }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {/* Ondulations d'énergie */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '200px',
                height: '200px',
                border: '1px solid rgba(13, 148, 136, 0.3)',
                borderRadius: '50%',
              }}
              animate={{
                scale: [0, 4],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Logo animé au centre */}
        <motion.div 
          className="text-center z-10"
          animate={hummingbirdControls}
        >
          <motion.div className="relative mb-8">
            <motion.div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative">
              <motion.img
                src="/images/logo-annimation.png"
                alt="Art'Beau-Rescence Logo"
                className="w-full h-full object-contain filter drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: [0.8, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeOut",
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                onError={(e) => {
                  // Fallback en cas d'erreur de chargement de l'image
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-full flex items-center justify-center text-6xl text-teal-400';
                  fallback.innerHTML = '🔄';
                  target.parentNode?.appendChild(fallback);
                }}
              />
            </motion.div>
          </motion.div>

          <motion.h1 
            className={`text-6xl md:text-8xl font-black mb-4 ${colors.text} tracking-wider`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.5 }}
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.5)' }}
          >
            AI-Karangué
          </motion.h1>
          
          <motion.p 
            className={`text-2xl ${colors.accent} font-bold tracking-wide`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Sen Karangué, Sunu Yitté !
          </motion.p>
        </motion.div>

        {/* Effet de pulsation en arrière-plan avec thème site */}
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-transparent via-teal-400/10 to-transparent"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Spirales d'énergie */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`spiral-${i}`}
              className="absolute"
              style={{
                width: '400px',
                height: '400px',
                left: `${20 + i * 30}%`,
                top: `${10 + i * 25}%`,
                background: `conic-gradient(from 0deg, transparent, rgba(13, 148, 136, 0.1), transparent)`,
                borderRadius: '50%',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // Phase d'exploration avec effets dramatiques
  if (experienceState.phase === 'exploration') {
    return (
      <motion.div 
        animate={screenShakeControls}
        className={`min-h-screen bg-gradient-to-br ${colors.bg} relative overflow-hidden`}
      >
        {/* Effet de météores avec couleurs du thème */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const meteorColors = [
              'from-white via-teal-400 to-transparent',
              'from-teal-300 via-blue-400 to-transparent',
              'from-blue-300 via-teal-300 to-transparent'
            ];
            const randomColor = meteorColors[Math.floor(Math.random() * meteorColors.length)];
            
            return (
              <motion.div
                key={i}
                className={`absolute w-2 h-20 bg-gradient-to-b ${randomColor}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  transform: 'rotate(45deg)',
                  filter: 'drop-shadow(0 0 8px currentColor)'
                }}
                animate={{
                  y: ['0px', '120vh'],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.3]
                }}
                transition={{
                  duration: 1 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 8,
                  ease: "linear"
                }}
              />
            );
          })}
          
          {/* Fragments d'énergie flottants */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`fragment-${i}`}
              className="absolute w-1 h-1 bg-teal-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'drop-shadow(0 0 6px #0d9488)'
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * -200],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="absolute top-6 left-6 z-50">
          <Link href="/">
            <Button variant="ghost" size="sm" className={`${colors.text} hover:bg-white/20`}>
              <ArrowLeft className="mr-2" size={16} />
              Retour
            </Button>
          </Link>
        </div>


        {/* Titre central dramatique */}
        <motion.div 
          className="text-center pt-16 mb-20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <h1 className={`text-5xl md:text-7xl font-black mb-8 ${colors.text} tracking-wider`}>
            TROIS RÉVÉLATIONS
          </h1>
          <motion.p 
            className={`text-xl ${colors.accent} font-semibold max-w-3xl mx-auto px-4`}
            animate={{
              textShadow: [
                '0 0 10px rgba(255,255,255,0.3)',
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 10px rgba(255,255,255,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Qui changeront votre vision à jamais
          </motion.p>
        </motion.div>

        {/* Timeline de progression spectaculaire */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center space-x-8 bg-black/40 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20">
            {boxesContent.map((_, index) => {
              const isCompleted = experienceState.openedBoxes[index];
              const isCurrent = !isCompleted && (index === 0 || experienceState.openedBoxes[index - 1]);
              const isBlocked = !isCompleted && index > 0 && !experienceState.openedBoxes[index - 1];
              
              return (
                <React.Fragment key={index}>
                  <motion.div
                    className="relative flex flex-col items-center"
                    animate={{
                      scale: isCurrent ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                  >
                    {/* Numéro de la boîte */}
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow-lg shadow-teal-400/50' 
                          : isCurrent
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-400/50 animate-pulse'
                          : isBlocked
                          ? 'bg-gray-600 text-gray-400'
                          : 'bg-white/20 text-white'
                      }`}
                      animate={{
                        boxShadow: isCompleted 
                          ? ['0 0 10px rgba(13, 148, 136, 0.5)', '0 0 20px rgba(13, 148, 136, 0.8)', '0 0 10px rgba(13, 148, 136, 0.5)']
                          : isCurrent
                          ? ['0 0 10px rgba(251, 191, 36, 0.5)', '0 0 30px rgba(251, 191, 36, 0.8)', '0 0 10px rgba(251, 191, 36, 0.5)']
                          : undefined
                      }}
                      transition={{ duration: 2, repeat: (isCompleted || isCurrent) ? Infinity : 0 }}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </motion.div>
                    
                    {/* Label de statut */}
                    <motion.p 
                      className={`text-xs mt-2 font-semibold transition-colors duration-500 ${
                        isCompleted 
                          ? 'text-teal-300' 
                          : isCurrent
                          ? 'text-yellow-300'
                          : isBlocked
                          ? 'text-gray-500'
                          : 'text-white/60'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {isCompleted 
                        ? 'TERMINÉ' 
                        : isCurrent
                        ? 'SUIVANT'
                        : isBlocked
                        ? 'BLOQUÉ'
                        : 'EN ATTENTE'
                      }
                    </motion.p>
                    
                    {/* Indicateur de recommandation */}
                    {isCurrent && (
                      <motion.div
                        className="absolute -top-2 -right-2"
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <span className="text-lg">👆</span>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Connecteur entre les boîtes */}
                  {index < boxesContent.length - 1 && (
                    <motion.div
                      className={`w-16 h-1 transition-all duration-500 ${
                        experienceState.openedBoxes[index] 
                          ? 'bg-gradient-to-r from-teal-400 to-blue-600 shadow-lg shadow-teal-400/30'
                          : 'bg-white/20'
                      }`}
                      animate={{
                        scaleX: experienceState.openedBoxes[index] ? [0, 1] : 0.3,
                      }}
                      transition={{ duration: 0.8, delay: experienceState.openedBoxes[index] ? 0.5 : 0 }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Les trois boîtes avec effet WOW */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {boxesContent.map((box, index) => (
              <motion.div
                key={box.id}
                className="relative"
                initial={{ opacity: 0, y: 100, rotateY: -30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0,
                  scale: experienceState.openedBoxes[index] ? 1.05 : 1
                }}
                transition={{ delay: 0.3 + index * 0.2, duration: 1, type: "spring" }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className={`relative overflow-hidden border-0 bg-black/40 backdrop-blur-xl transition-all duration-500 group ${
                    experienceState.openedBoxes[index] 
                      ? 'ring-4 ring-teal-400 shadow-2xl shadow-teal-400/30' 
                      : (index === 0 || experienceState.openedBoxes[index - 1])
                      ? 'cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20'
                      : 'cursor-not-allowed opacity-60 hover:shadow-2xl hover:shadow-red-500/20'
                  }`}
                  onClick={() => {
                    const canOpen = !experienceState.openedBoxes[index] && (index === 0 || experienceState.openedBoxes[index - 1]);
                    if (canOpen) {
                      openBox(index);
                    }
                  }}
                >
                  <CardContent className="p-10 h-96 flex flex-col items-center justify-center text-center relative">
                    {/* Effet de lueur en arrière-plan */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${box.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    {!experienceState.openedBoxes[index] ? (
                      <>
                        {/* Boîte fermée avec effet spectaculaire */}
                        <motion.div
                          className={`w-32 h-32 rounded-2xl mb-8 bg-gradient-to-br ${box.color} ${box.shadowColor} shadow-2xl relative overflow-hidden group-hover:shadow-4xl`}
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                          <div className="absolute inset-2 bg-gradient-to-br from-transparent to-black/20 rounded-xl"></div>
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center text-6xl"
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {box.emoji}
                          </motion.div>
                        </motion.div>
                        
                        <motion.h3 
                          className="text-3xl font-black text-white mb-6 tracking-wider"
                          style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                        >
                          {box.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-teal-300 text-lg font-semibold"
                          animate={{
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          Cliquez pour révéler
                        </motion.p>
                        
                        {/* Effet de pulsation autour de la boîte */}
                        <motion.div
                          className="absolute inset-0 border-2 border-white/30 rounded-lg"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {/* Boîte ouverte avec explosion de particules */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="text-center relative"
                        >
                          {/* Explosion de particules */}
                          {[...Array(20)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-teal-400 rounded-full"
                              initial={{ 
                                x: 0, 
                                y: 0, 
                                scale: 0 
                              }}
                              animate={{
                                x: Math.cos(i * (360 / 20) * Math.PI / 180) * 100,
                                y: Math.sin(i * (360 / 20) * Math.PI / 180) * 100,
                                scale: [1, 0],
                                opacity: [1, 0]
                              }}
                              transition={{
                                duration: 1,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                          
                          <div className={`w-24 h-24 rounded-full mb-6 mx-auto bg-gradient-to-br ${box.color} flex items-center justify-center ${box.shadowColor} shadow-2xl`}>
                            <span className="text-4xl">✓</span>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-3">
                            RÉVÉLÉ
                          </h4>
                          <p className={`${boxesContent[index].accentColor} text-lg font-semibold`}>
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

        {/* Modal spectaculaire pour le contenu */}
        <AnimatePresence>
          {experienceState.currentBox !== null && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBox}
            >
              <motion.div
                className={`max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 backdrop-blur-xl rounded-3xl p-12 relative shadow-2xl border border-white/20`}
                initial={{ scale: 0.3, opacity: 0, rotateX: -30 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.3, opacity: 0, rotateX: 30 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <SpectacularBoxContent 
                  content={boxesContent[experienceState.currentBox].content}
                  onClose={closeBox}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message final spectaculaire */}
        {experienceState.completedBoxes === 3 && (
          <motion.div
            className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 150 }}
          >
                <Card className="bg-gradient-to-r from-blue-900 via-teal-600 to-blue-800 backdrop-blur-xl border-0 shadow-2xl shadow-blue-500/30">
              <CardContent className="p-8 text-center">
                <motion.p 
                  className="text-white mb-6 font-bold text-xl"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.8)',
                      '0 0 10px rgba(255,255,255,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎉 TOUTES LES VÉRITÉS RÉVÉLÉES ! 🎉
                  <br />
                  Êtes-vous prêt pour la TRANSFORMATION ULTIME ?
                </motion.p>
                <Button 
                  onClick={() => {
                    setExperienceState(prev => ({ ...prev, phase: 'revelation' }));
                  }}
                  className="bg-white text-blue-900 hover:bg-teal-300 hover:text-blue-800 font-black text-lg px-12 py-4 rounded-full shadow-lg transform hover:scale-110 transition-all"
                >
                  🚀 RÉVÉLATION FINALE 🚀
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Phase de révélation finale
  if (experienceState.phase === 'revelation') {
    return (
      <motion.div 
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 relative overflow-hidden flex items-center justify-center`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
        onAnimationComplete={() => {
          performRevelationSequence();
        }}
      >
        {/* Effet de supernova avec thème du site */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white via-teal-400 to-transparent"
          animate={{
            scale: [0, 4],
            opacity: [1, 0],
          }}
          transition={{ duration: 4, ease: "easeOut" }}
        />
        
        {/* Ondes de choc multiples */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shockwave-${i}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100px',
              height: '100px',
              border: '2px solid rgba(13, 148, 136, 0.6)',
              borderRadius: '50%',
            }}
            animate={{
              scale: [0, 6],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Éclairs d'énergie */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`lightning-${i}`}
            className="absolute top-1/2 left-1/2"
            style={{
              width: '2px',
              height: '200px',
              background: 'linear-gradient(to bottom, rgba(13, 148, 136, 1), transparent)',
              transformOrigin: 'top center',
              transform: `rotate(${i * 45}deg)`,
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 1 + i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}

        <motion.h1 
          className="text-8xl md:text-9xl font-black text-white text-center tracking-wider z-10"
          style={{ textShadow: '0 0 50px rgba(255,255,255,0.8)' }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          RÉVÉLATION !
        </motion.h1>
      </motion.div>
    );
  }

  // Phase finale avec le message puissant
  if (experienceState.phase === 'closing' || experienceState.phase === 'complete') {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${colors.bg} relative overflow-hidden`}>
        {/* Animation du logo épique */}
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
            <motion.img
              src="/images/logo-annimation.png"
              alt="AI-Karangé Logo"
              className="w-24 h-24 object-contain filter drop-shadow-xl"
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              onError={(e) => {
                // Fallback en cas d'erreur de chargement de l'image
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-24 h-24 flex items-center justify-center text-4xl text-teal-400';
                fallback.innerHTML = '🔄';
                target.parentNode?.appendChild(fallback);
              }}
            />
          </motion.div>
        </motion.div>

        {/* Message final ultra-puissant */}
        <AnimatePresence>
          {experienceState.showFinalMessage && (
            <motion.div
              className="text-center px-6 z-10 relative max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <motion.h1 
                className={`text-5xl md:text-7xl font-black mb-12 ${colors.text} tracking-wider`}
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.5)' }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1.5, type: "spring" }}
              >
                JE FAIS MA PART.
              </motion.h1>
              
              <motion.h2
                className={`text-4xl md:text-6xl font-black mb-16 ${colors.accent} tracking-wider`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1.5 }}
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
              >
                ET VOUS ?
              </motion.h2>

              <motion.div
                className="space-y-8 mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
              >
                <p className={`text-2xl md:text-3xl ${colors.text} font-bold leading-relaxed`}>
                  Vous détenez maintenant les clés pour transformer votre flotte et sauver des vies.
                </p>
                <motion.p 
                  className={`text-xl ${colors.accent} font-semibold`}
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(255,255,255,0.3)',
                      '0 0 20px rgba(255,255,255,0.6)',
                      '0 0 10px rgba(255,255,255,0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  L'INACTION N'EST PLUS UNE OPTION.
                </motion.p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-8 justify-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 1 }}
              >
                <Link href="/contact">
                  <Button 
                    size="lg" 
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-black rounded-full shadow-2xl shadow-teal-500/50 transform hover:scale-110 transition-all hover:shadow-teal-400/60"
                    onClick={() => {
                      analytics.trackDemoRequested();
                    }}
                  >
                    🚀 DEMANDER UNE DÉMONSTRATION 🚀
                  </Button>
                </Link>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/60 text-white hover:bg-white hover:text-black px-12 py-6 text-xl font-black rounded-full shadow-2xl transform hover:scale-110 transition-all"
                  onClick={() => {
                    analytics.trackShareClicked();
                    
                    if (navigator.share) {
                      navigator.share({
                        title: 'Expérience AI-Karangué - Révélation',
                        text: 'Je fais ma part pour des routes plus sûres au Sénégal 🔥',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  <Share2 className="mr-3" size={20} />
                  PARTAGER L'INSPIRATION
                </Button>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
              >
                <Link href="/">
                  <Button 
                    variant="ghost" 
                    className={`${colors.text} hover:bg-white/20 text-lg`}
                  >
                    <ArrowLeft className="mr-2" size={18} />
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

// Composant pour afficher le contenu spectaculaire des boîtes
function SpectacularBoxContent({ content, onClose }: { content: any; onClose: () => void }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="text-white relative">
      <div className="flex justify-between items-start mb-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-black tracking-wider"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {content.title}
        </motion.h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-white/20 text-2xl w-12 h-12 rounded-full"
        >
          ✕
        </Button>
      </div>

      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-2xl leading-relaxed opacity-90 font-semibold">
          {content.description}
        </p>

        {/* Affichage de la vraie vidéo si elle existe */}
        {content.videoUrl ? (
          <motion.div
            className="w-full aspect-video rounded-2xl overflow-hidden relative group shadow-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/images/video-poster.jpg"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
              autoPlay
              controls={false}
              playsInline
              preload="auto"
            >
              <source src={content.videoUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            
            {/* Overlay avec contrôles personnalisés */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={toggleVideo}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/30 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {isVideoPlaying ? (
                    <Pause size={32} />
                  ) : (
                    <Play size={32} className="ml-1" />
                  )}
                </Button>
              </div>
              
              {/* Indicateur de lecture */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  {isVideoPlaying ? '🎬 En lecture...' : '▶️ Cliquez pour regarder'}
                </div>
              </div>
            </div>
            
            {/* Effet de lueur animée */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 via-blue-500 to-teal-400 rounded-2xl opacity-30 -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ) : content.videoPlaceholder ? (
          /* Placeholder pour les autres boîtes */
          <motion.div
            className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🎬
              </motion.div>
              <p className="text-xl font-bold text-teal-400">{content.videoPlaceholder}</p>
              <p className="text-sm text-white/60 mt-2">Zone réservée pour votre vidéo</p>
            </div>
          </motion.div>
        ) : null}

        <motion.div
          className="border-t-2 border-white/30 pt-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p 
            className="text-2xl md:text-3xl font-black text-center leading-relaxed"
            style={{ textShadow: '0 0 15px rgba(255,255,255,0.3)' }}
            animate={{
              textShadow: [
                '0 0 15px rgba(255,255,255,0.3)',
                '0 0 25px rgba(255,255,255,0.6)',
                '0 0 15px rgba(255,255,255,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {content.message.split('\n').map((line: string, index: number) => (
              <span key={index} className="block mb-2">
                {line}
              </span>
            ))}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

