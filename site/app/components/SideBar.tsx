'use client';

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
  const activeId = isControlled ? activeIdProp : scrollActiveId;

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
    if (onItemClick) {
      onItemClick(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <aside className="bg-white w-72 shrink-0 sticky top-16 h-[calc(100vh-64px)] flex flex-col border-r border-outline-variant overflow-y-auto">
      <div className="flex flex-col px-4 py-6 gap-8">
        {groupedExamplesData.map((group) => (
          <section key={group.id}>
            <h2 className="px-4 mb-3 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              {group.title}
            </h2>
            <nav className="flex flex-col gap-0.5">
              {group.charts.map((chart) => (
                <button
                  key={chart.id}
                  onClick={(e) => handleClick(e, chart.id)}
                  className={
                    'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 w-full text-left ' +
                    (activeId === chart.id
                      ? 'text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container')
                  }
                >
                  <chart.icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm">{chart.name}</span>
                </button>
              ))}
            </nav>
          </section>
        ))}
      </div>

      {/* <div className="mt-auto px-8 py-8 border-t border-surface-container flex flex-col gap-5 bg-white">
        <a href="#" className="text-sm font-semibold text-primary flex items-center gap-2 group">
          View Roadmap
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </a>
        <div className="flex flex-col gap-3">
          <a
            href="#"
            className="flex items-center gap-2 text-xs font-medium text-on-surface-variant/60 hover:text-primary transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> Support
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-xs font-medium text-on-surface-variant/60 hover:text-primary transition-colors"
          >
            <Bug className="w-4 h-4" /> Report Issue
          </a>
        </div>
      </div> */}
    </aside>
  );
}
