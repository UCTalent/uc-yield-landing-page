'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { issuerHref } from '@/constants/urls';
import { DocsSearch } from './docs-search';
import { DocsMobileNav } from './docs-mobile-nav';
import type { DocSearchItem, DocsContent } from '@/types/docs';

export function DocsHeader({
  content,
  searchItems,
}: {
  content: DocsContent;
  searchItems: DocSearchItem[];
}) {
  const t = useTranslations('Docs');
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <header className="docs-header">
      <div className="docs-header-brand">
        <DocsMobileNav content={content} />
        <Link href="/" aria-label="UCYield">
          <Image
            src="/ucYield-final.png"
            alt="UCYield"
            width={1204}
            height={312}
            className="docs-logo"
          />
        </Link>
        <span className="docs-header-divider" />
        <Link href="/docs" className="docs-header-label">
          {t('label')}
        </Link>
      </div>
      <DocsSearch items={searchItems} />
      <div className="docs-header-actions">
        <div className="docs-locales">
          {['vi', 'en'].map((value) => (
            <Link
              key={value}
              href={pathname}
              locale={value}
              lang={value}
              aria-current={locale === value ? 'true' : undefined}
            >
              {value.toUpperCase()}
            </Link>
          ))}
        </div>
        <a className="docs-dashboard-link" href={issuerHref('/dashboard', 'documentation')}>
          {t('dashboard')}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
