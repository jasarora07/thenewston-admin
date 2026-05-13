import { createClient } from "@/lib/supabase/server"
import MortgageRefiPivot from "@/components/mortgage-refi-pivot"
import { ShieldCheck, Landmark, AlertTriangle, HelpCircle, LayoutGrid, Globe, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Mortgage Refi Pivot Point Calculator | 2026 Terminal",
  description: "Determine your mortgage refinance break-even point with real-time 2026 market data. Institutional-grade lifecycle cost of debt modeling.",
  alternates: {
    canonical: 'https://thenewston.com/calculators/mortgage-refi-pivot',
  },
}

export default async function MortgageRefiPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      {/* SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Module 01: Debt Architecture</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
          Mortgage <span className="text-primary">Refi Pivot</span> Point
        </h1>
        
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
          Analyze the mathematical intersection where refinancing costs offset interest savings. Optimized for 2026 amortized resets.
        </p>
      </div>

      {/* ADVISORY NOTICE */}
      <div className="max-w-5xl mx-auto mb-12 bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black">Advisory Notice:</span> This terminal is an educational simulation engine. 
          Outputs are mathematical projections and <span className="text-white underline decoration-red-500/50 underline-offset-4">not professional financial advice</span>.
        </p>
      </div>

      {/* CALCULATOR SECTION */}
      <div className="max-w-5xl mx-auto">
        <section className="space-y-4 mb-12">
          <div className="flex items-center gap-3 ml-2">
            <Landmark className="h-4 w-4 text-zinc-500" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Lifecycle Cost of Debt Analysis</h2>
          </div>
          <MortgageRefiPivot />
        </section>

        {/* 3. MOVED UP: SEMANTIC CONTENT SECTION */}
        <section className="py-12 border-t border-white/5">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest italic">How our models work</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
              Most bank calculators only show monthly savings. The Newston Terminal calculates the <span className="text-white">Total Lifecycle Cost of Debt</span>. 
              Our Mortgage Pivot tool factors in amortized interest resets, time-value of money, and closing costs to find your true break-even point in the 2026 rate environment.
            </p>
          </div>
        </section>

        {/* 4. MOVED DOWN: INTERNAL LINK HUB */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-white/5">
          <Link href="/calculators" className="group p-4 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded">
            <div className="flex items-center gap-3 mb-2">
              <LayoutGrid className="h-4 w-4 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Calculator Hub</h3>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold">Access the full suite of financial intelligence modules.</p>
          </Link>
          <Link href="/calculators/tax-exempt-wealth-gap" className="group p-4 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Tax Wealth Gap</h3>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold">Simulate annual tax leakage and capital appreciation alpha.</p>
          </Link>
          <Link href="/calculators/home-equity-liquidity" className="group p-4 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="h-4 w-4 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Equity Liquidity</h3>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold">Model HELOC vs Cash-out strategies for capital extraction.</p>
          </Link>
        </section>

        {/* LEGAL PROTOCOL */}
        <section className="mt-4 border-t border-white/5 pt-12 pb-8">
          <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
            <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
              <span className="text-zinc-300">Institutional Disclosure:</span> This calculator uses mathematical models based on user-provided inputs. All projections are for educational purposes. Execution of capital decisions should be made with a certified financial advisor.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
