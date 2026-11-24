'use client';

import { createContext, useContext, useMemo } from 'react';
import { getTranslator, type Locale } from '../lib/i18n';

const LocaleContext = createContext<Locale>('en');
export function I18nProvider({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export const useLocale = () => useContext(LocaleContext);
export function useTranslation() {
  const locale = useLocale();
  return useMemo(() => getTranslator(locale), [locale]);
}
