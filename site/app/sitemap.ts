import { MetadataRoute } from 'next';
import { groupedExamplesData } from './examples/examplesData';
import { docHref, docs } from './lib/docs';
import { localeHref } from './lib/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gpt-vis.antv.vision';

  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/themes`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/examples`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...docs.slice(1).map((doc) => ({
      url: `${baseUrl}${docHref(doc.slug)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...groupedExamplesData.flatMap((group) =>
      group.charts.map((chart) => ({
        url: `${baseUrl}/examples/${chart.id}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ),
  ];
  return pages.flatMap((page) =>
    (['en', 'zh'] as const).map((locale) => ({
      ...page,
      url: `${baseUrl}${localeHref(new URL(page.url).pathname, locale)}`,
      alternates: {
        languages: {
          en: `${baseUrl}${localeHref(new URL(page.url).pathname, 'en')}`,
          'zh-CN': `${baseUrl}${localeHref(new URL(page.url).pathname, 'zh')}`,
        },
      },
    })),
  );
}
