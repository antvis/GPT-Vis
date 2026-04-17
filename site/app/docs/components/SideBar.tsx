'use client';

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
    ],
  },
  {
    title: 'Integration',
    id: 'integration-group',
    subItems: [
      { title: 'AI Agent Integration', id: 'integration' },
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
  const activeId = isControlled ? activeIdProp : scrollActiveId;

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
    onItemClick?.(id);
  };

  return (
    <aside className="bg-white w-72 shrink-0 sticky top-16 h-[calc(100vh-64px)] flex flex-col border-r border-outline-variant overflow-y-auto">
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
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-xs
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
    </aside>
  );
}
