import type { Metadata } from 'next';
import { ScrollbarManager } from './components/ScrollbarManager';
import { TopBar } from './components/TopBar';
import './globals.css';
import { pageMetadata } from './lib/page-metadata';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'GPT-Vis — Turn AI answers into charts.',
    description:
      'Open-source visualization for AI agents and applications. 26 chart types, JSON and Syntax, streaming rendering, and reusable themes.',
    path: '/',
  }),
  keywords: ['GPT-Vis', 'AI visualization', 'LLM', 'charts', 'data visualization', 'AI-native'],
  authors: [{ name: 'AntV Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <ScrollbarManager />
        <TopBar />
        {children}
      </body>
    </html>
  );
}
