"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");

      // Reset subscription status after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1000);
  };

  const footerLinks = [
    {
      title: "Produits",
      links: [
        { label: "AI-Karangué", href: "/produits/ai-karangue" },
        { label: "Karangue Bag", href: "/produits/karangue-bag" },
        { label: "Video Telematics", href: "/services/video-telematics" },
        { label: "Vehicle Tracking", href: "/services/vehicle-tracking" },
      ]
    },
    {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "/about" },
        { label: "Notre équipe", href: "/equipe" },
        { label: "Carrières", href: "/carrieres" },
        { label: "Partenaires", href: "/partenaires" },
      ]
    },
    {
      title: "Ressources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Études de cas", href: "/etudes-de-cas" },
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/support" },
      ]
    }
  ];

  return (
    <footer className="relative text-white pt-16 pb-8 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover top-0 left-0 z-0"
      >
        <source src="/images/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-blue-900/90 to-blue-950/95 z-1"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2 backdrop-blur-sm bg-blue-950/30 p-6 rounded-xl border border-white/10">
            <div className="flex items-center mb-6">
              <div className="relative h-10 w-40 mr-2">
                <Image
                  src="/images/logo.png"
                  alt="Art'Beau-Rescence"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              Art'Beau-Rescence est une entreprise d'innovation technologique créée en 2022 par de jeunes innovateurs Sénégalais pour parfaire le monde de demain.
            </p>
            <div className="space-y-4">
              <h4 className="font-medium text-teal-300">Abonnez-vous à notre newsletter</h4>
              {isSubscribed ? (
                <div className="bg-teal-500/20 backdrop-blur-sm rounded-lg p-3 text-teal-100 border border-teal-500/30">
                  Merci pour votre inscription! Vous recevrez prochainement nos actualités.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {isSubmitting ? "..." : <ArrowRight className="h-5 w-5" />}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title} className="backdrop-blur-sm bg-blue-950/30 p-6 rounded-xl border border-white/10">
              <h4 className="font-medium text-lg mb-4 text-teal-300">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-blue-100 hover:text-teal-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center backdrop-blur-sm">
          <div className="text-blue-200 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Art'Beau-Rescence. Tous droits réservés.
          </div>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="text-blue-200 hover:text-teal-300 text-sm">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-blue-200 hover:text-teal-300 text-sm">
              Politique de confidentialité
            </Link>
            <Link href="/cgv" className="text-blue-200 hover:text-teal-300 text-sm">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
