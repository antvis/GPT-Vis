'use client';

import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { GPTVis, type ThemeSpec } from '../../../src';
import { cn } from '../lib/cn';
import type { ThemeExample } from './examples';
import styles from './themes.module.css';

function ChartSurface({
  example,
  theme,
  height,
}: {
  example: ThemeExample;
  theme: ThemeSpec;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(([entry]) => {
      clearTimeout(timer);
      timer = setTimeout(() => setWidth(Math.floor(entry.contentRect.width)), 100);
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container || !width) return;
    let instance: GPTVis | undefined;
    // The cancelled StrictMode mount must not start an asynchronous renderer.
    const frame = requestAnimationFrame(() => {
      try {
        instance = new GPTVis({ container, width, height, theme });
        instance.render(example.input);
        setError('');
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      instance?.destroy();
      container.replaceChildren();
    };
  }, [example, theme, width, height, attempt]);

  return (
    <div
      className={cn('relative', example.type === 'table' && styles.tableSurface)}
      style={example.type === 'table' ? { minHeight: height } : { height }}
    >
      <div ref={ref} className="h-full w-full" />
      {error && (
        <div
          role="alert"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white p-6 text-center"
        >
          <p className="text-pretty text-sm text-red-700">Could not preview this chart. {error}</p>
          <button
            type="button"
            onClick={() => setAttempt((n) => n + 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

export function ThemeChart({
  example,
  theme,
  index,
  onExpand,
  expanded = false,
}: {
  example: ThemeExample;
  theme: ThemeSpec;
  index: number;
  onExpand?: () => void;
  expanded?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [nearby, setNearby] = useState(expanded);
  useEffect(() => {
    const element = ref.current;
    if (!element || expanded) return;
    const observer = new IntersectionObserver(([entry]) => setNearby(entry.isIntersecting), {
      rootMargin: '500px',
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [expanded]);

  const height = expanded ? Math.max(example.height, 520) : example.height;
  return (
    <article
      ref={ref}
      data-chart-type={example.type}
      className={cn(
        'mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm',
        !expanded && styles.card,
      )}
    >
      <div
        className={styles.chart}
        style={{ backgroundColor: theme.style?.backgroundColor ?? theme.tokens?.colorBackground }}
      >
        {nearby ? (
          <ChartSurface example={example} theme={theme} height={height} />
        ) : (
          <div style={{ height }} className="flex items-center justify-center">
            <span className="sr-only">{example.name} preview loads as you scroll</span>
          </div>
        )}
      </div>
      <footer className="flex items-center justify-between gap-3 border-t border-outline-variant/60 px-4 py-2.5">
        <span className="flex items-center gap-3 text-sm font-medium">
          <span className="font-mono text-xs tabular-nums text-slate-400">
            {String(index + 1).padStart(2, '0')}
          </span>
          {example.name}
        </span>
        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label={`Expand ${example.name}`}
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-primary-container hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
          >
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </button>
        )}
      </footer>
    </article>
  );
}
