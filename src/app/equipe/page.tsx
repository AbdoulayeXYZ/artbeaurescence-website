import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TeamShowcase } from "@/components/TeamShowcase";

export const metadata = {
  title: "Notre Équipe | Art'Beau-Rescence",
  description: "Découvrez l'équipe passionnée derrière Art'Beau-Rescence, des talents sénégalais qui façonnent l'avenir technologique de l'Afrique avec des solutions innovantes.",
};

export default function TeamPage() {
  return (
    <main>
      <Navbar />
      <TeamShowcase />
      <Footer />
    </main>
  );
}