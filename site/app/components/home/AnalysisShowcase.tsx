'use client';

import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  ChartNoAxesCombined,
  Check,
  Database,
  FileSpreadsheet,
  MessageSquare,
  Pause,
  Play,
  RotateCcw,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useInView } from '../../lib/use-in-view';
import { CopyAction } from '../CopyAction';
import { LiveChart } from '../LiveChart';
import styles from './analysis.module.css';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
const percent = (value: number) => `${(value * 100).toFixed(1)}%`;

const regions = [
  { category: 'East', value: 45382 },
  { category: 'South', value: 32150 },
  { category: 'North', value: 28991 },
  { category: 'West', value: 18764 },
];
const months = [
  { time: 'Jan', value: 12000 },
  { time: 'Feb', value: 18000 },
  { time: 'Mar', value: 15000 },
  { time: 'Apr', value: 24000 },
];
const channels = [
  { category: 'Organic', group: 'Q3', value: 26000 },
  { category: 'Organic', group: 'Q4', value: 39000 },
  { category: 'Paid', group: 'Q3', value: 18000 },
  { category: 'Paid', group: 'Q4', value: 24000 },
  { category: 'Referral', group: 'Q3', value: 8000 },
  { category: 'Referral', group: 'Q4', value: 10000 },
];
const regionalTotal = regions.reduce((sum, row) => sum + row.value, 0);
const latestTotal = channels
  .filter((row) => row.group === 'Q4')
  .reduce((sum, row) => sum + row.value, 0);
const palette = { palette: ['#8667cb', '#c7b7e1'] };

const cases = [
  {
    id: 'regions',
    label: 'Rank regions',
    question: 'Which region brings in the most revenue?',
    answer: `East leads with ${money(regions[0].value)}, contributing ${percent(regions[0].value / regionalTotal)} of total revenue.`,
    title: 'Revenue by region',
    metric: money(regionalTotal),
    metricLabel: 'Total revenue',
    finding: percent(regions[0].value / regionalTotal),
    findingLabel: 'East’s share',
    input: { type: 'bar', data: regions, axisYTitle: 'Revenue ($)', style: palette },
    headers: ['Region', 'Revenue'],
    rows: regions.map((row) => [row.category, money(row.value)]),
    method: 'Group by region → sum revenue → sort by total.',
    source: [
      ['East', '$24,000'],
      ['South', '$18,000'],
      ['North', '$16,000'],
      ['West', '$10,000'],
      ['East', '$21,382'],
      ['South', '$14,150'],
      ['North', '$12,991'],
      ['West', '$8,764'],
    ],
    sourceHeaders: ['Region', 'Revenue'],
    file: 'regional-sales.csv',
    query: [
      'SELECT region,',
      '  SUM(revenue) AS revenue',
      'FROM sales',
      'GROUP BY region',
      'ORDER BY revenue DESC;',
    ],
    chartReason: 'A ranked bar chart makes the regional totals easy to compare.',
  },
  {
    id: 'trend',
    label: 'Track revenue',
    question: 'How did revenue change from January to April?',
    answer: `April reached ${money(months[3].value)}, up ${percent(months[3].value / months[2].value - 1)} from March. Revenue doubled compared with January.`,
    title: 'Monthly revenue',
    metric: money(months[3].value),
    metricLabel: 'April revenue',
    finding: `+${percent(months[3].value / months[2].value - 1)}`,
    findingLabel: 'Month over month',
    input: { type: 'line', data: months, axisYTitle: 'Revenue ($)', style: palette },
    headers: ['Month', 'Revenue'],
    rows: months.map((row) => [row.time, money(row.value)]),
    method: 'Group by month → sum revenue → compare periods.',
    source: [
      ['2026-01-01', '$5,000'],
      ['2026-01-15', '$7,000'],
      ['2026-02-01', '$10,000'],
      ['2026-02-15', '$8,000'],
      ['2026-03-01', '$9,000'],
      ['2026-03-15', '$6,000'],
      ['2026-04-01', '$14,000'],
      ['2026-04-15', '$10,000'],
    ],
    sourceHeaders: ['Date', 'Revenue'],
    file: 'monthly-sales.csv',
    query: [
      "SELECT STRFTIME(date, '%b') AS month,",
      '  SUM(revenue) AS revenue',
      'FROM sales',
      'GROUP BY 1',
      'ORDER BY MIN(date);',
    ],
    chartReason: 'A line chart follows revenue over time and exposes the March dip.',
  },
  {
    id: 'channels',
    label: 'Compare channels',
    question: 'Which channel grew the most between Q3 and Q4?',
    answer: `Organic grew ${percent(channels[1].value / channels[0].value - 1)}, from ${money(channels[0].value)} to ${money(channels[1].value)}. It had the largest absolute and percentage increase.`,
    title: 'Revenue by channel',
    metric: money(latestTotal),
    metricLabel: 'Q4 revenue',
    finding: `+${percent(channels[1].value / channels[0].value - 1)}`,
    findingLabel: 'Organic growth',
    input: {
      type: 'column',
      data: channels,
      group: true,
      axisYTitle: 'Revenue ($)',
      style: palette,
    },
    headers: ['Channel', 'Quarter', 'Revenue'],
    rows: channels.map((row) => [row.category, row.group, money(row.value)]),
    method: 'Group by channel and quarter → compare absolute and percentage growth.',
    source: channels.map((row) => [row.category, row.group, money(row.value)]),
    sourceHeaders: ['Channel', 'Quarter', 'Revenue'],
    file: 'channel-sales.csv',
    query: [
      'SELECT channel, quarter,',
      '  SUM(revenue) AS revenue',
      'FROM sales',
      'GROUP BY channel, quarter',
      'ORDER BY channel, quarter;',
    ],
    chartReason: 'Grouped columns put Q3 and Q4 side by side for each channel.',
  },
];

const stages = [
  { label: 'Your data', title: 'Connect the source', icon: Database, step: 0 },
  { label: 'AVA', title: 'Analyze & recommend', icon: Workflow, step: 2 },
  { label: 'GPT-Vis', title: 'Render the evidence', icon: ChartNoAxesCombined, step: 4 },
];
const progressLabels = [
  'Reading the sample data',
  'AVA · calculating the result',
  'AVA · choosing a chart',
  'GPT-Vis · rendering the result',
  'Chart and findings ready',
];

function subscribeReducedMotion(callback: () => void) {
  const query = matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerSnapshot = () => false;

export function AnalysisShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.1 });
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    prefersReducedMotion,
    getServerSnapshot,
  );
  const [selected, setSelected] = useState(cases[0]);
  const [view, setView] = useState('chart');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [run, setRun] = useState(0);
  const progress = reducedMotion ? 4 : step;
  const currentStage = progress === 0 ? 0 : progress < 3 ? 1 : 2;
  const ready = progress >= 3;
  const running = playing && !reducedMotion && progress < 4;

  useEffect(() => {
    if (!inView || !running) return;
    const timer = setTimeout(() => setStep((value) => Math.min(value + 1, 4)), 1100);
    return () => clearTimeout(timer);
  }, [inView, running, step]);

  function replay() {
    setStep(0);
    setPlaying(true);
    setView('chart');
    setRun((value) => value + 1);
  }

  return (
    <div
      ref={ref}
      className={styles.showcase}
      data-playing={running && inView}
      data-in-view={inView}
      data-progress={progress}
    >
      <div className={styles.toolbar}>
        <div role="group" aria-label="Analysis example" className={styles.scenarios}>
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected.id === item.id}
              onClick={() => {
                setSelected(item);
                replay();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className={styles.sampleLabel}>SAMPLE WORKFLOW</span>
      </div>
      <div className={styles.question}>
        <span className={styles.questionIcon}>
          <MessageSquare className="size-4" aria-hidden="true" />
        </span>
        <p key={`${selected.id}-${run}`}>{selected.question}</p>
        <span className={styles.questionLabel}>YOUR QUESTION</span>
      </div>
      <div className={styles.flow} role="group" aria-label="Workflow stages">
        {stages.map(({ label, title, icon: Icon, step: stageStep }, index) => (
          <button
            type="button"
            key={label}
            disabled={reducedMotion}
            className={styles.flowStage}
            data-current={currentStage === index}
            data-complete={currentStage > index || progress === 4}
            aria-pressed={currentStage === index}
            aria-label={`Inspect ${label}: ${title}`}
            onClick={() => {
              setStep(stageStep);
              setPlaying(false);
            }}
          >
            <span className={styles.stageIcon}>
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className={styles.stageText}>
              <span>
                0{index + 1} / {label}
              </span>
              <strong>{title}</strong>
            </span>
            <span className={styles.stageMark} aria-hidden="true">
              {currentStage > index || progress === 4 ? <Check className="size-3.5" /> : '·'}
            </span>
          </button>
        ))}
      </div>
      <div key={`${selected.id}-${run}`} className={styles.workspace}>
        <section className={styles.source} aria-label="Sample source data">
          <div className={styles.fileHeading}>
            <FileSpreadsheet className="size-4" aria-hidden="true" />
            <span>{selected.file}</span>
            <span>CSV</span>
          </div>
          <div className={styles.sourceData} tabIndex={0} aria-label="Sample source data rows">
            <table>
              <caption className="sr-only">Sample input for {selected.title}, in USD</caption>
              <thead>
                <tr>
                  {selected.sourceHeaders.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selected.source.map((row, index) => (
                  <tr key={index} style={{ animationDelay: `${index * 65}ms` }}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.sourceMeta}>
            <span>
              <Check className="size-3" aria-hidden="true" /> {selected.source.length} rows
            </span>
            <span>{selected.sourceHeaders.length} columns</span>
          </div>
          <div className={styles.sourceNote}>
            <Database className="size-3.5" aria-hidden="true" />
            <p>
              Start with a file or a connected database. AVA reads the data behind your question.
            </p>
          </div>
          <span className={styles.connection} data-active={progress === 0} aria-hidden="true">
            <ArrowRight className="size-4" />
          </span>
        </section>
        <section className={styles.analysis} aria-label="Illustrative AVA analysis">
          <div className={styles.panelHeading}>
            <span className={styles.panelLabel}>
              <Workflow className="size-3.5" aria-hidden="true" /> AVA / ANALYSIS
            </span>
            <span className={styles.sqlBadge}>SQL</span>
          </div>
          <div className={styles.query} data-revealed={progress >= 1}>
            <pre tabIndex={0} aria-label="Illustrative analysis query">
              <code>
                {selected.query.map((line, index) => (
                  <span key={index}>
                    <span className={styles.lineNumber} aria-hidden="true">
                      {index + 1}
                    </span>
                    <span>
                      {line
                        .split(/(SELECT|SUM|AS|FROM|GROUP BY|ORDER BY|DESC|CASE|WHEN|THEN|END)/g)
                        .map((part, partIndex) =>
                          /^(SELECT|SUM|AS|FROM|GROUP BY|ORDER BY|DESC|CASE|WHEN|THEN|END)$/.test(
                            part,
                          ) ? (
                            <b key={partIndex}>{part}</b>
                          ) : (
                            part
                          ),
                        )}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <div className={styles.calculation} data-revealed={progress >= 1}>
            <span className={styles.detailLabel}>THE CALCULATION</span>
            <p>{selected.method}</p>
          </div>
          <div className={styles.queryResult} data-revealed={progress >= 2}>
            <div className={styles.resultHeading}>
              <Check className="size-3.5" aria-hidden="true" />
              <strong>{selected.rows.length} result rows</strong>
              <span>USD</span>
            </div>
            <div className={styles.resultRows}>
              {selected.rows.slice(0, 2).map((row) => (
                <div key={row.join('-')}>
                  <span>{row.slice(0, -1).join(' / ')}</span>
                  <strong>{row.at(-1)}</strong>
                </div>
              ))}
              <span>+ {selected.rows.length - 2} more rows</span>
            </div>
          </div>
          <div className={styles.recommendation} data-revealed={progress >= 2}>
            <span className={styles.detailLabel}>
              RECOMMENDED CHART <span>{selected.input.type}</span>
            </span>
            <p>{selected.chartReason}</p>
          </div>
          <div className={styles.handoff} data-revealed={progress >= 2}>
            <Braces className="size-3.5" aria-hidden="true" />
            <span>Result + chart config</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </div>
          <span className={styles.connection} data-active={progress === 2} aria-hidden="true">
            <ArrowRight className="size-4" />
          </span>
        </section>
        <section className={styles.report} aria-label="GPT-Vis rendered result">
          <div className={styles.reportHeading}>
            <div>
              <span className={styles.detailLabel}>THE VISUAL ANSWER</span>
              <h3>{selected.title}</h3>
            </div>
            <span className={styles.reportStamp}>GPT-Vis</span>
          </div>
          <dl className={styles.metrics} data-ready={progress === 4}>
            <div>
              <dt>{selected.metricLabel}</dt>
              <dd>{progress === 4 ? selected.metric : '—'}</dd>
            </div>
            <div>
              <dt>{selected.findingLabel}</dt>
              <dd>{progress === 4 ? selected.finding : '—'}</dd>
            </div>
          </dl>
          <div className={styles.viewToolbar}>
            <div role="group" aria-label="Analysis output view">
              {['chart', 'data', 'json'].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={view === item}
                  disabled={!ready}
                  onClick={() => setView(item)}
                >
                  {item === 'json' ? 'JSON' : item === 'chart' ? 'Chart' : 'Values'}
                </button>
              ))}
            </div>
            <span>USD</span>
          </div>
          <div className={styles.output}>
            {!ready ? (
              <div className={styles.waiting}>
                <div className={styles.chartPlaceholder} aria-hidden="true">
                  {[0.8, 0.58, 0.48, 0.32].map((scale, index) => (
                    <span key={index} style={{ transform: `scaleX(${scale})` }} />
                  ))}
                </div>
                <span>Waiting for AVA’s result</span>
                <p>The chart uses the calculated values.</p>
              </div>
            ) : view === 'chart' ? (
              <div className={styles.chartReveal}>
                <LiveChart
                  input={selected.input}
                  height={224}
                  label={`${selected.title}, sample data in USD`}
                />
              </div>
            ) : view === 'data' ? (
              <table>
                <caption className="sr-only">
                  Calculated values for {selected.title}, in USD
                </caption>
                <thead>
                  <tr>
                    {selected.headers.map((header) => (
                      <th key={header} scope="col">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selected.rows.map((row) => (
                    <tr key={row.join('-')}>
                      {row.map((cell, i) => (
                        <td key={i}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.config}>
                <CopyAction
                  text={JSON.stringify(selected.input, null, 2)}
                  label="Copy chart JSON"
                />
                <pre tabIndex={0} aria-label="GPT-Vis chart configuration">
                  <code>{JSON.stringify(selected.input, null, 2)}</code>
                </pre>
              </div>
            )}
          </div>
          <div className={styles.finding} data-revealed={progress === 4}>
            <span className={styles.detailLabel}>THE TAKEAWAY</span>
            <p>{selected.answer}</p>
          </div>
        </section>
      </div>
      <div className={styles.playback}>
        <div className={styles.playbackStatus} role="status">
          <span className={styles.statusDot} data-running={running} aria-hidden="true" />
          <span>
            {!playing && progress < 4 ? 'Paused · ' : ''}
            {progressLabels[progress]}
          </span>
        </div>
        <div className={styles.playbackSteps} aria-hidden="true">
          {progressLabels.map((label, index) => (
            <span key={label} data-done={index <= progress} />
          ))}
        </div>
        <button
          type="button"
          disabled={reducedMotion}
          onClick={() => (progress === 4 ? replay() : setPlaying((value) => !value))}
        >
          {progress === 4 ? (
            <RotateCcw className="size-3.5" aria-hidden="true" />
          ) : playing ? (
            <Pause className="size-3.5" aria-hidden="true" />
          ) : (
            <Play className="size-3.5" aria-hidden="true" />
          )}
          {progress === 4 ? 'Replay workflow' : playing ? 'Pause' : 'Continue'}
        </button>
      </div>
      <div className={styles.integration}>
        <p>
          <strong>AVA analyzes. GPT-Vis visualizes.</strong> Keep the result, the chart, and the
          JSON in your own interface.
        </p>
        <div>
          <Link href="/docs/integrations/ecosystem#ava" className={styles.guideLink}>
            Integration guide <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <a
            href="https://ava.antv.vision/ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="site-button site-button-primary"
          >
            Try AVA <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <footer className={styles.footer}>
        <p>Sample workflow, predefined queries and findings. Charts render live with GPT-Vis.</p>
        <a
          href="https://ava.antv.vision/documentation/visualization/overview/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AVA visualization guide ↗
        </a>
      </footer>
    </div>
  );
}
