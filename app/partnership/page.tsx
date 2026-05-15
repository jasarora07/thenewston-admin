import { ShieldCheck, Briefcase, Globe, Zap, CheckCircle2, ArrowRight, Lock } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Professional Partnership Protocol | The Newston Terminal",
  description: "Join the Newston Intelligence Network. Exclusive lead-generation and tool integration for Certified Financial Advisors, Lenders, and CPAs.",
}

export default function PartnershipPage() {
  return (
    <main className="container mx-auto px-4 py-20 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* 1. PROTOCOL HEADER */}
        <div className="mb-20 text-left border-l-2 border-primary pl-8">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Professional Access Only // 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">
            Partner <span className="text-primary">Protocol</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed max-w-2xl italic">
            Expanding the Newston Intelligence Terminal to certified professionals. Secure your firm's position within our modular decision engines.
          </p>
        </div>

        {/* 2. CORE VALUE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 bg-zinc-900/20 border border-white/5 rounded-2xl">
            <Briefcase className="h-8 w-8 text-primary mb-6" />
            <h3 className="text-white font-black uppercase italic tracking-widest mb-4">Advisor Sync</h3>
            <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
              Integrate your firm's custom rates and tax strategies directly into our calculation engines.
            </p>
          </div>
          <div className="p-8 bg-zinc-900/20 border border-white/5 rounded-2xl">
            <Globe className="h-8 w-8 text-primary mb-6" />
            <h3 className="text-white font-black uppercase italic tracking-widest mb-4">Lead Velocity</h3>
            <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
              Receive high-intent leads from users simulating complex debt-restructuring and capital allocation.
            </p>
          </div>
          <div className="p-8 bg-zinc-900/20 border border-white/5 rounded-2xl">
            <ShieldCheck className="h-8 w-8 text-primary mb-6" />
            <h3 className="text-white font-black uppercase italic tracking-widest mb-4">Verified Status</h3>
            <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed tracking-wider">
              Obtain the 'Newston Certified' badge for your digital presence, signaling institutional-grade methodology.
            </p>
          </div>
        </div>

        {/* 3. APPLICATION CTA SECTION */}
        <section className="relative overflow-hidden p-12 bg-zinc-900/40 border border-primary/20 rounded-3xl text-center">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Zap className="h-24 w-24 text-primary animate-pulse" />
          </div>
          
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-6">
            Initialize Partnership <span className="text-primary">Sequence</span>
          </h2>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-10 max-w-xl mx-auto">
            We are currently selecting a limited number of high-authority partners for the 2026 fiscal rollout.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="mailto:partners@thenewston.com" 
              className="w-full sm:w-auto px-10 py-4 bg-primary text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-all rounded"
            >
              Apply via Email
            </Link>
            <Link 
              href="/calculators" 
              className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-white/5 transition-all rounded"
            >
              View Terminal
            </Link>
          </div>
        </section>

        {/* 4. ELIGIBILITY LIST */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-16">
          <div className="space-y-6 text-left">
            <h4 className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">Mandatory Requirements</h4>
            <ul className="space-y-4">
              {[
                "Active FINRA/SEC Registration or State Equivalency",
                "Minimum 5-Year Clean Regulatory History",
                "Fiduciary Standards Alignment",
                "Proven Mastery of Amortization & Tax-Exempt Structures"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <CheckCircle2 className="h-3 w-3 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="p-8 bg-black border border-white/5 rounded-xl flex flex-col items-center gap-4">
               <Briefcase className="h-12 w-12 text-zinc-800" />
               <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest text-center max-w-[200px]">
                 Enterprise-level API integration available for larger firms.
               </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
