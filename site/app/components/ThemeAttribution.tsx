'use client';

import { useTranslation } from './I18nProvider';

import { ArrowUpRight } from 'lucide-react';

export function ThemeAttribution({ themeId }: { themeId: string }) {
  const t = useTranslation();
  if (themeId !== 'pop') return null;

  return (
    <span>
      {t('Pop style adapted from')}{' '}
      <a
        href="https://github.com/microsoft/flint-chart"
        target="_blank"
        rel="noopener noreferrer"
        className="site-text-link"
      >
        Flint <ArrowUpRight className="size-3" aria-hidden="true" />
      </a>
      .
    </span>
  );
}
