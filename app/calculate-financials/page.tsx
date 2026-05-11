import { createClient } from "@/lib/supabase/server"
import MortgageRefiPivot from "@/components/mortgage-refi-pivot"
import TaxExemptWealthGap from "@/components/tax-exempt-wealth-gap"
import { MacroBar } from "@/components/macro-bar"
import { ShieldCheck, Calculator, Landmark, TrendingUp } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AnalysisTerminal() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* 1. Header Margin Fix for MacroBar */}
      <div className="w-full border-b border-white/10 mt-16">
        <MacroBar />
      </div>

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* SECTION HEADER */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
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

        {/* CALCULATOR GRID */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12">
          
          {/* MODULE 1: MORTGAGE PIVOT */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <Landmark className="h-4 w-4 text-zinc-500" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Module 01: Debt Refinancing</h3>
            </div>
            <MortgageRefiPivot />
          </section>

          <div className="h-px bg-white/5 w-full" />

          {/* MODULE 2: TAX GROWTH */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <TrendingUp className="h-4 w-4 text-zinc-500" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Module 02: Capital Appreciation</h3>
            </div>
            <TaxExemptWealthGap />
          </section>

        </div>
      </main>

      {/* SYSTEM FOOTNOTE */}
      <footer className="py-8 border-t border-white/5 mt-12 text-center">
        <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em]">
          All data processed via encrypted terminal session • SEC 2026 Compliance standards applied
        </p>
      </footer>
    </div>
  )
}
