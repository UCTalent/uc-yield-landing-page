'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function DocsToc({ sections }: { sections: { id: string; title: string }[] }) {
  const t = useTranslations('Docs');
  const [active, setActive] = useState(sections[0]?.id ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-100px 0px -65% 0px' },
    );
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);
  return (
    <nav className="docs-toc" aria-label={t('toc')}>
      <p>{t('toc')}</p>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? 'location' : undefined}
        >
          {section.title}
        </a>
      ))}
      <div className="docs-toc-note">
        <span className="docs-network-dot" />
        {t('network')}
        <small>{t('sourceNote')}</small>
      </div>
    </nav>
  );
}
