import { ShieldCheck, Info, HelpCircle, TrendingUp, AlertTriangle, LayoutGrid, Landmark, Globe } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import EquityCalculatorTerminal from "@/components/calculators/equity-terminal"

export const metadata: Metadata = {
  title: "Home Equity & HELOC Liquidity Engine | 2026 Terminal",
  description: "Calculate safe home equity withdrawal limits and compare HELOC vs. Cash-out Refinance blended rates using real-time market data.",
  keywords: ["HELOC vs Refi", "Home Equity Calculator", "Blended Interest Rate", "2026 Mortgage Trends"],
  alternates: {
    canonical: 'https://thenewston.com/calculators/home-equity-liquidity',
  },
}

export default function HomeEquityPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Module 03: Liquidity Engine</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
          Equity <span className="text-primary">Liquidity</span> Engine
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
          Contrast weighted average costs of capital against unified replacement debt. Optimized for the 2026 high-equity environment.
        </p>
      </div>

      {/* 3. THE CALCULATOR */}
      <div className="max-w-6xl mx-auto mb-20">
        <EquityCalculatorTerminal />
      </div>

      {/* 4. MOVED UP: SEMANTIC CONTENT SECTION */}
      <section className="max-w-5xl mx-auto py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Weighted Average Analysis</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
              Most bank calculators ignore the "Weighted Average Cost of Capital." The Newston Terminal identifies if adding a 
              HELOC preserves more of your <span className="text-white font-black">low-interest primary debt</span> than a full replacement refinance.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">LTV Risk Benchmarking</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
              Liquidity extraction is benchmarked against a <span className="text-white font-black">80% Loan-to-Value (LTV)</span> safety ceiling, 
              protecting your institutional-grade financial profile from market volatility.
            </p>
          </div>
        </div>
      </section>

      {/* 5. MOVED DOWN: INTERNAL LINK HUB */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5">
        <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Calculator Hub</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Return to the institutional suite of financial modules.</p>
        </Link>
        
        <Link href="/calculators/mortgage-refi-pivot" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Landmark className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Mortgage Refi Pivot</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Calculate lifecycle costs of debt and break-even reset points.</p>
        </Link>

        <Link href="/calculators/tax-exempt-wealth-gap" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Tax Wealth Gap</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold">Analyze structural alpha and tax-exempt growth corridors.</p>
        </Link>
      </section>

      {/* 6. INSTITUTIONAL DISCLOSURE */}
      <section className="max-w-5xl mx-auto mt-4 border-t border-white/5 pt-12 pb-8">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4">
          <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
            <span className="text-zinc-300">Institutional Disclosure:</span> This calculator uses mathematical models based on user-provided inputs. All projections are for educational purposes. Execution of capital decisions should be made with a certified financial advisor.
          </p>
        </div>
      </section>
    </main>
  )
}
