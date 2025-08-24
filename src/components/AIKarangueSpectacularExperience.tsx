"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAIKarangueAnalytics } from '@/hooks/useAIKarangueAnalytics';

interface ExperienceState {
  phase: 'opening' | 'exploration' | 'revelation' | 'closing' | 'complete' | 'roadmap';
  openedBoxes: boolean[];
  currentBox: number | null;
  completedBoxes: number;
  showFinalMessage: boolean;
  showFinalSpeech: boolean;
  isTransitioning: boolean;
  showingBoxTitle: number | null;
}

export function AIKarangueSpectacularExperience() {
  const [experienceState, setExperienceState] = useState<ExperienceState>({
    phase: 'opening',
    openedBoxes: [false, false, false],
    currentBox: null,
    completedBoxes: 0,
    showFinalMessage: false,
    showFinalSpeech: false,
    isTransitioning: false,
    showingBoxTitle: null
  });

  const [showBoxTitleFullscreen, setShowBoxTitleFullscreen] = useState<{ visible: boolean; title: string | null; }>({ visible: false, title: null });

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

  const revealBoxTitleThenContent = async (boxIndex: number) => {
    // Show the box title fullscreen
    setShowBoxTitleFullscreen({ visible: true, title: boxesContent[boxIndex].title });
    await new Promise(resolve => setTimeout(resolve, 3000));
    setShowBoxTitleFullscreen({ visible: false, title: null });

    // Then open the box content
    openBox(boxIndex);
  };

  const openBox = async (boxIndex: number) => {
    setExperienceState(prev => ({ ...prev, isTransitioning: true }));

    await screenShakeControls.start({
      x: [-2, 2, -2, 2, 0],
      y: [-1, 1, -1, 1, 0],
      transition: { duration: 0.5 }
    });
    
    setExperienceState(prev => {
      const newOpenedBoxes = [...prev.openedBoxes];
      newOpenedBoxes[boxIndex] = true;
      
      return {
        ...prev,
        openedBoxes: newOpenedBoxes,
        currentBox: boxIndex,
        completedBoxes: newOpenedBoxes.filter(Boolean).length,
        isTransitioning: false
      };
    });

    analytics.trackBoxOpened(boxIndex);
  };

  const closeBox = () => {
    setExperienceState(prev => ({ ...prev, currentBox: null }));

    if (experienceState.completedBoxes === 3) {
      analytics.trackExperienceCompleted();
      // Ne plus faire la transition automatique vers la révélation
      // L'utilisateur devra cliquer sur "Passer au discours"
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
                      // Use new reveal function
                      revealBoxTitleThenContent(index);
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
                  boxIndex={experienceState.currentBox}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton spectaculaire pour passer au discours après les 3 boîtes */}
        {experienceState.completedBoxes === 3 && !experienceState.showFinalSpeech && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 3, duration: 1.5, type: "spring", stiffness: 100 }}
            >
              <motion.h2
                className="text-4xl md:text-6xl font-black text-white mb-8 tracking-wider"
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.5)' }}
                animate={{
                  textShadow: [
                    '0 0 30px rgba(255,255,255,0.5)',
                    '0 0 50px rgba(255,255,255,0.8)',
                    '0 0 30px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                FÉLICITATIONS !
              </motion.h2>
              
              <motion.p
                className="text-xl md:text-2xl text-teal-300 mb-12 max-w-2xl mx-auto leading-relaxed font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 1 }}
              >
                Vous avez découvert les trois révélations qui changent tout.
                <br />
              </motion.p>
              
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Button
                  onClick={() => {
                    setExperienceState(prev => ({ ...prev, showFinalSpeech: true }));
                  }}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-12 py-6 text-2xl font-black rounded-full shadow-2xl shadow-teal-500/50 border-2 border-teal-400/30 transform hover:scale-110 transition-all duration-300"
                >
                  PASSER À LA SUITE
                </Button>
                
                {/* Effet de lueur pulsante */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-30 -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Particules magiques autour du bouton */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-teal-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 200],
                      y: [0, (Math.random() - 0.5) * 200],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Composant du discours final */}
        {experienceState.showFinalSpeech && (
          <FinalSpeechComponent 
            onStartJourney={() => {
              setExperienceState(prev => ({ ...prev, phase: 'roadmap' }));
            }}
          />
        )}

        {/* Affichage dramatique du titre en plein écran */}
        <AnimatePresence>
          {showBoxTitleFullscreen.visible && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-8xl md:text-9xl font-black text-white text-center px-4 leading-tight"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 1.5 }}
                style={{ textShadow: '0 0 40px rgba(255,255,255,0.9)' }}
              >
                {showBoxTitleFullscreen.title}
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
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
                     DEMANDER UNE DÉMONSTRATION 
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

  // Phase roadmap - Nouveau voyage avec les 5 étapes
  if (experienceState.phase === 'roadmap') {
    return (
      <RoadmapJourney 
        onBack={() => {
          setExperienceState(prev => ({ ...prev, phase: 'exploration', showFinalSpeech: false }));
        }}
      />
    );
  }

  return null;
}

// Composant pour la conversation avec Karangué Bot
function FinalSpeechComponent({ onStartJourney }: { onStartJourney: () => void }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const conversation = [
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "**MITTA** a ajouté Dem Dikk",
      isUser: false,
      isSystem: true,
      timestamp: "14:30"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "**MITTA** a ajouté AFTU",
      isUser: false,
      isSystem: true,
      timestamp: "14:30"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "**MITTA** a ajouté Car Rapid",
      isUser: false,
      isSystem: true,
      timestamp: "14:30"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "**MITTA** a ajouté AI-Karangué",
      isUser: false,
      isSystem: true,
      timestamp: "14:31"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "Salut tout le monde. J'ai une solution innovante à vous présenter pour améliorer notre sécurité routière.",
      isUser: true,
      isAdmin: true,
      timestamp: "14:31"
    },
    {
      sender: "Car Rapid",
      avatar: "/images/icone-carrapide.png",
      message: "Encore une nouvelle technologie ?",
      isUser: true,
      timestamp: "14:32"
    },
    {
      sender: "Dem Dikk",
      avatar: "/images/icone-bus.png",
      message: "Oui, c'est quoi cette fois ?",
      isUser: true,
      timestamp: "14:32"
    },
    {
      sender: "Car Rapid",
      avatar: "/images/icone-carrapide.png",
      message: "C'est sûr qu'ils vont installer des trucs sur nos portables pour nous surveiller?",
      isUser: true,
      timestamp: "14:35"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Bonjour à tous. Non, ce n'est pas du tout ça.",
      isUser: false,
      timestamp: "14:33"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Nous proposons une solution complète de gestion de flotte.",
      isUser: false,
      timestamp: "14:33"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Le voyageur monte dans vos bus et aura la tranquilité d'esprit !",
      isUser: false,
      timestamp: "14:33"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Le conducteur roule et aura la tranquilité d'esprit !",
      isUser: false,
      timestamp: "14:33"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Le gestionnaire de flotte contrôle et aura la tranquilité d'esprit !",
      isUser: false,
      timestamp: "14:33"
    },
    {
      sender: "AFTU",
      avatar: "/images/icone-aftu.png",
      message: "Ça surveille les chauffeurs ? Ils vont pas aimer ça.",
      isUser: true,
      timestamp: "14:34"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Au contraire, ça les protège.",
      isUser: false,
      timestamp: "14:35"
    },
    {
      sender: "Car Rapid",
      avatar: "/images/icone-carrapide.png",
      message: "C'est intéressant ça. Nous aussi on peut tester ?",
      isUser: true,
      timestamp: "14:35"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "Pour l'instant, on commence avec Dem Dikk. C'est notre partenaire pilote.",
      isUser: true,
      isAdmin: true,
      timestamp: "14:36"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "**MITTA** a retiré Car Rapid du groupe",
      isUser: false,
      isSystem: true,
      timestamp: "14:36"
    },
    {
      sender: "AFTU",
      avatar: "/images/icone-aftu.png",
      message: "Pourquoi vous l'avez retiré ?",
      isUser: true,
      timestamp: "14:37"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "On veut rester concentrés.",
      isUser: true,
      isAdmin: true,
      timestamp: "14:37"
    },
    {
      sender: "Dem Dikk",
      avatar: "/images/icone-bus.png",
      message: "OK mais concrètement, ça marche comment votre truc ?",
      isUser: true,
      timestamp: "14:38"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "On installe des devices dans vos bus. Et on vous donne un logiciel pour tout controler à distance.",
      isUser: false,
      timestamp: "14:39"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "le système aide le conducteur dans sa conduite, et assure qu'il ne fasse pas d'erreur.",
      isUser: false,
      timestamp: "14:39"
    },
    {
      sender: "Dem Dikk",
      avatar: "/images/icone-bus.png",
      message: "Et vous, qu'est-ce que vous gagnez là-dedans ?",
      isUser: true,
      timestamp: "14:40"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Honnêtement ? Pour l'instant, rien financièrement.",
      isUser: false,
      timestamp: "14:41"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Notre objectif, c'est qu'un jour on puisse dire : au Sénégal, la route ne tue plus.",
      isUser: false,
      timestamp: "14:41"
    },
    {
      sender: "AFTU",
      avatar: "/images/icone-aftu.png",
      message: "C'est beau tout ça, êtes vous sûr que ça marche?",
      isUser: true,
      timestamp: "14:42"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "Oui c'est AI-Karangué qu'en même",
      isUser: true,
      isAdmin: true,
      timestamp: "14:43"
    },
    {
      sender: "Dem Dikk",
      avatar: "/images/icone-bus.png",
      message: "Et pourquoi nous en premier ?",
      isUser: true,
      timestamp: "14:44"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Parce que vous êtes Dem Dikk 🇸🇳",
      isUser: false,
      timestamp: "14:45"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Et que vous croyez à l'innovation.",
      isUser: false,
      timestamp: "14:45"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "Les autres suivront",
      isUser: false,
      timestamp: "14:45"
    },
    {
      sender: "AFTU",
      avatar: "/images/icone-aftu.png",
      message: "Et nous, on fait quoi pendant ce temps ?",
      isUser: true,
      timestamp: "14:46"
    },
    {
      sender: "MITTA",
      avatar: "/images/icone-mitta.jpeg",
      message: "**MITTA** a retiré AFTU du groupe",
      isUser: false,
      isSystem: true,
      timestamp: "14:36"
    },
    {
      sender: "Dem Dikk",
      avatar: "/images/icone-bus.png",
      message: "Bon, concrètement, on fait comment pour commencer ?",
      isUser: true,
      timestamp: "14:48"
    },
    {
      sender: "AI-Karangué",
      avatar: "/images/logo-annimation.png",
      message: "juste dites OUI !",
      isUser: false,
      timestamp: "14:49"
    },
 
  ];

  // Fonction pour scroller automatiquement vers le bas
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Scroller automatiquement quand de nouveaux messages apparaissent
  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages, isTyping]);

  useEffect(() => {
    if (currentMessageIndex < conversation.length) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setDisplayedMessages(prev => [...prev, currentMessageIndex]);
          setCurrentMessageIndex(prev => prev + 1);
          setIsTyping(false);
        }, conversation[currentMessageIndex].isUser ? 2500 : 4000);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Conversation terminée
      setTimeout(() => {
        setShowContinueButton(true);
      }, 3000);
    }
  }, [currentMessageIndex, conversation.length]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center p-2 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Interface WhatsApp moderne */}
      <motion.div
        className="w-full max-w-md h-[95vh] md:h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
      >
        {/* Header WhatsApp style - Groupe */}
        <motion.div 
          className="bg-[#075E54] p-4 flex items-center gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">🚍</span>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold text-lg leading-tight">Transport Sénégal 🇸🇳</h2>
            <p className="text-green-200 text-xs opacity-90">MITTA, Dem Dikk, AFTU, +1 autre</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-200 text-xs font-medium">4 en ligne</span>
          </div>
        </motion.div>

        {/* Zone de conversation */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-gray-50 to-gray-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23f1f5f9' fill-opacity='0.6'%3e%3ccircle cx='10' cy='10' r='2'/%3e%3ccircle cx='50' cy='50' r='2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
          }}
        >
          <AnimatePresence>
            {displayedMessages.map((messageIndex) => {
              const msg = conversation[messageIndex];
              return (
                <motion.div
                  key={messageIndex}
                  className={`flex gap-3 ${msg.isUser ? 'justify-end' : 'justify-start'} mb-6`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {!msg.isUser && !msg.isSystem && (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg overflow-hidden border-2 border-white shadow-lg ${
                      msg.isSpecial 
                        ? 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-300' 
                        : 'bg-gradient-to-br from-teal-500 to-blue-600 border-teal-300'
                    }`}>
                      {msg.avatar.startsWith('/') ? (
                        <img 
                          src={msg.avatar} 
                          alt={`Avatar de ${msg.sender}`} 
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            // Fallback en cas d'erreur de chargement
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center text-lg text-white';
                            fallback.innerHTML = msg.sender === 'AI-Karangué' ? '🤖' : '🚌';
                            target.parentNode?.appendChild(fallback);
                          }}
                        />
                      ) : (
                        <span className="text-white font-bold">{msg.avatar}</span>
                      )}
                    </div>
                  )}
                  
                  <div className={`flex flex-col max-w-[75%] ${msg.isUser ? 'items-end' : 'items-start'}`}>
                    {/* Nom et timestamp */}
                    {!msg.isSystem && (
                      <div className={`flex items-center gap-2 mb-2 px-1 ${
                        msg.isUser ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <span className={`font-bold text-xs uppercase tracking-wider ${
                          msg.isUser 
                            ? msg.isAdmin
                              ? 'text-purple-700'
                              : 'text-blue-700'
                            : msg.isSpecial 
                            ? 'text-orange-700' 
                            : 'text-teal-700'
                        }`}>
                          {msg.sender}
                          {msg.isAdmin && ' 👑'}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {msg.timestamp}
                        </span>
                        {msg.isSpecial && (
                          <motion.span 
                            className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-xs font-bold shadow-md"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ⚡ RÉVÉLATION
                          </motion.span>
                        )}
                      </div>
                    )}

                    {/* Bulle de message */}
                    <motion.div
                      className={`relative px-4 py-3 rounded-2xl shadow-md max-w-full ${
                        msg.isSystem
                          ? 'bg-yellow-100 text-gray-700 border border-yellow-300 rounded-lg text-center italic'
                          : msg.isUser 
                          ? msg.isAdmin
                            ? 'bg-purple-600 text-white rounded-br-lg'
                            : 'bg-[#0084FF] text-white rounded-br-lg'
                          : msg.isSpecial
                          ? 'bg-gradient-to-br from-orange-100 to-red-50 text-gray-800 border-2 border-orange-200 rounded-bl-lg'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
                      }`}
                      animate={msg.isSpecial ? {
                        boxShadow: [
                          '0 4px 15px rgba(251, 146, 60, 0.2)',
                          '0 8px 25px rgba(251, 146, 60, 0.4)',
                          '0 4px 15px rgba(251, 146, 60, 0.2)'
                        ]
                      } : {}}
                      transition={msg.isSpecial ? { duration: 2, repeat: Infinity } : {}}
                    >
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {msg.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('\n').map((line: string, lineIndex: number) => (
                          <span key={lineIndex} className="block" dangerouslySetInnerHTML={{ __html: line }} />
                        ))}
                      </p>
                      
                      {/* Petite flèche de la bulle */}
                      {!msg.isSystem && (
                        <div className={`absolute top-4 w-0 h-0 ${
                          msg.isUser
                            ? `right-0 translate-x-1 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ${
                                msg.isAdmin ? 'border-l-[8px] border-l-purple-600' : 'border-l-[8px] border-l-[#0084FF]'
                              }`
                            : 'left-0 -translate-x-1 border-r-[8px] border-r-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent'
                        } ${msg.isSpecial && !msg.isUser ? 'border-r-orange-100' : ''}`} />
                      )}
                    </motion.div>

                    {/* Statut de lecture (style WhatsApp) */}
                    {msg.isUser && (
                      <div className="flex items-center gap-1 mt-1 mr-2">
                        <motion.div
                          className="flex gap-0.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="w-3 h-3 text-blue-400 text-xs">✓</div>
                          <div className="w-3 h-3 text-blue-400 text-xs -ml-1">✓</div>
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {msg.isUser && !msg.isSystem && (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg overflow-hidden border-2 shadow-lg ${
                      msg.isAdmin 
                        ? 'bg-gradient-to-br from-purple-600 to-purple-700 border-purple-300'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-300'
                    }`}>
                      {msg.avatar.startsWith('/') ? (
                        <img 
                          src={msg.avatar} 
                          alt={`Avatar de ${msg.sender}`} 
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            // Fallback en cas d'erreur de chargement
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center text-lg text-white';
                            fallback.innerHTML = msg.sender === 'Dem Dikk' ? '🚌' : msg.sender === 'AFTU' ? '🚌' : msg.sender === 'Car Rapid' ? '🚐' : '👨🏾‍💼';
                            target.parentNode?.appendChild(fallback);
                          }}
                        />
                      ) : (
                        <span className="text-white font-bold">{msg.avatar}</span>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Indicateur de frappe */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex gap-3 justify-start mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg overflow-hidden border-2 border-white shadow-lg ${
                  currentMessageIndex < conversation.length && conversation[currentMessageIndex]?.isSpecial 
                    ? 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-300' 
                    : 'bg-gradient-to-br from-teal-500 to-blue-600 border-teal-300'
                }`}>
                  {/* Affichage correct du logo selon le type de message */}
                  {currentMessageIndex < conversation.length ? (
                    conversation[currentMessageIndex].avatar.startsWith('/') ? (
                      <img 
                        src={conversation[currentMessageIndex].avatar} 
                        alt={`Avatar de ${conversation[currentMessageIndex].sender}`} 
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center text-lg text-white';
                          fallback.innerHTML = conversation[currentMessageIndex].sender === 'AI-Karangué' ? '🤖' : conversation[currentMessageIndex].isSpecial ? '⚡' : '🚌';
                          target.parentNode?.appendChild(fallback);
                        }}
                      />
                    ) : (
                      <span className="text-white font-bold">{conversation[currentMessageIndex].avatar}</span>
                    )
                  ) : (
                    <span className="text-white font-bold text-lg">🤖</span>
                  )}
                </div>
                
                <div className="flex flex-col max-w-[75%] items-start">
                  {/* Nom de celui qui écrit */}
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className={`font-bold text-xs uppercase tracking-wider ${
                      currentMessageIndex < conversation.length && conversation[currentMessageIndex]?.isSpecial 
                        ? 'text-orange-700' 
                        : 'text-teal-700'
                    }`}>
                      {currentMessageIndex < conversation.length ? conversation[currentMessageIndex].sender : 'AI-Karangué'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">en train d'écrire...</span>
                  </div>

                  {/* Bulle d'écriture */}
                  <motion.div
                    className={`relative px-4 py-3 rounded-2xl shadow-md ${
                      currentMessageIndex < conversation.length && conversation[currentMessageIndex]?.isSpecial
                        ? 'bg-gradient-to-br from-orange-100 to-red-50 border-2 border-orange-200 rounded-bl-lg'
                        : 'bg-white border border-gray-200 rounded-bl-lg'
                    }`}
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <motion.div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            currentMessageIndex < conversation.length && conversation[currentMessageIndex]?.isSpecial
                              ? 'bg-orange-400'
                              : 'bg-gray-400'
                          }`}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>
                    
                    {/* Petite flèche de la bulle */}
                    <div className={`absolute top-4 left-0 -translate-x-1 w-0 h-0 border-r-[8px] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ${
                      currentMessageIndex < conversation.length && conversation[currentMessageIndex]?.isSpecial
                        ? 'border-r-orange-100'
                        : 'border-r-white'
                    }`} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bouton de continuation */}
        <AnimatePresence>
          {showContinueButton && (
            <motion.div
              className="p-6 border-t border-white/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Button
                  onClick={onStartJourney}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 text-xl font-black rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                   DÉCOUVRIR NOTRE ROADMAP 
                </Button>
              </motion.div>
              
              <motion.p 
                className="text-teal-300 mt-4 text-sm font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Voir notre plan en 5 étapes pour révolutionner votre flotte
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Composant pour le voyage roadmap avec les 5 étapes
function RoadmapJourney({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEndAnimation, setShowEndAnimation] = useState(false);

  const roadmapSteps = [
    {
      id: 1,
      number: 1,
      title: "NOTRE RENCONTRE",
      subtitle: "Le point de départ",
      description: "Nous sommes ici, maintenant, en train de découvrir ensemble les possibilités infinies d'AI-Karangué. Cette rencontre marque le début d'une transformation qui va révolutionner votre approche de la sécurité routière.",
      color: "from-blue-600 to-teal-600",
      glowColor: "shadow-blue-500/50",
      status: "current",
    },
    {
      id: 2,
      number: 2,
      title: "PILOTE GAMOU",
      subtitle: "Installation de 10 bus Dem Dikk",
      description: "Avant l'événement sacré du Gamou, nous équipons 10 véhicules de la flotte Dem Dikk avec AI-Karangué. Une installation discrète mais révolutionnaire qui va transformer ces bus en gardiens intelligents de la route.",
      color: "from-teal-600 to-green-600",
      glowColor: "shadow-teal-500/50",
      status: "next",
    },
    {
      id: 3,
      number: 3,
      title: "MONITORING GAMOU",
      subtitle: "Surveillance en temps réel",
      description: "Pendant les 3 jours du Gamou, nos 10 bus deviennent nos ambassadeurs technologiques. Chaque trajet, chaque donnée, chaque intervention d'AI-Karangué est méticuleusement enregistrée et analysée en temps réel.",
      color: "from-green-600 to-yellow-600",
      glowColor: "shadow-green-500/50",
      status: "upcoming",
    },
    {
      id: 4,
      number: 4,
      title: "RAPPORT DÉTAILLÉ",
      subtitle: "Insights & Recommandations",
      description: "Dans les 48h suivant le Gamou, vous recevez un rapport complet : incidents évités, données biométriques, optimisations de trajets, économies réalisées. Une vision 360° de l'impact d'AI-Karangué sur votre flotte.",
      color: "from-yellow-600 to-orange-600",
      glowColor: "shadow-yellow-500/50",
      status: "upcoming",
    },
    {
      id: 5,
      number: 5,
      title: "VOTRE DÉCISION",
      subtitle: "L'engagement mutuel",
      description: "5 jours après le rapport, c'est le moment de vérité. Vos impressions, votre décision, votre engagement. Si l'aventure vous convainc, nous entamons ensemble un nouveau voyage vers une flotte 100% sécurisée.",
      color: "from-orange-600 to-red-600",
      glowColor: "shadow-orange-500/50",
      status: "upcoming",
    }
  ];

  const moveToStep = async (stepIndex: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep(stepIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/20"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2" size={16} />
          Retour
        </Button>
      </div>

      {/* Titre principal */}
      <motion.div 
        className="text-center py-8 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-wider">
          NOTRE ROADMAP
        </h1>
        <p className="text-lg text-teal-300 font-semibold">
          5 étapes vers une révolution de votre flotte
        </p>
      </motion.div>

      {/* Conteneur principal divisé en 2 */}
      <div className="flex h-[calc(100vh-200px)] relative z-10">
        
        {/* Partie gauche - Bus qui descend avec scroll synchronisé */}
        <div className="w-1/2 relative">
          {/* Fond de route pour la partie gauche - FIXE */}
          <div className="fixed top-0 left-0 w-1/2 h-screen opacity-20 z-0">
            {/* Lignes de route verticales */}
            <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-white/40 transform -translate-x-1/2 shadow-lg" />
            <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2">
              {/* Tirets de route plus nombreux et animés */}
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-12 bg-yellow-400/70 mx-auto mb-6"
                  style={{ marginTop: `${i * 2.5}%` }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scaleY: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
            
            {/* Bordures de route */}
            <div className="absolute left-1/2 top-0 bottom-0 w-32 transform -translate-x-1/2">
              <div className="absolute -left-16 top-0 bottom-0 w-1 bg-white/30" />
              <div className="absolute -right-16 top-0 bottom-0 w-1 bg-white/30" />
            </div>
          </div>

          {/* Bus animé FIXE qui suit les étapes */}
          <motion.div
            className="fixed left-1/4 z-30"
            animate={{
              top: `${20 + (currentStep / (roadmapSteps.length - 1)) * 50}%`
            }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut",
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            style={{ transform: 'translateX(-50%) translateY(-50%)' }}
          >
            {/* Halo énergétique autour du bus - PLUS GRAND */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-teal-400/60 via-blue-400/30 to-transparent rounded-full"
              animate={{
                scale: [2, 2.8, 2],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ width: '300px', height: '300px', left: '-75px', top: '-75px' }}
            />
            
            {/* Bus principal ULTRA-SPECTACULAIRE et PLUS GRAND */}
            <motion.div className="relative">
              <motion.img
                src="/images/icone-bus.png"
                alt="Bus AI-Karangué en mouvement"
                className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain filter drop-shadow-2xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 4, -4, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPCEtLSBDb3JwcyBkdSBidXMgLS0+CiAgPHJlY3QgeD0iMjUiIHk9IjYwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjgwIiByeD0iMjUiIGZpbGw9IiMwZDk0ODgiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPCEtLSBGZW7DqnRyZXMgLS0+CiAgPHJlY3QgeD0iNDAiIHk9IjgwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMzYjgyZjYiIG9wYWNpdHk9IjAuOSIvPgogIDxyZWN0IHg9IjgwIiB5PSI4MCIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI1IiBmaWxsPSIjM2I4MmY2IiBvcGFjaXR5PSIwLjkiLz4KICA8cmVjdCB4PSIxMjAiIHk9IjgwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMzYjgyZjYiIG9wYWNpdHk9IjAuOSIvPgogIDxyZWN0IHg9IjE2MCIgeT0iODAiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgZmlsbD0iIzNiODJmNiIgb3BhY2l0eT0iMC45Ii8+CiAgPCEtLSBSb3VlcyAtLT4KICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjE2MCIgcj0iMjAiIGZpbGw9IiMzNzQxNTEiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iMTQwIiBjeT0iMTYwIiByPSIyMCIgZmlsbD0iIzM3NDE1MSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjE2MCIgcj0iMTAiIGZpbGw9IiM2YjczODAiLz4KICA8Y2lyY2xlIGN4PSIxNDAiIGN5PSIxNjAiIHI9IjEwIiBmaWxsPSIjNmI3MzgwIi8+CiAgPCEtLSBJY29uZSBBSS1LYXJhbmd1ZSAtLT4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIzNSIgcj0iMjAiIGZpbGw9IiNmZjZiMzUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHBhdGggZD0iTTEwMCAxNSBMMTE1IDM1IEwxMDAgNTUgTDg1IDM1IFoiIGZpbGw9IiNmZjZiMzUiIG9wYWNpdHk9IjAuOCIvPgo8L3N2Zz4K';
                  target.className = 'w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain filter drop-shadow-2xl';
                }}
              />
              
              {/* Particules de vitesse spectaculaires - PLUS NOMBREUSES */}
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-teal-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100 - 50}px`,
                    top: `${Math.random() * 100 - 50}px`,
                  }}
                  animate={{
                    y: [60, -100],
                    x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60],
                    opacity: [1, 0],
                    scale: [1, 3, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              {/* Trail de mouvement vertical amélioré - PLUS GRAND */}
              <motion.div
                className="absolute top-20 left-1/2 transform -translate-x-1/2 w-3 h-32 bg-gradient-to-b from-teal-400/90 via-blue-400/70 to-transparent rounded-full"
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Étiquette dynamique PLUS GRANDE et améliorée */}
              <motion.div
                className="absolute -right-32 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-2xl text-xl font-black shadow-2xl whitespace-nowrap border-3 border-teal-300/40"
                initial={{ opacity: 0, x: -40, scale: 0.7 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1, duration: 1.5, type: "spring" }}
              >
                <motion.div className="flex items-center gap-2">
                  <motion.div
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(255,255,255,0.5)',
                        '0 0 25px rgba(255,255,255,0.9)',
                        '0 0 10px rgba(255,255,255,0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ÉTAPE {currentStep + 1}/5
                  </motion.span>
                </motion.div>
              </motion.div>
              
              {/* Effet de propulsion sous le bus */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-16 h-8 bg-gradient-to-t from-blue-400/60 via-teal-400/40 to-transparent rounded-full blur-sm" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Partie droite - Timeline en forme de route */}
        <div className="w-1/2 relative px-8 py-4 overflow-y-auto">
          {/* Route stylisée */}
          <div className="relative">
            {/* Corps de la route */}
            <div className="absolute left-8 top-0 bottom-0 w-16 bg-gray-600 rounded-lg shadow-xl">
              {/* Bordures de route */}
              <div className="absolute -left-1 top-0 bottom-0 w-1 bg-white/60 rounded" />
              <div className="absolute -right-1 top-0 bottom-0 w-1 bg-white/60 rounded" />
              
              {/* Ligne médiane clignotante */}
              <motion.div 
                className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2"
                style={{
                  background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 20px, #fbbf24 20px, #fbbf24 40px)'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '0px 40px']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Progression de la route */}
            <motion.div
              className="absolute left-8 top-0 w-16 bg-gradient-to-b from-teal-500/80 to-blue-600/80 rounded-lg shadow-xl"
              animate={{
                height: `${((currentStep + 1) / roadmapSteps.length) * 100}%`
              }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            >
              {/* Effet de brillance sur la progression */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg"
                animate={{
                  y: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Étapes sur la route */}
            <div className="relative z-10 space-y-16 py-8">
              {roadmapSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="flex items-center cursor-pointer group"
                  onClick={() => moveToStep(index)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 1, duration: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Panneau de signalisation / Point d'étape */}
                  <div className="relative flex-shrink-0 mr-6">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black relative border-4 cursor-pointer ${
                        index <= currentStep 
                          ? `bg-gradient-to-br ${step.color} text-white ${step.glowColor} shadow-2xl border-white/50`
                          : 'bg-gray-500/30 text-white/40 border-white/20 hover:bg-gray-400/40 hover:text-white/60 hover:border-white/40'
                      }`}
                      animate={{
                        scale: index === currentStep ? [1, 1.3, 1] : index <= currentStep ? 1.1 : 1,
                        boxShadow: index === currentStep 
                          ? ['0 0 20px rgba(13, 148, 136, 0.6)', '0 0 40px rgba(13, 148, 136, 0.9)', '0 0 20px rgba(13, 148, 136, 0.6)']
                          : index < currentStep
                          ? '0 0 10px rgba(13, 148, 136, 0.4)'
                          : '0 0 0px rgba(13, 148, 136, 0)',
                        rotate: index === currentStep ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 3, repeat: index === currentStep ? Infinity : 0 }}
                      whileHover={{ 
                        scale: index <= currentStep ? 1.4 : 1.2,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ 
                        scale: 0.9,
                        transition: { duration: 0.1 }
                      }}
                    >
                      {/* Particules orbitales pour l'étape actuelle */}
                      {index === currentStep && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-teal-200 rounded-full"
                              style={{
                                left: '50%',
                                top: '50%',
                              }}
                              animate={{
                                x: Math.cos(i * (360 / 8) * Math.PI / 180) * 25,
                                y: Math.sin(i * (360 / 8) * Math.PI / 180) * 25,
                                scale: [0, 2, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.25,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </>
                      )}
                      
                      <span className="text-lg font-black relative z-10">
                        {index < currentStep ? '✓' : step.number}
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Contenu de l'étape */}
                  <motion.div
                    className={`flex-1 bg-black/30 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 ${
                      index === currentStep 
                        ? 'border-teal-400 shadow-2xl shadow-teal-400/30'
                        : index < currentStep
                        ? 'border-teal-600/50 shadow-lg shadow-teal-600/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: index === currentStep 
                        ? '0 20px 40px rgba(13, 148, 136, 0.4)'
                        : '0 10px 20px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <h3 className={`text-xl md:text-2xl font-black mb-2 ${
                      index === currentStep ? 'text-white' : index < currentStep ? 'text-teal-300' : 'text-white/60'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <h4 className={`text-base md:text-lg mb-3 ${
                      index === currentStep ? 'text-teal-400' : index < currentStep ? 'text-teal-500' : 'text-white/40'
                    }`}>
                      {step.subtitle}
                    </h4>
                    
                    <p className={`text-sm md:text-base leading-relaxed ${
                      index === currentStep ? 'text-blue-100' : index < currentStep ? 'text-blue-200' : 'text-white/50'
                    }`}>
                      {step.description}
                    </p>
                    
                    {index !== currentStep && (
                      <motion.button
                        className={`mt-4 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          index < currentStep
                            ? 'bg-teal-600/20 text-teal-400 hover:bg-teal-600/30'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                        onClick={() => !isAnimating && moveToStep(index)}
                        disabled={isAnimating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {index < currentStep ? '✓ Terminé' : 'Voir cette étape'}
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
function PageClearingButton() {
  const [isClearing, setIsClearing] = useState(false);
  const [showOnlyLogo, setShowOnlyLogo] = useState(false);

  const handleStartNow = async () => {
    setIsClearing(true);
    
    // Délai pour l'animation de nettoyage
    setTimeout(() => {
      setShowOnlyLogo(true);
    }, 2000);
  };

  if (showOnlyLogo) {
    return (
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Particules cosmiques autour du logo */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => {
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
                  scale: [0, 2, 0],
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 400],
                  y: [0, (Math.random() - 0.5) * 400],
                }}
                transition={{
                  duration: 4 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>

        {/* Ondulations d'énergie épiques */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`epic-wave-${i}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '300px',
              height: '300px',
              border: '2px solid rgba(13, 148, 136, 0.3)',
              borderRadius: '50%',
            }}
            animate={{
              scale: [0, 6],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Logo central ultra-spectaculaire */}
        <motion.div 
          className="relative z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: [0, 360, 720, 1080, 1440],
          }}
          transition={{ 
            scale: { duration: 3, ease: "easeOut" },
            opacity: { duration: 2 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <motion.div 
            className="w-64 h-64 md:w-80 md:h-80 mx-auto relative"
            animate={{
              scale: [1, 1.2, 1],
              filter: [
                'drop-shadow(0 0 20px rgba(13, 148, 136, 0.5))',
                'drop-shadow(0 0 60px rgba(13, 148, 136, 0.8))',
                'drop-shadow(0 0 20px rgba(13, 148, 136, 0.5))'
              ]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <motion.img
              src="/images/logo-annimation.png"
              alt="Art'Beau-Rescence Logo - AI Karangué"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback épique en cas d'erreur
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-full h-full flex items-center justify-center text-8xl text-teal-400 font-black';
                fallback.innerHTML = '';
                target.parentNode?.appendChild(fallback);
              }}
            />
          </motion.div>

          {/* Effet de halo lumineux autour du logo */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-teal-400/30 via-blue-400/20 to-transparent rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Message de confirmation subtil */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 2 }}
        >
          <motion.p 
            className="text-2xl md:text-3xl text-white font-bold text-center"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ Le voyage commence... ✨
          </motion.p>
        </motion.div>

        {/* Lien discret vers la page de contact après quelques secondes */}
        <motion.div
          className="absolute top-6 right-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8, duration: 2 }}
        >
          <Link href="/contact">
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10 text-sm"
            >
              Nous contacter →
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className="relative">
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Button
          onClick={handleStartNow}
          disabled={isClearing}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-xl font-black rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden"
        >
          {isClearing ? (
            <motion.div
              className="flex items-center space-x-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Préparation...</span>
            </motion.div>
          ) : (
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(255,255,255,0.8)',
                  '0 0 10px rgba(255,255,255,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
               COMMENÇONS MAINTENANT !
            </motion.span>
          )}
        </Button>
        
        {/* Effet de lueur pulsante */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-600 rounded-full opacity-40 -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Animation de nettoyage de la page */}
      <AnimatePresence>
        {isClearing && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Effet de balayage */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Particules de disparition */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 0],
                  opacity: [1, 0],
                  y: -200,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Composant pour le contenu d'une étape de la roadmap
function StepContent({ step, index, currentStep, moveToStep, isAnimating }: {
  step: any;
  index: number;
  currentStep: number;
  moveToStep: (index: number) => void;
  isAnimating: boolean;
}) {
  return (
    <motion.div
      className={`bg-black/30 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 ${
        index === currentStep 
          ? 'border-teal-400 shadow-2xl shadow-teal-400/30'
          : index < currentStep
          ? 'border-teal-600/50 shadow-lg shadow-teal-600/20'
          : 'border-white/10 hover:border-white/30'
      }`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: index === currentStep 
          ? '0 20px 40px rgba(13, 148, 136, 0.4)'
          : '0 10px 20px rgba(255, 255, 255, 0.1)'
      }}
    >
      <h3 className={`text-2xl font-black mb-3 ${
        index === currentStep ? 'text-white' : index < currentStep ? 'text-teal-300' : 'text-white/60'
      }`}>
        {step.title}
      </h3>
      
      <h4 className={`text-lg mb-4 ${
        index === currentStep ? 'text-teal-400' : index < currentStep ? 'text-teal-500' : 'text-white/40'
      }`}>
        {step.subtitle}
      </h4>
      
      <p className={`text-base leading-relaxed mb-6 ${
        index === currentStep ? 'text-blue-100' : index < currentStep ? 'text-blue-200' : 'text-white/50'
      }`}>
        {step.description}
      </p>
      
      
      {index !== currentStep && (
        <motion.button
          className={`mt-4 px-4 py-2 rounded-full text-sm font-bold transition-all ${
            index < currentStep
              ? 'bg-teal-600/20 text-teal-400 hover:bg-teal-600/30'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
          onClick={() => !isAnimating && moveToStep(index)}
          disabled={isAnimating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {index < currentStep ? '✓ Terminé' : 'Voir cette étape'}
        </motion.button>
      )}
    </motion.div>
  );
}

// Composant pour afficher le contenu spectaculaire des boîtes
function SpectacularBoxContent({ content, onClose, boxIndex }: { content: any; onClose: () => void; boxIndex?: number }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pour les boîtes 1 et 2, fermer automatiquement quand la vidéo se termine
  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    if (boxIndex === 0 || boxIndex === 1) {
      // Délai court pour que l'utilisateur voie que la vidéo est terminée
      setTimeout(() => {
        onClose();
      }, 1500);
    }
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
              onEnded={handleVideoEnd}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onError={(e) => console.log('Video error:', e)}
              autoPlay
              loop={boxIndex !== 0 && boxIndex !== 1} // Pas de boucle pour les boîtes 1 et 2
              controls={boxIndex !== 0 && boxIndex !== 1} // Pas de contrôles pour les boîtes 1 et 2
              playsInline
              preload="metadata"
              style={{ objectFit: 'cover' }}
              x-webkit-airplay="allow"
              webkit-playsinline=""
              disablePictureInPicture={boxIndex === 0 || boxIndex === 1}
            >
              {/* Sources optimisées par ordre de préférence */}
              <source 
                src={content.videoUrl.replace('_web.mp4', '_webm.webm')} 
                type="video/webm" 
              />
              <source 
                src={content.videoUrl.replace('_web.mp4', '_ultra.mp4')} 
                type="video/mp4" 
              />
              <source 
                src={content.videoUrl} 
                type="video/mp4" 
              />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            
            {/* Overlay avec contrôles personnalisés - masqué pour les boîtes 1 et 2 */}
            {boxIndex !== 0 && boxIndex !== 1 && (
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
            )}
            
            {/* Indicateur spécial pour les boîtes 1 et 2 */}
            {(boxIndex === 0 || boxIndex === 1) && (
              <div className="absolute bottom-4 left-4 right-4 opacity-90">
                <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-center">
                  {isVideoPlaying ? '🎬 En cours... Fermeture automatique à la fin' : '▶️ Lecture automatique'}
                </div>
              </div>
            )}
            
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

