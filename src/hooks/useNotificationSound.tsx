import { useRef, useEffect, useCallback } from 'react';

interface NotificationSoundOptions {
  volume?: number;
  audioPath?: string;
}

export function useNotificationSound(
  options: NotificationSoundOptions = {}
) {
  const {
    volume = 0.4,
    audioPath = '/images/notification-sound.mp3'
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInitializedRef = useRef(false);

  // Initialiser l'audio de manière sûre
  const initializeAudio = useCallback(() => {
    if (typeof window !== 'undefined' && !isInitializedRef.current) {
      try {
        audioRef.current = new Audio(audioPath);
        audioRef.current.volume = volume;
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
  }, [audioPath, volume]);

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

  // Jouer le son de notification
  const playNotification = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      if (!audioRef.current) {
        initializeAudio();
      }

      if (audioRef.current && isInitializedRef.current) {
        // Remettre à zéro pour permettre de rejouer même si le son précédent n'est pas fini
        audioRef.current.currentTime = 0;
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silence - pas d'erreurs dans la console
          });
        }
      }
    } catch (error) {
      // Silence - pas d'erreurs dans la console
    }
  }, [initializeAudio]);

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
    playNotification,
    preload,
    isInitialized: isInitializedRef.current
  };
}
