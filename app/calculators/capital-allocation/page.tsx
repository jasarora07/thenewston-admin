import { ShieldCheck, PieChart, AlertTriangle, HelpCircle, LayoutGrid, Wind, Landmark, Info, TrendingUp, Lock } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import AllocationTerminal from "@/components/calculators/allocation-terminal"

/** * BING SEO HARDENING: 
 * Replaces dynamic rendering with static generation to resolve cache header errors.
 * Ensures 'x-vercel-cache: HIT' and removes 'no-cache' flags.
 */
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 Hours

export const metadata: Metadata = {
  title: "Strategic Capital Allocation Engine | 2026 Terminal",
  description: "Model the wealth gap between taxable brokerage accounts and tax-exempt Roth structures. Project capital gains drag and dividend leakage.",
  keywords: ["Roth vs Brokerage", "Capital Gains Tax Calculator", "Tax Drag Model", "2026 Investment Strategy"],
  alternates: {
    /* FIXED: Using relative path to resolve the Bing Canonical Error */
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
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic text-center">
          Quantify the long-term divergence between taxable and tax-exempt capital growth. Optimized for 2026 capital gains parameters.
        </p>
      </div>

      {/* 2. THE CALCULATOR TERMINAL */}
      <div className="max-w-6xl mx-auto mb-20">
        <AllocationTerminal />
      </div>

      {/* 3. INTELLIGENCE BRIEFING (Semantic Content) */}
      <section className="max-w-5xl mx-auto py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Dividend & Interest Friction</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify tracking-tighter">
              In a taxable brokerage, every dividend payment creates a <span className="text-white font-black">Taxable Event</span>. 
              This engine models "Dividend Drag," where annual tax payments on distributions reduce the principal available for compounding, 
              leading to significant wealth decay over a 10-20 year horizon.
            </p>
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 text-left">
              <TrendingUp className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Capital Gains Exit Velocity</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify tracking-tighter">
              The true "Wealth Gap" is often hidden until the point of liquidation. By accounting for <span className="text-white font-black">Deferred Capital Gains Liabilities</span>, 
              this model reveals the actual net liquidity of a taxable portfolio versus the raw, uninhibited exit velocity of a Roth or Tax-Exempt structure.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CONVERSION BRIDGE (Synchronized Bottom Cards) */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5 text-left">
        
        {/* CARD 01: HUB */}
        <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <LayoutGrid className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Decision Models</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Return to the full suite of institutional intelligence engines.</p>
        </Link>
        
        {/* CARD 02: CONSULT ADVISOR (Locked/Coming Soon State) */}
        <div className="relative p-6 bg-zinc-900/10 border border-white/5 rounded-xl cursor-not-allowed group text-left">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="h-3.5 w-3.5 text-zinc-500" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none">Consult Advisor</h3>
          </div>
          <p className="text-[9px] text-zinc-600 uppercase font-bold mb-4">Direct integration with verified CPAs and Fiduciaries.</p>
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-black text-[#22c55e] uppercase tracking-[0.2em] animate-pulse">
            Feature Pending // 2026
          </div>
        </div>

        {/* CARD 03: PARTNER PROTOCOL */}
        <Link href="/partnership" className="group p-6 bg-[#22c55e]/5 border border-[#22c55e]/20 hover:border-[#22c55e] transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3 text-left">
            <ShieldCheck className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none italic">Become a Partner</h3>
          </div>
          <p className="text-[9px] text-[#22c55e] uppercase font-black text-left">Apply for firm-level integration into the Newston Terminal.</p>
        </Link>
      </section>

      {/* 5. INSTITUTIONAL DISCLOSURE */}
      <section className="max-w-5xl mx-auto mt-4 border-t border-white/5 pt-12 pb-8 text-left">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4">
          <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
            <span className="text-[#22c55e]">Institutional Disclosure:</span> Projections assume current 2026 capital gains tax brackets and dividend rules. 
            The Newston Terminal does not provide investment advice or CPA-level tax verification. 
            All capital allocation decisions should be reviewed by a certified financial planner.
          </p>
        </div>
      </section>
    </main>
  )
}
