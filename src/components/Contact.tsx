"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-teal-600" />,
      title: "Téléphone",
      content: "+221 33 999 99 99",
      description: "Du lundi au vendredi, 9h-18h"
    },
    {
      icon: <Mail className="w-5 h-5 text-teal-600" />,
      title: "Email",
      content: "contact@artbeaurescence.sn",
      description: "Nous répondons sous 24h"
    },
    {
      icon: <MapPin className="w-5 h-5 text-teal-600" />,
      title: "Adresse",
      content: "Dakar, Sénégal",
      description: "Ouakam"
    },
    {
      icon: <Clock className="w-5 h-5 text-teal-600" />,
      title: "Heures de bureau",
      content: "9h - 18h",
      description: "Lundi au vendredi"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const inputAnimation = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-teal-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-400/20 to-blue-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-teal-600 bg-clip-text text-transparent mb-6">
            Parlons de votre projet
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Prêt à transformer votre vision en réalité ? Notre équipe d'experts est là pour vous accompagner.{" "}
            <span className="text-teal-600 font-medium">Contactez-nous dès maintenant !</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Contact Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 md:sticky md:top-24 border border-gray-100/50">
              <h3 className="text-xl font-semibold text-blue-900 mb-8">Informations de contact</h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={item.title}
                    variants={fadeInUp}
                  >
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <div className="flex items-start gap-4 cursor-pointer group p-3 rounded-lg transition-all hover:bg-blue-50">
                          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-3 rounded-lg text-white group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-medium group-hover:text-blue-900 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 group-hover:text-blue-700 transition-colors">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="p-4 bg-gradient-to-br from-blue-900 to-blue-800 text-white w-64">
                        <div className="flex flex-col gap-2">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-blue-100">{item.description}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </motion.div>
                ))}
              </div>

              {/* <motion.div 
                variants={fadeInUp}
                className="mt-10 pt-8 border-t border-gray-100"
              >
                <h4 className="text-md font-semibold text-blue-900 mb-4">Nous suivre</h4>
                <div className="flex gap-4">
                  <a href="#" className="bg-gradient-to-br from-blue-900 to-blue-800 p-3 rounded-full text-white hover:scale-110 transition-all hover:shadow-lg hover:shadow-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </div>
              </motion.div> */}
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-gray-100/50">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-900 to-teal-600 bg-clip-text text-transparent mb-8">
                Envoyez-nous un message
              </h3>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-500/20 p-6 rounded-xl mb-8"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-teal-600" />
                      <p className="text-teal-700 font-medium">
                        Message envoyé avec succès ! Nous vous recontacterons très bientôt.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.form 
                variants={formAnimation}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover="focus" variants={inputAnimation}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </motion.div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <motion.div whileHover="focus" variants={inputAnimation}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 resize-none"
                    placeholder="Décrivez votre projet ou vos besoins..."
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 hover:from-blue-800 hover:via-blue-700 hover:to-teal-600 text-white font-medium text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
