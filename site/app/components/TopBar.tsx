'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import VersionSwitcher from './VersionSwitcher';

const navItems = [
  { href: '/docs', label: 'Documentation' },
  { href: '/examples', label: 'Examples' },
  { href: 'https://github.com/antvis/GPT-Vis', label: 'GitHub', external: true },
];

export function TopBar() {
  const pathname = usePathname();

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 max-w-screen-xl mx-auto w-full">
          <div className="flex flex-col justify-center h-[64px]">
            <Link href="/" className="flex items-center gap-1">
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
            <div className="flex items-center gap-6">
              {/* <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Quick search..."
                className="bg-surface-container border-outline-variant border rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all outline-none"
              />
            </div> */}
              <div className="flex items-center gap-4 text-on-surface-variant/60">
                <VersionSwitcher />
                {/* <button className="hover:text-primary transition-all duration-200 active:scale-95">
                <Sun className="w-5 h-5" />
              </button>
              <button className="hover:text-primary transition-all duration-200 active:scale-95">
                <Settings className="w-5 h-5" />
              </button> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
