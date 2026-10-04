import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  FileCheck2,
  Code2,
  Layers,
  Fingerprint,
  ShieldCheck,
  Braces,
  Compass,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { docHref } from '@/helpers/docs-search';
import { DocsPipeline } from './docs-pipeline';
import type { DocsContent } from '@/types/docs';

export function DocsHome({ content }: { content: DocsContent }) {
  const t = useTranslations('Docs');
  const paths = [
    { title: 'issuerTitle', description: 'issuerDescription', href: 'quickstart', Icon: BookOpen },
    {
      title: 'viewerTitle',
      description: 'viewerDescription',
      href: 'independent-verification',
      Icon: FileCheck2,
    },
    { title: 'developerTitle', description: 'developerDescription', href: 'api', Icon: Code2 },
  ];
  const icons = [Compass, Layers, Braces, ShieldCheck, Fingerprint, BookOpen];
  return (
    <div className="docs-home">
      <div className="docs-breadcrumb">
        <span>{t('label')}</span>
        <span>/</span>
        {t('home')}
      </div>
      <section className="docs-home-hero" aria-labelledby="docs-home-title">
        <p className="docs-eyebrow">
          <span />
          {t('introEyebrow')}
        </p>
        <h1 id="docs-home-title">{t('introTitle')}</h1>
        <p className="docs-lead">{t('introDescription')}</p>
        <div className="docs-hero-actions">
          <Link className="docs-primary-button" href={docHref('introduction')}>
            {t('start')}
            <ArrowRight size={16} />
          </Link>
          <Link className="docs-text-link" href={docHref('ucyield-verified')}>
            {t('learn')}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
      <section className="docs-featured">
        <div className="docs-featured-guide">
          <p className="docs-eyebrow">{t('guideEyebrow')}</p>
          <div className="docs-guide-icon">
            <BookOpen size={26} aria-hidden="true" />
          </div>
          <h2>{t('guideTitle')}</h2>
          <p>{t('guideDescription')}</p>
          <Link href={docHref('quickstart')}>
            {t('guideCta')}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <div className="docs-guide-grid" aria-hidden="true" />
        </div>
        <DocsPipeline />
      </section>
      <section className="docs-home-section" aria-labelledby="docs-paths-title">
        <h2 id="docs-paths-title">{t('pathsTitle')}</h2>
        <p>{t('pathsDescription')}</p>
        <div className="docs-paths">
          {paths.map(({ Icon, title, description, href }) => (
            <Link key={href} href={docHref(href)}>
              <Icon size={20} aria-hidden="true" />
              <h3>{t(title)}</h3>
              <p>{t(description)}</p>
              <ArrowUpRight size={16} className="docs-path-arrow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <section className="docs-home-section" aria-labelledby="docs-explore-title">
        <h2 id="docs-explore-title">{t('exploreTitle')}</h2>
        <p>{t('exploreDescription')}</p>
        <div className="docs-explore">
          {content.groups.map((group, index) => {
            const Icon = icons[index] ?? BookOpen;
            const pages = content.pages.filter((page) => page.group === group.id);
            return (
              <div className="docs-explore-row" key={group.id}>
                <div className="docs-explore-heading">
                  <Icon size={19} aria-hidden="true" />
                  <h3>{group.title}</h3>
                  <small>
                    {pages.length} {t('articles')}
                  </small>
                </div>
                <div className="docs-explore-links">
                  {pages.map((page) => (
                    <Link key={page.slug} href={docHref(page.slug)}>
                      {page.title}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <aside className="docs-scope-note">
        <ShieldCheck size={21} aria-hidden="true" />
        <div>
          <h2>{t('scopeTitle')}</h2>
          <p>{t('scopeDescription')}</p>
          <Link href={docHref('scope-and-roadmap')}>
            {t('scopeCta')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
