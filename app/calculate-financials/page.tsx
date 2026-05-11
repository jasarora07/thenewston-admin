import MortgageRefi from "@/components/calculators/mortgage-refi"
import { ShieldCheck, TrendingUp, Calculator } from "lucide-react"

export default function CalculatePage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-primary h-5 w-5" />
            <span className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">
              Verified Intelligence Suite
            </span>
          </div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            Calculate <span className="text-primary">Financials</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mt-4 text-sm leading-relaxed">
            Institutional-grade modeling for individual wealth. All inputs are encrypted and stored in your private history.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mortgage Refi Master */}
          <div className="space-y-6">
             <MortgageRefi />
          </div>

          {/* PLACEHOLDERS FOR NEXT TWO CALCULATORS */}
          <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl flex flex-col items-center justify-center text-center grayscale opacity-50">
             <TrendingUp className="h-10 w-10 text-zinc-700 mb-4" />
             <h3 className="text-zinc-500 font-black uppercase text-xs">Trump Account Growth</h3>
             <p className="text-[10px] text-zinc-600 mt-2 uppercase">Coming Soon: Legislative Tax Analysis</p>
          </div>

          <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl flex flex-col items-center justify-center text-center grayscale opacity-50">
             <Calculator className="h-10 w-10 text-zinc-700 mb-4" />
             <h3 className="text-zinc-500 font-black uppercase text-xs">Inflation Nest Egg</h3>
             <p className="text-[10px] text-zinc-600 mt-2 uppercase">Coming Soon: Real-Value Projections</p>
          </div>
        </div>
      </div>
    </div>
  )
}
