import type { Metadata } from 'next';
import { getTranslator, localeHref, type Locale } from './i18n';

const origin = 'https://gpt-vis.antv.vision';
const image = `${origin}/gpt-vis-logo.png`;

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  locale = 'en',
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  locale?: Locale;
}): Metadata {
  const t = getTranslator(locale);
  title = t(title);
  description = t(description);
  const url = new URL(localeHref(path, locale), origin).href;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: new URL(localeHref(path, 'en'), origin).href,
        'zh-CN': new URL(localeHref(path, 'zh'), origin).href,
        'x-default': new URL(localeHref(path, 'en'), origin).href,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'GPT-Vis',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type,
      images: [{ url: image, width: 512, height: 512, alt: 'GPT-Vis' }],
    },
    twitter: { card: 'summary', title, description, images: [image] },
  };
}
