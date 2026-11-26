import { Breadcrumb } from '../../components/Breadcrumb';
import { getTranslator, type Locale } from '../../lib/i18n';
import { pageMetadata } from '../../lib/page-metadata';
import { ExamplesHero } from '../components/ExamplesHero';
import { LibraryNavigation } from '../components/LibraryNavigation';
import { annotationGroups, annotationsData } from '../examplesData/annotations';
import { AnnotationGallery } from './AnnotationGallery';

export const pageMetadataFor = (locale: Locale) =>
  pageMetadata({
    locale,
    title: 'Analysis annotations | GPT-Vis',
    description: getTranslator(locale)(
      'Explore {count} analysis capabilities in {groups} groups, with live chart previews and complete JSON configurations.',
      { count: annotationsData.examples.length, groups: annotationGroups.length },
    ),
    path: '/examples/annotations',
  });

export default function Content({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <main className="examples-main" id="examples-content">
      <Breadcrumb
        items={[{ label: t('Examples'), href: '/examples' }, { label: t('Analysis annotations') }]}
      />
      <LibraryNavigation active="analysis" locale={locale} />
      <ExamplesHero kind="annotations" locale={locale} count={annotationsData.examples.length} />
      <AnnotationGallery locale={locale} />
    </main>
  );
}
