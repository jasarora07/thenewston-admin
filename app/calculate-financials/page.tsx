import MortgageRefi from "@/components/calculators/mortgage-refi"
import TaxGrowth from "@/components/calculators/tax-growth"
import { ShieldCheck, History, Info, Lightbulb, TrendingDown } from "lucide-react"

export default function CalculateFinancialsPage() {
  return (
    <div className="min-h-screen bg-black pt-12 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* HEADER */}
        <header className="mb-12 border-b border-white/5 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            Intelligence <span className="text-primary">Suite</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase font-bold mt-2 tracking-widest">
            Institutional Modeling // 2026 Fiscal Parameters
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PRIMARY TOOLS */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  <h3 className="text-[11px] font-black uppercase text-white tracking-widest">Mortgage Pivot Point</h3>
                </div>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-1">
                  <MortgageRefi />
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <h3 className="text-[11px] font-black uppercase text-white tracking-widest">Tax-Exempt Growth</h3>
                </div>
                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-1">
                  <TaxGrowth />
                </div>
              </section>
            </div>
          </div>

          {/* INTELLIGENCE SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* HISTORY / SUGGESTIONS */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
              <h4 className="text-[10px] font-black uppercase text-primary tracking-widest mb-6 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Intelligence Brief
              </h4>
              
              <div className="space-y-6">
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-[10px] text-white font-bold uppercase mb-1">Mortgage Strategy</p>
                  <p className="text-[9px] text-zinc-500 leading-relaxed font-medium uppercase">
                    If your "Months to Break Even" is under 30, the refinance is considered a "Strong Buy." If over 48, capital is better deployed elsewhere.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-700 pl-4 opacity-50">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase mb-1">Recorded History</p>
                  <p className="text-[9px] text-zinc-600 uppercase italic">
                    No prior sessions detected. Database sync active.
                  </p>
                </div>
              </div>
            </div>

            {/* QUICK GUIDE */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <h4 className="text-[10px] font-black uppercase text-white tracking-widest mb-4 flex items-center gap-2">
                <Info className="h-4 w-4" /> Operational Guide
              </h4>
              <ul className="space-y-3 text-[9px] text-zinc-400 font-bold uppercase leading-snug">
                <li className="flex gap-2">
                  <span className="text-primary">01.</span> Input current loan balance vs. new 2026 interest rates.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">02.</span> Use the Tax Model to project 10-year compounding in non-taxable accounts.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
