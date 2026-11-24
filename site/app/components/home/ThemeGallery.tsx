'use client';

import { localeHref } from '../../lib/i18n';
import { useLocale, useTranslation } from '../I18nProvider';

import { ArrowRight, ArrowUpRight, FileJson2, ImageIcon, Layers, Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type CSSProperties } from 'react';
import { THEME_PRESETS } from '../../themes/presets';
import { encodeThemeHash } from '../../themes/theme-utils';
import { LiveChart } from '../LiveChart';
import Link from '../LocaleLink';
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
  const t = useTranslation();
  const locale = useLocale();
  const [theme, setTheme] = useState(presets[0]);
  const [error, setError] = useState('');
  const router = useRouter();
  async function customize() {
    try {
      router.push(localeHref(`/themes${await encodeThemeHash(theme)}`, locale));
    } catch {
      setError(t('Could not open this theme. Open Theme Studio and select it from the gallery.'));
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
        <div className={styles.options} role="group" aria-label={t('Showcase theme')}>
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
          {t('LIVE PREVIEW')}{' '}
        </span>
      </div>
      <div className={styles.workspace}>
        <aside className={styles.authoring}>
          <span className="site-eyebrow">{t('START WITH YOUR STYLE')}</span>
          <div className={styles.referenceBoard} aria-hidden="true">
            <div className={styles.referenceSlide}>
              <small>{t('QUARTERLY REPORT')}</small>
              <strong>
                {t('A clear')} <br />
                {t('point of view.')}{' '}
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
              <span>{t('Workspace')}</span>
              <div>
                <i />
                {t('Overview')}{' '}
              </div>
              <span className={styles.mockButton}>{t('Create report ↗')}</span>
            </div>
            <span className={styles.imageBadge}>
              <ImageIcon className="size-3.5" />
              {t('Reference')}{' '}
            </span>
          </div>
          <div className={styles.referenceTypes}>
            <span>
              <ImageIcon className="size-3" />
              {t('Screenshot')}{' '}
            </span>
            <span>
              <Palette className="size-3" />
              {t('Brand')}{' '}
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
              <span>{t('Theme JSON')}</span>
            </div>
            <code>tokens.category10</code>
            <div className={styles.palette}>
              {palette.slice(0, 5).map((color) => (
                <i key={color} style={{ background: color }} />
              ))}
            </div>
            <code>tokens.fontFamily</code>
            <p style={{ fontFamily: theme.tokens?.fontFamily }}>
              {theme.tokens?.fontFamily?.split(',')[0].replaceAll('"', '') ?? t('Default')}
            </p>
            <footer>{t('One file. All 26 chart types.')}</footer>
          </div>
          <p className={styles.authoringHint}>
            {t(
              'Give your agent a screenshot, slide, or UI reference. Bring the generated theme into Studio to refine it.',
            )}{' '}
          </p>
          <Link href="/themes#from-reference" className={styles.referenceLink}>
            {t('Create from a reference')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </aside>
        <div className={styles.report} data-showcase-theme={theme.id}>
          <header className={styles.reportHeader}>
            <div>
              <span>{t('Q4 / BUSINESS REVIEW')}</span>
              <h3>{t('The same report. Your style.')}</h3>
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
                  label={t('{name} in {theme}', { name: t(example.name), theme: theme.label })}
                />
                <span className={styles.chartFamily}>
                  {example.type === 'network-graph'
                    ? t('Relationship')
                    : example.type === 'line'
                      ? t('Statistics')
                      : example.type === 'summary'
                        ? 'Summary'
                        : 'Table'}
                </span>
              </article>
            ))}
          </div>
          <footer className={styles.reportFooter}>
            <span>
              {t('4 previews · shared theme')}{' '}
              <span className={styles.swipeHint}>{t('Swipe to explore →')}</span>
            </span>
            <span>{t('JSON, ready to reuse')}</span>
          </footer>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.actionCopy}>
          <p className={styles.actionTitle}>
            {t('Use')} {theme.label} {t('across all 26 chart types.')}
          </p>
          <p className={styles.actionDescription}>
            {t('Set')} <code>{`theme: '${theme.id}'`}</code>
            {t(', or customize the JSON in Studio.')}{' '}
          </p>
        </div>
        <button type="button" onClick={customize} className="site-button site-button-primary">
          {t('Customize in Theme Studio')} <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      {theme.id === 'pop' && (
        <p className={styles.note}>
          <ThemeAttribution themeId={theme.id} />
        </p>
      )}
    </div>
  );
}
