"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 bg-teal-500"></div>
        <div className="absolute right-1/4 top-1/3 w-60 h-60 rounded-full opacity-5 bg-blue-900"></div>
        <div className="absolute left-1/4 bottom-1/3 w-60 h-60 rounded-full opacity-5 bg-teal-500"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-10 bg-blue-900"></div>
      </div>

      <div className="container relative mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Art'Beau-Rescence
          </h1>
          <h2 className="text-xl md:text-2xl text-teal-700 mb-4 font-medium">
            Technicité & Pragmatisme
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Une solution technologique avancée alliant AIoT et Telematics de pointe pour une gestion de flotte optimisée et une sécurité routière améliorée au Sénégal.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-blue-900 text-white hover:bg-teal-700">
              Découvrir nos produits
            </Button>
            <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
              Contacter notre équipe
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2 relative flex justify-center">
          <div className="relative w-full h-80 md:h-[400px] lg:h-[500px]">
            <Image
              src="/images/vehicle-tracking.png"
              alt="AI-Karangué - Solution de tracking de véhicule"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
