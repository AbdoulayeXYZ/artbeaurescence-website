"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const fadeInUpAndZoom = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        times: [0, 0.6, 1],
      }
    }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/images/hero.mp4" type="video/mp4" />
      </video>

      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-1"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 min-h-screen flex items-center">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid md:grid-cols-2 gap-6 items-center w-full"
        >
          <div className="order-2 md:order-1">
            <motion.div variants={fadeInUpAndZoom}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                  Art'Beau-Rescence
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeInUpAndZoom}>
              <h2 className="text-xl md:text-3xl text-teal-300 mb-4 font-medium">
                Technicité & Pragmatisme
              </h2>
            </motion.div>

            <motion.p 
              variants={fadeInUpAndZoom}
              className="text-gray-100 text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
            >
              Une solution technologique avancée alliant AIoT et Telematics de pointe pour une gestion de flotte optimisée et une sécurité routière améliorée au Sénégal.
            </motion.p>

            <motion.div 
              variants={fadeInUpAndZoom}
              className="flex flex-wrap gap-4"
            >
              <Link href="/ai-karangue">
                <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 transform transition-all hover:scale-105 text-lg px-8 py-6 shadow-lg hover:shadow-xl relative overflow-hidden group">
                  <span className="relative z-10">Vivre l'expérience AI-Karangué</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></span>
                </Button>
              </Link>
              
              <Link href="/produits">
                <Button 
                  variant="outline" 
                  className="border-2 border-teal-400 text-teal-300 hover:bg-teal-600/20 transform transition-all hover:scale-105 text-lg px-8 py-6"
                >
                  Découvrir nos produits
                </Button>
              </Link>
            </motion.div>
            {/* <Button 
              variant="outline" 
              className="border-2 border-teal-400 text-teal-300 hover:bg-teal-600/20 transform transition-all hover:scale-105 text-lg px-8 py-6"
            >
              Contacter notre équipe
            </Button> */}
          </div>

          {/* Decorative elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-500 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}