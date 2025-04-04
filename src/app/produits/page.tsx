import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductShowcase } from "../../components/ProductShowcase";

export const metadata = {
  title: "Produits | Art'Beau-Rescence",
  description: "Découvrez notre plateforme SaaS de gestion de flottes avec des fonctionnalités avancées pour optimiser vos opérations et améliorer la sécurité routière.",
};

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <ProductShowcase />
      <Footer />
    </main>
  );
}