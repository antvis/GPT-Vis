'use client';

import { GPTVis, type VisualizationOptions } from '@antv/gpt-vis';
import { clsx, type ClassValue } from 'clsx';
import { useEffect, useRef, useState } from 'react';
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
  const [instance, setInstance] = useState<GPTVis | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const inst = new GPTVis({
      container: containerRef.current,
      width,
      height,
      theme,
      wrapper,
      locale,
    });
    setInstance(inst);
    return () => {
      inst.destroy();
      setInstance(null);
    };
  }, [width, height, theme, wrapper, locale]);

  const contentDeps = typeof content === 'string' ? content : JSON.stringify(content);

  useEffect(() => {
    instance?.render(content);
  }, [instance, contentDeps]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full min-h-[300px]', className)}
      style={containerStyle}
    />
  );
}
