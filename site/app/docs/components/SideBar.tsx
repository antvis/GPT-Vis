'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const tocItems = [
  {
    title: 'Getting Started',
    id: 'getting-started-group',
    subItems: [
      { title: 'Installation', id: 'installation' },
      { title: 'Quick Start', id: 'quick-start' },
    ],
  },
  {
    title: 'API Reference',
    id: 'api-reference-group',
    subItems: [
      { title: 'GPTVis API', id: 'api-reference' },
      { title: 'Streaming API', id: 'streaming' },
    ],
  },
  {
    title: 'Visualization',
    id: 'visualization-group',
    subItems: [
      { title: 'Syntax Guide', id: 'visualization' },
      { title: 'Components', id: 'components' },
      { title: 'Style Configuration', id: 'style-config' },
    ],
  },
  {
    title: 'Integration',
    id: 'integration-group',
    subItems: [
      { title: 'AI Agent Integration', id: 'integration' },
      { title: 'Markdown Integration', id: 'markdown-integration' },
      { title: 'Framework Integration', id: 'framework' },
    ],
  },
];

const allSectionIds = tocItems.flatMap((g) => g.subItems.map((item) => item.id));

interface SideBarProps {
  /** Controlled active item id; if omitted, driven by IntersectionObserver */
  activeId?: string;
  /** Called when an item is clicked; parent is responsible for all click behavior */
  onItemClick?: (id: string) => void;
}

export function SideBar({ activeId: activeIdProp, onItemClick }: SideBarProps) {
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

    const visibleSections = new Set<string>();

    const updateActive = () => {
      const first = allSectionIds.find((id) => visibleSections.has(id));
      if (first) setScrollActiveId(first);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });
        updateActive();
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    allSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isControlled]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onItemClick?.(id);
  };

  const menuContent = (
    <div className="flex flex-col px-4 py-6 gap-6">
      {tocItems.map((group) => (
        <section key={group.id}>
          <h2 className="px-4 mb-1 text-sm font-bold text-on-surface">{group.title}</h2>
          <nav className="flex flex-col gap-0.5">
            {group.subItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm
                  ${
                    activeId === item.id
                      ? 'text-primary font-medium'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                  }`}
              >
                {item.title}
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
              <span className="text-sm font-semibold text-on-surface">Documentation</span>
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
