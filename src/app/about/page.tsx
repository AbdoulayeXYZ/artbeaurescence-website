import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutShowcase } from "@/components/AboutShowcase";

export const metadata = {
  title: "À propos | Art'Beau-Rescence",
  description: "Découvrez l'histoire d'Art'Beau-Rescence, une entreprise d'innovation technologique créée par de jeunes innovateurs sénégalais pour transformer le paysage technologique africain.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutShowcase />
      <Footer />
    </main>
  );
}