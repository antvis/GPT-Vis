'use client';

import { GPTVis, type VisualizationOptions } from '@antv/gpt-vis';
import { clsx, type ClassValue } from 'clsx';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GPTVisChartProps extends Omit<VisualizationOptions, 'container'> {
  /** Chart content - vis syntax string (starting with "vis [type]") or config object */
  content: string | Record<string, unknown>;
  className?: string;
  containerStyle?: React.CSSProperties;
}

export function GPTVisChart({
  content,
  width,
  height,
  theme,
  wrapper,
  locale,
  className,
  containerStyle,
}: GPTVisChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<GPTVis | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    instanceRef.current = new GPTVis({
      container: containerRef.current,
      width,
      height,
      theme,
      wrapper,
      locale,
    });
    instanceRef.current.render(content);
    return () => {
      instanceRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    instanceRef.current?.render(content);
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full min-h-[300px]', className)}
      style={containerStyle}
    />
  );
}
