import { pageMetadata } from '../lib/page-metadata';
import { THEME_EXAMPLES } from './examples';
import ThemeStudio from './ThemeStudio';

export const metadata = pageMetadata({
  title: 'Theme Studio | GPT-Vis',
  description:
    'Find your visual voice. Create, preview, and share one reusable theme across all 26 GPT-Vis chart types.',
  path: '/themes',
});

export default function ThemesPage() {
  return <ThemeStudio examples={THEME_EXAMPLES} />;
}
