"use client";
import { useEffect, useState, useRef } from 'react';
import { useReducedMotion, useInView } from 'motion/react';
import { Check, Copy } from 'lucide-react';

export function CodeWindow({ dict }: { dict: Record<string, string> }) {
  const [copied, setCopied] = useState(false);
  const [displayedCode, setDisplayedCode] = useState("");
  const prefersReducedMotion = useReducedMotion();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const fullCode = `shadowLedger.commitData(
  assetType,      // "solar"
  projectId,      // "CAS-01"
  periodId,       // "2026/01 - 2026/06"
  root,           // 0x9f3a...c41d
  dataUriHash,    // keccak256(storageUri)
  schemaVersion   // "1.0.0"
);`;

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedCode(fullCode);
      return;
    }
    
    if (!isInView) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(fullCode.substring(0, i));
      i++;
      if (i > fullCode.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isInView, fullCode]);

  const copyCode = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tokenize = (line: string) => {
    let html = '';
    const commentIndex = line.indexOf('//');
    
    if (commentIndex !== -1) {
      const codePart = line.substring(0, commentIndex);
      const commentPart = line.substring(commentIndex);
      
      const highlightedCode = codePart
        .replace(/\bshadowLedger\b/g, '<span class="text-base">shadowLedger</span>')
        .replace(/\bcommitData\b/g, '<span class="text-gold">commitData</span>')
        .replace(/\broot\b/g, '<span class="text-cyan">root</span>');
        
      html += highlightedCode + '<span class="text-[#5B6B8C]">' + commentPart + '</span>';
    } else {
      html += line
        .replace(/\bshadowLedger\b/g, '<span class="text-base">shadowLedger</span>')
        .replace(/\bcommitData\b/g, '<span class="text-gold">commitData</span>')
        .replace(/\broot\b/g, '<span class="text-cyan">root</span>');
    }
    return html;
  };

  const highlightCode = (code: string) => {
    return code.split('\n').map(tokenize).join('\n');
  };

  return (
    <div ref={containerRef} className="bg-[#0D1117] border border-line rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
      <div className="bg-[#161B22] p-3 flex items-center border-b border-line">
        <div className="flex gap-1.5 mr-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="text-xs text-ice">commitData.sol</div>
        <button onClick={copyCode} className="ml-auto text-mist hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-6 font-mono text-[13px] leading-[1.7] overflow-x-auto min-h-[220px]">
        <pre className="m-0 text-ice" dangerouslySetInnerHTML={{ __html: highlightCode(displayedCode) + (displayedCode.length < fullCode.length ? '<span class="animate-pulse">_</span>' : '') }}></pre>
      </div>
      <div className="bg-[#161B22]/50 p-3 text-center text-xs text-mist border-t border-line flex items-center justify-between">
        <div className="flex items-center text-cyan"><span className="w-2 h-2 rounded-full bg-cyan animate-pulse mr-2"></span> listening</div>
        <div>
          {dict?.deployed || 'Deployed to'} <span className="font-mono">0x…</span> (Base Sepolia) · <span className="text-[#22C55E]">{dict?.verified || 'Verified'}</span>
        </div>
      </div>
    </div>
  );
}
