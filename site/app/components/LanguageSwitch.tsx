'use client';

import { Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { LANGUAGE_STORAGE_KEY, localeHref } from '../lib/i18n';
import { useLocale } from './I18nProvider';

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  window.addEventListener('popstate', callback);
  return () => {
    window.removeEventListener('hashchange', callback);
    window.removeEventListener('popstate', callback);
  };
}
const getSuffix = () => window.location.search + window.location.hash;
const getServerSuffix = () => '';

export function LanguageSwitch() {
  const pathname = usePathname();
  const suffix = useSyncExternalStore(subscribe, getSuffix, getServerSuffix);
  const nextLocale = useLocale() === 'en' ? 'zh' : 'en';
  const label = nextLocale === 'zh' ? '切换到中文' : 'Switch to English';
  return (
    <a
      href={localeHref(pathname + suffix, nextLocale)}
      className="site-icon-link"
      aria-label={label}
      title={label}
      lang={nextLocale === 'zh' ? 'zh-CN' : 'en'}
      hrefLang={nextLocale === 'zh' ? 'zh-CN' : 'en'}
      onClick={(event) => {
        // Read the complete URL at activation time: Studio may have changed its theme hash.
        event.currentTarget.href = localeHref(
          `${window.location.pathname}${window.location.search}${window.location.hash}`,
          nextLocale,
        );
        try {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
        } catch {
          /* Optional preference. */
        }
      }}
    >
      <Globe className="size-[18px]" aria-hidden="true" />
    </a>
  );
}
