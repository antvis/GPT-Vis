'use client';

import { useLocale, useTranslation } from './I18nProvider';

import { useMemo, useState } from 'react';
import { exampleCode, presetThemeId } from '../examples/example-code';
import { localizeSample } from '../lib/i18n';
import { useExampleTheme } from '../themes/active-theme';
import { DEFAULT_THEME } from '../themes/presets';
import { ChartPreview } from './ChartPreview';
import { CopyButton } from './CopyButton';
import { Select } from './Select';

type CodeSyntax = 'json' | 'dsl';

interface ChartExampleProps {
  title: string;
  dsl?: string;
  json?: Record<string, unknown>;
  chartId: string;
}

export function ChartExample({ title, dsl, json, chartId }: ChartExampleProps) {
  const t = useTranslation();
  const locale = useLocale();
  const theme = useExampleTheme() ?? DEFAULT_THEME;
  const supportsJson = Boolean(json && json.type !== 'summary');
  const [syntax, setSyntax] = useState<CodeSyntax>(supportsJson ? 'json' : 'dsl');
  const [showCode, setShowCode] = useState(false);
  const hasCode = Boolean(dsl);
  const input = syntax === 'json' && supportsJson ? json : (dsl ?? json);
  const code = useMemo(
    () => (input ? exampleCode(localizeSample(input, locale), theme) : ''),
    [input, locale, theme],
  );
  const syntaxLabel = !supportsJson || !presetThemeId(theme) ? 'Syntax + JavaScript' : 'Syntax';

  return (
    <div className="example-live-card">
      <div className="example-live-toolbar">
        <p>
          <span aria-hidden="true" />
          {title}
        </p>
        {hasCode && (
          <Select
            aria-label={t('Code format')}
            value={syntax}
            onChange={(value) => setSyntax(value as CodeSyntax)}
            options={[
              ...(supportsJson ? [{ value: 'json', label: 'JSON' }] : []),
              { value: 'dsl', label: syntaxLabel },
            ]}
          />
        )}
      </div>
      <div className="example-view-toolbar">
        <div role="group" aria-label={t('Example view')} className="flex items-center gap-1">
          <button type="button" aria-pressed={!showCode} onClick={() => setShowCode(false)}>
            {t('Chart')}
          </button>
          <button type="button" aria-pressed={showCode} onClick={() => setShowCode(true)}>
            {t('Code')}
          </button>
        </div>
        {showCode && <CopyButton text={code} theme="light" />}
      </div>
      <div className="example-live-preview">
        {showCode ? (
          <pre tabIndex={0} aria-label={t('Example code')} className="example-live-code">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="h-full">
            <ChartPreview
              wrapper
              deferUntilVisible
              dsl={dsl}
              json={json}
              codeFormat={syntax}
              chartId={chartId}
              className="h-full min-h-0"
            />
          </div>
        )}
      </div>
    </div>
  );
}
