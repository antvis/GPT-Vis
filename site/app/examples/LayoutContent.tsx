'use client';

import { useTranslation } from '../components/I18nProvider';

import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '../lib/i18n';
import { localeHref, stripLocale } from '../lib/i18n';
import { ExampleThemeContext, useActiveTheme } from '../themes/active-theme';
import { ExampleThemeControl } from './components/ExampleThemeControl';
import { Sidebar } from './components/Sidebar';
import './examples.css';

export default function ExamplesLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const t = useTranslation();
  const pathname = stripLocale(usePathname()).replace(/\/$/, '');
  const router = useRouter();
  const theme = useActiveTheme();

  const isAnalysis =
    pathname === '/examples/annotations' || pathname.startsWith('/examples/annotations/');
  const base = isAnalysis ? '/examples/annotations' : '/examples';
  const isDetail = pathname !== base;
  const activeId = isDetail ? pathname.split('/').pop() : undefined;

  return (
    <ExampleThemeContext.Provider value={theme}>
      <div className="examples-site">
        <a href="#examples-content" className="examples-skip">
          {t('Skip to examples')}{' '}
        </a>
        <div className="examples-layout">
          <Sidebar
            library={isAnalysis ? 'annotations' : 'charts'}
            {...(isDetail
              ? {
                  activeId,
                  onClick: (id: string) => router.push(localeHref(`${base}/${id}`, locale)),
                }
              : {})}
          />
          <div className="examples-content">{children}</div>
        </div>
        <ExampleThemeControl />
      </div>
    </ExampleThemeContext.Provider>
  );
}
