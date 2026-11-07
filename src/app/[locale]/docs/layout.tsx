import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DocsHeader } from '@/components/docs/docs-header';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { getDocs } from '@/server/docs';
import { createSearchIndex } from '@/helpers/docs-search';
import './docs.css';

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getDocs(locale);
  const navigation = {
    groups: content.groups,
    pages: content.pages.map((page) => ({ ...page, sources: [], sections: [] })),
  };
  const t = await getTranslations('Docs');
  return (
    <div className="docs-site">
      <a className="docs-skip-link" href="#docs-content">
        {t('skip')}
      </a>
      <DocsHeader content={navigation} searchItems={createSearchIndex(content)} />
      <div className="docs-shell">
        <aside className="docs-sidebar">
          <DocsSidebar {...navigation} />
        </aside>
        <main id="docs-content" className="docs-main" tabIndex={-1}>
          {children}
          <footer className="docs-footer">
            <span>UCYield</span>
            <p>{t('footer')}</p>
            <span>
              {t('network')} · {t('phase')}
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
