'use client';

import { GPTVis } from '@antv/gpt-vis';
import { useEffect, useRef } from 'react';

interface ChartPreviewProps {
  visSyntax?: string;
  chartId: string;
  wrapper?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ChartPreview({
  visSyntax,
  chartId,
  wrapper: propsWrapper,
  className,
  style,
}: ChartPreviewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gptVisRef = useRef<GPTVis | null>(null);
  const visSyntaxRef = useRef(visSyntax);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const render = () => {
      if (!visSyntaxRef.current) return;
      if (!gptVisRef.current) {
        gptVisRef.current = new GPTVis({ container: wrapper, wrapper: propsWrapper });
      }
      try {
        gptVisRef.current.render(visSyntaxRef.current);
      } catch (err) {
        console.error(`Chart render error for ${chartId}:`, err);
      }
    };

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) render();
    });
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      gptVisRef.current?.destroy();
      gptVisRef.current = null;
    };
  }, [chartId, propsWrapper]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !gptVisRef.current || !visSyntax) return;
    try {
      gptVisRef.current.render(visSyntax);
    } catch (err) {
      console.error(`Chart render error for ${chartId}:`, err);
    }
  }, [visSyntax, chartId]);

  return <div ref={wrapperRef} className={`w-full ${className}`} style={style} />;
}
