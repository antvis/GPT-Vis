'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import VersionSwitcher from './VersionSwitcher';

const navItems = [
  { href: '/docs', label: 'Documentation' },
  { href: '/examples', label: 'Examples' },
  { href: 'https://github.com/antvis/GPT-Vis', label: 'GitHub', external: true },
];

export function TopBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 max-w-screen-xl mx-auto w-full">
          <div className="flex flex-col justify-center h-[64px]">
            <Link href="/" className="flex items-center gap-1" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/gpt-vis-logo.png"
                alt="GPT-Vis Logo"
                width={52}
                height={52}
                className="w-14 h-14"
              />
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-gray-900">GPT-Vis</span>
                <span className="text-xs font-medium text-gray-500">
                  AI-Native Visualization for the LLM Era
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 font-headline tracking-tight font-medium">
              {navItems.map(({ href, label, external }) => (
                <Link
                  key={href}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`text-on-surface-variant hover:text-primary transition-colors duration-200${pathname === href || (href !== '/' && pathname.startsWith(href)) ? ' text-primary' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 text-on-surface-variant/60">
              <VersionSwitcher />
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-outline-variant bg-white">
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navItems.map(({ href, label, external }) => (
                <Link
                  key={href}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors${
                    pathname === href || (href !== '/' && pathname.startsWith(href))
                      ? ' text-primary bg-primary/5'
                      : ' text-on-surface-variant hover:text-primary hover:bg-surface-container'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
