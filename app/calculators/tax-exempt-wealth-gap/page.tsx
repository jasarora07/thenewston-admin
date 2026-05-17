import { ShieldCheck, TrendingUp, AlertTriangle, HelpCircle, Info, Landmark, Globe, LayoutGrid } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import TaxExemptWealthGap from "@/components/calculators/tax-growth"

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tax-Exempt Wealth Gap & Drag Simulator | 2026 Terminal",
  description: "Simulate annual tax leakage and project the 'Alpha' generated through tax-exempt wealth strategies.",
  alternates: {
    canonical: 'https://thenewston.com/calculators/tax-exempt-wealth-gap',
  },
}

export default function TaxWealthGapPage() {
  return (
    <main className="container mx-auto px-4 py-12 bg-black min-h-screen text-white text-left print:bg-white print:text-black print:p-0">
      
      {/* 📥 EXCLUSIVE PRINT-ONLY SUMMARY BRANDING HEADER */}
      <div className="hidden print:block text-left mb-6 border-b-2 border-black pb-3">
        <div className="text-xl font-black uppercase tracking-tight text-black">
          THE NEWSTON TERMINAL
        </div>
        <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mt-1 flex justify-between">
          <span>Module 02: Capital Efficiency Audit Profile</span>
          <span>Reference Date // {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* 1. SECTION HEADER (Vanishes cleanly on paper) */}
      <div className="max-w-4xl mx-auto mb-6 text-center print:hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-4">
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e]">Module 02: Capital Efficiency</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-center">
          Tax <span className="text-[#22c55e]">Wealth Gap</span> Simulator
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto text-center italic">
          Project long-term capital erosion caused by annual tax drag. Identify the structural alpha of tax-advantaged wealth corridors.
        </p>
      </div>

      {/* 2. ADVISORY PROTOCOL ALERT - Centered safely below subtitle on desktop, hidden on paper */}
      <div className="max-w-5xl mx-auto mb-12 bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex items-center justify-center gap-3 print:hidden">
        <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight text-center">
          <span className="text-red-500 font-black">Advisory Notice:</span> This terminal is an educational simulation engine. 
          Outputs are mathematical projections and <span className="text-white underline decoration-red-500/50 underline-offset-4 uppercase">not professional tax advice</span>.
        </p>
      </div>

      {/* 3. THE INTERACTIVE WORKSPACE CALCULATOR ENGINE */}
      <div className="max-w-6xl mx-auto mb-20 print:mb-6">
        <TaxExemptWealthGap />
      </div>

      {/* 4. INTELLIGENCE BRIEFING ANALYSIS */}
      <section className="max-w-5xl mx-auto py-16 border-t border-white/5 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Understanding Tax Drag</h3>
            </div>
            <p className="text-[11px] text-zinc-400 font-bold leading-relaxed uppercase text-justify">
              Tax drag is the silent inhibitor of compounding. When returns are taxed annually, the amount of capital available to generate future returns is diminished. 
              This module quantifies that loss over time, demonstrating how <span className="text-white font-black">Tax-Exempt Structural Alpha</span> outperforms taxable strategies.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#22c55e]" />
              <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Compound Efficiency</h3>
            </div>
            <p className="text-[11px] text-zinc-400 font-bold leading-relaxed uppercase text-justify">
              By eliminating the annual "tax friction," capital stays fully deployed. In a 20-year horizon, even a modest <span className="text-white">22% tax rate</span> can result in a wealth gap 
              exceeding <span className="text-white font-black">40% of the total portfolio value</span> compared to tax-exempt structures.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FOOTER HUB (Completely ignored during print rendering) */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5 print:hidden">
        <Link href="/calculators" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <LayoutGrid className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Calculator Hub</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold leading-relaxed">Return to the institutional suite of financial intelligence modules.</p>
        </Link>
        
        <Link href="/calculators/mortgage-accelerator" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Landmark className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Mortgage Accelerator</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold leading-relaxed">Quantify compounding wealth profiles by accelerating principal prepayments snowballs.</p>
        </Link>

        <Link href="/calculators/home-equity-liquidity" className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="h-4 w-4 text-[#22c55e]" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Equity Liquidity</h3>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase font-bold leading-relaxed">Analyze HELOC vs. Cash-out strategies for 2026 capital extraction.</p>
        </Link>
      </section>

      {/* 6. FIXED ENTERPRISE INSTITUTIONAL DISCLOSURE MATRICES */}
      <section className="max-w-5xl mx-auto mt-4 border-t border-white/5 pt-12 pb-8 print:border-black print:mt-6 print:pt-4">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4 print:bg-transparent print:border-none print:p-0">
          <Info className="h-5 w-5 text-zinc-500 shrink-0 mt-1 print:hidden" />
          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider print:text-black print:text-[8px] print:font-medium">
            <span className="text-zinc-300 print:text-black print:font-black">Institutional Disclosure:</span> All projections are mathematical simulations based on current 2026 fiscal guidelines. The Newston Terminal does not provide tax advice. Consult with a CPA regarding specific liabilities.
          </p>
        </div>
      </section>
    </main>
  )
}
