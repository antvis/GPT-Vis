'use client';

import { GPTVis, type VisualizationCodeVariant } from '@antv/gpt-vis';
import { useEffect, useMemo, useRef } from 'react';

type PreviewTheme = 'default' | 'light' | 'dark' | 'academy';

interface ChartPreviewProps {
  dsl?: string;
  json?: Record<string, unknown>;
  chartId: string;
  wrapper?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ChartPreview({
  dsl,
  json,
  chartId,
  wrapper: propsWrapper,
  className,
  style,
}: ChartPreviewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gptVisRef = useRef<GPTVis | null>(null);
  const input = json ?? dsl;
  const codeVariants = useMemo<VisualizationCodeVariant[] | undefined>(() => {
    if (!json || !dsl) return undefined;
    return [
      { label: 'JSON', content: json },
      { label: 'DSL', content: dsl },
    ];
  }, [dsl, json]);
  const themeOptions = useMemo<PreviewTheme[]>(
    () => (json?.type === 'summary' ? ['light', 'dark'] : ['default', 'dark', 'academy']),
    [json?.type],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const render = () => {
      if (!input) return;
      if (!gptVisRef.current) {
        gptVisRef.current = new GPTVis({
          container: wrapper,
          wrapper: propsWrapper,
          codeVariants,
          themeOptions: propsWrapper ? themeOptions : undefined,
        });
      }
      try {
        gptVisRef.current.render(input);
      } catch (err) {
        console.error(`Chart render error for ${chartId}:`, err);
      }
    };

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
  }, [chartId, codeVariants, input, propsWrapper, themeOptions]);

  return <div ref={wrapperRef} className={`w-full min-h-[200px] ${className}`} style={style} />;
}
