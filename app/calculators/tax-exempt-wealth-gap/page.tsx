import { ShieldCheck, TrendingUp, HelpCircle, LayoutGrid, Wind, Landmark, Lock, Info } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import TaxExemptWealthGap from "@/components/tax-exempt-wealth-gap"

/** * BING SEO HARDENING: 
 * Ensures 'force-static' for Edge cache performance and 'HIT' headers.
 */
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 Hours

export const metadata: Metadata = {
  title: "Tax-Exempt Wealth Gap & Drag Simulator | 2026 Terminal",
  description: "Simulate annual tax leakage and project the 'Alpha' generated through tax-exempt wealth strategies. Analyze capital appreciation efficiency for 2026.",
  keywords: ["tax drag simulator", "wealth gap analysis", "capital appreciation", "tax-exempt growth", "financial efficiency"],
  alternates: {
    /* FIXED: Using relative path to resolve the Bing Canonical Error */
    canonical: './',
  },
}

export default async function TaxWealthGapPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12 bg-black min-h-screen">
      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-4">
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e]">Module 02: Capital Efficiency</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white text-center">
          Tax <span className="text-[#22c55e]">Wealth Gap</span> Simulator
        </h1>
        
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic text-center">
          Project long-term capital erosion caused by annual tax drag. Identify the structural alpha of tax-advantaged wealth corridors.
        </p>
      </div>

      {/* 2. THE CALCULATOR TERMINAL (Advisory is rendered from the source component) */}
      <div className="max-w-5xl mx-auto mb-20">
        <section className="space-y-4 mb-12">
          <div className="flex items-center gap-3 ml-2 text-left">
            <TrendingUp className="h-4 w-4 text-zinc-500" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 font-mono">Structural Alpha & Tax Leakage Analysis</h2>
          </div>
          <TaxExemptWealthGap />
        </section>

        {/* 3. INTELLIGENCE BRIEFING (Consistent Commentary with White Font) */}
        <section className="py-12 border-t border-white/5 text-left">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Understanding Tax Drag</h3>
            </div>
            <p className="text-[11px] text-white font-bold leading-relaxed uppercase text-justify tracking-tighter">
              Tax drag is the silent inhibitor of compounding. When returns are taxed annually, the amount of capital available to generate future returns is diminished. 
              This module quantifies that loss over time, demonstrating how <span className="text-[#22c55e] font-black uppercase">Tax-Exempt Structural Alpha</span> can significantly outperform higher-yield taxable strategies.
            </p>
          </div>
        </section>

        {/* 4. CONVERSION BRIDGE (Synchronized Bottom Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5 text-left">
          
          {/* CARD 01: HUB */}
          <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <LayoutGrid className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Decision Models</h3>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold text-left">Return to the full suite of institutional intelligence engines.</p>
          </Link>
          
          {/* CARD 02: CONSULT ADVISOR (Locked State) */}
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
        <section className="mt-4 border-t border-white/5 pt-12 pb-8 text-left">
          <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4">
            <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
            <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
              <span className="text-[#22c55e]">Institutional Disclosure:</span> All projections are mathematical simulations based on current 2026 fiscal guidelines. The Newston Terminal does not provide tax advice. Users should consult with a CPA or tax professional regarding their specific liability.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
