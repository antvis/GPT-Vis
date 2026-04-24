'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { groupedExamplesData } from '../examples/examplesData';

const HEADER_OFFSET = 80;

const allChartIds = groupedExamplesData.flatMap((g) => g.charts.map((c) => c.id));

interface SidebarProps {
  /** Controlled active item id; if omitted, driven by IntersectionObserver */
  activeId?: string;
  /** Called when an item is clicked; parent is responsible for all click behavior */
  onClick?: (id: string) => void;
}

export function Sidebar({ activeId: activeIdProp, onClick: onItemClick }: SidebarProps) {
  const isControlled = activeIdProp !== undefined;

  const [scrollActiveId, setScrollActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = isControlled ? activeIdProp : scrollActiveId;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (isControlled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setScrollActiveId(entry.target.id);
        });
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`, threshold: 0 },
    );

    allChartIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isControlled]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onItemClick) {
      onItemClick(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
        history.pushState(null, '', `#${id}`);
      }
    }
  };

  const menuContent = (
    <div className="flex flex-col px-4 py-6 gap-8">
      {groupedExamplesData.map((group) => (
        <section key={group.id}>
          <h2 className="px-4 mb-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">
            {group.title}
          </h2>
          <nav className="flex flex-col gap-0.5">
            {group.charts.map((chart) => (
              <a
                key={chart.id}
                href={`#${chart.id}`}
                onClick={(e) => handleClick(e, chart.id)}
                className={
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ' +
                  (activeId === chart.id
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container')
                }
              >
                <chart.icon className="w-4 h-4 shrink-0" />
                <span className="text-sm">{chart.name}</span>
              </a>
            ))}
          </nav>
        </section>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex bg-white w-72 shrink-0 sticky top-16 h-[calc(100vh-64px)] flex-col border-r border-outline-variant overflow-y-auto">
        {menuContent}
      </aside>

      {/* Mobile floating trigger */}
      <button
        className="fixed bottom-4 left-4 z-40 md:hidden bg-primary text-white rounded-full p-3 shadow-lg"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-outline-variant shrink-0">
              <span className="text-sm font-semibold text-on-surface">Charts</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-container"
              >
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{menuContent}</div>
          </aside>
        </div>
      )}
    </>
  );
}
