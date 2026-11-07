'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DocsCode({ code, language }: { code: string; language?: string }) {
  const t = useTranslations('Docs');
  const [state, setState] = useState('copy');
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setState('copied');
    } catch {
      setState('copyError');
    }
  }
  return (
    <div className="docs-code">
      <div className="docs-code-bar">
        <span>{language}</span>
        <button onClick={() => void copy()} aria-label={t('copy')}>
          {state === 'copied' ? <Check size={14} /> : <Copy size={14} />}
          <span>{t('copy')}</span>
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      <span role="status" className="sr-only">
        {state === 'copy' ? '' : t(state)}
      </span>
    </div>
  );
}
