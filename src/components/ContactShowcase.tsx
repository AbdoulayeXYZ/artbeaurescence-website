"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, ArrowRight, ExternalLink, Linkedin, Twitter, Instagram, Facebook, Youtube } from "lucide-react";

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

  const cardAnimation = {
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

      {/* Contact Cards Section */}
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

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                variants={cardAnimation}
                whileHover="hover"
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-teal-300 transition-all flex flex-col h-full"
              >
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-xl text-white w-14 h-14 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{item.content}</p>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{item.description}</p>
                
                {item.action && (
                  <Link 
                    href={item.action}
                    target={item.action.startsWith('http') ? "_blank" : undefined}
                    className="mt-auto text-teal-600 hover:text-teal-700 font-medium flex items-center text-sm group"
                  >
                    {item.actionText}
                    <ExternalLink className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 mb-20 relative"
          >
            <div className="aspect-w-16 aspect-h-7 w-full h-[400px] relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.0507383271174!2d-17.4958454!3d14.7249972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQzJzMwLjAiTiAxN8KwMjknNDUuMCJX!5e0!3m2!1sfr!2ssn!4v1620000000000!5m2!1sfr!2ssn" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
              <h3 className="font-bold text-blue-900">Art'Beau-Rescence S.A.S</h3>
              <p className="text-gray-700 text-sm">Ouakam, Dakar, Sénégal</p>
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-20"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-8">Suivez-nous sur les réseaux sociaux</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${social.color} p-4 rounded-full text-white shadow-lg flex items-center justify-center`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/10 to-teal-300/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-400/10 to-blue-300/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-teal-600 bg-clip-text text-transparent mb-6">
              Parlons de votre projet
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Prêt à transformer votre vision en réalité ? Notre équipe d'experts est là pour vous accompagner.{" "}
              <span className="text-teal-600 font-medium">Contactez-nous dès maintenant !</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 order-2 md:order-1"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-gray-100/50">
                {/* Tabs */}
                <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        activeTab === index
                          ? "bg-blue-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 text-sm">
                  {tabs[activeTab].description}
                </p>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-teal-50 border border-teal-200 rounded-xl p-8 text-center"
                    >
                      <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-teal-100 p-3">
                          <CheckCircle2 className="w-8 h-8 text-teal-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-teal-800 mb-2">Message envoyé avec succès !</h3>
                      <p className="text-teal-700">
                        Merci de nous avoir contacté. Notre équipe vous répondra dans les plus brefs délais.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      variants={formAnimation}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom complet
                          </label>
                          <motion.input
                            whileFocus={inputAnimation.focus}
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <motion.input
                            whileFocus={inputAnimation.focus}
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                          </label>
                          <motion.input
                            whileFocus={inputAnimation.focus}
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="+221 XX XXX XX XX"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Sujet
                          </label>
                          <motion.select
                            whileFocus={inputAnimation.focus}
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          >
                            <option value="">Sélectionnez un sujet</option>
                            <option value="general">Renseignement général</option>
                            <option value="partnership">Partenariat</option>
                            <option value="support">Support technique</option>
                            <option value="career">Carrière</option>
                            <option value="other">Autre</option>
                          </motion.select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <motion.textarea
                          whileFocus={inputAnimation.focus}
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          placeholder="Décrivez votre projet ou votre demande..."
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-blue-900 to-teal-600 hover:from-blue-800 hover:to-teal-500 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              Envoyer le message
                              <Send className="h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Side Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-1 order-1 md:order-2"
            >
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-lg p-8 text-white sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Pourquoi nous contacter ?</h3>
                
                <ul className="space-y-4">
                  {[
                    "Discuter de vos besoins en innovation technologique",
                    "Explorer des opportunités de partenariat",
                    "Demander une démonstration de nos solutions",
                    "Rejoindre notre équipe de talents"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-300" />
                      </div>
                      <span className="text-blue-100">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-blue-700/50">
                  <p className="text-blue-100 mb-4">
                    Notre équipe est disponible pour vous accompagner dans tous vos projets d'innovation technologique au Sénégal.
                  </p>
                  <div className="flex items-center gap-2 text-teal-300 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Réponse sous 24-48h</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-700/50">
                  <div className="flex justify-center">
                    <div className="relative h-12 w-48">
                      <Image
                        src="/images/logo.png"
                        alt="Art'Beau-Rescence"
                        fill
                        className="object-contain brightness-0 invert"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
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
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à transformer votre vision en réalité ?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Rejoignez les entreprises qui font confiance à Art'Beau-Rescence pour leurs solutions technologiques innovantes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 rounded-full text-lg font-medium group"
              >
                Contactez-nous
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                asChild
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-medium"
              >
                <Link href="/services">
                  Découvrir nos services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}