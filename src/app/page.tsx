"use client";

import { Suspense, lazy } from "react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

// Lazy load non-critical components
const Services = lazy(() => import("@/components/Services").then(mod => ({ default: mod.Services })));
const About = lazy(() => import("@/components/About").then(mod => ({ default: mod.About })));
const Contact = lazy(() => import("@/components/Contact").then(mod => ({ default: mod.Contact })));

// Simple loading component
const LoadingFallback = () => <div className="min-h-[50vh] flex items-center justify-center"><div className="animate-pulse text-blue-500">Chargement...</div></div>;

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
      <Footer />
    </main>
  );
}
