'use client';

import { BookOpen, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { docHref } from '@/helpers/docs-search';
import type { DocsContent } from '@/types/docs';

export function DocsSidebar({
  groups,
  pages,
  onNavigate,
}: DocsContent & { onNavigate?: () => void }) {
  const t = useTranslations('Docs');
  const pathname = usePathname();
  return (
    <nav className="docs-sidebar-nav" aria-label={t('menu')}>
      <Link
        href="/docs"
        onClick={onNavigate}
        aria-current={pathname === '/docs' ? 'page' : undefined}
        className="docs-overview-link"
      >
        <BookOpen size={16} aria-hidden="true" />
        {t('home')}
      </Link>
      {groups.map((group) => (
        <div key={group.id} className="docs-nav-group">
          <p>{group.title}</p>
          {pages
            .filter((page) => page.group === group.id)
            .map((page) => (
              <Link
                key={page.slug}
                href={docHref(page.slug)}
                onClick={onNavigate}
                aria-current={pathname === docHref(page.slug) ? 'page' : undefined}
              >
                {page.title}
              </Link>
            ))}
        </div>
      ))}
      <div className="docs-sidebar-bottom">
        <span className="docs-network-dot" />
        {t('network')}
        <small>{t('phase')}</small>
      </div>
      <Link href="/" className="docs-sidebar-website" onClick={onNavigate}>
        {t('website')}
        <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </nav>
  );
}
