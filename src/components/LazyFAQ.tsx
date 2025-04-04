"use client";

import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ArrowRight } from "lucide-react";

export default function LazyFAQ() {
  const faqs = [
    {
      question: "Quels sont vos délais de réponse ?",
      answer: "Notre équipe s'engage à répondre à toutes les demandes dans un délai de 24 à 48 heures ouvrables."
    },
    {
      question: "Proposez-vous des solutions personnalisées ?",
      answer: "Oui, nous développons des solutions sur mesure adaptées aux besoins spécifiques de chaque client et secteur d'activité."
    },
    {
      question: "Comment démarrer une collaboration avec Art'Beau-Rescence ?",
      answer: "Contactez-nous via le formulaire ou par téléphone pour organiser une première consultation gratuite où nous discuterons de vos besoins et objectifs."
    },
    {
      question: "Quelles technologies utilisez-vous ?",
      answer: "Nous utilisons les technologies les plus récentes et adaptées à chaque projet, incluant l'IA, le cloud computing, l'IoT et les solutions mobiles avancées."
    },
    {
      question: "Proposez-vous des services de maintenance ?",
      answer: "Oui, nous offrons des contrats de maintenance et de support pour assurer la pérennité et l'évolution de vos solutions technologiques."
    },
    {
      question: "Travaillez-vous avec des startups ?",
      answer: "Absolument ! Nous accompagnons les startups dans leur développement technologique avec des solutions adaptées à leurs ressources et ambitions."
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-teal-300 transition-all"
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <h3 className="text-lg font-bold text-blue-900 mb-2 cursor-pointer hover:text-teal-600 transition-colors flex items-center justify-between">
                {faq.question}
                <ArrowRight className="w-4 h-4 text-teal-500" />
              </h3>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-gradient-to-br from-blue-900/95 to-blue-800/95 backdrop-blur-md text-white p-6 shadow-xl border border-white/10 rounded-xl">
              <p className="text-blue-100 text-sm">{faq.answer}</p>
            </HoverCardContent>
          </HoverCard>
          <p className="text-gray-600 text-sm">{faq.answer.substring(0, 70)}...</p>
        </motion.div>
      ))}
    </div>
  );
}