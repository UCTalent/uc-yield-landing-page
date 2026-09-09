"use client";
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { issuerHref } from '@/constants/urls';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';

export function Header({ locale, dict }: { locale: string; dict: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hash, setHash] = useState('');
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    // Sync hash for language toggle on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHash(window.location.hash || '');
    
    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );
    
    const sections = ['how-it-works', 'features', 'technology', 'pilot', 'faq'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-all duration-300 ${scrolled ? 'bg-abyss/80 backdrop-blur-md border-b border-line' : 'bg-transparent border-transparent'}`}>
        {!prefersReducedMotion && (
          <motion.div 
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-base to-cyan origin-left z-50"
            style={{ scaleX }}
          />
        )}
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/ucYield.png" alt="UC Yield" width={200} height={200} className="h-[60px] w-auto object-contain hover:opacity-90 transition-opacity" />
        </Link>
        <nav className="hidden lg:flex gap-8">
          {[
            { id: 'how-it-works', label: dict.howItWorks },
            { id: 'features', label: dict.features },
            { id: 'technology', label: dict.technology },
            { id: 'pilot', label: dict.pilot },
            { id: 'faq', label: dict.faq }
          ].map(item => (
            <Link 
              key={item.id} 
              href={`#${item.id}`} 
              className={`text-[15px] font-medium transition-all relative py-1 ${activeSection === item.id ? 'text-cyan' : 'text-mist hover:text-ice'}`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-base to-cyan" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <div className="flex bg-white/5 rounded-full p-1">
            <Link href={`/${hash}`} locale="vi" className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-colors ${locale === 'vi' ? 'bg-white/10 text-white' : 'text-mist'}`}>VI</Link>
            <Link href={`/${hash}`} locale="en" className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-colors ${locale === 'en' ? 'bg-white/10 text-white' : 'text-mist'}`}>EN</Link>
          </div>
          <a href={issuerHref('/dashboard')} className="hidden lg:flex">
            <Button className="rounded-full bg-gradient-to-r from-base to-cyan hover:opacity-90 text-white border-0">{dict.tryItNow}</Button>
          </a>
          <button className="lg:hidden text-ice" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-abyss pt-[72px] px-6 flex flex-col"
        >
          <nav className="flex flex-col gap-6 mt-8 text-xl font-display font-bold">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Link href="#how-it-works" onClick={handleLinkClick} className="text-mist hover:text-ice block">{dict.howItWorks}</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Link href="#features" onClick={handleLinkClick} className="text-mist hover:text-ice block">{dict.features}</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Link href="#technology" onClick={handleLinkClick} className="text-mist hover:text-ice block">{dict.technology}</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <Link href="#pilot" onClick={handleLinkClick} className="text-mist hover:text-ice block">{dict.pilot}</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Link href="#faq" onClick={handleLinkClick} className="text-mist hover:text-ice block">{dict.faq}</Link>
            </motion.div>
          </nav>
          <div className="mt-auto pb-12">
            <a href={issuerHref('/dashboard')} onClick={handleLinkClick} className="w-full block">
              <Button className="w-full py-6 rounded-full bg-gradient-to-r from-base to-cyan text-white text-lg border-0">{dict.tryItNow}</Button>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
