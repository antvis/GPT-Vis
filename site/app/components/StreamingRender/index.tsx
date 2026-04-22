'use client';

import { GPTVis } from '@antv/gpt-vis';
import { useCallback, useEffect, useRef, useState } from 'react';

const STREAM_INTERVAL = 10;

interface StreamingRenderProps {
  code: string;
  streaming: boolean;
  onComplete?: () => void;
}

export default function StreamingRender({ code, streaming, onComplete }: StreamingRenderProps) {
  const [streamedCode, setStreamedCode] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const codePanelRef = useRef<HTMLDivElement>(null);
  const gptVisRef = useRef<GPTVis | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);
  const userScrolledUpRef = useRef(false);

  const stopStreaming = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Reset userScrolledUp when streaming starts
  useEffect(() => {
    if (streaming) userScrolledUpRef.current = false;
  }, [streaming]);

  // Auto-scroll code panel to bottom during streaming unless user scrolled up
  useEffect(() => {
    if (!streaming) return;
    const scrollTimer = setInterval(() => {
      const el = codePanelRef.current;
      if (!el || userScrolledUpRef.current) return;
      el.scrollTop = el.scrollHeight;
    }, 100);
    return () => clearInterval(scrollTimer);
  }, [streaming]);

  // Reset when code changes
  useEffect(() => {
    stopStreaming();
    setStreamedCode('');
    progressRef.current = 0;
    gptVisRef.current?.destroy();
    gptVisRef.current = null;
  }, [code, stopStreaming]);

  // Start/stop streaming based on prop
  useEffect(() => {
    if (!streaming) {
      stopStreaming();
      return;
    }

    stopStreaming();
    let i = progressRef.current;
    let lastRendered = '';

    timerRef.current = setInterval(() => {
      i++;
      progressRef.current = i;
      const partial = code.slice(0, i);
      setStreamedCode(partial);

      const isEnd = i >= code.length;
      const lastNewline = partial.lastIndexOf('\n');
      const renderSlice = isEnd ? partial : lastNewline > 0 ? partial.slice(0, lastNewline) : '';

      if (renderSlice && renderSlice !== lastRendered && containerRef.current) {
        if (!gptVisRef.current) {
          gptVisRef.current = new GPTVis({ container: containerRef.current });
        }
        try {
          gptVisRef.current.render(renderSlice);
          lastRendered = renderSlice;
        } catch {
          // partial syntax not yet parseable, ignore
        }
      }

      if (isEnd) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        onComplete?.();
      }
    }, STREAM_INTERVAL);

    return stopStreaming;
  }, [streaming, code, stopStreaming, onComplete]);

  useEffect(() => {
    return () => {
      stopStreaming();
      gptVisRef.current?.destroy();
      gptVisRef.current = null;
    };
  }, [stopStreaming]);

  return (
    <div className="w-full rounded-xl border border-gray-200 overflow-hidden bg-white">
      <div className="flex" style={{ height: 360 }}>
        {/* Code Panel */}
        <div
          ref={codePanelRef}
          className="w-1/2 border-r border-gray-200 overflow-auto bg-white p-5"
          onScroll={() => {
            const el = codePanelRef.current;
            if (!el) return;
            userScrolledUpRef.current = el.scrollHeight - el.scrollTop - el.clientHeight > 30;
          }}
        >
          <pre className="m-0 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap break-words font-mono">
            <code>{streamedCode || <span className="text-gray-400 italic">等待渲染...</span>}</code>
          </pre>
        </div>

        {/* Chart Panel */}
        <div className="w-1/2 p-5 flex items-center justify-center">
          <div ref={containerRef} className="w-full h-full h-[320px]" />
        </div>
      </div>
    </div>
  );
}
