import MortgageRefi from "@/components/calculators/mortgage-refi";
import TaxGrowth from "@/components/calculators/tax-growth";
import { ShieldCheck, Lock, History, Calculator, TrendingUp } from "lucide-react";

export default function CalculateFinancialsPage() {
  return (
    <div className="min-h-screen bg-black pt-12 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* TERMINAL HEADER */}
        <header className="mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-zinc-500 font-black uppercase text-[9px] tracking-[0.3em]">
              Terminal v2.6 // Secure Intelligence Suite
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
                Intelligence <span className="text-primary">Suite</span>
              </h1>
              <p className="text-zinc-400 max-w-2xl mt-4 text-[11px] leading-relaxed uppercase font-bold tracking-tight">
                Institutional-grade modeling for individual wealth using 2026 parameters.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</span>
                <span className="text-[10px] font-black text-primary uppercase">Encrypted</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Mortgage Module */}
              <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-white/5 p-3 border-b border-white/5 flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                  <TrendingUp className="h-3 w-3 text-primary" /> Mortgage Pivot
                </div>
                <div className="p-1"><MortgageRefi /></div>
              </div>

              {/* Tax Growth Module */}
              <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-white/5 p-3 border-b border-white/5 flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3 text-primary" /> Tax Growth
                </div>
                <div className="p-1"><TaxGrowth /></div>
              </div>
            </div>

            {/* UPCOMING SLOT */}
            <div className="relative group overflow-hidden bg-zinc-900/20 border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 bg-primary/5 opacity-50" />
              <Calculator className="h-10 w-10 text-zinc-800 mb-4 group-hover:text-primary/20 transition-all" />
              <h3 className="text-zinc-600 font-black uppercase tracking-widest text-[10px] italic">Inflation Nest Egg</h3>
              <p className="text-[9px] text-zinc-700 mt-2 uppercase font-black">Deploying Q3 2026 // Real-Value Projection</p>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-6 flex items-center gap-3 italic">
                <History className="h-4 w-4 text-primary" /> History
              </h4>
              <p className="text-[10px] text-zinc-500 font-bold uppercase">No archived sessions found</p>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h4 className="text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-4 flex items-center gap-3">
                <ShieldCheck className="h-4 w-4" /> Disclaimer
              </h4>
              <p className="text-[9px] text-zinc-500 leading-relaxed uppercase font-medium">
                Models based on 2026 fiscal data. Educational use only.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
