import Link from "next/link"
import { 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  PieChart,
  Wind,
  Gauge,
  Home,
  ArrowRight
} from "lucide-react"
import type { Metadata } from "next"

/** * BING SEO HARDENING: 
 * Static generation ensures the 'HIT' header Bing requires for speed scores.
 */
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 Hours

export const metadata: Metadata = {
  title: "Financial Calculator Hub | The Newston Intelligence Terminal",
  description: "Access institutional-grade financial decision models. Explore our Mortgage Accelerator, Equity Liquidity Engine, Tax Wealth Gap simulations, and Strategic Capital Allocation arrays.",
  alternates: {
    canonical: './',
  },
}

const modules = [
  {
    id: "01",
    title: "Mortgage Accelerator",
    desc: "Quantify the compounding wealth gap saved by launching principal prepayment strategies. Shave years off amortized note life cycles.",
    href: "/calculators/mortgage-accelerator",
    icon: <Gauge className="h-6 w-6" />,
    status: "LIVE"
  },
  {
    id: "02",
    title: "Equity Liquidity",
    desc: "Model capital extraction strategies. Contrast variable line extraction parameters against standalone macro replacement models.",
    href: "/calculators/home-equity-liquidity",
    icon: <Home className="h-6 w-6" />,
    status: "LIVE"
  },
  {
    id: "03",
    title: "Tax Wealth Gap",
    desc: "Project long-term capital erosion caused by annual tax drag. Identify the structural alpha of tax-advantaged wealth corridors.",
    href: "/calculators/tax-exempt-wealth-gap",
    icon: <TrendingUp className="h-6 w-6" />,
    status: "LIVE"
  },
  {
    id: "04",
    title: "Capital Allocation",
    desc: "Quantify the wealth divergence between taxable and tax-exempt growth. Model dividend leakage and capital gains drag.",
    href: "/calculators/capital-allocation",
    icon: <PieChart className="h-6 w-6" />,
    status: "LIVE"
  },
  {
    id: "05",
    title: "Purchasing Power",
    desc: "Model the silent tax of inflation. Quantify the erosion of your capital against active CPI projections.",
    href: "/calculators/purchasing-power",
    icon: <Wind className="h-6 w-6" />,
    status: "LIVE"
  }
]

export default function CalculatorHub() {
  return (
    <main className="container mx-auto px-4 py-20 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-20 text-left animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-[#22c55e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#22c55e]">
              Institutional Suite // 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none text-left">
            Decision <span className="text-[#22c55e]">Models</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed max-w-2xl italic text-left">
            Select a modular simulation engine to project capital efficiency across debt, equity, and tax-advantaged asset classes.
          </p>
        </div>

        {/* MODULE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {modules.map((mod) => (
            <Link 
              key={mod.id} 
              href={mod.href}
              className="group relative p-10 bg-zinc-900/20 border border-white/5 hover:border-[#22c55e]/40 hover:bg-zinc-900/40 transition-all duration-500 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[340px] text-left"
            >
              {/* HOVER GLOW EFFECT */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <Zap className="h-5 w-5 text-[#22c55e] animate-pulse" />
              </div>

              <div>
                <div className="mb-8 p-4 bg-black border border-white/10 rounded-xl w-fit group-hover:border-[#22c55e]/50 group-hover:scale-110 transition-all duration-500 text-zinc-400 group-hover:text-[#22c55e]">
                  {mod.icon}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest italic leading-none">Module {mod.id}</span>
                      <span className="text-[8px] px-1.5 py-0.5 border border-[#22c55e]/30 text-[#22c55e] rounded font-black tracking-tighter group-hover:bg-[#22c55e] group-hover:text-black transition-colors duration-500 leading-none">{mod.status}</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#22c55e] transition-colors duration-500 italic leading-tight text-left">
                      {mod.title}
                    </h2>
                  </div>
                  
                  <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider max-w-md text-left">
                    {mod.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-8 text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-[#22c55e] transition-all group-hover:translate-x-2">
                Launch Terminal <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
