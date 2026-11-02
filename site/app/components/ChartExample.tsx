'use client';

import { useState } from 'react';
import { ChartPreview } from './ChartPreview';
import { Select } from './Select';

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
    <div className="example-live-card">
      <div className="example-live-toolbar">
        <p>
          <span aria-hidden="true" />
          {title}
        </p>
        {hasCode && (
          <Select
            aria-label="Code format"
            value={syntax}
            onChange={(value) => setSyntax(value as CodeSyntax)}
            options={[
              ...(supportsJson ? [{ value: 'json', label: 'JSON' }] : []),
              { value: 'dsl', label: 'Syntax' },
            ]}
          />
        )}
      </div>
      <div className="example-live-preview">
        <ChartPreview wrapper dsl={dsl} json={json} codeFormat={syntax} chartId={chartId} />
      </div>
    </div>
  );
}
