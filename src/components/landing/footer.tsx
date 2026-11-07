import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { issuerHref } from '@/constants/urls';

export function Footer({ dict, hDict }: { dict: any; hDict: any }) {
  const linkClass = "relative hover:text-white transition-colors after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1px] after:bg-gradient-to-r after:from-base after:to-cyan hover:after:w-full after:transition-all after:duration-300 inline-block";

  return (
    <footer className="bg-black/40 pt-20 pb-10 border-t border-line relative overflow-hidden z-10">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image src="/ucYield-final.png" alt="UC Yield" width={1204} height={312} className="h-[72px] w-auto object-contain hover:opacity-90 transition-opacity" />
            </Link>
            <p className="text-mist text-sm mb-6 max-w-xs">{dict.tagline}</p>
            <div className="inline-block px-3 py-1 bg-white/5 border border-line rounded-full text-xs font-semibold mb-4 text-mist">{dict.builtOnBase}</div>
            <div className="flex items-center text-xs text-mist"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] mr-2 animate-pulse"></span> {dict.systemsOperational}</div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{dict.col1}</h4>
            <ul className="flex flex-col gap-3 text-sm text-mist">
              <li><a href={issuerHref('/')} className={linkClass}>{dict.col1Item1}</a></li>
              <li><Link href="#how-it-works" className={linkClass}>{hDict.howItWorks}</Link></li>
              <li><Link href="#pilot" className={linkClass}>{hDict.pilot}</Link></li>
              <li><Link href="#faq" className={linkClass}>{hDict.faq}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{dict.col2}</h4>
            <ul className="flex flex-col gap-3 text-sm text-mist">
              <li><Link href="/docs/smart-contracts" className={linkClass}>{dict.col2Item1}</Link></li>
              <li><Link href="/docs" className={linkClass}>{dict.col2Item2}</Link></li>
              <li><Link href="/docs/hashing" className={linkClass}>{dict.col2Item3}</Link></li>
              <li className="mt-2 flex items-center"><span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] mr-2 animate-pulse"></span><span className="text-white">{dict.status}</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{dict.col3}</h4>
            <ul className="flex flex-col gap-3 text-sm text-mist">
              <li>{dict.col3Item1}</li>
              <li>{dict.col3Item2}</li>
              <li className="mt-2"><a href="mailto:khoi.nguyen@ucyield.com" className={linkClass}>khoi.nguyen@ucyield.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t border-line text-xs text-mist">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span>{dict.bottom1}</span>
            <span className="hidden sm:inline">·</span>
            <span>{dict.bottom2}</span>
          </div>
          <div><Link href="#top" className={linkClass}>{dict.bottom3}</Link></div>
        </div>
        <div className="text-center text-xs text-mist/60 pt-6 border-t border-line">
          {dict.footnote}
        </div>
      </div>
    </footer>
  );
}
