import MortgageRefi from "@/components/calculators/mortgage-refi";
import TaxGrowth from "@/components/calculators/tax-growth";
import { ShieldCheck, Lock, History, Calculator, TrendingUp } from "lucide-react";

export default function CalculateFinancialsPage() {
  return (
    <div className="min-h-screen bg-black pt-12 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* --- TERMINAL HEADER SECTION --- */}
        <header className="mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-1">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="text-zinc-500 font-black uppercase text-[9px] tracking-[0.3em]">
              Terminal v2.6 // Secure Intelligence Suite // Session Active
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
                Intelligence <span className="text-primary font-black">Suite</span>
              </h1>
              <p className="text-zinc-400 max-w-2xl mt-4 text-[11px] leading-relaxed uppercase font-bold tracking-tight">
                Institutional-grade modeling for individual wealth. All projections utilize 
                <span className="text-white mx-1 underline decoration-primary/30 underline-offset-4">2026 Fiscal Parameters</span> 
                and AES-256 encrypted storage protocols.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Protection Layer</span>
                <span className="text-[10px] font-black text-primary uppercase leading-none">End-to-End Encrypted</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* --- MAIN DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: ACTIVE CALCULATORS (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mortgage Analysis Module */}
              <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-white/5 p-3 border-b border-white/5 flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Refinance Pivot Point</span>
                </div>
                <div className="p-1">
                  <MortgageRefi />
                </div>
              </div>

              {/* Tax Growth Module */}
              <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-white/5 p-3 border-b border-white/5 flex items-center gap-2">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">2026 Growth Projection</span>
                </div>
                <div className="p-1">
                  <TaxGrowth />
                </div>
              </div>
            </div>

            {/* UPCOMING SLOT: "INFLATION NEST EGG" */}
            <div className="relative group overflow-hidden bg-zinc-900/20 border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-
