'use client';

import { useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DocsSidebar } from './docs-sidebar';
import type { DocsContent } from '@/types/docs';

export function DocsMobileNav({ content }: { content: DocsContent }) {
  const t = useTranslations('Docs');
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="docs-icon-button docs-mobile-menu" aria-label={t('menu')}>
        <Menu size={20} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="docs-dialog-backdrop" />
        <Dialog.Popup className="docs-mobile-popup">
          <div className="docs-mobile-title">
            <Dialog.Title>{t('label')}</Dialog.Title>
            <Dialog.Close className="docs-icon-button" aria-label={t('close')}>
              <X size={20} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{t('menu')}</Dialog.Description>
          <DocsSidebar {...content} onNavigate={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
