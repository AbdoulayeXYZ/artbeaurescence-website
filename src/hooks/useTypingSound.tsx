import { useRef, useEffect, useCallback } from 'react';

interface TypingSoundOptions {
  volume?: number;
  loop?: boolean;
  audioPath?: string;
}

export function useTypingSound(
  isTyping: boolean,
  options: TypingSoundOptions = {}
) {
  const {
    volume = 0.3,
    loop = true,
    audioPath = '/images/typing.mp3'
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInitializedRef = useRef(false);

  // Initialiser l'audio de manière sûre
  const initializeAudio = useCallback(() => {
    if (typeof window !== 'undefined' && !isInitializedRef.current) {
      try {
        audioRef.current = new Audio(audioPath);
        audioRef.current.volume = volume;
        audioRef.current.loop = loop;
        audioRef.current.preload = 'none'; // Éviter le préchargement automatique
        
        // Gérer les erreurs silencieusement
        audioRef.current.onerror = () => {
          // Silence - pas d'erreurs dans la console
        };

        isInitializedRef.current = true;
      } catch (error) {
        // Silence - pas d'erreurs dans la console
      }
    }
  }, [audioPath, volume, loop]);

  // Précharger l'audio de manière sûre
  const preload = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        initializeAudio();
        if (audioRef.current) {
          audioRef.current.load();
        }
      } catch (error) {
        // Silence - pas d'erreurs dans la console
      }
    }
  }, [initializeAudio]);

  // Jouer ou arrêter le son selon l'état de frappe
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (!audioRef.current) {
        initializeAudio();
      }

      if (audioRef.current && isInitializedRef.current) {
        if (isTyping) {
          // Démarrer le son de frappe
          audioRef.current.currentTime = 0;
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Silence - pas d'erreurs dans la console
            });
          }
        } else {
          // Arrêter le son de frappe
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    } catch (error) {
      // Silence - pas d'erreurs dans la console
    }
  }, [isTyping, initializeAudio]);

  // Nettoyer à la désactivation du composant
  useEffect(() => {
    return () => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        isInitializedRef.current = false;
      } catch (error) {
        // Silence - pas d'erreurs dans la console
      }
    };
  }, []);

  return {
    preload,
    isInitialized: isInitializedRef.current
  };
}
