import { ShieldCheck, Wind, AlertTriangle, HelpCircle, Info, Landmark, TrendingUp, LayoutGrid } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import InflationTerminal from "@/components/calculators/inflation-terminal"

// SEO PERFORMANCE: Enable ISR (24-hour cache) to satisfy Bing/Google speed requirements
export const revalidate = 86400; 

export const metadata: Metadata = {
  title: "Purchasing Power & Inflation Terminal | The Newston Intelligence Suite",
  description: "Analyze the long-term erosion of capital. Project real-world purchasing power adjusted for 2026 inflation targets and portfolio yields.",
  alternates: {
    canonical: 'https://thenewston.com/calculators/purchasing-power',
  },
}

export default function PurchasingPowerPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Module 05: Macro Resilience</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
          Purchasing <span className="text-primary">Power</span> Terminal
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
          Model the "Silent Tax" of currency debasement. Quantify the divergence between nominal balances and real-world utility in a 2026 fiscal environment.
        </p>
      </div>

      {/* 2. ADVISORY PROTOCOL */}
      <div className="max-w-5xl mx-auto mb-12 bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4 text-left">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black">Macro Warning:</span> This terminal is an educational simulation engine. 
          Projected CPI and inflation data are mathematical estimates and <span className="text-white underline decoration-red-500/50 underline-offset-4">not professional financial advice</span>.
        </p>
      </div>

      {/* 3. THE CALCULATOR COMPONENT */}
      <div className="max-w-6xl mx-auto mb-20">
        <InflationTerminal />
      </div>

      {/* 4. INTELLIGENCE BRIEFING */}
      <section className="max-w-5xl mx-auto py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">The Real Yield Gap</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
              Nominal returns are often an illusion. If a portfolio yields 5% but inflation is 4%, the <span className="text-white font-black">Real Yield</span> is only 1%. This module filters out inflationary noise to reveal the true growth of your capital's buying power.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Currency Debasement</h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase text-justify">
              In a structural inflation environment, cash reserves act as a depreciating asset. Over a 10-year horizon, even a <span className="text-white">3.5% inflation rate</span> can result in a wealth gap exceeding <span className="text-white font-black">30% of total portfolio value</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NAVIGATION HUB (Terminal Links) */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5">
        <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl text-left">
          <div className="flex items-center gap-3 mb-3">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Calculator Hub</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold leading-relaxed">Return to the institutional suite of financial intelligence modules.</p>
        </Link>
        
        <Link href="/calculators/tax-exempt-wealth-gap" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl text-left">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Tax Wealth Gap</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold leading-relaxed">Project long-term capital erosion caused by annual tax drag.</p>
        </Link>

        <Link href="/calculators/mortgage-refi-pivot" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded-xl text-left">
          <div className="flex items-center gap-3 mb-3">
            <Landmark className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Mortgage Refi Pivot</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold leading-relaxed">Calculate lifecycle costs of debt and break-even reset points.</p>
        </Link>
      </section>

      {/* 6. INSTITUTIONAL DISCLOSURE */}
      <section className="max-w-5xl mx-auto mt-4 border-t border-white/5 pt-12 pb-8">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4 text-left">
          <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
            <span className="text-zinc-300">Protocol Disclosure:</span> Projections are based on 2026 CPI targets. Actual purchasing power varies by geography and expenditure. The Newston Terminal provides mathematical simulations, not advice.
          </p>
        </div>
      </section>
    </main>
  )
}
