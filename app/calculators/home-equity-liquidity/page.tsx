import { ShieldCheck, Info, HelpCircle, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
// Ensure this path matches where you saved the component
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
      {/* HEADER SECTION */}
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

      {/* THE INTERACTIVE TERMINAL COMPONENT */}
      <div className="max-w-6xl mx-auto">
        <EquityCalculatorTerminal />
      </div>

      {/* SEO & SEMANTIC FOOTER */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-16 mt-16 border-t border-white/5">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Weighted Average Analysis</h3>
          </div>
          <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
            Most bank calculators ignore the "Weighted Average Cost of Capital." The Newston Terminal identifies if adding a 
            HELOC preserves more of your <span className="text-white">low-interest primary debt</span> than a full replacement refinance.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-black uppercase tracking-widest italic text-white">LTV Risk Benchmarking</h3>
          </div>
          <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
            Liquidity extraction is benchmarked against a <span className="text-white">80% Loan-to-Value (LTV)</span> safety ceiling, 
            protecting your institutional-grade financial profile from market volatility.
          </p>
        </div>
      </section>
    </main>
  )
}
