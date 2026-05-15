import { ShieldCheck, Info, HelpCircle, TrendingUp, AlertTriangle, LayoutGrid, Lock } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import EquityCalculatorTerminal from "@/components/calculators/equity-terminal"

/** * BING SEO HARDENING: 
 * Ensures 'x-vercel-cache: HIT' and public visibility for crawlers.
 */
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 Hours

export const metadata: Metadata = {
  title: "Home Equity & HELOC Liquidity Engine | 2026 Terminal",
  description: "Calculate safe home equity withdrawal limits and compare HELOC vs. Cash-out Refinance blended rates using real-time market data.",
  keywords: ["HELOC vs Refi", "Home Equity Calculator", "Blended Interest Rate", "2026 Mortgage Trends"],
  alternates: {
    canonical: './',
  },
}

export default function HomeEquityPage() {
  return (
    <main className="container mx-auto px-4 py-12 bg-black min-h-screen">
      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-4">
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e]">Module 03: Liquidity Engine</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
          Equity <span className="text-[#22c55e]">Liquidity</span> Engine
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic text-center">
          Contrast weighted average costs of capital against unified replacement debt. Optimized for the 2026 high-equity environment.
        </p>
      </div>

      {/* 2. ADVISORY NOTICE (Positioned exactly as in Capital Allocation) */}
      <div className="max-w-5xl mx-auto mb-12 bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4 text-left">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black uppercase">Advisory Notice:</span> This terminal is an institutional simulation engine. Projections are mathematical and <span className="text-white underline decoration-red-500/50 underline-offset-4 uppercase">NOT professional financial advice</span>.
        </p>
      </div>

      {/* 3. THE CALCULATOR TERMINAL */}
      <div className="max-w-6xl mx-auto mb-20">
        <EquityCalculatorTerminal />
      </div>

      {/* 4. CONVERSION BRIDGE (Standardized with Decision Models footer) */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5 text-left">
        
        {/* CARD 01: HUB */}
        <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <LayoutGrid className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Decision Models</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold text-left">Return to the full suite of institutional intelligence engines.</p>
        </Link>
        
        {/* CARD 02: CONSULT ADVISOR (Standardized Locked State) */}
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

      {/* 5. INSTITUTIONAL DISCLOSURE (Standardized terminology) */}
      <section className="max-w-5xl mx-auto border-t border-white/5 pt-12 pb-8 text-left">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl flex items-start gap-4">
          <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
            <span className="text-[#22c55e]">Institutional Disclosure:</span> This calculator uses mathematical models based on user-provided inputs. All projections are for educational purposes. Execution of capital decisions should be made with a certified financial advisor.
          </p>
        </div>
      </section>
    </main>
  )
}
