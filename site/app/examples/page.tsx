import { ArrowDown, ArrowUpRight, Braces, Shapes } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb } from '../components/Breadcrumb';
import { ChartPreview } from '../components/ChartPreview';
import { pageMetadata } from '../lib/page-metadata';
import { chartIcons } from './exampleIcons';
import { groupedExamplesData } from './examplesData';

export const metadata = pageMetadata({
  title: 'Chart examples | GPT-Vis',
  description:
    'Explore all 26 chart types with live previews, JSON and Syntax examples, and configuration guides.',
  path: '/examples',
});

const groupDescriptions: Record<string, string> = {
  statistics: 'Compare values, follow trends, and see how your data is distributed.',
  relationship: 'Make connections, hierarchies, and processes easier to follow.',
  text: 'Keep the exact values and the written takeaway alongside your charts.',
};

export default function ExamplesGallery() {
  const total = groupedExamplesData.reduce((count, group) => count + group.charts.length, 0);
  return (
    <main className="examples-main" id="examples-content">
      <Breadcrumb items={[{ label: 'Examples' }]} />
      <header className="examples-hero">
        <div className="examples-hero-copy">
          <p className="site-eyebrow">THE CHART LIBRARY</p>
          <h1>A chart for every kind of data.</h1>
          <p>
            Find your starting point. Explore live charts, copy the JSON or Syntax, and make it your
            own.
          </p>
          <div className="examples-hero-notes">
            <span>
              <Shapes className="size-3.5" aria-hidden="true" />
              {total} chart types
            </span>
            <span>
              <Braces className="size-3.5" aria-hidden="true" />
              JSON &amp; Syntax
            </span>
          </div>
        </div>
        <div className="examples-hero-art" aria-hidden="true">
          <span className="examples-art-note">find your way to show it ↘</span>
          <div className="examples-art-sheet">
            <span className="examples-art-tape" />
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
              <circle cx="26" cy="45" r="3" fill="#796191" />
              <circle cx="62" cy="26" r="3" fill="#796191" />
              <circle cx="97" cy="43" r="3" fill="#796191" />
              <circle cx="140" cy="11" r="3" fill="#796191" />
            </svg>
            <span>your data, a little clearer.</span>
          </div>
          <span className="examples-art-badge">
            {total}
            <small>ways to see it</small>
          </span>
        </div>
      </header>
      <nav className="examples-category-links" aria-label="Chart categories">
        {groupedExamplesData.map((group) => (
          <a key={group.id} href={`#${group.id}`}>
            {group.title}
            <span>{group.charts.length}</span>
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        ))}
        <span className="examples-category-note">LIVE PREVIEWS · READY TO REUSE</span>
      </nav>
      <div className="examples-groups">
        {groupedExamplesData.map((group, groupIndex) => (
          <section
            key={group.id}
            id={group.id}
            className="examples-group"
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="examples-group-heading">
              <span className="examples-group-number">0{groupIndex + 1}</span>
              <div>
                <h2 id={`${group.id}-heading`}>
                  {group.title}
                  <span>{group.charts.length}</span>
                </h2>
                <p>{groupDescriptions[group.id]}</p>
              </div>
            </div>
            <div className="examples-grid">
              {group.charts.map((chart) => {
                const Icon = chartIcons[chart.id];
                return (
                  <article
                    key={chart.id}
                    id={chart.id}
                    className="example-card"
                    data-category={group.id}
                  >
                    <Link
                      href={`/examples/${chart.id}`}
                      className="example-card-link"
                      aria-label={`Explore ${chart.name}`}
                    >
                      <div className="example-card-heading">
                        <span className="example-card-icon">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <h3>{chart.name}</h3>
                        <ArrowUpRight className="size-4 example-card-arrow" aria-hidden="true" />
                      </div>
                      <div className="example-card-preview" aria-hidden="true" inert>
                        <ChartPreview
                          deferUntilVisible
                          dsl={chart.galleryDsl}
                          json={chart.galleryJson}
                          chartId={`${chart.id}-gallery`}
                          className="example-gallery-chart"
                        />
                      </div>
                      <div className="example-card-caption">
                        <p>{chart.description}</p>
                        <span>
                          Explore examples <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <aside className="examples-next">
        <Braces className="size-5" aria-hidden="true" />
        <div>
          <h2>Found your chart?</h2>
          <p>Bring it into your agent or your application.</p>
        </div>
        <Link href="/docs/agent-skill">
          Agent Skill <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
        <Link href="/docs/quickstart">
          SDK quickstart <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </aside>
    </main>
  );
}
