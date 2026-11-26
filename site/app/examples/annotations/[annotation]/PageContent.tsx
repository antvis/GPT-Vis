import { ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { ChartExample } from '../../../components/ChartExample';
import Link from '../../../components/LocaleLink';
import { getTranslator, type Locale } from '../../../lib/i18n';
import { pageMetadata } from '../../../lib/page-metadata';
import { annotationIcons } from '../../annotationIcons';
import {
  ExampleDetailHeading,
  ExampleOptions,
  ExamplePagination,
  ExampleSectionHeading,
  ExampleUseCases,
} from '../../components/ExampleGuide';
import { chartIcons } from '../../exampleIcons';
import { groupedExamplesData } from '../../examplesData';
import { annotationGuides, getAnnotationOptions } from '../../examplesData/annotationGuides';
import {
  annotationExample,
  annotationGroup,
  annotationGroups,
  annotationHref,
  annotationPreviewChart,
  annotationVariants,
  annotationsData,
} from '../../examplesData/annotations';

const orderedTypes = annotationGroups.flatMap((group) => [...group.types]);
const chartGuides = groupedExamplesData.flatMap((group) => group.charts);
const chartGuideId = (chart: string) => (chart === 'table' ? 'table' : `${chart}-chart`);

export function generateStaticParams() {
  return orderedTypes.map((annotation) => ({ annotation }));
}

type Props = { params: Promise<{ annotation: string }> };

export async function pageMetadataFor({ params }: Props, locale: Locale) {
  const { annotation } = await params;
  const example = annotationsData.examples.find((example) => example.type === annotation);
  if (!example) notFound();
  const t = getTranslator(locale);
  return pageMetadata({
    locale,
    title: t('{type} annotation examples | GPT-Vis', { type: example.type }),
    description: t(
      '{type}: {description} Explore parameter variations and examples for every supported chart type.',
      { type: example.type, description: t(example.description) },
    ),
    path: annotationHref(example.type),
    type: 'article',
  });
}

export default async function Content({ params, locale }: Props & { locale: Locale }) {
  const { annotation } = await params;
  const example = annotationsData.examples.find((example) => example.type === annotation);
  if (!example) notFound();
  const t = getTranslator(locale);
  const Icon = annotationIcons[example.type];
  const group = annotationGroup(example.type);
  const guide = annotationGuides[example.type];
  const chart = annotationPreviewChart(example);
  const index = orderedTypes.indexOf(example.type);
  const adjacent = (type: typeof example.type | undefined) =>
    type ? { href: annotationHref(type), title: type } : undefined;
  const variants = annotationVariants(example);
  const chartName = (type: string) =>
    t(chartGuides.find((guide) => guide.id === chartGuideId(type))!.name);

  return (
    <main className="examples-main example-detail" id="examples-content">
      <Breadcrumb
        items={[
          { label: t('Examples'), href: '/examples' },
          { label: t('Analysis annotations'), href: '/examples/annotations' },
          { label: example.type },
        ]}
      />
      <ExampleDetailHeading
        eyebrow={`${t(group.name)} / ${t('ANNOTATION GUIDE')}`}
        title={example.type}
        description={t(example.description)}
        icon={<Icon />}
      />
      <nav className="example-section-links" aria-label={t('In this annotation guide')}>
        <a href="#visual-examples">
          {t('Live examples')}
          <span>{variants.length}</span>
        </a>
        <a href="#options">{t('Configuration')}</a>
        <a href="#support">
          {t('Chart support')}
          <span>{example.charts.length}</span>
        </a>
        <Link href="/docs/annotations">
          {t('Configuration & support matrix')}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </nav>
      <ExampleUseCases items={guide.useCases} locale={locale} />
      <section
        id="visual-examples"
        className="example-detail-section"
        aria-labelledby="visual-examples-heading"
      >
        <ExampleSectionHeading
          id="visual-examples-heading"
          eyebrow={t('01 / EXPLORE')}
          title={t('See it in action.')}
          description={t(
            'Compare parameter variations. Switch to Code to copy an example with the active theme.',
          )}
        />
        <div className="example-live-list">
          {variants.map(({ variant, title, chart: variantChart }) => (
            <div key={variant} id={variant === 'default' ? `chart-example-${chart}` : undefined}>
              <ChartExample
                title={`${t(title)} · ${chartName(variantChart ?? chart)}`}
                json={annotationExample(example, variantChart ?? chart, variant)}
                chartId={`${example.type}-${variant}`}
              />
            </div>
          ))}
        </div>
      </section>
      <section id="options" className="example-detail-section" aria-labelledby="options-heading">
        <ExampleSectionHeading
          id="options-heading"
          eyebrow={t('02 / CONFIGURE')}
          title={t('Make it yours.')}
          description={t('Add this configuration to the annotations array in your chart JSON.')}
        />
        <ExampleOptions
          locale={locale}
          groups={[
            {
              name: 'Configuration',
              config: [
                {
                  property: 'type',
                  valueType: `'${example.type}'`,
                  type: 'required',
                  description:
                    'Exact annotation type; keep the spelling and capitalization shown here.',
                },
                ...guide.options,
                ...getAnnotationOptions(example.type),
              ],
            },
          ]}
        />
      </section>
      <section id="support" className="example-detail-section" aria-labelledby="support-heading">
        <ExampleSectionHeading
          id="support-heading"
          eyebrow={t('03 / CHART SUPPORT')}
          title={t('Choose a supported chart.')}
          description={t(
            'One example for each supported chart type. The default chart is shown above; the remaining charts use the same annotation configuration.',
          )}
        />
        <div className="annotation-support">
          <ul className="annotation-support-charts" aria-label={t('Supported chart types')}>
            {example.charts.map((chart) => {
              const id = chartGuideId(chart);
              const chartData = chartGuides.find((guide) => guide.id === id)!;
              const Icon = chartIcons[id];
              return (
                <li key={chart}>
                  <a href={`#chart-example-${chart}`}>
                    <Icon className="size-4" aria-hidden="true" />
                    {t(chartData.name)}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
          <h3>{t('Calculation rules & limits')}</h3>
          <ul className="annotation-support-notes">
            {guide.notes.map((note) => (
              <li key={note}>{t(note)}</li>
            ))}
          </ul>
          <Link href="/docs/annotations" className="annotation-doc-link">
            {t('Full configuration reference')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="example-live-list mt-6">
          {example.charts
            .filter((type) => type !== chart)
            .map((type) => (
              <div key={type} id={`chart-example-${type}`} className="scroll-mt-24">
                <div className="mb-3 flex items-center justify-between gap-4 text-sm">
                  <h3 className="text-balance font-semibold">{chartName(type)}</h3>
                  <Link
                    href={`/examples/${chartGuideId(type)}`}
                    className="inline-flex items-center gap-1 text-primary"
                  >
                    {t('Chart type guide')}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <ChartExample
                  title={`${example.type} · ${chartName(type)}`}
                  json={annotationExample(example, type)}
                  chartId={`${example.type}-${type}`}
                />
              </div>
            ))}
        </div>
      </section>
      <ExamplePagination
        locale={locale}
        kind="annotations"
        previous={adjacent(orderedTypes[index - 1])}
        next={adjacent(orderedTypes[index + 1])}
      />
    </main>
  );
}
