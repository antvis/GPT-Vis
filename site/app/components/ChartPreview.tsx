'use client';

import { GPTVis } from '@antv/gpt-vis';
import { useEffect, useRef } from 'react';
import { cn } from '../lib/cn';

interface ChartPreviewProps {
  dsl?: string;
  json?: Record<string, unknown>;
  codeFormat?: 'dsl' | 'json';
  chartId: string;
  wrapper?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ChartPreview({
  dsl,
  json,
  codeFormat = 'json',
  chartId,
  wrapper: propsWrapper,
  className,
  style,
}: ChartPreviewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gptVisRef = useRef<GPTVis | null>(null);
  const input = codeFormat === 'json' && json?.type !== 'summary' ? json : (dsl ?? json);
  const inputRef = useRef(input);
  const renderedInputRef = useRef<string | Record<string, unknown> | null>(null);
  const rerenderWhenChartVisibleRef = useRef(false);
  const chartHeightClass = propsWrapper ? 'h-full min-h-0' : 'min-h-[200px]';

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const render = () => {
      const nextInput = inputRef.current;
      if (!nextInput) return;
      if (!gptVisRef.current) {
        gptVisRef.current = new GPTVis({ container: wrapper, wrapper: propsWrapper });
      }
      try {
        gptVisRef.current.render(nextInput);
        renderedInputRef.current = nextInput;
      } catch (err) {
        console.error(`Chart render error for ${chartId}:`, err);
      }
    };

    if (wrapper.clientWidth > 0 && wrapper.clientHeight > 0) render();
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0 && !gptVisRef.current) render();
    });
    observer.observe(wrapper);

    const rerenderWhenChartVisible = (event: MouseEvent) => {
      const target = event.target;
      if (
        !(target instanceof Element) ||
        !target.closest('[data-tab="chart"]') ||
        !rerenderWhenChartVisibleRef.current
      ) {
        return;
      }

      requestAnimationFrame(() => {
        const nextInput = inputRef.current;
        if (!nextInput || !gptVisRef.current || !rerenderWhenChartVisibleRef.current) return;

        try {
          // G2 measures the container during render. A format switch made while the
          // wrapper's Code tab is active measures a hidden (0 × 0) chart container.
          // Render again once the stock Chart tab has made it visible.
          gptVisRef.current.render(nextInput);
          renderedInputRef.current = nextInput;
          rerenderWhenChartVisibleRef.current = false;
        } catch (err) {
          console.error(`Chart render error for ${chartId}:`, err);
        }
      });
    };
    wrapper.addEventListener('click', rerenderWhenChartVisible);

    return () => {
      observer.disconnect();
      wrapper.removeEventListener('click', rerenderWhenChartVisible);
      gptVisRef.current?.destroy();
      gptVisRef.current = null;
      renderedInputRef.current = null;
      rerenderWhenChartVisibleRef.current = false;
    };
  }, [chartId, propsWrapper]);

  useEffect(() => {
    inputRef.current = input;
    if (!input || !gptVisRef.current || renderedInputRef.current === input) return;

    const chartPanel = wrapperRef.current?.querySelector('.gpt-vis-wrapper-chart');
    const chartIsHidden = chartPanel?.classList.contains('gpt-vis-wrapper-tab-hide') ?? false;

    try {
      gptVisRef.current.render(input);
      renderedInputRef.current = input;
      rerenderWhenChartVisibleRef.current = chartIsHidden;
    } catch (err) {
      console.error(`Chart render error for ${chartId}:`, err);
    }
  }, [chartId, input]);

  return (
    <div className={cn('w-full', chartHeightClass, className)} style={style}>
      <div
        ref={wrapperRef}
        aria-label={propsWrapper ? 'Chart preview' : undefined}
        className={cn('h-full w-full', chartHeightClass, propsWrapper && 'gpt-vis-site-wrapper')}
      />
    </div>
  );
}
