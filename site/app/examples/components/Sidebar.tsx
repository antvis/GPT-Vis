'use client';

import { useLocale, useTranslation } from '../../components/I18nProvider';
import { localeHref } from '../../lib/i18n';

import { ArrowUpRight, Braces, ChevronDown, LayoutGrid, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from '../../components/LocaleLink';
import { cn } from '../../lib/cn';
import { annotationIcons } from '../annotationIcons';
import { chartIcons } from '../exampleIcons';
import { groupedExamplesData } from '../examplesData';
import { annotationGroups, annotationHref, annotationsData } from '../examplesData/annotations';

const HEADER_OFFSET = 88;
const allChartIds = groupedExamplesData.flatMap((group) => group.charts.map((chart) => chart.id));

interface SidebarProps {
  library?: 'charts' | 'annotations';
  activeId?: string;
  onClick?: (id: string) => void;
}

export function Sidebar({
  library = 'charts',
  activeId: controlledActiveId,
  onClick,
}: SidebarProps) {
  const t = useTranslation();
  const locale = useLocale();
  const isAnalysis = library === 'annotations';
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
    const ids = isAnalysis ? annotationsData.examples.map(({ type }) => type) : allChartIds;
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [isControlled, isAnalysis]);

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
      <div className="examples-sidebar-libraries">
        <Link href="/examples" aria-current={!isAnalysis ? 'page' : undefined}>
          <LayoutGrid className="size-4" aria-hidden="true" />
          <span>{t('Visualizations')}</span>
          <b>{allChartIds.length}</b>
        </Link>
        <Link href="/examples/annotations" aria-current={isAnalysis ? 'page' : undefined}>
          <Braces className="size-4" aria-hidden="true" />
          <span>{t('Analysis capabilities')}</span>
          <b>{annotationsData.examples.length}</b>
        </Link>
      </div>
      <nav
        className="examples-sidebar-nav"
        aria-label={t(isAnalysis ? 'Analysis capabilities' : 'Chart types')}
      >
        {isAnalysis
          ? annotationGroups.map((group) => (
              <section key={group.id}>
                <h2>
                  <Link href={isControlled ? `/examples/annotations#${group.id}` : `#${group.id}`}>
                    {t(group.name)}
                  </Link>
                  <span>{group.types.length}</span>
                </h2>
                {group.types.map((type) => {
                  const Icon = annotationIcons[type];
                  return (
                    <a
                      key={type}
                      href={isControlled ? localeHref(annotationHref(type), locale) : `#${type}`}
                      className={cn('examples-sidebar-link', activeId === type && 'is-active')}
                      aria-current={
                        activeId === type ? (isControlled ? 'page' : 'location') : undefined
                      }
                      onClick={(event) => handleClick(event, type)}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      <span>{type}</span>
                    </a>
                  );
                })}
              </section>
            ))
          : groupedExamplesData.map((group) => (
              <section key={group.id}>
                <h2>
                  {t(group.title)}
                  <span>{group.charts.length}</span>
                </h2>
                {group.charts.map((chart) => {
                  const Icon = chartIcons[chart.id];
                  return (
                    <a
                      key={chart.id}
                      href={
                        isControlled ? localeHref(`/examples/${chart.id}`, locale) : `#${chart.id}`
                      }
                      onClick={(event) => handleClick(event, chart.id)}
                      aria-current={
                        activeId === chart.id ? (isControlled ? 'page' : 'location') : undefined
                      }
                      className={cn('examples-sidebar-link', activeId === chart.id && 'is-active')}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      <span>{t(chart.name)}</span>
                    </a>
                  );
                })}
              </section>
            ))}
      </nav>
      <div className="examples-sidebar-footer">
        <Braces className="size-4" aria-hidden="true" />
        <strong>{t('Start with your own data.')}</strong>
        <Link href="/docs/quickstart">
          {t('SDK quickstart')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
        <Link href="/docs/agent-skill">
          {t('Install the Agent Skill')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
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
          {t(isAnalysis ? 'Browse analysis capabilities' : 'Browse chart types')}{' '}
          <ChevronDown className="size-4" aria-hidden="true" />
        </summary>
        <div>{menu}</div>
      </details>
    </>
  );
}
