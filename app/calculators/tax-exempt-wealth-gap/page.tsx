import { createClient } from "@/lib/supabase/server"
import TaxExemptWealthGap from "@/components/tax-exempt-wealth-gap"
import { ShieldCheck, TrendingUp, AlertTriangle, HelpCircle, LayoutGrid, Globe, Landmark } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const dynamic = 'force-dynamic'

// 1. PAGE-SPECIFIC SEO METADATA
export const metadata: Metadata = {
  title: "Tax-Exempt Wealth Gap & Drag Simulator | 2026 Terminal",
  description: "Simulate annual tax leakage and project the 'Alpha' generated through tax-exempt wealth strategies. Analyze capital appreciation efficiency for 2026.",
  keywords: ["tax drag simulator", "wealth gap analysis", "capital appreciation", "tax-exempt growth", "financial efficiency"],
  alternates: {
    canonical: 'https://thenewston.com/calculators/tax-exempt-wealth-gap',
  },
}

export default async function TaxWealthGapPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      {/* SECTION HEADER */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-1 flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Module 02: Capital Efficiency</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
          Tax <span className="text-primary">Wealth Gap</span> Simulator
        </h1>
        
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
          Project long-term capital erosion caused by annual tax drag. Identify the structural alpha of tax-advantaged wealth corridors.
        </p>
      </div>

      {/* 2. ADVISORY NOTICE */}
      <div className="max-w-5xl mx-auto mb-12 bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black">Advisory Notice:</span> This terminal is an educational simulation engine. 
          Outputs are mathematical projections and <span className="text-white underline decoration-red-500/50 underline-offset-4">not professional tax advice</span>.
        </p>
      </div>

      {/* CALCULATOR SECTION */}
      <div className="max-w-5xl mx-auto">
        <section className="space-y-4">
          <div className="flex items-center gap-3 ml-2">
            <TrendingUp className="h-4 w-4 text-zinc-500" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Structural Alpha & Tax Leakage Analysis</h2>
          </div>
          <TaxExemptWealthGap />
        </section>

        {/* 3. INTERNAL LINK HUB */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 py-8 border-t border-white/5">
          <Link href="/calculators" className="group p-4 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded">
            <div className="flex items-center gap-3 mb-2">
              <LayoutGrid className="h-4 w-4 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Calculator Hub</h3>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold">Return to the institutional suite of financial modules.</p>
          </Link>
          <Link href="/calculators/mortgage-refi-pivot" className="group p-4 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded">
            <div className="flex items-center gap-3 mb-2">
              <Landmark className="h-4 w-4 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Mortgage Refi Pivot</h3>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold">Calculate lifecycle costs of debt and break-even reset points.</p>
          </Link>
          <Link href="/calculators/home-equity-liquidity" className="group p-4 bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all rounded">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="h-4 w-4 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Equity Liquidity</h3>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase font-bold">Analyze HELOC vs. Cash-out strategies for 2026 capital extraction.</p>
          </Link>
        </section>

        {/* 4. SEMANTIC CONTENT SECTION */}
        <section className="py-12 border-t border-white/5">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              <h3 className="
