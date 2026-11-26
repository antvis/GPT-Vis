import { ArrowUpRight, ChartNoAxesCombined, ScanLine } from 'lucide-react';
import Link from '../../components/LocaleLink';
import { getTranslator, type Locale } from '../../lib/i18n';
import { groupedExamplesData } from '../examplesData';
import { annotationsData } from '../examplesData/annotations';

export function LibraryNavigation({
  active,
  locale,
}: {
  active: 'charts' | 'analysis';
  locale: Locale;
}) {
  const t = getTranslator(locale);
  const libraries = [
    {
      id: 'charts',
      href: '/examples',
      count: groupedExamplesData.flatMap((group) => group.charts).length,
      name: 'Visualizations',
      description: 'Choose how to show your data.',
      Icon: ChartNoAxesCombined,
    },
    {
      id: 'analysis',
      href: '/examples/annotations',
      count: annotationsData.examples.length,
      name: 'Analysis capabilities',
      description: 'Bring the findings into focus.',
      Icon: ScanLine,
    },
  ];
  return (
    <nav className="examples-library-nav" aria-label={t('Example libraries')}>
      {libraries.map(({ id, href, count, name, description, Icon }) => (
        <Link key={id} href={href} aria-current={active === id ? 'page' : undefined}>
          <Icon className="size-5" aria-hidden="true" />
          <span>
            <strong>
              <b>{count}</b> {t(name)}
            </strong>
            <small>{t(description)}</small>
          </span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}
