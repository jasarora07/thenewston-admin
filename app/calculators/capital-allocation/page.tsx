import { ShieldCheck, PieChart, AlertTriangle, HelpCircle, LayoutGrid, Globe, Landmark, Info, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import AllocationTerminal from "@/components/calculators/allocation-terminal"

export const metadata: Metadata = {
  title: "Strategic Capital Allocation Engine | 2026 Terminal",
  description: "Model the wealth gap between taxable brokerage accounts and tax-exempt Roth structures. Project capital gains drag and dividend leakage.",
  keywords: ["Roth vs Brokerage", "Capital Gains Tax Calculator", "Tax Drag Model", "2026 Investment Strategy"],
  alternates: {
    canonical: 'https://thenewston.com/calculators/capital-allocation',
  },
}

export default function CapitalAllocationPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Module 04: Wealth Architecture</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
          Capital <span className="text-primary">Allocation</span> Engine
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
          Quantify the long-term divergence between taxable and tax-exempt capital growth. Optimized for 2026 capital gains parameters.
        </p>
      </div>

      {/* 2. THE CALCULATOR TERMINAL */}
      <div className="max-w-6xl mx-auto mb-20">
        <AllocationTerminal />
      </div>

      {/* 3. INTELLIGENCE BRIEFING (Semantic Content) */}
      <section className="max-w-5xl mx-auto py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Dividend & Interest Friction</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
              In a taxable brokerage, every dividend payment creates a <span className="text-white font-black">Taxable Event</span>. 
              This engine models "Dividend Drag," where annual tax payments on distributions reduce the principal available for compounding, 
              leading to significant wealth decay over a 10-20 year horizon.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Capital Gains Exit Velocity</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
              The true "Wealth Gap" is often hidden until the point of liquidation. By accounting for <span className="text-white font-black">Deferred Capital Gains Liabilities</span>, 
              this model reveals the actual net liquidity of a taxable portfolio versus the raw, uninhibited exit velocity of a Roth or Tax-Exempt structure.
            </p>
          </div>
        </div>
      </section>

      {/* 4. NAVIGATION HUB */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5">
        <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white text-left">Calculator Hub</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold text-left">Return to the institutional suite of financial modules.</p>
        </Link>
        
        <Link href="/calculators/tax-exempt-wealth-gap" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white text-left">Tax Wealth Gap</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold text-left">Analyze annual tax leakage and capital appreciation alpha.</p>
        </Link>

        <Link href="/calculators/home-equity-liquidity" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white text-left">Equity Liquidity</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold text-left">Model HELOC vs. Cash-out strategies for 2026 extraction.</p>
        </Link>
      </section>

      {/* 5. INSTITUTIONAL DISCLOSURE */}
      <section className="max-w-5xl mx-auto mt-4 border-t border-white/5 pt-12 pb-8">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4">
          <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider text-left">
            <span className="text-zinc-300">Protocol Disclosure:</span> Projections assume current 2026 capital gains tax brackets and dividend rules. 
            The Newston Terminal does not provide investment advice or CPA-level tax verification. 
            All capital allocation decisions should be reviewed by a certified financial planner.
          </p>
        </div>
      </section>
    </main>
  )
}
