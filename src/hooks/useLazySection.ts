import { useState, useEffect, useRef, RefObject } from 'react';

interface UseLazySectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazySection<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '100px',
}: UseLazySectionOptions = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = ref.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}