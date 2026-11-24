'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { localeHref } from '../lib/i18n';
import { useLocale } from './I18nProvider';

export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const locale = useLocale();
  return <Link href={typeof href === 'string' ? localeHref(href, locale) : href} {...props} />;
}
