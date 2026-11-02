import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ChartExample } from '../../components/ChartExample';
import { pageMetadata } from '../../lib/page-metadata';
import { chartIcons } from '../exampleIcons';
import { groupedExamplesData } from '../examplesData';

const allCharts = groupedExamplesData.flatMap((group) => group.charts);

export function generateStaticParams() {
  return allCharts.map((chart) => ({ chart: chart.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ chart: string }> }) {
  const { chart } = await params;
  const data = allCharts.find((item) => item.id === chart);
  if (!data) notFound();
  return pageMetadata({
    title: `${data.name} examples | GPT-Vis`,
    description: data.description.split(/(?<=\.)\s/)[0],
    path: `/examples/${chart}`,
    type: 'article',
  });
}

export default function ChartDocContent({ params }: { params: Promise<{ chart: string }> }) {
  const { chart } = use(params);
  const chartData = allCharts.find((item) => item.id === chart);
  if (!chartData) notFound();
  const group = groupedExamplesData.find((item) => item.charts.some((item) => item.id === chart));
  const Icon = chartIcons[chart];
  const index = allCharts.findIndex((item) => item.id === chart);
  const previous = allCharts[index - 1];
  const next = allCharts[index + 1];
  const overview = chartData.description.split(/(?<=\.)\s/)[0];

  return (
    <main className="examples-main example-detail" id="examples-content">
      <Breadcrumb items={[{ label: 'Examples', href: '/examples' }, { label: chartData.name }]} />
      <header className="example-detail-heading">
        <div>
          <p className="site-eyebrow">{group?.title.toUpperCase()} / CHART GUIDE</p>
          <h1>{chartData.name}</h1>
          <p>{overview}</p>
        </div>
        <span className="example-detail-icon" aria-hidden="true">
          <Icon />
        </span>
      </header>
      <nav className="example-section-links" aria-label="In this chart guide">
        <a href="#visual-examples">
          Live examples <span>{chartData.examples.length}</span>
        </a>
        <a href="#options">Configuration</a>
        <Link href="/docs/syntax">
          JSON &amp; Syntax guide <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </nav>
      <aside className="example-use-cases">
        <div className="example-use-cases-label">
          <Lightbulb className="size-4" aria-hidden="true" />
          <h2>When to use it</h2>
        </div>
        <ul>
          {chartData.knowledge.useCases.map((useCase) => (
            <li key={useCase}>
              <Check className="size-3.5" aria-hidden="true" />
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </aside>
      <section
        id="visual-examples"
        className="example-detail-section"
        aria-labelledby="visual-examples-heading"
      >
        <div className="example-section-heading">
          <div>
            <p className="site-eyebrow">01 / EXPLORE</p>
            <h2 id="visual-examples-heading">See it in action.</h2>
          </div>
          <p>Switch to Code to copy an example.</p>
        </div>
        <div className="example-live-list">
          {chartData.examples.map((example, exampleIndex) => (
            <ChartExample
              key={example.title}
              title={example.title}
              dsl={example.dsl}
              json={example.json}
              chartId={`${chart}-${exampleIndex}`}
            />
          ))}
        </div>
      </section>
      <details className="example-about">
        <summary>About {chartData.name}</summary>
        <p>{chartData.description}</p>
      </details>
      <section id="options" className="example-detail-section" aria-labelledby="options-heading">
        <div className="example-section-heading">
          <div>
            <p className="site-eyebrow">02 / CONFIGURE</p>
            <h2 id="options-heading">Make it yours.</h2>
          </div>
          <p>The properties available for this chart.</p>
        </div>
        <div className="example-options-groups">
          {chartData.knowledge.config.map((configGroup) => (
            <div key={configGroup.name}>
              <h3>{configGroup.name}</h3>
              <div
                className="example-options-scroll"
                role="region"
                aria-label={configGroup.name}
                tabIndex={0}
              >
                <table className="example-options-table">
                  <thead>
                    <tr>
                      <th scope="col">Property</th>
                      <th scope="col">Type</th>
                      <th scope="col">Required</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configGroup.config.map((option, optionIndex) => (
                      <tr key={`${option.property}-${optionIndex}`}>
                        <th scope="row">
                          <code>{option.property}</code>
                        </th>
                        <td>
                          <code>{option.valueType}</code>
                        </td>
                        <td>
                          <span
                            className="example-option-badge"
                            data-required={option.type === 'required'}
                          >
                            {option.type}
                          </span>
                        </td>
                        <td>{option.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
      <nav className="example-pagination" aria-label="More chart types">
        {previous ? (
          <Link href={`/examples/${previous.id}`}>
            <span>
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Previous chart
            </span>
            <strong>{previous.name}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/examples/${next.id}`}>
            <span>
              Next chart
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
            <strong>{next.name}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
      <footer className="examples-footer">GPT-Vis · An AntV project · MIT licensed</footer>
    </main>
  );
}
