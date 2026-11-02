import { MetadataRoute } from 'next';
import { groupedExamplesData } from './examples/examplesData';
import { docHref, docs } from './lib/docs';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gpt-vis.antv.vision';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/themes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
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
}
