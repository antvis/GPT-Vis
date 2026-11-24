import { type Locale } from '../lib/i18n';
import { pageMetadata } from '../lib/page-metadata';
import { THEME_EXAMPLES } from './examples';
import ThemeStudio from './ThemeStudio';

export const pageMetadataFor = (locale: Locale) =>
  pageMetadata({
    locale,
    title: 'Theme Studio | GPT-Vis',
    description:
      'Find your visual voice. Create, preview, and share one reusable theme across all 26 GPT-Vis chart types.',
    path: '/themes',
  });

export default function ThemesPage({ locale }: { locale: Locale }) {
  return <ThemeStudio key={locale} examples={THEME_EXAMPLES} />;
}
