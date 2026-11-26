import { Braces, ScanLine, Shapes } from 'lucide-react';
import { cn } from '../../lib/cn';
import { getTranslator, type Locale } from '../../lib/i18n';

export function ExamplesHero({
  locale,
  kind,
  count,
}: {
  locale: Locale;
  kind: 'charts' | 'annotations';
  count: number;
}) {
  const t = getTranslator(locale);
  const analysis = kind === 'annotations';
  const Icon = analysis ? ScanLine : Shapes;
  return (
    <header className="examples-hero">
      <div className="examples-hero-copy">
        <p className="site-eyebrow">{t(analysis ? 'THE ANALYSIS LIBRARY' : 'THE CHART LIBRARY')}</p>
        <h1 className="text-balance">
          {t(analysis ? 'An annotation for every finding.' : 'A chart for every kind of data.')}
        </h1>
        <p className="text-pretty">
          {t(
            analysis
              ? 'Find your starting point. Explore analysis previews, open a guide, and copy the configuration for your data.'
              : 'Find your starting point. Explore live charts, copy the JSON or Syntax, and make it your own.',
          )}
        </p>
        <div className="examples-hero-notes">
          <span>
            <Icon className="size-3.5" aria-hidden="true" />
            {count} {t(analysis ? 'analysis capabilities' : 'chart types')}
          </span>
          <span>
            <Braces className="size-3.5" aria-hidden="true" />
            {analysis ? t('JSON configurations') : t('JSON & Syntax')}
          </span>
        </div>
      </div>
      <div
        className={cn('examples-hero-art', analysis && 'examples-analysis-art')}
        aria-hidden="true"
      >
        <span className="examples-art-note">
          {t(analysis ? 'the finding, on the chart ↘' : 'find your way to show it ↘')}
        </span>
        <div className="examples-art-sheet">
          <span className="examples-art-tape" />
          {analysis ? (
            <svg viewBox="0 0 200 138" fill="none">
              <rect x="29" y="34" width="72" height="75" rx="3" fill="#eaf0e5" />
              <path d="M18 109H184M18 19V109" stroke="#dcd4e4" />
              <path d="M18 82H184M18 55H184M18 28H184" stroke="#ebe6ef" strokeDasharray="2 4" />
              <path d="M18 67H184" stroke="#9e855b" strokeDasharray="4 3" />
              <path
                d="m22 95 27-25 27 15 28-47 27 22 29-40 21 31"
                stroke="#80629f"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m22 95 27-25 27 15 28-47 27 22 29-40 21 31V109H22Z"
                fill="#80629f"
                fillOpacity=".05"
              />
              <circle cx="160" cy="20" r="9" stroke="#80629f" strokeOpacity=".3" />
              <circle cx="160" cy="20" r="3.5" fill="#80629f" stroke="#fff" />
              <path d="M160 11V4H116" stroke="#a58bbf" />
              <text x="114" y="7" textAnchor="end" fill="#80629f" fontSize="8">
                maxY
              </text>
              <rect x="145" y="61" width="39" height="13" rx="3" fill="#fffdf8" stroke="#e4d9c3" />
              <text x="164" y="70" textAnchor="middle" fill="#8b7048" fontSize="8">
                mean
              </text>
              <text x="65" y="124" textAnchor="middle" fill="#68815d" fontSize="8">
                rangeX
              </text>
            </svg>
          ) : (
            <svg viewBox="0 0 180 110" fill="none">
              <path d="M16 90H166M16 20V90" stroke="#ded8e5" />
              <rect x="32" y="53" width="22" height="37" rx="3" fill="#b6a2e3" />
              <rect x="70" y="34" width="22" height="56" rx="3" fill="#9fc8bd" />
              <rect x="108" y="17" width="22" height="73" rx="3" fill="#b6a2e3" />
              <path
                d="m26 45 36-19 35 17 43-32"
                stroke="#796191"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {[
                ['26', '45'],
                ['62', '26'],
                ['97', '43'],
                ['140', '11'],
              ].map(([cx, cy]) => (
                <circle key={cx} cx={cx} cy={cy} r="3" fill="#796191" />
              ))}
            </svg>
          )}
          <span>
            {t(analysis ? 'your finding, a little clearer.' : 'your data, a little clearer.')}
          </span>
        </div>
        {analysis && (
          <div className="examples-art-ranking">
            <span>topN</span>
            <i />
            <i />
            <i />
            <small>01&nbsp;&nbsp;02&nbsp;&nbsp;03</small>
          </div>
        )}
        <span className="examples-art-badge">
          {count}
          <small>{t(analysis ? 'ways to explain' : 'ways to see it')}</small>
        </span>
      </div>
    </header>
  );
}
