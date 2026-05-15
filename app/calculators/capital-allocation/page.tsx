import { ShieldCheck, PieChart, HelpCircle, LayoutGrid, Wind, Info, TrendingUp, Lock, AlertTriangle } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import AllocationTerminal from "@/components/calculators/allocation-terminal"

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 Hours

export const metadata: Metadata = {
  title: "Strategic Capital Allocation Engine | 2026 Terminal",
  description: "Model the wealth gap between taxable brokerage accounts and tax-exempt Roth structures. Project capital gains drag and dividend leakage.",
  alternates: {
    canonical: './',
  },
}

export default function CapitalAllocationPage() {
  return (
    <main className="container mx-auto px-4 py-12 bg-black min-h-screen">
      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-4">
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e]">Module 04: Wealth Architecture</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
          Capital <span className="text-[#22c55e]">Allocation</span> Engine
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic">
          Quantify the long-term divergence between taxable and tax-exempt capital growth. Optimized for 2026 capital gains parameters.
        </p>
      </div>

      {/* 2. ADVISORY NOTICE */}
      <div className="max-w-5xl mx-auto mb-12 bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4 text-left">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black uppercase">Advisory Notice:</span> This terminal models structural tax alpha. Projections are mathematical simulations and <span className="text-white underline decoration-red-500/50 underline-offset-4 uppercase">NOT professional investment advice</span>.
        </p>
      </div>

      {/* 3. THE CALCULATOR TERMINAL */}
      <div className="max-w-6xl mx-auto mb-20">
        <AllocationTerminal />
      </div>

      {/* 4. INTELLIGENCE BRIEFING (Font updated to White) */}
      <section className="max-w-5xl mx-auto py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Dividend Friction</h3>
            </div>
            {/* UPDATED: text-white font applied here */}
            <p className="text-[11px] text-white font-bold leading-relaxed uppercase tracking-tighter">
              In a taxable brokerage, every dividend payment creates a <span className="text-white font-black uppercase underline decoration-[#22c55e]/30">Taxable Event</span>. This engine models "Dividend Drag" on compounding reserves.
            </p>
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Exit Velocity</h3>
            </div>
            {/* UPDATED: text-white font applied here */}
            <p className="text-[11px] text-white font-bold leading-relaxed uppercase tracking-tighter">
              Revealing the net liquidity of a taxable portfolio versus the raw, uninhibited exit velocity of a <span className="text-white font-black uppercase underline decoration-[#22c55e]/30">Tax-Exempt</span> structure.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CONVERSION BRIDGE */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5 text-left">
        <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <LayoutGrid className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Decision Models</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Return to the full suite of institutional intelligence engines.</p>
        </Link>
        
        <div className="relative p-6 bg-zinc-900/10 border border-white/5 rounded-xl cursor-not-allowed group">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="h-3.5 w-3.5 text-zinc-500" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none">Consult Advisor</h3>
          </div>
          <p className="text-[9px] text-zinc-600 uppercase font-bold mb-4">Direct integration with verified CPAs and Fiduciaries.</p>
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-black text-[#22c55e] uppercase tracking-[0.2em] animate-pulse">
            Feature Pending // 2026
          </div>
        </div>

        <Link href="/partnership" className="group p-6 bg-[#22c55e]/5 border border-[#22c55e]/20 hover:border-[#22c55e] transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none italic">Become a Partner</h3>
          </div>
          <p className="text-[9px] text-[#22c55e] uppercase font-black">Apply for firm-level integration into the Newston Terminal.</p>
        </Link>
      </section>

      {/* 6. INSTITUTIONAL DISCLOSURE */}
      <section className="max-w-5xl mx-auto mt-4 border-t border-white/5 pt-12 pb-8">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4 text-left">
          <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
            <span className="text-[#22c55e]">Institutional Disclosure:</span> Projections assume current 2026 fiscal parameters. This is a modular simulation and does not constitute formal tax or investment advice.
          </p>
        </div>
      </section>
    </main>
  )
}
