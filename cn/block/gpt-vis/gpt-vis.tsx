'use client';

import { GPTVis as GPTVisCore, type VisualizationOptions } from '@antv/gpt-vis';
import { clsx, type ClassValue } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GPTVisProps extends Omit<VisualizationOptions, 'container'> {
  content: string | Record<string, unknown>;
  className?: string;
  containerStyle?: React.CSSProperties;
}

export function GPTVis({
  content,
  width,
  height,
  theme,
  wrapper,
  locale,
  className,
  containerStyle,
}: GPTVisProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<GPTVisCore | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const inst = new GPTVisCore({
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
