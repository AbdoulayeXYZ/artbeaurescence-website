import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactShowcase } from "@/components/ContactShowcase";

export const metadata = {
  title: "Contact | Art'Beau-Rescence",
  description: "Contactez Art'Beau-Rescence, entreprise d'innovation technologique au Sénégal. Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans vos projets.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactShowcase />
      <Footer />
    </main>
  );
}