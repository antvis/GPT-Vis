'use client';

import { ArrowRight, ArrowUpRight, FileJson2, ImageIcon, Layers, Palette } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type CSSProperties } from 'react';
import { THEME_PRESETS } from '../../themes/presets';
import { encodeThemeHash } from '../../themes/theme-utils';
import { LiveChart } from '../LiveChart';
import { ThemeAttribution } from '../ThemeAttribution';
import styles from './theme-showcase.module.css';

const presets = THEME_PRESETS;
const report = [
  {
    name: 'Revenue trend',
    type: 'line',
    input: {
      type: 'line',
      title: 'Revenue ($k)',
      axisXTitle: false,
      axisYTitle: false,
      data: ['Product', 'Services'].flatMap((group, j) =>
        [32, 48, 42, 65].map((value, i) => ({ time: `Q${i + 1}`, value: value - j * 12, group })),
      ),
    },
  },
  {
    name: 'Team relationships',
    type: 'network-graph',
    input: {
      type: 'network-graph',
      title: 'Teams',
      layout: 'circular',
      data: {
        nodes: [{ name: 'Design' }, { name: 'Product' }, { name: 'Research' }],
        edges: [
          { source: 'Design', target: 'Product' },
          { source: 'Product', target: 'Research' },
          { source: 'Research', target: 'Design' },
        ],
      },
    },
  },
  {
    name: 'Revenue table',
    type: 'table',
    input: {
      type: 'table',
      title: 'Quarterly revenue',
      data: [
        { Quarter: 'Q3', Product: 42, Services: 30 },
        { Quarter: 'Q4', Product: 65, Services: 53 },
      ],
    },
  },
  {
    name: 'Report summary',
    type: 'summary',
    input:
      '# Quarterly review\n\n[Product revenue](metric_name) reached [$65k](metric_value, origin=65) in Q4, up [55%](ratio_value, origin=0.55, assessment="positive") from Q3.\n\nServices contributed [$53k](metric_value, origin=53) in the same quarter.',
  },
];

export function ThemeGallery() {
  const [theme, setTheme] = useState(presets[0]);
  const [error, setError] = useState('');
  const router = useRouter();
  async function customize() {
    try {
      router.push(`/themes${await encodeThemeHash(theme)}`);
    } catch {
      setError('Could not open this theme. Open Theme Studio and select it from the gallery.');
    }
  }
  const palette = theme.tokens?.category10 ?? [];
  const variables = {
    '--report-paper': theme.style?.backgroundColor ?? theme.tokens?.colorBackground ?? '#fff',
    '--report-ink': theme.tokens?.colorText ?? '#302b3d',
    '--report-muted': theme.tokens?.colorTextSecondary ?? '#756e80',
    '--report-accent': palette[0] ?? '#7047eb',
    '--report-stroke': theme.tokens?.colorStroke ?? '#e6e1ec',
    '--report-surface': theme.tokens?.colorSurface ?? '#f8f6fb',
    '--report-font': theme.tokens?.fontFamily ?? 'Arial, sans-serif',
  } as CSSProperties;
  return (
    <div className={styles.showcase} style={variables}>
      <div className={styles.toolbar}>
        <div className={styles.options} role="group" aria-label="Showcase theme">
          {presets.map((preset) => (
            <button
              type="button"
              key={preset.id}
              data-preset-id={preset.id}
              aria-pressed={theme.id === preset.id}
              onClick={() => setTheme(preset)}
            >
              <span className="home-swatches" aria-hidden="true">
                {preset.tokens?.category10?.slice(0, 3).map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </span>
              {preset.label}
            </button>
          ))}
        </div>
        <span className={styles.liveLabel}>
          <i aria-hidden="true" />
          LIVE PREVIEW
        </span>
      </div>
      <div className={styles.workspace}>
        <aside className={styles.authoring}>
          <span className="site-eyebrow">START WITH YOUR STYLE</span>
          <div className={styles.referenceBoard} aria-hidden="true">
            <div className={styles.referenceSlide}>
              <small>QUARTERLY REPORT</small>
              <strong>
                A clear
                <br />
                point of view.
              </strong>
              <div>
                {[32, 58, 44, 76, 92].map((h, i) => (
                  <i
                    key={i}
                    style={{ height: `${h / 3}px`, background: palette[i % palette.length] }}
                  />
                ))}
              </div>
            </div>
            <div className={styles.referenceComponent}>
              <span>Workspace</span>
              <div>
                <i />
                Overview
              </div>
              <span className={styles.mockButton}>Create report ↗</span>
            </div>
            <span className={styles.imageBadge}>
              <ImageIcon className="size-3.5" />
              Reference
            </span>
          </div>
          <div className={styles.referenceTypes}>
            <span>
              <ImageIcon className="size-3" />
              Screenshot
            </span>
            <span>
              <Palette className="size-3" />
              Brand
            </span>
            <span>
              <Layers className="size-3" />
              UI
            </span>
          </div>
          <div className={styles.specBridge}>
            <span />
            <ArrowRight className="size-3.5" aria-hidden="true" />
            <span />
          </div>
          <div className={styles.specCard}>
            <div>
              <FileJson2 className="size-4" aria-hidden="true" />
              <strong>theme.json</strong>
              <span>Theme JSON</span>
            </div>
            <code>tokens.category10</code>
            <div className={styles.palette}>
              {palette.slice(0, 5).map((color) => (
                <i key={color} style={{ background: color }} />
              ))}
            </div>
            <code>tokens.fontFamily</code>
            <p style={{ fontFamily: theme.tokens?.fontFamily }}>
              {theme.tokens?.fontFamily?.split(',')[0].replaceAll('"', '') ?? 'Default'}
            </p>
            <footer>One file. All 26 chart types.</footer>
          </div>
          <p className={styles.authoringHint}>
            Give your agent a screenshot, slide, or UI reference. Bring the generated theme into
            Studio to refine it.
          </p>
          <Link href="/themes#from-reference" className={styles.referenceLink}>
            Create from a reference <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </aside>
        <div className={styles.report} data-showcase-theme={theme.id}>
          <header className={styles.reportHeader}>
            <div>
              <span>Q4 / BUSINESS REVIEW</span>
              <h3>The same report. Your style.</h3>
            </div>
            <span className={styles.themeName} role="status">
              {theme.label}
            </span>
          </header>
          <div className={styles.reportGrid}>
            {report.map((example) => (
              <article
                key={example.type}
                data-chart-type={example.type}
                className={styles.reportChart}
              >
                <LiveChart
                  input={example.input}
                  theme={theme}
                  height={190}
                  label={`${example.name} in ${theme.label}`}
                />
                <span className={styles.chartFamily}>
                  {example.type === 'network-graph'
                    ? 'Relationship'
                    : example.type === 'line'
                      ? 'Statistics'
                      : example.type === 'summary'
                        ? 'Summary'
                        : 'Table'}
                </span>
              </article>
            ))}
          </div>
          <footer className={styles.reportFooter}>
            <span>
              4 previews · shared theme
              <span className={styles.swipeHint}>Swipe to explore →</span>
            </span>
            <span>JSON, ready to reuse</span>
          </footer>
        </div>
      </div>
      <div className={styles.actions}>
        <p>
          Start with a gallery style, then make it yours.
          <br />
          <span>Import JSON, adjust your theme, and preview all 26 chart types in Studio.</span>
        </p>
        <button type="button" onClick={customize} className="site-button site-button-primary">
          Customize in Theme Studio <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <p className={styles.note}>
        Download the full theme JSON to use a gallery style in your app.
        <ThemeAttribution themeId={theme.id} />
      </p>
    </div>
  );
}
