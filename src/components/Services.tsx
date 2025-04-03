"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      title: "Vehicle Tracking",
      description: "Suivi en temps réel de votre flotte avec détection d'événements critiques comme freinage brusque, excès de vitesse, détection d'impact et retournement.",
      image: "/images/vehicle-tracking.png",
    },
    {
      title: "Video Telematics",
      description: "Surveillance vidéo intelligente pour monitorer le comportement du conducteur et détecter les situations à risque sur la route.",
      image: "/images/video-telematics.png",
    },
    {
      title: "Vehicle Telematics",
      description: "Gestion complète de votre flotte avec analyse des données et rapports détaillés sur la performance de vos véhicules.",
      image: "/images/vehicle-telematics.png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Nos Services</h2>
          <p className="text-gray-600">
            Des solutions de pointe pour optimiser la gestion de votre flotte et améliorer la sécurité routière
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-full h-40 relative mb-4 rounded-md overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-blue-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="bg-blue-50 rounded-lg p-6 max-w-3xl">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Optimisez votre investissement</h3>
            <p className="text-gray-700 mb-4">
              Notre solution AI-Karangué offre un retour sur investissement de <span className="text-teal-600 font-bold text-2xl">10:1</span>, grâce à la réduction des coûts opérationnels et l'amélioration de la sécurité.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-teal-600 font-bold">✓</span>
                <span>Réduction de la consommation de carburant</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-600 font-bold">✓</span>
                <span>Diminution des accidents et incidents</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-600 font-bold">✓</span>
                <span>Optimisation des trajets et réduction des temps morts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
