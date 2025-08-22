import { Metadata } from 'next';
import { AIKarangueSpectacularExperience } from '@/components/AIKarangueSpectacularExperience';

export const metadata: Metadata = {
  title: "Expérience AI-Karangué | Art'Beau-Rescence",
  description: "Découvrez l'expérience interactive révolutionnaire AI-Karangué - Une approche innovante pour transformer la gestion de flotte au Sénégal.",
  keywords: "AI-Karangué, expérience interactive, gestion de flotte, innovation, Sénégal, transformation digitale",
  openGraph: {
    title: "Expérience AI-Karangué | Art'Beau-Rescence",
    description: "Une expérience qui transforme votre vision de la gestion de flotte",
    type: "website",
  },
};

export default function AIKaranguePage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <AIKarangueSpectacularExperience />
    </main>
  );
}
