import MortgageRefi from "@/components/calculators/mortgage-refi";
import TaxGrowth from "@/components/calculators/tax-growth";
import { ShieldCheck, Lock, History, Calculator } from "lucide-react";

export default function CalculateFinancialsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-1">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.3em]">
              Terminal v2.6 // Secure Intelligence Suite
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
                Calculate <span className="text-primary">Financials</span>
              </h1>
              <p className="text-zinc-400 max-w-2xl mt-4 text-sm leading-relaxed uppercase font-medium tracking-tight">
                Institutional-grade modeling for individual wealth. All projections utilize 
                <span className="text-white mx-1">2026 Fiscal Parameters</span> 
                and AES-256 encrypted storage.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Connection Status</span>
                <span className="text-[10px] font-black text-primary uppercase">Encrypted // Verified</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Calculator Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MortgageRefi />
              <TaxGrowth />
            </div>

            {/* Coming Soon Slot */}
            <div className="relative group overflow-hidden bg-zinc-900/30 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
              <Calculator className="h-12 w-12 text-zinc-800 mb-4 group-hover:text-primary/20 transition-colors" />
              <h3 className="text-zinc-600 font-black uppercase tracking-widest text-xs">
                Inflation Nest Egg
              </h3>
              <p className="text-[10px] text-zinc-700 mt-2 uppercase font-bold">
                Deploying Q3 2026 // Real-Value Asset Projection
              </p>
            </div>
          </div>

          {/* Sidebar / Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                <History className="h-4 w-4 text-primary" /> Recent Activity
              </h4>
              <div className="space-y-4">
                {/* This will eventually map from your calculation_history table */}
                <div className="border-l-2 border-primary/30 pl-4 py-1">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase">No recent sessions found</p>
                  <p className="text-[9px] text-zinc-600 uppercase">Start a calculation to see history</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <h4 className="text-primary font-black uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Compliance Note
              </h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed uppercase font-bold">
                The Newston provides mathematical models based on current legislative data. 
                These tools are for <span className="text-white">Educational Intelligence</span> 
                only and do not constitute certified financial advice.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
