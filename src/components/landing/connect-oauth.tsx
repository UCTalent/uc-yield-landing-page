"use client";
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';
import { User, Wrench, Check, MousePointer2, Sun, Layers, FileText, Database, Settings, ShieldCheck } from 'lucide-react';
import { Reveal } from '../motion/reveal';
import { SectionHeading } from './section-heading';
import { SpotlightCard } from './spotlight-card';

const STEPS = 5;
const STEP_MS = 5600;
type D = { d: any; step: number };

// Moves a pointer onto the element marked data-target, then "presses" it.
function useScene(step: number, wait: number) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState<{ x: number; y: number } | null>(null);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [setTimeout(() => setPressed(false), 0)];
    timers.push(setTimeout(() => {
      const root = rootRef.current;
      if (!root) return;
      const b = root.getBoundingClientRect();
      const el = root.querySelector('[data-target]');
      if (!el) return setCur({ x: b.width - 30, y: b.height - 30 });
      const r = el.getBoundingClientRect();
      setCur({ x: r.left - b.left + r.width * 0.6, y: r.top - b.top + r.height * 0.6 });
      timers.push(setTimeout(() => setPressed(true), 900));
    }, wait));
    return () => timers.forEach(clearTimeout);
  }, [step, wait]);
  return { rootRef, cur, pressed };
}

/* ───────────── Owner: a phone, finger taps, soft cyan glass ───────────── */
const pill = 'rounded-full bg-gradient-to-r from-base to-cyan text-white text-sm font-semibold px-5 py-3 text-center shadow-[0_6px_20px_rgba(0,82,255,0.4)]';
const metricsList = (d: any) => [[d.uiPV, '1,284 kWh'], [d.uiInv, '1,301 kWh'], [d.uiCap, '49 kW']];

function PhoneScreen({ d, step }: D) {
  const { rootRef, cur, pressed } = useScene(step, 450);
  const press = pressed ? 'scale-95' : '';
  const huawei = step === 1;
  const stages = [d.uiAnchoring, d.uiAnchored, d.uiVerified];
  const scene: ReactNode = [
    <div key="0" className="flex flex-col gap-3 pt-4">
      <p className="text-ice text-sm font-semibold">{d.uiSelectProvider}</p>
      <div className="flex items-center gap-3 rounded-2xl border border-cyan/40 bg-cyan/10 px-3 py-3 text-sm text-white"><Sun className="w-5 h-5 text-cyan" /> {d.uiHuawei}</div>
      <div data-target className={`${pill} mt-3 transition-transform ${press}`}>{d.uiOAuthBtn}</div>
    </div>,
    <div key="1" className="absolute inset-x-0 bottom-0 top-4 flex flex-col justify-end">
      <motion.div initial={{ y: 40 }} animate={{ y: 0 }} transition={{ duration: 0.3 }} className="rounded-t-[26px] bg-white/[0.07] border-t border-white/15 backdrop-blur p-5 flex flex-col gap-3">
        <span className="mx-auto w-10 h-1 rounded-full bg-white/20" />
        <p className="flex items-center gap-2 text-xs text-mist"><User className="w-4 h-4 text-cyan" /> {d.uiSignedIn}</p>
        <p className="text-white text-[15px] font-semibold leading-snug">{d.uiAsk}</p>
        {[d.uiScope1, d.uiScope2].map((x: string) => <p key={x} className="flex items-center gap-2 text-xs text-ice"><Check className="w-3.5 h-3.5 text-[#22C55E]" /> {x}</p>)}
        <div data-target className={`${pill} mt-1 transition-transform ${press}`}>{d.uiAllow}</div>
        <span className="text-center text-xs text-mist">{d.uiCancel}</span>
      </motion.div>
    </div>,
    <div key="2" className="flex flex-col gap-3 pt-4">
      <p className="text-ice text-sm font-semibold">{d.uiPlants}</p>
      <div className="flex items-center gap-3 rounded-2xl border border-cyan/40 bg-cyan/10 px-3 py-2.5 text-sm text-white"><Sun className="w-4 h-4 text-cyan" /> Sunrise Rooftop <Check className="w-4 h-4 text-cyan ml-auto" /></div>
      <p className="flex justify-between text-xs text-mist"><span>{d.uiMonthLbl}</span><span className="text-ice font-mono">2026-09</span></p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-center gap-1.5 text-xs text-[#22C55E]"><Check className="w-3.5 h-3.5" /> {d.uiSampleOk}</motion.p>
      <div data-target className={`${pill} mt-2 transition-transform ${press}`}>{d.uiSaveFetch}</div>
      {pressed && <p className="text-center text-xs text-mist animate-pulse">{d.uiFetching}…</p>}
    </div>,
    <div key="3" className="flex flex-col gap-3 pt-4">
      <p className="flex items-center justify-between text-xs"><span className="text-white font-semibold">Sunrise Rooftop · 2026-09</span>
        <span className={`px-2.5 py-1 rounded-full border ${pressed ? 'border-cyan text-cyan bg-cyan/10' : 'border-gold/50 text-gold bg-gold/10'}`}>{pressed ? d.uiAnchoring : d.uiWaiting}</span></p>
      <div className="rounded-2xl bg-white/5 border border-white/10 divide-y divide-white/10">
        {metricsList(d).map(([k, v]) => <p key={k} className="flex justify-between px-3 py-2.5 text-xs"><span className="text-mist">{k}</span><span className="text-white font-mono">{v}</span></p>)}
      </div>
      <div data-target className={`${pill} mt-2 transition-transform ${press}`}>{d.uiAnchorBtn}</div>
    </div>,
    <div key="4" className="flex flex-col items-center gap-3 pt-6">
      <div className="w-full flex flex-col gap-2">
        {stages.map((x: string, i: number) => (
          <motion.p key={x} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 1.2 }} className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-ice"><Check className="w-4 h-4 text-[#22C55E]" /> {x}</motion.p>))}
      </div>
      <motion.div initial={{ opacity: 0, scale: 2 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 3.9 }}
        className="mt-3 w-24 h-24 rounded-full border-[3px] border-[#22C55E] bg-[#22C55E]/10 flex flex-col items-center justify-center text-[#22C55E] shadow-[0_0_40px_rgba(34,197,94,0.35)]">
        <ShieldCheck className="w-8 h-8" /><span className="text-[10px] font-bold tracking-widest mt-1">BASE</span>
      </motion.div>
    </div>,
  ][step];

  return (
    <div className="mx-auto w-[240px] h-[440px] rounded-[38px] border-[6px] border-white/15 bg-gradient-to-b from-[#0B1B3D] to-[#050B1A] shadow-[0_20px_60px_rgba(0,82,255,0.25)] relative overflow-hidden">
      <span className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black z-20" />
      <div className="absolute top-8 inset-x-0 z-10 flex justify-center">
        <span className="flex items-center gap-1.5 text-[10px] text-mist px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{huawei ? <Sun className="w-3 h-3 text-cyan" /> : <Layers className="w-3 h-3 text-cyan" />}{huawei ? 'Huawei FusionSolar' : 'UCYield'}</span>
      </div>
      <div ref={rootRef} className="absolute inset-0 pt-[68px] px-4 pb-6">
        <motion.div key={step} className="relative h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{scene}</motion.div>
        <motion.div className="absolute top-0 left-0 pointer-events-none z-30 -ml-4 -mt-4" initial={false}
          animate={cur ? { x: cur.x, y: cur.y, opacity: 1, scale: pressed ? 0.8 : 1 } : { x: 120, y: 360, opacity: 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
          <span className="block w-8 h-8 rounded-full bg-white/30 border border-white/70 backdrop-blur-sm" />
          {pressed && <motion.span key={step} className="absolute inset-0 rounded-full border border-cyan" initial={{ scale: 1, opacity: 0.9 }} animate={{ scale: 2.6, opacity: 0 }} transition={{ duration: 0.6 }} />}
        </motion.div>
      </div>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/30 z-20" />
    </div>
  );
}

/* ───────────── API account: an issuer console, gold, mono, keyboard + cursor ───────────── */
const key = 'bg-gold text-abyss font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 text-center';
const cell = 'px-3 py-2 border-b border-white/10';

function ConsoleScreen({ d, step }: D) {
  const { rootRef, cur, pressed } = useScene(step, step === 0 ? 2600 : 450);
  const press = pressed ? 'translate-y-px brightness-90' : '';
  const caret = <span className="inline-block w-[7px] h-3.5 bg-gold align-middle animate-pulse" />;
  const crumbs = ['data sources / add', 'data sources / add / plants', 'data sources / add / sample', 'review queue', 'records / status'];
  const stages = [d.uiAnchoring, d.uiAnchored, d.uiVerified];
  const scene: ReactNode = [
    <div key="0" className="flex flex-col gap-3 max-w-sm">
      <label className="block">
        <span className="block font-mono text-[10px] uppercase tracking-widest text-mist mb-1">{d.uiProviderUrl}</span>
        <span className="flex items-center border border-white/10 bg-black/40 px-3 h-9 font-mono text-xs text-mist truncate">https://sg5.fusionsolar.huawei.com</span>
      </label>
      {[[d.uiUsername, 'sunrise_api', 11, 0.4], [d.uiPassword, '••••••••', 8, 1.4]].map(([l, v, ch, dl]) => (
        <label key={l as string} className="block">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-mist mb-1">{l}</span>
          <span className="flex items-center border border-gold/40 bg-black/40 px-3 h-9 font-mono text-sm text-ice">
            <motion.span className="overflow-hidden whitespace-nowrap" initial={{ width: 0 }} animate={{ width: `${ch}ch` }} transition={{ duration: 0.9, delay: dl as number, ease: 'linear' }}>{v}</motion.span>{caret}
          </span>
        </label>))}
      <div data-target className={`${key} w-fit transition-all ${press}`}>{d.uiCheckAccount}</div>
    </div>,
    <div key="1" className="text-sm">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#22C55E] mb-2">{d.uiConnected}</p>
      <div className="border border-white/10 font-mono text-xs">
        <div className="grid grid-cols-[1fr_60px_24px] bg-white/5 text-mist uppercase tracking-wider"><span className={cell}>Plant</span><span className={cell}>kW</span><span className={cell} /></div>
        <div data-target className={`grid grid-cols-[1fr_60px_24px] items-center transition-colors ${pressed ? 'bg-gold/15 text-white' : 'text-ice'}`}><span className={cell}>Sunrise Rooftop</span><span className={cell}>49</span><span className={cell}>{pressed && <Check className="w-3.5 h-3.5 text-gold" />}</span></div>
        <div className="grid grid-cols-[1fr_60px_24px] text-mist"><span className={cell}>Riverside Carport</span><span className={cell}>120</span><span className={cell} /></div>
      </div>
      <p className="mt-4 flex justify-between font-mono text-xs text-mist border border-white/10 px-3 py-2"><span>{d.uiMonthLbl}</span><span className="text-ice">2026-09</span></p>
    </div>,
    <div key="2" className="flex flex-col gap-3 font-mono text-xs">
      {[d.uiCheckData, d.uiSampleOk].map((l: string, i: number) => <motion.p key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.8 }} className="flex items-center gap-2 text-ice"><Check className="w-3.5 h-3.5 text-[#22C55E]" /> {l}</motion.p>)}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-mist">{d.uiMetrics}: pv_yield_kwh, inverter_yield_kwh, reported_capacity_kw</motion.p>
      <div data-target className={`${key} w-fit mt-1 transition-all ${press}`}>{d.uiSaveFetch}</div>
      {pressed && <><div className="flex gap-1">{Array.from({ length: 12 }, (_, i) => <motion.span key={i} className="h-2.5 flex-1 bg-white/10" animate={{ backgroundColor: '#FFC531' }} transition={{ delay: 0.3 + i * 0.12, duration: 0.15 }} />)}</div><p className="text-mist">{'> '}{d.uiFetching}…</p></>}
    </div>,
    <div key="3" className="font-mono text-xs">
      <div className="grid grid-cols-[1fr_70px_130px] bg-white/5 text-mist uppercase tracking-wider border border-white/10"><span className={cell}>Plant</span><span className={cell}>Month</span><span className={cell}>State</span></div>
      <div className="grid grid-cols-[1fr_70px_130px] border-x border-white/10 text-ice"><span className={cell}>Sunrise Rooftop</span><span className={cell}>2026-09</span>
        <span className={`${cell} ${pressed ? 'text-cyan' : 'text-gold'}`}>{pressed ? d.uiAnchoring : d.uiWaiting}</span></div>
      <div className="border border-white/10 mt-3 divide-y divide-white/10">
        {metricsList(d).map(([k, v]) => <p key={k} className="flex justify-between px-3 py-2"><span className="text-mist">{k}</span><span className="text-ice">{v}</span></p>)}
      </div>
      <div data-target className={`${key} w-fit mt-4 transition-all ${press}`}>{d.uiAnchorBtn}</div>
    </div>,
    <div key="4" className="flex flex-col gap-3 font-mono text-xs">
      <div className="border border-white/10">
        {stages.map((x: string, i: number) => (
          <motion.p key={x} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 1.2 }} className={`${cell} flex items-center gap-2 text-ice`}><Check className="w-3.5 h-3.5 text-[#22C55E]" /> {x}</motion.p>))}
      </div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.9 }} className="relative border border-dashed border-gold/60 bg-gold/[0.06] p-4 text-ice mt-1">
        <p className="text-gold uppercase tracking-widest text-[10px] mb-2">{d.uiReceipt}</p>
        <p>root&nbsp; 0x9f…c41d</p><p>chain Base Sepolia</p>
        <span className="absolute -right-2 -bottom-3 -rotate-6 border-2 border-[#22C55E] bg-abyss text-[#22C55E] font-bold tracking-widest px-2 py-1">{d.uiStamp}</span>
      </motion.div>
    </div>,
  ][step];

  return (
    <div ref={rootRef} className="relative h-[440px] border border-gold/25 bg-[#07090F] overflow-hidden grid grid-cols-[44px_1fr] shadow-[0_20px_60px_rgba(255,197,49,0.06)]">
      <div className="border-r border-white/10 bg-black/40 flex flex-col items-center gap-4 pt-4 text-mist">
        <Layers className="w-4 h-4 text-gold" /><Database className="w-4 h-4" /><FileText className="w-4 h-4" /><Settings className="w-4 h-4" />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="px-4 py-2.5 border-b border-white/10 font-mono text-[11px] text-mist truncate">UCYield · {crumbs[step]}</div>
        <motion.div key={step} className="p-5 flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>{scene}</motion.div>
      </div>
      <motion.div className="absolute top-0 left-0 text-white pointer-events-none z-30" initial={false}
        animate={cur ? { x: cur.x, y: cur.y, opacity: 1 } : { x: 300, y: 380, opacity: 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
        <MousePointer2 className="w-5 h-5 fill-white" />
      </motion.div>
    </div>
  );
}

export function ConnectOAuth({ dict }: { dict: any }) {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS), STEP_MS);
    return () => clearInterval(t);
  }, [inView]);

  const cols = [
    { who: 'owner', Icon: User, Screen: PhoneScreen, accent: 'text-cyan', bar: 'bg-cyan' },
    { who: 'api', Icon: Wrench, Screen: ConsoleScreen, accent: 'text-gold', bar: 'bg-gold' },
  ] as const;

  return (
    <section id="connect" className="py-20 md:py-28 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.subtitle} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cols.map(({ who, Icon, Screen, accent, bar }, i) => (
            <Reveal key={who} delay={0.1 + i * 0.1}>
              <SpotlightCard className="p-6 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${accent}`}><Icon className="w-5 h-5" /></span>
                  <div><h3 className="text-lg font-display font-bold leading-tight">{dict[`${who}Title`]}</h3><p className="text-xs text-mist">{dict[`${who}Sub`]}</p></div>
                </div>
                <Screen d={dict} step={step} />
                <div className="mt-6 min-h-[72px]">
                  <div className="flex gap-1.5 mb-3">
                    {Array.from({ length: STEPS }, (_, n) => <span key={n} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${n <= step ? bar : 'bg-white/10'}`} />)}
                  </div>
                  <motion.p key={`${who}${step}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-ice leading-relaxed">{dict[`${who}${step + 1}`]}</motion.p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-mist/70 text-center mt-6">{dict.note}</p>
      </div>
    </section>
  );
}
