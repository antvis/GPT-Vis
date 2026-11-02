'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { legacyDocLinks } from '../../lib/docs';

export function LegacyDocRedirect() {
  const router = useRouter();
  useEffect(() => {
    function redirect() {
      let fragment: string;
      try {
        fragment = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = legacyDocLinks[fragment];
      if (target && target !== '/docs') router.replace(target);
    }
    redirect();
    window.addEventListener('hashchange', redirect);
    return () => window.removeEventListener('hashchange', redirect);
  }, [router]);
  return null;
}
