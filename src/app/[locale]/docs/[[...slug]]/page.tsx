import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DocsHome } from '@/components/docs/docs-home';
import { DocsArticle } from '@/components/docs/docs-article';
import { getDocs } from '@/server/docs';

interface Props {
  params: Promise<{ locale: string; slug?: string[] }>;
}

export function generateStaticParams() {
  return [{ slug: [] }, ...getDocs('vi').pages.map((page) => ({ slug: [page.slug] }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = getDocs(locale);
  const page = slug?.length === 1 ? content.pages.find((item) => item.slug === slug[0]) : undefined;
  if (slug?.length && !page) notFound();
  const t = await getTranslations({ locale, namespace: 'Docs' });
  const title = page ? `${page.title} — UCYield Docs` : t('metaTitle');
  const description = page?.description ?? t('metaDescription');
  const path = `/docs${page ? `/${page.slug}` : ''}`;
  const url = `https://ucyield.com${locale === 'en' ? '/en' : ''}${path}`;
  const image = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { vi: `https://ucyield.com${path}`, en: `https://ucyield.com/en${path}` },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function DocumentationPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const content = getDocs(locale);
  if (!slug?.length) return <DocsHome content={content} />;
  const page = slug.length === 1 ? content.pages.find((item) => item.slug === slug[0]) : undefined;
  if (!page) notFound();
  return <DocsArticle page={page} content={content} />;
}
