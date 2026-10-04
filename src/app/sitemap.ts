import { MetadataRoute } from 'next';
import { getDocs } from '@/server/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/docs', ...getDocs('vi').pages.map((page) => `/docs/${page.slug}`)];
  return [
    {
      url: 'https://ucyield.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://ucyield.com/en',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...paths.flatMap((path) =>
      ['vi', 'en'].map((locale) => ({
        url: `https://ucyield.com${locale === 'en' ? '/en' : ''}${path}`,
        lastModified: new Date('2026-10-04T00:00:00+07:00'),
        changeFrequency: 'monthly' as const,
        priority: path === '/docs' ? 0.8 : 0.6,
        alternates: {
          languages: { vi: `https://ucyield.com${path}`, en: `https://ucyield.com/en${path}` },
        },
      })),
    ),
  ];
}
