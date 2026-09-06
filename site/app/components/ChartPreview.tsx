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
  codeFormat = 'dsl',
  chartId,
  wrapper: propsWrapper,
  className,
  style,
}: ChartPreviewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gptVisRef = useRef<GPTVis | null>(null);
  const renderInput = json?.type === 'summary' ? dsl : (json ?? dsl);
  const code =
    codeFormat === 'json' && json?.type !== 'summary'
      ? JSON.stringify(json, null, 2)
      : (dsl ?? JSON.stringify(json, null, 2) ?? '');
  const codeRef = useRef(code);
  const chartHeightClass = propsWrapper ? 'h-full min-h-0' : 'min-h-[200px]';

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const render = () => {
      if (!renderInput) return;
      if (!gptVisRef.current) {
        gptVisRef.current = new GPTVis({ container: wrapper, wrapper: propsWrapper });
      }
      try {
        gptVisRef.current.render(renderInput);
        gptVisRef.current.updateWrapperCode(codeRef.current);
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

    return () => {
      observer.disconnect();
      gptVisRef.current?.destroy();
      gptVisRef.current = null;
    };
  }, [chartId, propsWrapper, renderInput]);

  useEffect(() => {
    codeRef.current = code;
    gptVisRef.current?.updateWrapperCode(code);
  }, [code]);

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
