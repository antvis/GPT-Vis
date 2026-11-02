import type { Metadata } from 'next';

const origin = 'https://gpt-vis.antv.vision';
const image = `${origin}/gpt-vis-logo.png`;

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = new URL(path, origin).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'GPT-Vis',
      locale: 'en_US',
      type,
      images: [{ url: image, width: 512, height: 512, alt: 'GPT-Vis' }],
    },
    twitter: { card: 'summary', title, description, images: [image] },
  };
}
