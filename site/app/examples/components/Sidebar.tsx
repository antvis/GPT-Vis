'use client';

import { ArrowUpRight, Braces, ChevronDown, LayoutGrid, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';
import { chartIcons } from '../exampleIcons';
import { groupedExamplesData } from '../examplesData';

const HEADER_OFFSET = 88;
const allChartIds = groupedExamplesData.flatMap((group) => group.charts.map((chart) => chart.id));

interface SidebarProps {
  activeId?: string;
  onClick?: (id: string) => void;
}

export function Sidebar({ activeId: controlledActiveId, onClick }: SidebarProps) {
  const isControlled = controlledActiveId !== undefined;
  const [scrollActiveId, setScrollActiveId] = useState('');
  const activeId = controlledActiveId ?? scrollActiveId;

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
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [isControlled]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;
    event.preventDefault();
    event.currentTarget.closest('details')?.removeAttribute('open');
    if (onClick) {
      onClick(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top, behavior: reduceMotion ? 'instant' : 'smooth' });
      history.pushState(null, '', `#${id}`);
    }
  };

  const menu = (
    <>
      <Link href="/examples" className="examples-sidebar-heading">
        <span className="examples-sidebar-mark">
          <LayoutGrid className="size-4" aria-hidden="true" />
        </span>
        <span>
          <strong>Chart library</strong>
          <small>{allChartIds.length} ways to visualize</small>
        </span>
      </Link>
      <nav className="examples-sidebar-nav" aria-label="Chart types">
        {groupedExamplesData.map((group) => (
          <section key={group.id}>
            <h2>
              {group.title}
              <span>{group.charts.length}</span>
            </h2>
            {group.charts.map((chart) => {
              const Icon = chartIcons[chart.id];
              return (
                <a
                  key={chart.id}
                  href={isControlled ? `/examples/${chart.id}` : `#${chart.id}`}
                  onClick={(event) => handleClick(event, chart.id)}
                  aria-current={
                    activeId === chart.id ? (isControlled ? 'page' : 'location') : undefined
                  }
                  className={cn('examples-sidebar-link', activeId === chart.id && 'is-active')}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span>{chart.name}</span>
                </a>
              );
            })}
          </section>
        ))}
      </nav>
      <div className="examples-sidebar-footer">
        <Braces className="size-4" aria-hidden="true" />
        <strong>Start with your own data.</strong>
        <Link href="/docs/quickstart">
          SDK quickstart <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
        <Link href="/docs/agent-skill">
          Install the Agent Skill <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </>
  );

  return (
    <>
      <aside className="examples-sidebar">{menu}</aside>
      <details className="examples-mobile-menu" key={controlledActiveId}>
        <summary>
          <Menu className="size-4" aria-hidden="true" />
          Browse chart types
          <ChevronDown className="size-4" aria-hidden="true" />
        </summary>
        <div>{menu}</div>
      </details>
    </>
  );
}
