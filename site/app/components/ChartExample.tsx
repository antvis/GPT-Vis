'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ChartPreview } from './ChartPreview';

type CodeSyntax = 'json' | 'dsl';

interface ChartExampleProps {
  title: string;
  dsl?: string;
  json?: Record<string, unknown>;
  chartId: string;
}

export function ChartExample({ title, dsl, json, chartId }: ChartExampleProps) {
  const supportsJson = Boolean(json && json.type !== 'summary');
  const [syntax, setSyntax] = useState<CodeSyntax>(supportsJson ? 'json' : 'dsl');
  const hasCode = Boolean(dsl);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors duration-200 hover:border-primary/60">
      <div className="flex min-h-10 items-center justify-between gap-4 border-b border-gray-200 bg-[#f5f5f5] px-3 py-1.5">
        <p className="truncate text-xs text-[#494949]">{title}</p>
        {hasCode && (
          <label className="relative shrink-0">
            <span className="sr-only">Code format</span>
            <select
              value={syntax}
              onChange={(event) => setSyntax(event.target.value as CodeSyntax)}
              className="h-7 appearance-none rounded-lg bg-white py-0 pl-2.5 pr-7 text-xs font-medium text-[#494949] shadow-sm outline-none transition-colors duration-150 hover:bg-gray-50 focus:ring-2 focus:ring-primary/20"
            >
              {supportsJson && <option value="json">JSON</option>}
              <option value="dsl">DSL</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
          </label>
        )}
      </div>
      <div className="relative h-[400px]">
        <ChartPreview wrapper dsl={dsl} json={json} codeFormat={syntax} chartId={chartId} />
      </div>
    </div>
  );
}
