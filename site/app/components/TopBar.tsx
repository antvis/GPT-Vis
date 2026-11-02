'use client';

import { BookOpen, House, LayoutGrid, Menu, Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GithubIcon } from './GithubIcon';

const links = [
  { href: '/', label: 'Home', icon: House },
  { href: '/examples', label: 'Examples', icon: LayoutGrid },
  { href: '/docs', label: 'Docs', icon: BookOpen },
];
export function TopBar() {
  const pathname = usePathname();
  const current = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="site-brand" aria-label="GPT-Vis home">
            <Image src="/gpt-vis-logo.png" alt="" width={32} height={32} />
            <strong>GPT-Vis</strong>
            <span>1.3</span>
          </Link>
          <nav className="site-desktop-nav" aria-label="Home navigation">
            <Link href="/" aria-current={current('/') ? 'page' : undefined}>
              <House className="size-3.5" aria-hidden="true" />
              Home
            </Link>
          </nav>
          <div className="site-header-tools">
            <nav className="site-resource-nav" aria-label="Examples and documentation">
              {links.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current(item.href) ? 'page' : undefined}
                >
                  <item.icon className="size-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/themes"
              className="site-icon-link"
              aria-label="Theme Studio"
              title="Theme Studio"
              aria-current={pathname === '/themes' ? 'page' : undefined}
            >
              <Palette className="size-[18px]" aria-hidden="true" />
            </Link>
            <a
              href="https://github.com/antvis/GPT-Vis"
              className="site-icon-link"
              aria-label="GPT-Vis on GitHub"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="size-[18px]" aria-hidden="true" />
            </a>
          </div>
          <details className="site-mobile-nav" key={pathname}>
            <summary aria-label="Navigation menu">
              <Menu className="size-5" aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile navigation">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current(item.href) ? 'page' : undefined}
                >
                  <item.icon className="size-4" aria-hidden="true" />
                  {item.label}
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
