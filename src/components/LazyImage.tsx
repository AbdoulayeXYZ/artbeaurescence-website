"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  threshold?: number;
}

export default function LazyImage({ threshold = 0.1, ...props }: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentElement = document.getElementById(`lazy-image-${props.alt?.replace(/\s+/g, '-')}`);
    if (currentElement) observer.observe(currentElement);

    return () => observer.disconnect();
  }, [props.alt, threshold]);

  return (
    <div 
      id={`lazy-image-${props.alt?.replace(/\s+/g, '-')}`}
      className={`relative ${props.className || ''}`}
      style={{ height: props.height, width: props.width }}
    >
      {isVisible ? (
        <Image
          {...props}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${props.className || ''}`}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
      )}
    </div>
  );
}