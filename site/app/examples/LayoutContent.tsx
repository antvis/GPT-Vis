'use client';

import { useTranslation } from '../components/I18nProvider';

import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '../lib/i18n';
import { localeHref, stripLocale } from '../lib/i18n';
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
  const pathname = stripLocale(usePathname());
  const router = useRouter();

  const isDetail = pathname !== '/examples' && pathname.startsWith('/examples/');
  const chartId = isDetail ? pathname.split('/').pop() : undefined;

  return (
    <div className="examples-site">
      <a href="#examples-content" className="examples-skip">
        {t('Skip to examples')}{' '}
      </a>
      <div className="examples-layout">
        <Sidebar
          {...(isDetail
            ? {
                activeId: chartId,
                onClick: (id: string) => router.push(localeHref(`/examples/${id}`, locale)),
              }
            : {})}
        />
        <div className="examples-content">{children}</div>
      </div>
    </div>
  );
}
