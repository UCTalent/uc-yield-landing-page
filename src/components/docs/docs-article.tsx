import { ArrowLeft, ArrowRight, Clock3, Info, Link2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { docHref, readingMinutes } from '@/helpers/docs-search';
import { DocsCode } from './docs-code';
import { DocsToc } from './docs-toc';
import type { DocPage, DocsContent } from '@/types/docs';

export function DocsArticle({ page, content }: { page: DocPage; content: DocsContent }) {
  const t = useTranslations('Docs');
  const index = content.pages.findIndex((item) => item.slug === page.slug);
  const previous = content.pages[index - 1];
  const next = content.pages[index + 1];
  const group = content.groups.find((item) => item.id === page.group);
  return (
    <div className="docs-article-layout">
      <article className="docs-article">
        <div className="docs-breadcrumb">
          <Link href="/docs">{t('label')}</Link>
          <span>/</span>
          {group?.title}
        </div>
        <header className="docs-article-header">
          <h1>{page.title}</h1>
          <p className="docs-lead">{page.description}</p>
          <div className="docs-article-meta">
            <span>
              <Clock3 size={13} aria-hidden="true" />
              {readingMinutes(page)} {t('minutes')}
            </span>
            <span>{t('reviewed')}</span>
          </div>
        </header>
        {page.notice && (
          <aside className="docs-article-notice">
            <Info size={18} aria-hidden="true" />
            <p>{page.notice}</p>
          </aside>
        )}
        <details className="docs-mobile-toc">
          <summary>{t('toc')}</summary>
          <ul>
            {page.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </details>
        {page.sections.map((section) => (
          <section id={section.id} key={section.id} className="docs-article-section">
            <h2>
              {section.title}
              <a href={`#${section.id}`} aria-label={`${t('pageLink')}: ${section.title}`}>
                <Link2 size={16} />
              </a>
            </h2>
            {section.paragraphs.map((paragraph, position) => (
              <p key={position}>{paragraph}</p>
            ))}
            {section.list && (
              <ol>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )}
            {section.code && <DocsCode code={section.code} language={section.language} />}
            {section.table && (
              <div
                className="docs-table-wrapper"
                role="region"
                aria-label={section.title}
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      {section.table.headers.map((header) => (
                        <th scope="col" key={header}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) =>
                          cellIndex === 0 ? (
                            <th scope="row" key={cellIndex}>
                              {cell}
                            </th>
                          ) : (
                            <td key={cellIndex}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
        <details className="docs-sources">
          <summary>{t('sources')}</summary>
          <p>{t('sourceNote')}</p>
          <ul>
            {page.sources.map((source) => (
              <li key={source}>
                <code>{source}</code>
              </li>
            ))}
          </ul>
        </details>
        <nav className="docs-page-pagination" aria-label={t('label')}>
          {previous ? (
            <Link href={docHref(previous.slug)}>
              <small>
                <ArrowLeft size={13} />
                {t('previous')}
              </small>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <Link href="/docs">
              <small>
                <ArrowLeft size={13} />
                {t('back')}
              </small>
              <strong>{t('home')}</strong>
            </Link>
          )}
          {next && (
            <Link href={docHref(next.slug)}>
              <small>
                {t('next')}
                <ArrowRight size={13} />
              </small>
              <strong>{next.title}</strong>
            </Link>
          )}
        </nav>
      </article>
      <DocsToc sections={page.sections.map(({ id, title }) => ({ id, title }))} />
    </div>
  );
}
