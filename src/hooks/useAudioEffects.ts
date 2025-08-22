"use client";

import { useRef, useCallback, useEffect } from 'react';

interface AudioConfig {
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
}

interface AudioEffects {
  opening: HTMLAudioElement | null;
  hummingbirdFlap: HTMLAudioElement | null;
  boxClick: HTMLAudioElement | null;
  boxOpen: HTMLAudioElement | null;
  particleExplode: HTMLAudioElement | null;
  revelation: HTMLAudioElement | null;
  screenShake: HTMLAudioElement | null;
  meteorShower: HTMLAudioElement | null;
  finalMessage: HTMLAudioElement | null;
  backgroundAmbient: HTMLAudioElement | null;
}

export const useAudioEffects = (enabled: boolean = true) => {
  const audioEffects = useRef<AudioEffects>({
    opening: null,
    hummingbirdFlap: null,
    boxClick: null,
    boxOpen: null,
    particleExplode: null,
    revelation: null,
    screenShake: null,
    meteorShower: null,
    finalMessage: null,
    backgroundAmbient: null,
  });

  const isInitialized = useRef(false);

  // Version simplifiée sans Web Audio API complexe
  useEffect(() => {
    if (!enabled || isInitialized.current) return;
    
    // Marquer comme initialisé mais sans créer d'audio complexe
    isInitialized.current = true;
  }, [enabled]);

  // Fonction pour jouer un effet sonore (version simplifiée)
  const playSound = useCallback((soundName: keyof AudioEffects, config: AudioConfig = {}) => {
    if (!enabled) return;
    
    // Log pour le développement - on peut ajouter de vrais sons plus tard
    console.log(`🔊 Playing sound: ${soundName}`, config);
  }, [enabled]);

  // Fonction pour arrêter un son
  const stopSound = useCallback((soundName: keyof AudioEffects) => {
    if (!enabled) return;
    console.log(`🔇 Stopping sound: ${soundName}`);
  }, [enabled]);

  // Fonction pour arrêter tous les sons
  const stopAllSounds = useCallback(() => {
    if (!enabled) return;
    console.log('🔇 Stopping all sounds');
  }, [enabled]);

  // Fonction pour démarrer l'ambiance de fond
  const startAmbientSound = useCallback(() => {
    if (!enabled) return;
    console.log('🎵 Starting ambient sound');
  }, [enabled]);

  // Fonction pour arrêter l'ambiance de fond
  const stopAmbientSound = useCallback(() => {
    if (!enabled) return;
    console.log('🔇 Stopping ambient sound');
  }, [enabled]);

  return {
    playSound,
    stopSound,
    stopAllSounds,
    startAmbientSound,
    stopAmbientSound,
    isInitialized: isInitialized.current,
  };
};
