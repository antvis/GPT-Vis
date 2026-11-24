import type { Metadata } from 'next';
import '../globals.css';
import type { Locale } from '../lib/i18n';
import { pageMetadata } from '../lib/page-metadata';
import { I18nProvider } from './I18nProvider';
import { ScrollbarManager } from './ScrollbarManager';
import { TopBar } from './TopBar';

export const siteMetadata = (locale: Locale): Metadata => ({
  ...pageMetadata({
    locale,
    title: 'GPT-Vis — Turn AI answers into charts.',
    description:
      'An open-source visualization library for AI agents and applications. Render 26 chart types from JSON or Syntax, stream model output, and customize chart styles with theme configuration.',
    path: '/',
  }),
  keywords: ['GPT-Vis', 'AI visualization', 'LLM', 'charts', 'data visualization', 'AI-native'],
  authors: [{ name: 'AntV Team' }],
});

export default function RootLayout({
  children,
  locale,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try {
            if (location.pathname === '/' && localStorage.getItem('gpt-vis.locale') === 'zh') {
              location.replace('/zh' + location.search + location.hash);
            }
          } catch (_) {}
        `,
          }}
        />
      </head>
      <body className="antialiased">
        <I18nProvider locale={locale}>
          <ScrollbarManager />
          <TopBar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
