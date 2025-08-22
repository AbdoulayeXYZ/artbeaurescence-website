"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Download, 
  Users, 
  Target, 
  Clock, 
  TrendingUp,
  Eye,
  Share2,
  MousePointer
} from 'lucide-react';

interface AnalyticsEvent {
  event_type: 'page_visit' | 'box_opened' | 'experience_completed' | 'share_clicked' | 'demo_requested';
  timestamp: number;
  session_id: string;
  user_agent: string;
  time_spent?: number;
  box_index?: number;
  completion_rate?: number;
}

export function AIKarangueAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>([]);
  const [insights, setInsights] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('ai_karangue_analytics') || '[]');
      setAnalytics(data);
      setInsights(calculateInsights(data));
    }
  };

  const calculateInsights = (data: AnalyticsEvent[]) => {
    const totalSessions = new Set(data.map(event => event.session_id)).size;
    const completedExperiences = data.filter(event => event.event_type === 'experience_completed').length;
    const avgTimeSpent = data.length > 0 
      ? data.reduce((sum, event) => sum + (event.time_spent || 0), 0) / data.length / 1000 / 60 
      : 0;
    const conversionRate = totalSessions > 0 
      ? (data.filter(event => event.event_type === 'demo_requested').length / totalSessions) * 100 
      : 0;

    const boxOpeningStats = [0, 1, 2].map(boxIndex => ({
      boxIndex,
      opens: data.filter(event => event.event_type === 'box_opened' && event.box_index === boxIndex).length
    }));

    const eventCounts = {
      page_visits: data.filter(e => e.event_type === 'page_visit').length,
      box_opens: data.filter(e => e.event_type === 'box_opened').length,
      shares: data.filter(e => e.event_type === 'share_clicked').length,
      demos: data.filter(e => e.event_type === 'demo_requested').length,
    };

    return {
      totalSessions,
      completedExperiences,
      completionRate: totalSessions > 0 ? (completedExperiences / totalSessions) * 100 : 0,
      avgTimeSpent: Math.round(avgTimeSpent * 100) / 100,
      conversionRate: Math.round(conversionRate * 100) / 100,
      boxOpeningStats,
      eventCounts,
      totalEvents: data.length
    };
  };

  const exportAnalytics = () => {
    const data = {
      analytics,
      insights,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_karangue_analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAnalytics = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les données analytics ?')) {
      localStorage.removeItem('ai_karangue_analytics');
      setAnalytics([]);
      setInsights({});
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 1) return `${Math.round(minutes * 60)}s`;
    return `${Math.round(minutes * 10) / 10}min`;
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-gray-800 hover:bg-gray-700 text-white"
        size="sm"
      >
        <BarChart3 size={16} />
        Analytics
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto border-l border-gray-200"
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Analytics AI-Karangué</h2>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
          >
            ✕
          </Button>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users size={16} />
                Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {insights.totalSessions || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target size={16} />
                Conversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {insights.conversionRate || 0}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock size={16} />
                Temps moyen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {formatTime(insights.avgTimeSpent || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp size={16} />
                Taux de finalisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(insights.completionRate || 0)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques des événements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Événements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Eye size={16} className="text-blue-500" />
                Visites de page
              </span>
              <Badge variant="secondary">
                {insights.eventCounts?.page_visits || 0}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <MousePointer size={16} className="text-green-500" />
                Boîtes ouvertes
              </span>
              <Badge variant="secondary">
                {insights.eventCounts?.box_opens || 0}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Share2 size={16} className="text-purple-500" />
                Partages
              </span>
              <Badge variant="secondary">
                {insights.eventCounts?.shares || 0}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Target size={16} className="text-red-500" />
                Demandes de démo
              </span>
              <Badge variant="secondary">
                {insights.eventCounts?.demos || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques des boîtes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance des Boîtes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.boxOpeningStats?.map((stat: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span>Boîte {stat.boxIndex + 1}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min(100, (stat.opens / Math.max(1, insights.totalSessions)) * 100)}%` 
                      }}
                    ></div>
                  </div>
                  <Badge variant="outline">
                    {stat.opens}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button 
            onClick={exportAnalytics}
            className="w-full flex items-center gap-2"
            variant="outline"
          >
            <Download size={16} />
            Exporter les données
          </Button>
          
          <Button 
            onClick={loadAnalytics}
            className="w-full"
            variant="outline"
          >
            Actualiser
          </Button>
          
          <Button 
            onClick={clearAnalytics}
            className="w-full"
            variant="destructive"
          >
            Effacer les données
          </Button>
        </div>

        {/* Événements récents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Événements récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {analytics.slice(-10).reverse().map((event, index) => (
                <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">{event.event_type}</span>
                    <span className="text-gray-500 text-xs">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {event.box_index !== undefined && (
                    <div className="text-gray-600">Boîte {event.box_index + 1}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-gray-500 text-center">
          Total: {insights.totalEvents} événements
        </div>
      </div>
    </motion.div>
  );
}
