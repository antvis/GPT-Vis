'use client';

import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  ChartNoAxesCombined,
  Database,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
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
  },
];

export function AnalysisShowcase() {
  const [selected, setSelected] = useState(cases[0]);
  const [view, setView] = useState('chart');
  return (
    <div className={styles.showcase}>
      <div className={styles.toolbar}>
        <div role="group" aria-label="Analysis example" className={styles.scenarios}>
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected.id === item.id}
              onClick={() => setSelected(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className={styles.sampleLabel}>SAMPLE DATA / LIVE CHARTS</span>
      </div>
      <div className={styles.workspace}>
        <div className={styles.report}>
          <div className={styles.question}>
            <MessageSquare className="size-4" aria-hidden="true" />
            <p>{selected.question}</p>
          </div>
          <div className={styles.reportHeading}>
            <div>
              <span className="site-eyebrow">THE VISUAL ANSWER</span>
              <h3>{selected.title}</h3>
            </div>
            <span className={styles.reportStamp}>GPT-Vis</span>
          </div>
          <dl className={styles.metrics}>
            <div>
              <dt>{selected.metricLabel}</dt>
              <dd>{selected.metric}</dd>
            </div>
            <div>
              <dt>{selected.findingLabel}</dt>
              <dd>{selected.finding}</dd>
            </div>
          </dl>
          <div className={styles.viewToolbar}>
            <div role="group" aria-label="Analysis output view">
              {['chart', 'data', 'json'].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={view === item}
                  onClick={() => setView(item)}
                >
                  {item === 'json' ? 'JSON' : item === 'chart' ? 'Chart' : 'Source values'}
                </button>
              ))}
            </div>
            <span>USD</span>
          </div>
          <div className={styles.output}>
            {view === 'chart' ? (
              <LiveChart
                input={selected.input}
                height={240}
                label={`${selected.title}, sample data in USD`}
              />
            ) : view === 'data' ? (
              <table>
                <caption className="sr-only">Source values for {selected.title}, in USD</caption>
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
          <p className={styles.finding}>
            <span>THE TAKEAWAY</span>
            {selected.answer}
          </p>
        </div>
        <aside className={styles.pipeline}>
          <div className={styles.partners}>
            <span>AVA</span>
            <ArrowRight className="size-4" aria-hidden="true" />
            <span>GPT-Vis</span>
          </div>
          <h3>Analysis meets expression.</h3>
          <p>
            AVA connects to data, runs the analysis, and recommends a chart. GPT-Vis turns the
            resulting configuration into a visual answer.
          </p>
          <ol className={styles.steps}>
            <li>
              <span className={styles.stepIcon}>
                <Database className="size-4" aria-hidden="true" />
              </span>
              <div>
                <span>01 / AVA</span>
                <h4>Start with your data.</h4>
                <p>Ask a question about a file or a connected database.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepIcon}>
                <Braces className="size-4" aria-hidden="true" />
              </span>
              <div>
                <span>02 / AVA</span>
                <h4>Calculate the answer.</h4>
                <p>{selected.method}</p>
              </div>
            </li>
            <li>
              <span className={styles.stepIcon}>
                <ChartNoAxesCombined className="size-4" aria-hidden="true" />
              </span>
              <div>
                <span>03 / GPT-VIS</span>
                <h4>Make the result visible.</h4>
                <p>Render the chart, inspect its values, and keep the JSON to reuse in your app.</p>
              </div>
            </li>
          </ol>
          <div className={styles.handoff}>
            <Braces className="size-4" aria-hidden="true" />
            <span>Query result → chart config → your interface</span>
          </div>
          <a
            href="https://ava.antv.vision/ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="site-button site-button-primary"
          >
            Try analysis in AVA <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <Link href="/docs/integrations/ecosystem#ava" className={styles.guideLink}>
            How AVA and GPT-Vis work together <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </aside>
      </div>
      <footer className={styles.footer}>
        <p>
          Illustrative workflow with fixed sample data. Charts render with GPT-Vis; the questions
          and findings are predefined.
        </p>
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
