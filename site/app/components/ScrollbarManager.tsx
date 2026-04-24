'use client';

import { useEffect } from 'react';

export function ScrollbarManager() {
  useEffect(() => {
    const timers = new WeakMap<Element, ReturnType<typeof setTimeout>>();

    const showScrollbar = (el: Element) => {
      el.classList.add('is-scrolling');
      const existing = timers.get(el);
      if (existing) clearTimeout(existing);
      timers.set(
        el,
        setTimeout(() => {
          el.classList.remove('is-scrolling');
          timers.delete(el);
        }, 800),
      );
    };

    const handleScroll = (e: Event) => {
      if (e.target === document) {
        // Page-level scroll: mark both html and body for browser compatibility
        showScrollbar(document.documentElement);
        showScrollbar(document.body);
      } else {
        showScrollbar(e.target as Element);
      }
    };

    document.addEventListener('scroll', handleScroll, true);
    return () => document.removeEventListener('scroll', handleScroll, true);
  }, []);

  return null;
}
