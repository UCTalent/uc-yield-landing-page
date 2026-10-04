'use client';

import { useEffect, useRef, useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { ArrowUpRight, FileText, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { searchDocs } from '@/helpers/docs-search';
import type { DocSearchItem } from '@/types/docs';

export function DocsSearch({ items }: { items: DocSearchItem[] }) {
  const t = useTranslations('Docs');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const results = searchDocs(items, query);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setQuery('');
      }}
    >
      <Dialog.Trigger className="docs-search-trigger" aria-label={t('searchTitle')}>
        <Search size={16} aria-hidden="true" />
        <span>{t('search')}</span>
        <kbd>⌘ K</kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="docs-dialog-backdrop" />
        <Dialog.Popup className="docs-search-popup" initialFocus={input}>
          <Dialog.Title className="sr-only">{t('searchTitle')}</Dialog.Title>
          <Dialog.Description className="sr-only">{t('searchHint')}</Dialog.Description>
          <div className="docs-search-input-row">
            <Search size={20} aria-hidden="true" />
            <input
              ref={input}
              aria-label={t('searchTitle')}
              value={query}
              placeholder={t('search')}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  const link = event.currentTarget
                    .closest('[role="dialog"]')
                    ?.querySelector<HTMLAnchorElement>('[data-search-result]');
                  link?.click();
                }
              }}
            />
            <Dialog.Close className="docs-icon-button" aria-label={t('close')}>
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="docs-search-results" aria-label={t('searchResults')}>
            {results.length === 0 && (
              <p role="status" className="docs-search-empty">
                {t('noResults')}
              </p>
            )}
            {results.map((item) => (
              <Link
                data-search-result
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <FileText size={18} aria-hidden="true" />
                <span>
                  <small>{item.group}</small>
                  <strong>{item.title}</strong>
                  <em>{item.description}</em>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="docs-search-hint">{t('searchHint')}</p>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
