import { useEffect, useRef, useState } from 'react';

interface AnalyticsEvent {
  event_type: 'page_visit' | 'box_opened' | 'experience_completed' | 'share_clicked' | 'demo_requested';
  timestamp: number;
  session_id: string;
  user_agent: string;
  time_spent?: number;
  box_index?: number;
  completion_rate?: number;
}

interface ExperienceMetrics {
  session_start: number;
  session_id: string;
  boxes_opened: number[];
  total_time_spent: number;
  completion_rate: number;
  engagement_score: number;
}

// Génération d'un ID de session unique (moved outside component)
function generateSessionId(): string {
  return `ai_karangue_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export function useAIKarangueAnalytics() {
  const [metrics, setMetrics] = useState<ExperienceMetrics>(() => ({
    session_start: Date.now(),
    session_id: generateSessionId(),
    boxes_opened: [],
    total_time_spent: 0,
    completion_rate: 0,
    engagement_score: 0
  }));

  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef(Date.now());

  // Tracking du temps passé
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        total_time_spent: Date.now() - prev.session_start
      }));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Envoi des événements analytiques
  const trackEvent = (eventType: AnalyticsEvent['event_type'], additionalData?: Partial<AnalyticsEvent>) => {
    try {
      const event: AnalyticsEvent = {
        event_type: eventType,
        timestamp: Date.now(),
        session_id: metrics.session_id,
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
        time_spent: Date.now() - startTimeRef.current,
        ...additionalData
      };

      // Stockage local pour les métriques
      if (typeof window !== 'undefined') {
        try {
          const existingEvents = JSON.parse(localStorage.getItem('ai_karangue_analytics') || '[]');
          existingEvents.push(event);
          localStorage.setItem('ai_karangue_analytics', JSON.stringify(existingEvents));
        } catch (storageError) {
          console.warn('Failed to save analytics to localStorage:', storageError);
        }

        // Log pour le développement
        console.log('📊 A.I. Karangué Analytics:', event);
      }

      // Calcul du score d'engagement
      calculateEngagementScore(event);
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  };

  // Calcul du score d'engagement
  const calculateEngagementScore = (event: AnalyticsEvent) => {
    let score = 0;
    
    // Points pour chaque action
    switch (event.event_type) {
      case 'box_opened':
        score += 25;
        break;
      case 'experience_completed':
        score += 50;
        break;
      case 'share_clicked':
        score += 30;
        break;
      case 'demo_requested':
        score += 100;
        break;
    }

    // Bonus pour le temps passé
    const timeBonus = Math.min((event.time_spent || 0) / 1000 / 60, 10) * 2; // Max 20 points pour 10 minutes
    score += timeBonus;

    setMetrics(prev => ({
      ...prev,
      engagement_score: prev.engagement_score + score
    }));
  };

  // Tracking d'ouverture de boîte
  const trackBoxOpened = (boxIndex: number) => {
    setMetrics(prev => {
      const newBoxesOpened = [...prev.boxes_opened, boxIndex];
      const completionRate = (newBoxesOpened.length / 3) * 100;
      
      return {
        ...prev,
        boxes_opened: newBoxesOpened,
        completion_rate: completionRate
      };
    });

    trackEvent('box_opened', { 
      box_index: boxIndex,
      completion_rate: ((metrics.boxes_opened.length + 1) / 3) * 100
    });
  };

  // Tracking de fin d'expérience
  const trackExperienceCompleted = () => {
    setMetrics(prev => ({ ...prev, completion_rate: 100 }));
    trackEvent('experience_completed', { completion_rate: 100 });
  };

  // Tracking des partages
  const trackShareClicked = () => {
    trackEvent('share_clicked');
  };

  // Tracking des demandes de démo
  const trackDemoRequested = () => {
    trackEvent('demo_requested');
  };

  // Récupération des métriques pour analyse
  const getAnalytics = () => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('ai_karangue_analytics') || '[]');
    } catch (error) {
      console.warn('Failed to parse analytics data:', error);
      return [];
    }
  };

  // Export des données pour analyse
  const exportAnalytics = () => {
    const data = getAnalytics();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_karangue_analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calcul des insights
  const getInsights = () => {
    const analytics = getAnalytics();
    const totalSessions = new Set(analytics.map((event: AnalyticsEvent) => event.session_id)).size;
    const completedExperiences = analytics.filter((event: AnalyticsEvent) => event.event_type === 'experience_completed').length;
    const avgTimeSpent = analytics.length > 0 
      ? analytics.reduce((sum: number, event: AnalyticsEvent) => sum + (event.time_spent || 0), 0) / analytics.length / 1000 / 60 
      : 0;
    const conversionRate = totalSessions > 0 ? (analytics.filter((event: AnalyticsEvent) => event.event_type === 'demo_requested').length / totalSessions) * 100 : 0;

    return {
      totalSessions,
      completedExperiences,
      completionRate: totalSessions > 0 ? (completedExperiences / totalSessions) * 100 : 0,
      avgTimeSpent: Math.round(avgTimeSpent * 100) / 100,
      conversionRate: Math.round(conversionRate * 100) / 100,
      engagementScore: metrics.engagement_score
    };
  };

  return {
    metrics,
    trackEvent,
    trackBoxOpened,
    trackExperienceCompleted,
    trackShareClicked,
    trackDemoRequested,
    getAnalytics,
    exportAnalytics,
    getInsights
  };
}
