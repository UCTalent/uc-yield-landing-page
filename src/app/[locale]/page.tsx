import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { TrustBar } from '@/components/landing/trust-bar';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Features } from '@/components/landing/features';
import { Technology } from '@/components/landing/technology';
import { Pilot } from '@/components/landing/pilot';
import { Ticker } from '@/components/landing/ticker';
import { FAQ } from '@/components/landing/faq';
import { FinalCTA } from '@/components/landing/final-cta';
import { Footer } from '@/components/landing/footer';
import { BackToTop } from '@/components/landing/back-to-top';
import { HeroBackground } from '@/components/landing/hero-background';

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const h = await getTranslations('Header');
  const hero = await getTranslations('Hero');
  const tb = await getTranslations('TrustBar');
  const hiw = await getTranslations('HowItWorks');
  const f = await getTranslations('Features');
  const t = await getTranslations('Technology');
  const p = await getTranslations('Pilot');
  const faq = await getTranslations('FAQ');
  const cta = await getTranslations('CTA');
  const footer = await getTranslations('Footer');

  return (
    <main className="min-h-screen bg-abyss text-ice font-sans relative">
      <HeroBackground />
      <Header locale={locale} dict={{ howItWorks: h('howItWorks'), features: h('features'), technology: h('technology'), pilot: h('pilot'), faq: h('faq'), tryItNow: h('tryItNow') }} />
      <Hero dict={{ badgeLive: hero('badgeLive'), badgeVersion: hero('badgeVersion'), h1Line1: hero('h1Line1'), h1Highlight: hero('h1Highlight'), h1Line2: hero('h1Line2'), h1Line3: hero('h1Line3'), subtitle: hero('subtitle'), ctaTry: hero('ctaTry'), ctaHow: hero('ctaHow'), trust1: hero('trust1'), trust2: hero('trust2'), ledgerTitle: hero('ledgerTitle'), statsHashing: hero('statsHashing'), statsBytes: hero('statsBytes'), statsRoles: hero('statsRoles'), statsSteps: hero('statsSteps') }} />
      <TrustBar dict={{ items: tb('items') }} />
      <HowItWorks dict={{ title: hiw('title'), subtitle: hiw('subtitle'), step1Title: hiw('step1Title'), step1Desc: hiw('step1Desc'), step2Title: hiw('step2Title'), step2Desc: hiw('step2Desc'), step3Title: hiw('step3Title'), step3Desc: hiw('step3Desc') }} />
      <Features dict={{ title: f('title'), subtitle: f('subtitle'), f1Title: f('f1Title'), f1Desc: f('f1Desc'), f2Title: f('f2Title'), f2Desc: f('f2Desc'), f3Title: f('f3Title'), f3Desc: f('f3Desc'), f4Title: f('f4Title'), f4Desc: f('f4Desc'), banner: f('banner') }} />
      <Technology dict={{ title: t('title'), purity: t('purity'), viewContract: t('viewContract'), readDocs: t('readDocs'), deployed: t('deployed'), verified: t('verified'), oracleBadge: t('oracleBadge'), oracleFootnote: t('oracleFootnote') }} />
      <Pilot dict={{ chip: p('chip'), title: p('title'), metric1Val: p('metric1Val'), metric1Lbl: p('metric1Lbl'), metric2Lbl: p('metric2Lbl'), metric3Lbl: p('metric3Lbl'), quote: p('quote'), cta: p('cta'), disclaimer: p('disclaimer') }} />
      <Ticker />
      <FAQ dict={{ title: faq('title'), q1: faq('q1'), a1: faq('a1'), q2: faq('q2'), a2: faq('a2'), q3: faq('q3'), a3: faq('a3'), q4: faq('q4'), a4: faq('a4'), q5: faq('q5'), a5: faq('a5'), q6: faq('q6'), a6: faq('a6') }} />
      <FinalCTA dict={{ title: cta('title'), subtitle: cta('subtitle'), subline: cta('subline'), btn: cta('btn') }} />
      <Footer dict={{ tagline: footer('tagline'), builtOnBase: footer('builtOnBase'), systemsOperational: footer('systemsOperational'), col1: footer('col1'), col1Item1: footer('col1Item1'), col2: footer('col2'), col2Item1: footer('col2Item1'), col2Item2: footer('col2Item2'), col2Item3: footer('col2Item3'), status: footer('status'), col3: footer('col3'), col3Item1: footer('col3Item1'), col3Item2: footer('col3Item2'), bottom1: footer('bottom1'), bottom2: footer('bottom2'), bottom3: footer('bottom3'), footnote: footer('footnote') }} hDict={{ howItWorks: h('howItWorks'), pilot: h('pilot'), faq: h('faq') }} />
      <BackToTop />
    </main>
  );
}
