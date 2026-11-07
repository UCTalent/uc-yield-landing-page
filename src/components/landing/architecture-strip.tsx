"use client";
import { useState } from 'react';
import { Layers, Zap, Radio, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LEDGER_BASESCAN_URL } from '@/constants/urls';

export function ArchitectureStrip() {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    { title: 'Hashing Engine', icon: Layers, desc: 'Off-chain aggregation' },
    { title: 'ShadowLedgerV3', icon: Zap, desc: 'Smart Contract' },
    { title: 'Verification', icon: Radio, desc: 'UCYield verifier (Phase 1)' },
    { title: 'Basescan', icon: Search, desc: 'Public Verification' }
  ];

  const codeSnippets = [
    '<span class="text-[#FF7B72]">import</span> { <span class="text-[#D2A8FF]">keccak256</span> } <span class="text-[#FF7B72]">from</span> <span class="text-[#A5D6FF]">"viem"</span>;\n<span class="text-[#FF7B72]">const</span> <span class="text-[#79C0FF]">root</span> <span class="text-[#FF7B72]">=</span> <span class="text-[#D2A8FF]">computeMerkleRoot</span>(leaves);',
    '<span class="text-[#FF7B72]">function</span> <span class="text-[#D2A8FF]">commitBatch</span>(<span class="text-[#FF7B72]">CommitInput[]</span> <span class="text-[#79C0FF]">items</span>) <span class="text-[#FF7B72]">external</span> {\n  <span class="text-[#D2A8FF]">require</span>(<span class="text-[#D2A8FF]">hasRole</span>(ISSUER_ROLE));\n  <span class="text-[#8B949E]">...</span>\n}',
    '<span class="text-[#FF7B72]">function</span> <span class="text-[#D2A8FF]">markVerified</span>(<span class="text-[#FF7B72]">uint256</span> <span class="text-[#79C0FF]">id</span>, <span class="text-[#FF7B72]">bytes32</span> <span class="text-[#79C0FF]">root</span>, <span class="text-[#FF7B72]">bytes32</span> <span class="text-[#79C0FF]">receipt</span>) <span class="text-[#FF7B72]">external</span> {\n  <span class="text-[#D2A8FF]">require</span>(<span class="text-[#D2A8FF]">hasRole</span>(VERIFIER_ROLE));\n  <span class="text-[#D2A8FF]">emit</span> <span class="text-[#D2A8FF]">RecordVerified</span>(id, root, receipt, msg.sender);\n}',
    `<span class="text-[#8B949E]">View on Basescan:</span>\n<a class="text-[#79C0FF] underline break-all" href="${LEDGER_BASESCAN_URL}" target="_blank" rel="noopener noreferrer">${LEDGER_BASESCAN_URL}</a>`
  ];

  return (
    <div className="w-full mt-12 bg-card/40 border border-line rounded-[20px] p-6">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 relative mb-6">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-line -translate-y-1/2 z-0"></div>
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeTab === i;
          return (
            <button 
              key={i} 
              role="tab"
              onClick={() => setActiveTab(i)}
              aria-selected={isActive}
              className={`relative z-10 flex flex-col items-center gap-3 cursor-pointer w-full md:w-1/4 transition-all ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'bg-abyss border-cyan text-cyan shadow-[0_0_16px_rgba(0,212,255,0.4)]' : 'bg-abyss border-line text-mist'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className={`font-display font-bold text-sm ${isActive ? 'text-ice' : 'text-mist'}`}>{step.title}</div>
                <div className="text-[11px] text-mist/70">{step.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="bg-abyss border border-line rounded-xl p-4 min-h-[100px] flex items-center justify-center font-mono text-[13px] text-ice">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="m-0 whitespace-pre-wrap text-center md:text-left text-ice"
            dangerouslySetInnerHTML={{ __html: codeSnippets[activeTab] }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
