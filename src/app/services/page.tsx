import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServicesShowcase } from "@/components/ServicesShowcase";

export const metadata = {
  title: "Services | Art'Beau-Rescence",
  description: "Découvrez nos services innovants de gestion de flotte: Video Telematics, Vehicle Telematics et Vehicle Tracking pour optimiser vos opérations et améliorer la sécurité routière.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesShowcase />
      <Footer />
    </main>
  );
}