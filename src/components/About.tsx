"use client";

import Image from "next/image";

export function About() {
  const values = [
    {
      title: "Innovation",
      description: "Nous créons des solutions technologiques innovantes pour répondre aux défis locaux."
    },
    {
      title: "Leadership",
      description: "Nous aspirons à faire du Sénégal un hub incontournable de l'innovation technologique."
    },
    {
      title: "Collaboration",
      description: "Nous travaillons en partenariat avec des acteurs locaux et internationaux pour maximiser notre impact."
    }
  ];

  const achievements = [
    {
      title: "Gov'athon 2024",
      position: "1er Prix"
    },
    {
      title: "AfriTech",
      position: "4ème Position"
    },
    {
      title: "Dakar Innovation Days",
      position: "2ème Prix"
    },
    {
      title: "Concours National d'Innovation",
      position: "2ème Prix"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Qui sommes nous ?</h2>
          <p className="text-gray-600">
            Découvrez l'histoire de notre entreprise et notre vision pour l'avenir de la technologie au Sénégal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Notre Vision</h3>
            <p className="text-gray-700 mb-6">
              Nous aspirons à faire du Sénégal un hub incontournable de l'innovation technologique pour répondre aux défis locaux.
            </p>

            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Art'Beau-Rescence S.A.S</h3>
            <p className="text-gray-700 mb-6">
              Une entreprise d'innovation technologique créée en 2022 par de jeunes innovateurs Sénégalais pour parfaire le monde de demain.
            </p>

            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Nos Missions</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold mt-1">✓</span>
                <span>Créer un écosystème propice à l'innovation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold mt-1">✓</span>
                <span>Servir de modèle en matière d'innovation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold mt-1">✓</span>
                <span>Transformer la sécurité routière sénégalaise</span>
              </li>
            </ul>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="aspect-w-4 aspect-h-3 relative h-80 md:h-96 rounded-xl overflow-hidden border-8 border-white shadow-xl">
              <Image
                src="/images/about-image.png"
                alt="L'équipe Art'Beau-Rescence"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-teal-500 opacity-20 z-0"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-blue-900 opacity-20 z-0"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center md:text-left">Nos Valeurs</h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={value.title} className="bg-blue-50 rounded-lg p-6 shadow-sm">
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">{value.title}</h4>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center md:text-left">Nos Distinctions</h3>
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl text-white p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={achievement.title} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                      {index === 0 ? "1" : index === 1 ? "4" : "2"}
                    </div>
                    <h4 className="text-lg font-medium mb-1">{achievement.title}</h4>
                    <p className="text-sm text-blue-100">{achievement.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">Nos Partenaires</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {['Bold Gainde Group', 'MITTA', 'MFPRSP', 'Gov\'Athon', 'Star Group'].map((partner) => (
              <div key={partner} className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-teal-500 mb-3">
                  <span className="text-xl font-bold text-blue-900">{partner.charAt(0)}</span>
                </div>
                <span className="text-center text-sm font-medium text-gray-700">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
