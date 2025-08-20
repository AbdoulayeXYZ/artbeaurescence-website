"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Increased scroll threshold
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Produits", href: "/produits" },
    { label: "Services", href: "/services" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "À propos", href: "/about" },
    { label: "Team", href: "/equipe" },
  ];

  const navAnimation = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const itemAnimation = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.header 
      initial="initial"
      animate="animate"
      variants={navAnimation}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20 px-4 mx-auto md:px-8">
        <motion.div variants={itemAnimation}>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-40 h-10">
              <Image
                src="/images/logo.png"
                alt="Art'Beau-Rescence"
                fill
                className={`object-contain transition-all duration-500 ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
                priority
              />
            </div>
          </Link>
        </motion.div>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              variants={itemAnimation}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  scrolled ? "text-gray-700 hover:text-blue-800" : "text-white hover:text-teal-300"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
          <motion.div variants={itemAnimation}>
            <Link href="/contact">
              <Button 
                className={`${
                  scrolled
                    ? "bg-blue-900 text-white hover:bg-teal-700"
                    : "bg-transparent border-2 border-teal-400 text-white hover:bg-teal-600/20"
                } transition-all duration-300`}
              >
                Contactez-nous
              </Button>
            </Link>
          </motion.div>
        </nav>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="outline" 
              size="icon"
              className={scrolled ? "" : "border-white text-white hover:bg-white/20"}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gradient-to-br from-blue-900 to-blue-950">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-white/90 transition-colors hover:text-teal-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact">
                <Button 
                  className="mt-4 bg-teal-600 text-white hover:bg-teal-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contactez-nous
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

// Remove this part at the end of the file
// Inside your Dialog component
<Dialog>
  <DialogTrigger>
    {/* Your trigger content */}
  </DialogTrigger>
  <DialogContent>
    {/* Add this line to fix the accessibility issue */}
    <DialogTitle className="sr-only">Menu</DialogTitle>
    
    {/* Your existing dialog content */}
  </DialogContent>
</Dialog>
