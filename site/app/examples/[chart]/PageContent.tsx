import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lightbulb } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ChartExample } from '../../components/ChartExample';
import Link from '../../components/LocaleLink';
import { getTranslator, type Locale } from '../../lib/i18n';
import { pageMetadata } from '../../lib/page-metadata';
import { chartIcons } from '../exampleIcons';
import { groupedExamplesData } from '../examplesData';

const allCharts = groupedExamplesData.flatMap((group) => group.charts);

export function generateStaticParams() {
  return allCharts.map((chart) => ({ chart: chart.id }));
}

export async function pageMetadataFor(
  { params }: { params: Promise<{ chart: string }> },
  locale: Locale,
) {
  const { chart } = await params;
  const data = allCharts.find((item) => item.id === chart);
  if (!data) notFound();
  const t = getTranslator(locale);
  return pageMetadata({
    locale,
    title: `${t(data.name)} | GPT-Vis`,
    description: t(data.description).split(/(?<=\.)\s/)[0],
    path: `/examples/${chart}`,
    type: 'article',
  });
}

export default function ChartDocContent({
  params,
  locale,
}: {
  params: Promise<{ chart: string }>;
  locale: Locale;
}) {
  const t = getTranslator(locale);
  const { chart } = use(params);
  const chartData = allCharts.find((item) => item.id === chart);
  if (!chartData) notFound();
  const group = groupedExamplesData.find((item) => item.charts.some((item) => item.id === chart));
  const Icon = chartIcons[chart];
  const index = allCharts.findIndex((item) => item.id === chart);
  const previous = allCharts[index - 1];
  const next = allCharts[index + 1];
  const overview = t(chartData.description).split(/(?<=\.)\s/)[0];

  return (
    <main className="examples-main example-detail" id="examples-content">
      <Breadcrumb
        items={[{ label: t('Examples'), href: '/examples' }, { label: t(chartData.name) }]}
      />
      <header className="example-detail-heading">
        <div>
          <p className="site-eyebrow">
            {t(group?.title ?? '')} / {t('CHART GUIDE')}
          </p>
          <h1>{t(chartData.name)}</h1>
          <p>{overview}</p>
        </div>
        <span className="example-detail-icon" aria-hidden="true">
          <Icon />
        </span>
      </header>
      <nav className="example-section-links" aria-label={t('In this chart guide')}>
        <a href="#visual-examples">
          {t('Live examples')} <span>{chartData.examples.length}</span>
        </a>
        <a href="#options">{t('Configuration')}</a>
        <Link href="/docs/syntax">
          {t('JSON & Syntax guide')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </nav>
      <aside className="example-use-cases">
        <div className="example-use-cases-label">
          <Lightbulb className="size-4" aria-hidden="true" />
          <h2>{t('When to use it')}</h2>
        </div>
        <ul>
          {chartData.knowledge.useCases.map((useCase) => (
            <li key={t(useCase)}>
              <Check className="size-3.5" aria-hidden="true" />
              <span>{t(useCase)}</span>
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
            <p className="site-eyebrow">{t('01 / EXPLORE')}</p>
            <h2 id="visual-examples-heading">{t('See it in action.')}</h2>
          </div>
          <p>{t('Switch to Code to copy an example.')}</p>
        </div>
        <div className="example-live-list">
          {chartData.examples.map((example, exampleIndex) => (
            <ChartExample
              key={example.title}
              title={t(example.title)}
              dsl={example.dsl}
              json={example.json}
              chartId={`${chart}-${exampleIndex}`}
            />
          ))}
        </div>
      </section>
      <details className="example-about">
        <summary>
          {t('About')} {t(chartData.name)}
        </summary>
        <p>{t(chartData.description)}</p>
      </details>
      <section id="options" className="example-detail-section" aria-labelledby="options-heading">
        <div className="example-section-heading">
          <div>
            <p className="site-eyebrow">{t('02 / CONFIGURE')}</p>
            <h2 id="options-heading">{t('Make it yours.')}</h2>
          </div>
          <p>{t('The properties available for this chart.')}</p>
        </div>
        <div className="example-options-groups">
          {chartData.knowledge.config.map((configGroup) => (
            <div key={t(configGroup.name)}>
              <h3>{t(configGroup.name)}</h3>
              <div
                className="example-options-scroll"
                role="region"
                aria-label={t(configGroup.name)}
                tabIndex={0}
              >
                <table className="example-options-table">
                  <thead>
                    <tr>
                      <th scope="col">{t('Property')}</th>
                      <th scope="col">{t('Type')}</th>
                      <th scope="col">{t('Required')}</th>
                      <th scope="col">{t('Description')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configGroup.config.map((option, optionIndex) => (
                      <tr key={`${option.property}-${optionIndex}`}>
                        <th scope="row">
                          <code>{option.property}</code>
                        </th>
                        <td>
                          <code>
                            {option.valueType === 'BuiltinThemeName | ThemeSpec' ? (
                              <>
                                <Link
                                  href="/docs/themes#built-in-theme-names"
                                  className="underline underline-offset-4"
                                >
                                  BuiltinThemeName
                                </Link>
                                {' | '}
                                <Link
                                  href="/docs/reference/theme-spec"
                                  className="underline underline-offset-4"
                                >
                                  ThemeSpec
                                </Link>
                              </>
                            ) : (
                              option.valueType
                            )}
                          </code>
                        </td>
                        <td>
                          <span
                            className="example-option-badge"
                            data-required={option.type === 'required'}
                          >
                            {t(option.type)}
                          </span>
                        </td>
                        <td>{t(option.description)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
      <nav className="example-pagination" aria-label={t('More chart types')}>
        {previous ? (
          <Link href={`/examples/${previous.id}`}>
            <span>
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              {t('Previous chart')}{' '}
            </span>
            <strong>{t(previous.name)}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/examples/${next.id}`}>
            <span>
              {t('Next chart')} <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
            <strong>{t(next.name)}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
      <footer className="examples-footer">{t('GPT-Vis · An AntV project · MIT licensed')}</footer>
    </main>
  );
}
