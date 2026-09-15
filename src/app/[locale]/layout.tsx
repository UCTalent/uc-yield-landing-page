import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import '../globals.css';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin', 'vietnamese'], variable: '--font-space' });
const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://ucyield.com'),
    alternates: {
      canonical: locale === 'vi' ? 'https://ucyield.com' : 'https://ucyield.com/en',
      languages: {
        'vi': 'https://ucyield.com',
        'en': 'https://ucyield.com/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: locale === 'vi' ? 'https://ucyield.com' : 'https://ucyield.com/en',
      siteName: 'UC Yield',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t('title'))}&desc=${encodeURIComponent(t('description'))}`,
          width: 1200,
          height: 630,
          alt: t('title'),
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`/api/og?title=${encodeURIComponent(t('title'))}&desc=${encodeURIComponent(t('description'))}`],
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "UC Yield",
              "url": "https://ucyield.com",
              "logo": "https://ucyield.com/thumnail_logo.png",
              "sameAs": [
                "https://twitter.com/ucyield"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-abyss text-ice selection:bg-base selection:text-white relative" suppressHydrationWarning>
        <div className="bg-noise z-0"></div>
        <div className="relative z-10">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
