import { createClient } from "@/lib/supabase/server"
import MortgageRefiPivot from "@/components/mortgage-refi-pivot"
import TaxExemptWealthGap from "@/components/tax-exempt-wealth-gap"
import { MacroBar } from "@/components/macro-bar"
import { ShieldCheck, Landmark, TrendingUp, AlertTriangle, HelpCircle } from "lucide-react"
import type { Metadata } from "next"

export const dynamic = 'force-dynamic'

// 1. PAGE-SPECIFIC SEO METADATA
export const metadata: Metadata = {
  title: "Free 2026 Mortgage Refi & Wealth Decision Tools",
  description: "Institutional-grade financial calculators. Project your Mortgage Refi Pivot point and Tax-Exempt Wealth Gap with real-time 2026 fiscal models.",
  keywords: ["free refi calculator", "mortgage break even tool", "tax drag simulator", "wealth gap analysis", "2026 mortgage rates"],
}

export default async function AnalysisTerminal() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <div className="w-full border-b border-white/10 mt-16">
        <MacroBar />
      </div>

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* SECTION HEADER */}
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-1 flex items-center gap-2">
              <ShieldCheck className="h-3 w-3 text-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Intelligence Terminal</span>
            </div>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
            Financial <span className="text-primary">Decision Models</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
            Institutional-grade simulations applied to 2026 fiscal parameters. Select a module to project capital efficiency.
          </p>
        </div>

        {/* 2. ADVISORY NOTICE (Crucial for YMYL SEO) */}
        <div className="max-w-5xl mx-auto mb-12 bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
            <span className="text-red-500 font-black">Advisory Notice:</span> This terminal is an educational simulation engine. 
            Outputs are mathematical projections and <span className="text-white underline decoration-red-500/50 underline-offset-4">not professional financial advice</span>. 
            Consult with a certified professional before executing capital decisions.
          </p>
        </div>

        {/* CALCULATOR GRID */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12">
          
          <section className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <Landmark className="h-4 w-4 text-zinc-500" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Module 01: Debt Refinancing Pivot</h2>
            </div>
            <MortgageRefiPivot />
          </section>

          <div className="h-px bg-white/5 w-full" />

          <section className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <TrendingUp className="h-4 w-4 text-zinc-500" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Module 02: Capital Appreciation & Tax Drag</h2>
            </div>
            <TaxExemptWealthGap />
          </section>

          {/* 3. SEMANTIC SEO CONTENT SECTION (Helps Ranking) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 py-12 border-t border-white/5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-black uppercase tracking-widest italic">How our models work</h3>
              </div>
              <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase">
                Most bank calculators only show monthly savings. The Newston Terminal calculates the <span className="text-white">Total Lifecycle Cost of Debt</span>. 
                Our Mortgage Pivot tool factors in amortized interest resets and closing costs to find your true break-even point.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-black uppercase tracking-widest italic">The Tax Drag Factor</h3>
              </div>
              <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase">
                Tax-exempt wealth strategies are often overlooked. By simulating <span className="text-white">Annual Tax Leakage</span>, 
                our Module 02 highlights the compounding "Alpha" generated purely through structural efficiency rather than market performance.
              </p>
            </div>
          </section>

          {/* --- FULL LEGAL PROTOCOL SECTION --- */}
          <section className="mt-4 border-t border-white/5 pt-12 pb-8">
            <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-2 w-2 rounded-full bg-zinc-700" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                  Legal Protocol & Institutional Disclosure
                </h4>
              </div>
              <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider text-justify">
                The Newston Intelligence Terminal and its associated modules are strictly for <span className="text-zinc-300 underline underline-offset-4 decoration-zinc-800">educational and illustrative purposes</span>. 
                The simulations provided do not constitute professional financial, tax, or legal advice. 
                All projections are mathematical models based on user-provided inputs and market data; they are not guarantees of performance or specific bank offers. 
                The Newston assumes no liability for financial actions taken based on these terminal simulations.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-8 border-t border-white/5 mt-12 text-center bg-black">
        <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em]">
          All data processed via encrypted terminal session • SEC 2026 Compliance standards applied
        </p>
      </footer>
    </div>
  )
}
