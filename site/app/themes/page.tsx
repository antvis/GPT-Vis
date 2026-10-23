import type { Metadata } from 'next';
import { THEME_EXAMPLES } from './examples';
import ThemeStudio from './ThemeStudio';

export const metadata: Metadata = {
  title: 'Theme Studio | GPT-Vis',
  description:
    'Find your visual voice. Create, preview, and share one reusable theme across all 26 GPT-Vis chart types.',
  alternates: { canonical: 'https://gpt-vis.antv.vision/themes' },
  openGraph: {
    title: 'Theme Studio | GPT-Vis',
    description: 'One theme. Every chart. Create a visual language of your own.',
    url: 'https://gpt-vis.antv.vision/themes',
  },
};

export default function ThemesPage() {
  return <ThemeStudio examples={THEME_EXAMPLES} />;
}
