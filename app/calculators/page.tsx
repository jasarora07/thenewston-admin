import Link from "next/link"
import { 
  ShieldCheck, 
  Landmark, 
  TrendingUp, 
  Home, 
  ArrowRight, 
  Zap,
  PieChart
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Financial Calculator Hub | The Newston Intelligence Terminal",
  description: "Access institutional-grade financial decision models. From Mortgage Refi Pivot points to Tax-Exempt Wealth Gap simulations and Strategic Capital Allocation engines.",
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
    status: "LIVE"
  },
  {
    id: "04",
    title: "Capital Allocation",
    desc: "Quantify the wealth divergence between taxable and tax-exempt growth. Model dividend leakage and capital gains drag.",
    href: "/calculators/capital-allocation",
    icon: <PieChart className="h-6 w-6" />,
    status: "LIVE"
  }
]

export default function CalculatorHub() {
  return (
    <main className="container mx-auto px-4 py-20 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-20 text-left">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Institutional Suite // 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">
            Decision <span className="text-primary">Models</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed max-w-2xl italic">
            Select a modular simulation engine to project capital efficiency across debt, equity, and tax-advantaged asset classes.
          </p>
        </div>

        {/* MODULE GRID - Updated to grid-cols-2 for 4 modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((mod) => (
            <Link 
              key={mod.id} 
              href={mod.href}
              className="group relative p-10 bg-zinc-900/20 border border-white/5 hover:border-primary/40 hover:bg-zinc-900/40 transition-all duration-500 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[340px]"
            >
              {/* TOP ACCENT */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <Zap className="h-5 w-5 text-primary animate-pulse" />
              </div>

              <div>
                <div className="mb-8 p-4 bg-black border border-white/10 rounded-xl w-fit group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500 text-white group-hover:text-primary">
                  {mod.icon}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Module {mod.id}</span>
                      <span className="text-[8px] px-1.5 py-0.5 border border-primary/30 text-primary rounded font-black tracking-tighter group-hover:bg-primary group-hover:text-black transition-colors duration-500">{mod.status}</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors duration-500 italic leading-tight">
                      {mod.title}
                    </h2>
                  </div>
                  
                  <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider max-w-md">
                    {mod.desc}
                  </p>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="flex items-center gap-2 pt-8 text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-primary transition-all group-hover:translate-x-2">
                Launch Terminal <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
