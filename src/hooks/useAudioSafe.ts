import { useRef, useCallback, useEffect } from 'react';

interface AudioOptions {
  volume?: number;
  loop?: boolean;
}

export function useAudioSafe(audioPath: string, options: AudioOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  const initializeAudio = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioPath);
        audioRef.current.preload = 'auto';
        audioRef.current.volume = options.volume ?? 0.5;
        audioRef.current.loop = options.loop ?? false;
        
        // Événements audio
        audioRef.current.onended = () => {
          isPlayingRef.current = false;
        };
        
        audioRef.current.onpause = () => {
          isPlayingRef.current = false;
        };
        
        audioRef.current.onplay = () => {
          isPlayingRef.current = true;
        };
        
        // Gestion silencieuse des erreurs
        audioRef.current.onerror = () => {
          console.warn(`Erreur lors du chargement de l'audio: ${audioPath}`);
          audioRef.current = null;
          isPlayingRef.current = false;
        };
      }
      return true;
    } catch (error) {
      console.warn(`Erreur lors de l'initialisation de l'audio: ${audioPath}`, error);
      audioRef.current = null;
      return false;
    }
  }, [audioPath, options.volume, options.loop]);

  // Initialiser l'audio au montage
  useEffect(() => {
    initializeAudio();
    
    // Cleanup au démontage
    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current = null;
          isPlayingRef.current = false;
        } catch (error) {
          // Échec silencieux
        }
      }
    };
  }, [initializeAudio]);

  const play = useCallback(async () => {
    if (typeof window === 'undefined') return false;
    
    // Re-initialiser si nécessaire
    if (!audioRef.current) {
      initializeAudio();
    }
    
    if (!audioRef.current) {
      return false;
    }

    try {
      // Arrêter et redémarrer si déjà en cours
      if (isPlayingRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      await audioRef.current.play();
      return true;
    } catch (error) {
      console.warn(`Erreur lors de la lecture de l'audio: ${audioPath}`, error);
      return false;
    }
  }, [initializeAudio, audioPath]);

  const stop = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      if (audioRef.current && isPlayingRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } catch (error) {
      console.warn(`Erreur lors de l'arrêt de l'audio: ${audioPath}`, error);
    }
  }, [audioPath]);

  const cleanup = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
        isPlayingRef.current = false;
      }
    } catch (error) {
      // Échec silencieux
    }
  }, []);

  return {
    play,
    stop,
    cleanup,
    isPlaying: () => isPlayingRef.current,
    isAvailable: () => !!audioRef.current
  };
}
