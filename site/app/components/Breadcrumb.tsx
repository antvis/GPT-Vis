'use client';

import { useTranslation } from './I18nProvider';

import { ChevronRight } from 'lucide-react';
import { CopyMarkdownButton } from './CopyMarkdownButton';
import Link from './LocaleLink';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslation();
  return (
    <div className="examples-breadcrumb-row">
      <nav aria-label={t('Breadcrumb')}>
        <Link href="/">GPT-Vis</Link>
        {items.map((item, index) => (
          <span key={t(item.label)}>
            <ChevronRight className="size-3" aria-hidden="true" />
            {item.href && index !== items.length - 1 ? (
              <Link href={item.href}>{t(item.label)}</Link>
            ) : (
              <span aria-current="page">{t(item.label)}</span>
            )}
          </span>
        ))}
      </nav>
      <CopyMarkdownButton />
    </div>
  );
}
