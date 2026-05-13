import Link from "next/link"
import { MacroBar } from "@/components/macro-bar"
import { 
  ShieldCheck, 
  Landmark, 
  TrendingUp, 
  Home, 
  ArrowRight, 
  LayoutGrid,
  Zap
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Financial Calculator Hub | The Newston Intelligence Terminal",
  description: "Access institutional-grade financial decision models. From Mortgage Refi Pivot points to Tax-Exempt Wealth Gap simulations and Home Equity Liquidity engines.",
  alternates: {
    canonical: 'https://thenewston.com/calculators',
  },
}

const modules = [
  {
    id: "01",
    title: "Mortgage Refi Pivot",
    desc: "Analyze the mathematical intersection where refinancing costs offset interest savings. Optimized for 2026 amortized resets.",
    href: "/calculators/mortgage-refi-pivot",
    icon: <Landmark className="h-6 w-6" />,
    status: "LIVE"
  },
  {
    id: "02",
    title: "Tax Wealth Gap",
    desc: "Project long-term capital erosion caused by annual tax drag. Identify the structural alpha of tax-advantaged wealth corridors.",
    href: "/calculators/tax-exempt-wealth-gap",
    icon: <TrendingUp className="h-6 w-6" />,
    status: "LIVE"
  },
  {
    id: "03",
    title: "Equity Liquidity Engine",
    desc: "Model capital extraction strategies. Contrast HELOC blended rates against total debt replacement models.",
    href: "/calculators/home-equity-liquidity",
    icon: <Home className="h-6 w-6" />,
    status: "INITIALIZING"
  }
]

export default function CalculatorHub() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <div className="w-full border-b border-white/10 mt-16">
        <MacroBar />
      </div>

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Institutional Suite // 2026
              </span>
            </div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-6">
              Decision <span className="text-primary">Models</span>
            </h1>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-2xl">
              Select a modular simulation engine to project capital efficiency across debt, equity, and tax-advantaged asset classes.
            </p>
          </div>

          {/* MODULE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Link 
                key={mod.id} 
                href={mod.href}
                className="group relative p-8 bg-zinc-900/30 border border-white/5 hover:border-primary/50 transition-all duration-500 rounded-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                   <Zap className="h-4 w-4 text-primary" />
                </div>

                <div className="mb-8 p-3 bg-black border border-white/10 rounded-lg w-fit group-hover:border-primary/30 transition-colors">
                  {mod.icon}
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Module {mod.id}</span>
                    <h2 className="text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors italic">
                      {mod.title}
                    </h2>
                  </div>
                  
                  <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed h-12 overflow-hidden">
                    {mod.desc}
                  </p>

                  <div className="flex items-center gap-2 pt-4 text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    Enter Terminal <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-white/5 text-center bg-black">
        <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em]">
          The Newston Intelligence Terminal • Decision Support Systems
        </p>
      </footer>
    </div>
  )
}
