import { createClient } from "@/lib/supabase/server"
import MortgageRefiPivot from "@/components/mortgage-refi-pivot"
import { ShieldCheck, Landmark, AlertTriangle, HelpCircle, LayoutGrid, Wind, TrendingUp, Lock, Info } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

/** * BING SEO HARDENING: 
 * Replaces 'force-dynamic' with 'force-static' to resolve Cache-Control errors.
 * This ensures the page is pre-rendered and served from the Edge cache.
 */
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 Hours

export const metadata: Metadata = {
  title: "Mortgage Refi Pivot Point Calculator | 2026 Terminal",
  description: "Determine your mortgage refinance break-even point with institutional-grade lifecycle cost of debt modeling. Optimized for 2026 amortized resets.",
  alternates: {
    /* FIXED: Using relative path to resolve the Bing Canonical Error */
    canonical: './',
  },
}

export default async function MortgageRefiPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12 bg-black min-h-screen">
      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-4">
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e]">Module 01: Debt Architecture</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-white">
          Mortgage <span className="text-[#22c55e]">Refi Pivot</span> Point
        </h1>
        
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic text-center">
          Analyze the mathematical intersection where refinancing costs offset interest savings. Optimized for 2026 amortized resets.
        </p>
      </div>

      {/* 2. ADVISORY NOTICE */}
      <div className="max-w-5xl mx-auto mb-12 bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4 text-left">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black uppercase">Advisory Notice:</span> This terminal is an educational simulation engine. 
          Outputs are mathematical projections and <span className="text-white underline decoration-red-500/50 underline-offset-4 uppercase">not professional financial advice</span>.
        </p>
      </div>

      {/* 3. CALCULATOR SECTION */}
      <div className="max-w-5xl mx-auto">
        <section className="space-y-4 mb-12">
          <div className="flex items-center gap-3 ml-2 text-left">
            <Landmark className="h-4 w-4 text-zinc-500" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 font-mono">Lifecycle Cost of Debt Analysis</h2>
          </div>
          <MortgageRefiPivot />
        </section>

        {/* 4. SEMANTIC CONTENT SECTION (Font updated to White) */}
        <section className="py-12 border-t border-white/5 text-left">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">How our models work</h3>
            </div>
            {/* UPDATED: text-zinc-500 replaced with text-white for elite visual weight */}
            <p className="text-[11px] text-white font-bold leading-relaxed uppercase text-justify tracking-tighter">
              Most bank calculators only show monthly savings. The Newston Terminal calculates the <span className="text-white font-black uppercase">Total Lifecycle Cost of Debt</span>. 
              Our Mortgage Pivot tool factors in amortized interest resets, time-value of money, and closing costs to find your true break-even point in the 2026 rate environment.
            </p>
          </div>
        </section>

        {/* 5. CONVERSION BRIDGE (Synchronized Bottom Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-white/5 text-left">
          
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

        {/* 6. INSTITUTIONAL DISCLOSURE */}
        <section className="mt-4 border-t border-white/5 pt-12 pb-8 text-left">
          <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4">
            <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
            <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
              <span className="text-[#22c55e]">Institutional Disclosure:</span> This calculator uses mathematical models based on user-provided inputs. All projections are for educational purposes. Execution of capital decisions should be made with a certified financial advisor.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
