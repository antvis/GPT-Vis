'use client';

import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { ThemeSpec } from '../../../../src';
import { annotationGroupIcons, annotationIcons } from '../../examples/annotationIcons';
import {
  annotationExample,
  annotationGroups,
  annotationsData,
} from '../../examples/examplesData/annotations';
import { cn } from '../../lib/cn';
import { useTranslation } from '../I18nProvider';
import { LiveChart } from '../LiveChart';
import Link from '../LocaleLink';
import styles from './annotations.module.css';
import { Reveal } from './Reveal';

const cardThemes = Object.fromEntries(
  annotationGroups.map((group) => [
    group.id,
    {
      id: `analysis-preview-${group.id}`,
      label: group.name,
      baseTheme: 'default',
      tokens: {
        colorDefault: group.tone.accent,
        category10: [group.tone.accent],
        colorBackground: '#fffefa',
        colorSurface: '#fffefa',
        colorText: '#42394b',
        colorTextSecondary: '#7b7280',
        colorStroke: '#e5dfd8',
        fontFamily: 'Alibaba PuHuiTi, sans-serif',
      },
    } satisfies ThemeSpec,
  ]),
);

export function AnnotationShowcase() {
  const t = useTranslation();
  return (
    <div className={styles.grid}>
      {annotationGroups.map((group, index) => {
        const example = annotationsData.examples.find(({ type }) => type === group.preview)!;
        const GroupIcon = annotationGroupIcons[group.id];
        const Icon = annotationIcons[group.preview];
        return (
          <Reveal key={group.id} className="h-full min-w-0">
            <article
              className={cn(
                styles.card,
                'group/annotation motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1',
              )}
              style={
                {
                  '--card-accent': group.tone.accent,
                  '--card-rgb': group.tone.rgb,
                  '--card-paper': group.tone.paper,
                  '--card-fold': group.tone.fold,
                } as CSSProperties
              }
            >
              <div className={styles.copy}>
                <p className={styles.eyebrow}>
                  <span>
                    <GroupIcon className="size-3.5" aria-hidden="true" />
                  </span>
                  {t(group.name)}
                  <small className={styles.index}>0{index + 1}</small>
                </p>
                <h3 className="text-balance">
                  {t(group.headline[0])}
                  <br />
                  <em>{t(group.headline[1])}</em>
                </h3>
                <p className={styles.description}>{t(group.description)}</p>
              </div>
              <div className={styles.collage}>
                <div
                  className={cn(
                    styles.backing,
                    index % 2 === 0 ? '-rotate-3' : 'rotate-3',
                    'motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover/annotation:rotate-0 motion-safe:group-focus-within/annotation:rotate-0',
                  )}
                  aria-hidden="true"
                />
                <div
                  className={cn(
                    styles.preview,
                    'motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover/annotation:-translate-y-0.5 motion-safe:group-focus-within/annotation:-translate-y-0.5',
                  )}
                >
                  <LiveChart
                    input={annotationExample(example, group.chart)}
                    theme={cardThemes[group.id]}
                    height={220}
                    keepMounted={false}
                    label={t(group.name)}
                  />
                  <span className={styles.note}>
                    <Icon className="size-3" aria-hidden="true" />
                    {example.type}
                  </span>
                </div>
              </div>
              <Link href={`/examples/annotations#${group.id}`} className={styles.link}>
                <span>{t('Explore {count} capabilities', { count: group.types.length })}</span>
                <ArrowUpRight
                  className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover/annotation:-translate-y-0.5 motion-safe:group-hover/annotation:translate-x-0.5 motion-safe:group-focus-within/annotation:-translate-y-0.5 motion-safe:group-focus-within/annotation:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
