import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingShowcase } from "@/components/PricingShowcase";

export const metadata = {
  title: "Tarifs | Art'Beau-Rescence",
  description: "Découvrez nos offres Karangué 221 : Basic, Standard, Avancé et Personnalisé. Solutions adaptées à chaque besoin et budget pour optimiser votre flotte.",
};

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <PricingShowcase />
      <Footer />
    </main>
  );
}
