import { ArrowDown, ArrowUpRight, Braces } from 'lucide-react';
import { ChartPreview } from '../../components/ChartPreview';
import Link from '../../components/LocaleLink';
import { getTranslator, type Locale } from '../../lib/i18n';
import { annotationGroupIcons, annotationIcons } from '../annotationIcons';
import { ExampleCard } from '../components/ExampleCard';
import {
  annotationExample,
  annotationGroups,
  annotationHref,
  annotationPreviewChart,
  annotationsData,
} from '../examplesData/annotations';

export function AnnotationGallery({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <>
      <nav className="examples-category-links" aria-label={t('Choose an analysis group')}>
        {annotationGroups.map((group) => {
          const Icon = annotationGroupIcons[group.id];
          return (
            <a key={group.id} href={`#${group.id}`}>
              <Icon className="size-3.5" aria-hidden="true" />
              {t(group.name)}
              <span>{group.types.length}</span>
              <ArrowDown className="size-3.5" aria-hidden="true" />
            </a>
          );
        })}
      </nav>
      <div className="examples-groups">
        {annotationGroups.map((group, index) => (
          <section
            key={group.id}
            id={group.id}
            className="examples-group"
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="examples-group-heading">
              <span className="examples-group-number">0{index + 1}</span>
              <div>
                <h2 id={`${group.id}-heading`} className="text-balance">
                  {t(group.name)}
                  <span>{group.types.length}</span>
                </h2>
                <p className="text-pretty">{t(group.description)}</p>
              </div>
            </div>
            <div className="examples-grid">
              {group.types.map((type) => {
                const example = annotationsData.examples.find((example) => example.type === type)!;
                const Icon = annotationIcons[type];
                return (
                  <ExampleCard
                    key={type}
                    id={type}
                    href={annotationHref(type)}
                    title={type}
                    description={t(example.description)}
                    action={t('Explore examples')}
                    icon={<Icon className="size-4" aria-hidden="true" />}
                    preview={
                      <ChartPreview
                        deferUntilVisible
                        json={annotationExample(example, annotationPreviewChart(example))}
                        chartId={`${type}-gallery`}
                        className="example-gallery-chart"
                      />
                    }
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <aside className="examples-next">
        <Braces className="size-5" aria-hidden="true" />
        <div>
          <h2 className="text-balance">{t('Make it work with your data.')}</h2>
          <p className="text-pretty">
            {t(
              'Check supported charts, selectors, and calculation rules before adding an annotation.',
            )}
          </p>
        </div>
        <Link href="/docs/annotations">
          {t('Read the guide')}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </aside>
    </>
  );
}
