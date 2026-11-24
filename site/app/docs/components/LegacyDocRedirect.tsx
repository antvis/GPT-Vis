'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from '../../components/I18nProvider';
import { legacyDocLinks } from '../../lib/docs';
import { localeHref } from '../../lib/i18n';

export function LegacyDocRedirect() {
  const router = useRouter();
  const locale = useLocale();
  useEffect(() => {
    function redirect() {
      let fragment: string;
      try {
        fragment = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = legacyDocLinks[fragment];
      if (target && target !== '/docs') router.replace(localeHref(target, locale));
    }
    redirect();
    window.addEventListener('hashchange', redirect);
    return () => window.removeEventListener('hashchange', redirect);
  }, [router, locale]);
  return null;
}
