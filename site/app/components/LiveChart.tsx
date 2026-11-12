'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { GPTVis, ThemeSpec } from '../../../src';
import { cn } from '../lib/cn';
import { useInView } from '../lib/use-in-view';
import styles from './live-chart.module.css';

let renderer: Promise<typeof import('../../../src')> | undefined;

export function LiveChart({
  input,
  theme,
  height = 280,
  wrapper = false,
  keepMounted = true,
  label,
}: {
  input: string | Record<string, unknown>;
  theme?: ThemeSpec;
  height?: number;
  wrapper?: boolean;
  keepMounted?: boolean;
  label: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: keepMounted,
    threshold: 0.1,
    rootMargin: '0px',
  });
  const [width, setWidth] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    const resize = new ResizeObserver(([entry]) => {
      clearTimeout(timer);
      timer = setTimeout(() => setWidth(Math.floor(entry.contentRect.width)), 80);
    });
    // Fetch the renderer early; draw only when the chart is actually in view.
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        renderer ??= import('../../../src');
        void renderer.catch((cause: unknown) => {
          if (active) setError(cause instanceof Error ? cause.message : 'Could not load chart');
        });
        preload.disconnect();
      },
      { rootMargin: '200px' },
    );
    resize.observe(element);
    preload.observe(element);
    return () => {
      active = false;
      clearTimeout(timer);
      resize.disconnect();
      preload.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !inView || !width) return;
    let active = true;
    let chart: GPTVis | undefined;
    const frame = requestAnimationFrame(() => {
      renderer ??= import('../../../src');
      void renderer
        .then(async ({ GPTVis }) => {
          if (!active) return;
          chart = new GPTVis({
            container: element,
            width,
            height,
            theme,
            wrapper,
            locale: 'en-US',
          });
          await chart.render(input);
          if (active) setError('');
        })
        .catch((cause: unknown) => {
          if (active) setError(cause instanceof Error ? cause.message : 'Could not load chart');
        });
    });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      chart?.destroy();
      element.replaceChildren();
    };
  }, [height, inView, input, ref, theme, width, wrapper]);

  return (
    <div
      className={cn(styles.liveChart, wrapper && 'gpt-vis-site-wrapper')}
      style={{ height }}
      role="group"
      aria-label={label}
    >
      <div ref={ref} className="h-full w-full" />
      {error && (
        <p role="alert" className={styles.chartError}>
          Could not preview this chart. <Link href="/examples">Open examples</Link>
        </p>
      )}
    </div>
  );
}
