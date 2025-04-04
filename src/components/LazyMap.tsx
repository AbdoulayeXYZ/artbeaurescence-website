"use client";

import { useState } from "react";

export default function LazyMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="aspect-w-16 aspect-h-7 w-full h-[400px] relative">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.0507383271174!2d-17.4958454!3d14.7249972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQzJzMwLjAiTiAxN8KwMjknNDUuMCJX!5e0!3m2!1sfr!2ssn!4v1620000000000!5m2!1sfr!2ssn" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        className={`absolute inset-0 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      ></iframe>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Chargement de la carte...</p>
        </div>
      )}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
        <h3 className="font-bold text-blue-900">Art'Beau-Rescence S.A.S</h3>
        <p className="text-gray-700 text-sm">Ouakam, Dakar, Sénégal</p>
      </div>
    </div>
  );
}