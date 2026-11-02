'use client';

import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>({
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -48px 0px',
} = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= threshold;
        setInView(visible);
        if (visible && once) observer.disconnect();
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
