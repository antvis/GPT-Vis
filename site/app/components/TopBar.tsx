'use client';

import { useTranslation } from './I18nProvider';

import { BookOpen, House, LayoutGrid, Menu, Palette } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { stripLocale } from '../lib/i18n';
import { GithubIcon } from './GithubIcon';
import { LanguageSwitch } from './LanguageSwitch';
import Link from './LocaleLink';

const links = [
  { href: '/', label: 'Home', icon: House },
  { href: '/examples', label: 'Examples', icon: LayoutGrid },
  { href: '/docs', label: 'Docs', icon: BookOpen },
];
export function TopBar() {
  const t = useTranslation();
  const pathname = stripLocale(usePathname());
  const current = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="site-brand" aria-label={t('GPT-Vis home')}>
            <Image src="/gpt-vis-logo.png" alt="" width={32} height={32} />
            <strong>GPT-Vis</strong>
            <span>1.3</span>
          </Link>
          <nav className="site-desktop-nav" aria-label={t('Home navigation')}>
            <Link href="/" aria-current={current('/') ? 'page' : undefined}>
              <House className="size-3.5" aria-hidden="true" />
              {t('Home')}{' '}
            </Link>
          </nav>
          <div className="site-header-tools">
            <nav className="site-resource-nav" aria-label={t('Examples and documentation')}>
              {links.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current(item.href) ? 'page' : undefined}
                >
                  <item.icon className="size-3.5" aria-hidden="true" />
                  {t(item.label)}
                </Link>
              ))}
            </nav>
            <Link
              href="/themes"
              className="site-icon-link"
              aria-label={t('Theme Studio')}
              title={t('Theme Studio')}
              aria-current={pathname === '/themes' ? 'page' : undefined}
            >
              <Palette className="size-[18px]" aria-hidden="true" />
            </Link>
            <LanguageSwitch />
            <a
              href="https://github.com/antvis/GPT-Vis"
              className="site-icon-link"
              aria-label={t('GPT-Vis on GitHub')}
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="size-[18px]" aria-hidden="true" />
            </a>
          </div>
          <details className="site-mobile-nav" key={pathname}>
            <summary aria-label={t('Navigation menu')}>
              <Menu className="size-5" aria-hidden="true" />
            </summary>
            <nav aria-label={t('Mobile navigation')}>
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current(item.href) ? 'page' : undefined}
                >
                  <item.icon className="size-4" aria-hidden="true" />
                  {t(item.label)}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <div className="site-header-space" aria-hidden="true" />
    </>
  );
}
