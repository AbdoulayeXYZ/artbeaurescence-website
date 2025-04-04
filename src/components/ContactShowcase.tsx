"use client";

import { useState, useRef, useEffect, lazy, Suspense, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, ArrowRight, ExternalLink, Linkedin, Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import { useLazySection } from "@/hooks/useLazySection";

// Lazy-loaded components
const LazyMap = lazy(() => import("@/components/LazyMap"));
const LazyFAQ = lazy(() => import("@/components/LazyFAQ"));

// Memoized static components
const ContactCard = memo(({ info }: { info: any }) => (
  <motion.div
    variants={{
      initial: { opacity: 0, scale: 0.9 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      },
      hover: {
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    }}
    initial="initial"
    animate="animate"
    whileHover="hover"
    className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-teal-300 transition-all"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-blue-100 text-blue-700">
        {info.icon}
      </div>
      <div>
        <h3 className="font-bold text-lg text-blue-900 mb-1">{info.title}</h3>
        <p className="text-gray-700 font-medium mb-1">{info.content}</p>
        <p className="text-gray-500 text-sm mb-4">{info.description}</p>
        {info.action && (
          <Link href={info.action} className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors">
            {info.actionText} <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  </motion.div>
));

const SocialButton = memo(({ social }: { social: any }) => (
  <motion.a
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`${social.color} p-4 rounded-full text-white shadow-lg flex items-center justify-center`}
  >
    <social.icon className="w-6 h-6" />
  </motion.a>
));

export function ContactShowcase() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Use custom hook for lazy loading
  const [mapRef, isMapVisible] = useLazySection<HTMLDivElement>();
  const [faqRef, isFAQVisible] = useLazySection<HTMLDivElement>();
  const [socialRef, isSocialVisible] = useLazySection<HTMLDivElement>();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  // Animations parallaxes
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Téléphone",
      content: "+221 33 999 99 99",
      description: "Du lundi au vendredi, 9h-18h",
      action: "tel:+221771234567",
      actionText: "Appeler maintenant"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      content: "contact@artbeaurescence.sn",
      description: "Nous répondons sous 24h",
      action: "mailto:contact@artbeaurescence.sn",
      actionText: "Envoyer un email"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Adresse",
      content: "Dakar, Sénégal",
      description: "Ouakam",
      action: "https://maps.google.com/?q=Technopole+Dakar+Senegal",
      actionText: "Voir sur la carte"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Heures de bureau",
      content: "9h - 18h",
      description: "Lundi au vendredi",
      action: "",
      actionText: ""
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/artbeaurescence/", color: "bg-blue-600" },
    { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@artbeau-rescence", color: "bg-sky-500" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/artbeaurescence/", color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" },
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/profile.php?id=100091356004097", color: "bg-blue-700" }
  ];

  const tabs = [
    { name: "Général", description: "Questions générales et partenariats" },
    { name: "Support", description: "Assistance technique et service client" },
    { name: "Carrières", description: "Rejoindre notre équipe" }
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <motion.div 
          style={{ y, opacity, scale }}
          className="container mx-auto px-4 md:px-8 relative z-10 py-20 flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">Contactez-nous</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 font-light">
              Notre équipe est à votre disposition pour vous accompagner
            </p>
            <p className="text-md text-blue-200 mb-8">
              Ensemble, transformons vos idées en solutions innovantes
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <Button 
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-full text-lg font-medium group"
            >
              Discuter de votre projet
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </motion.section>

      {/* Contact Cards Section - Eagerly loaded as it's important information */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Comment pouvons-nous vous aider ?</h2>
            <p className="text-gray-600 text-lg">
              Plusieurs façons de nous contacter et de rester connecté
            </p>
          </motion.div>

          {/* Contact cards with memoized component */}
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <ContactCard key={info.title} info={info} />
            ))}
          </motion.div>

          {/* Map Section - Lazy loaded */}
          <div ref={mapRef} className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 mb-20 relative">
            {isMapVisible ? (
              <Suspense fallback={<div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">Chargement de la carte...</div>}>
                <LazyMap />
              </Suspense>
            ) : (
              <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
                <p>Carte en cours de chargement...</p>
              </div>
            )}
          </div>

          {/* Social Media Section - Lazy loaded with memoized components */}
          <div ref={socialRef} className="text-center mb-20">
            <h3 className="text-2xl font-bold text-blue-900 mb-8">Suivez-nous sur les réseaux sociaux</h3>
            {isSocialVisible && (
              <div className="flex flex-wrap justify-center gap-6">
                {socialLinks.map((social) => (
                  <SocialButton key={social.name} social={social} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section - Important, so eagerly loaded */}
      <section ref={formRef} className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Envoyez-nous un message</h2>
            <p className="text-gray-600 text-lg">
              Nous vous répondrons dans les plus brefs délais
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-5">
                {/* Tabs */}
                <div className="md:col-span-2 bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8">
                  <h3 className="text-2xl font-bold mb-6">Contactez-nous</h3>
                  <p className="text-blue-100 mb-8">
                    Choisissez le département qui correspond le mieux à votre demande pour un traitement plus rapide.
                  </p>
                  
                  <div className="space-y-3">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab.name}
                        onClick={() => setActiveTab(index)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          activeTab === index 
                            ? "bg-white/10 border-l-4 border-teal-400" 
                            : "hover:bg-white/5"
                        }`}
                      >
                        <div className="font-medium">{tab.name}</div>
                        <div className="text-sm text-blue-200">{tab.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <motion.div 
                  className="md:col-span-3 p-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={formAnimation}
                >
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center"
                    >
                      <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-teal-800 mb-2">Message envoyé avec succès!</h3>
                      <p className="text-teal-700">
                        Merci de nous avoir contacté. Notre équipe vous répondra dans les plus brefs délais.
                      </p>
                    </motion.div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div whileFocus="focus" variants={inputAnimation}>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                        
                        <motion.div whileFocus="focus" variants={inputAnimation}>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div whileFocus="focus" variants={inputAnimation}>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </motion.div>
                        
                        <motion.div whileFocus="focus" variants={inputAnimation}>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                          <select
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          >
                            <option value="">Sélectionnez un sujet</option>
                            <option value="general">Renseignement général</option>
                            <option value="support">Support technique</option>
                            <option value="partnership">Partenariat</option>
                            <option value="other">Autre</option>
                          </select>
                        </motion.div>
                      </div>
                      
                      <motion.div whileFocus="focus" variants={inputAnimation}>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        ></textarea>
                      </motion.div>
                      
                      <div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-blue-900 hover:bg-teal-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>Envoi en cours...</>
                          ) : (
                            <>
                              Envoyer le message
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Lazy loaded */}
      <section ref={faqRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Questions fréquentes</h2>
            <p className="text-gray-600 text-lg">
              Trouvez rapidement des réponses à vos questions
            </p>
          </motion.div>

          {isFAQVisible && (
            <Suspense fallback={<div className="h-40 flex items-center justify-center">Chargement des questions fréquentes...</div>}>
              <LazyFAQ />
            </Suspense>
          )}
        </div>
      </section>

      {/* CTA Section - Important, so eagerly loaded */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Prêt à transformer vos idées en réalité ?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 mb-8"
            >
              Rejoignez les entreprises qui font confiance à Art'Beau-Rescence pour leurs solutions technologiques
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-900 hover:bg-teal-50 px-8 py-3 rounded-lg text-lg font-medium"
              >
                Contactez-nous
              </Button>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg text-lg font-medium"
                >
                  Découvrir nos services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}