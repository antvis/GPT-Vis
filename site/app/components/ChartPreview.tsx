'use client';

import { GPTVis } from '@antv/gpt-vis';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/cn';

interface ChartPreviewProps {
  dsl?: string;
  json?: Record<string, unknown>;
  chartId: string;
  wrapper?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

type PreviewView = 'chart' | 'json' | 'dsl';

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
  const copyTimeoutRef = useRef<number | undefined>(undefined);
  const [view, setView] = useState<PreviewView>('chart');
  const [copied, setCopied] = useState(false);
  const hasCode = Boolean(dsl);
  const supportsJson = json ? json.type !== 'summary' : false;
  const tabs: PreviewView[] = supportsJson ? ['chart', 'json', 'dsl'] : ['chart', 'dsl'];
  const activeView = view === 'json' && !supportsJson ? 'dsl' : view;
  const input = json?.type === 'summary' ? dsl : (json ?? dsl);
  const code = activeView === 'json' ? JSON.stringify(json, null, 2) : dsl;
  const chartHeightClass = propsWrapper && hasCode ? 'min-h-[400px]' : 'min-h-[200px]';

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const render = () => {
      if (!input) return;
      if (!gptVisRef.current) {
        gptVisRef.current = new GPTVis({ container: wrapper });
      }
      try {
        gptVisRef.current.render(input);
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
  }, [chartId, input]);

  useEffect(
    () => () => {
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
    },
    [],
  );

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div
      className={cn(
        'w-full',
        chartHeightClass,
        propsWrapper &&
          hasCode &&
          'overflow-hidden rounded-lg border border-outline-variant bg-white',
        className,
      )}
      style={style}
    >
      {propsWrapper && hasCode && (
        <>
          <div className="flex items-center justify-between gap-2 border-b border-outline-variant bg-surface-container px-2 py-1">
            <div aria-label="Code examples" className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={activeView === tab}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-medium text-on-surface-variant',
                    activeView === tab && 'bg-white text-on-surface shadow-sm',
                  )}
                  onClick={() => setView(tab)}
                >
                  {tab === 'chart' ? 'Chart' : tab.toUpperCase()}
                </button>
              ))}
            </div>
            {activeView !== 'chart' && (
              <button
                type="button"
                className="rounded-md px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-white hover:text-on-surface"
                aria-label="Copy code"
                onClick={handleCopy}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          {activeView !== 'chart' && (
            <pre
              aria-label={`${activeView.toUpperCase()} code`}
              className="max-h-[520px] overflow-auto whitespace-pre-wrap break-words bg-white p-5 font-mono text-xs leading-relaxed text-on-surface"
            >
              {code}
            </pre>
          )}
        </>
      )}
      <div
        ref={wrapperRef}
        aria-label={propsWrapper && hasCode ? 'Chart preview' : undefined}
        className={cn('w-full h-full', chartHeightClass, activeView !== 'chart' && 'hidden')}
      />
    </div>
  );
}
