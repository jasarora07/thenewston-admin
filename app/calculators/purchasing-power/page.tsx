import { ShieldCheck, Wind, HelpCircle, Info, LayoutGrid, Lock } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import InflationTerminal from "@/components/calculators/inflation-terminal"
import CalculatorSchema from "@/components/seo/schema-markup"

/** * PRODUCTION OVERRIDE:
 * Shifting from static to dynamic forcing tells Vercel's edge network
 * to build the template raw on demand, ensuring text structures match the live data.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Purchasing Power & Inflation Terminal | 2026 Analysis",
  description: "Model the silent tax of inflation. Quantify the erosion of your capital against 2026 CPI projections with our institutional simulation engine.",
  alternates: {
    canonical: './',
  },
}

export default function PurchasingPowerPage() {
  return (
    /* CRITICAL SEO FIX: Adding '!opacity-100 !transform-none' prevents animation libraries 
       from hiding the main calculator interface behind an invisible layer during Googlebot sweeps. */
    <main className="container mx-auto px-4 py-12 bg-black min-h-screen !opacity-100 !transform-none">
      
      {/* 1. SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e]">Module 05: Macro Resilience</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-white">
          Purchasing <span className="text-[#22c55e]">Power</span> Terminal
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic text-center">
          Model the "Silent Tax" of currency debasement. Quantify the divergence between nominal balances and real-world utility in a 2026 fiscal environment.
        </p>
      </div>

      {/* 2. THE CALCULATOR COMPONENT FRAME */}
      <div className="max-w-6xl mx-auto mb-20 min-h-[300px]">
        <InflationTerminal />
      </div>

      {/* HARDENED E-E-A-T DATA SOURCE & METHODOLOGY TRANSPARENCY SECTION */}
      <div className="mt-12 border-t border-white/5 pt-8 text-left space-y-6 max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 bg-[#22c55e] rounded-full animate-pulse" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
            Data Integrity & Empirical Methodology
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-2">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block">Operational Core Data Feeds</span>
            <p className="text-[10px] text-zinc-400 leading-relaxed text-justify uppercase font-bold tracking-tight">
              The mathematical frameworks running within this module utilize structured algorithms pulling historical and trailing performance matrices. Calculations integrate core metrics sourced directly from the U.S. Bureau of Labor Statistics (BLS) Consumer Price Index (CPI-U) datastreams and historical baseline allocations maintained by the Federal Reserve Bank of St. Louis (FRED).
            </p>
          </div>
          
          <div className="space-y-2">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block">Algorithmic Computation Vector</span>
            <p className="text-[10px] text-zinc-400 leading-relaxed text-justify uppercase font-bold tracking-tight">
              Calculations are processed client-side via continuous compounding equations and standard discount functions. Nominal variables are translated to real net assets through continuous structural adjustments modeled after standard institutional asset valuation protocols. Baseline calculations assume static tax thresholds matching standard current fiscal configurations.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-[8px] text-zinc-600 font-mono uppercase tracking-wider">
          <span>[ Citation 01: BLS Data Engine Series CUUR0000SA0 ]</span>
          <span>[ Citation 02: FRED Macro-Financial Data Core ]</span>
          <span>[ Security Protocol: Verified TLS 1.3 Encryption ]</span>
        </div>
      </div>

      {/* 3. INTELLIGENCE BRIEFING */}
      <section className="max-w-5xl mx-auto py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white text-left">The Real Yield Gap</h3>
            </div>
            <p className="text-[11px] text-white font-bold leading-relaxed uppercase text-justify tracking-tighter">
              Nominal returns are often an illusion. If a portfolio yields 5% but inflation is 4%, the <span className="text-white font-black uppercase">Real Yield</span> is only 1%. This module filters out inflationary noise to reveal the true growth of your capital's buying power.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white text-left">Currency Debasement</h3>
            </div>
            <p className="text-[11px] text-white font-bold leading-relaxed uppercase text-justify tracking-tighter">
              In a structural inflation environment, cash reserves act as a depreciating asset. Over a 10-year horizon, even a <span className="text-white">3.5% inflation rate</span> can result in a wealth gap exceeding <span className="text-white font-black uppercase">30% of total portfolio value</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CONVERSION BRIDGE */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5 text-left">
        <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <LayoutGrid className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Decision Models</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold text-left">Return to the full suite of institutional intelligence engines.</p>
        </Link>
        
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

        <Link href="/partnership" className="group p-6 bg-[#22c55e]/5 border border-[#22c55e]/20 hover:border-[#22c55e] transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3 text-left">
            <ShieldCheck className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none italic">Become a Partner</h3>
          </div>
          <p className="text-[9px] text-[#22c55e] uppercase font-black text-left">Apply for firm-level integration into the Newston Terminal.</p>
        </Link>
      </section>

      {/* 5. INSTITUTIONAL DISCLOSURE */}
      <section className="max-w-5xl mx-auto border-t border-white/5 pt-12 pb-8 text-left">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4 text-left">
          <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1" />
          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
            <span className="text-[#22c55e]">Institutional Disclosure:</span> Projections are based on mathematical models using 2026 CPI estimates. Actual purchasing power varies by geography and expenditure. The Newston Terminal is not an economic forecasting agency.
          </p>
        </div>
      </section>

      <CalculatorSchema 
        name="Purchasing Power & Inflation Terminal"
        description="Model the structural erosion of currency debasement. Quantify the divergence between nominal balances and real asset utility against 2026 CPI targets."
        url="https://thenewston.com/calculators/purchasing-power"
      />
    </main>
  )
}
