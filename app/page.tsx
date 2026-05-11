import { createClient } from "@/lib/supabase/server"
import { NewsGrid } from "@/components/news-grid"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { MacroBar } from "@/components/macro-bar"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Home, Banknote } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch 15 items
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(15)

  // Distribution
  const topStory = newsItems?.slice(0, 1) || []
  const secondStory = newsItems?.slice(1, 2) || []
  const businessUpdates = newsItems?.slice(2, 5) || [] // Taking top 3 for the sub-hero row
  const initialGridNews = newsItems?.slice(5, 15) || []

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "The Newston",
    "url": "https://thenewston.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://thenewston.com/logo.png"
    },
    "sameAs": ["https://twitter.com/thenewston"]
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <TickerBar />
      <NewsHeader />
      <MacroBar />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        
        {/* --- SPLIT HERO SECTION --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: PRIMARY TOP STORY */}
          <div className="lg:col-span-6">
            {topStory.map((item) => (
              <a key={item.id} href={item.url} target="_blank" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 flex flex-col h-[450px] lg:h-full">
                <div className="relative flex-1 overflow-hidden">
                  <img 
                    src={item.imageUrl || "/api/placeholder/600/800"} 
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                    alt="Top News"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 p-8 space-y-3 w-full">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-2 py-1 rounded">Flash // Top Story</span>
                  <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight tracking-tighter">
                    {item.title}
                  </h2>
                </div>
              </a>
            ))}
          </div>

          {/* RIGHT: INTELLIGENCE TERMINAL (CONVERSION) */}
          <div className="lg:col-span-6 relative overflow-hidden bg-zinc-950 border-2 border-primary/20 rounded-2xl flex flex-col items-center justify-center p-8 md:p-12 text-center group hover:border-primary/50 transition-all shadow-[0_0_50px_-12px_rgba(22,163,74,0.2)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-6 w-full max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Institutional Access // Free Tool</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.95]">
                Analyze Your <span className="text-primary group-hover:text-white transition-colors">Mortgage Saving</span> Potential
              </h2>

              <div className="grid grid-cols-1 gap-3 text-left">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-4">
                  <Home className="h-5 w-5 text-zinc-500 shrink-0" />
                  <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed">
                    Project break-even and interest savings on <span className="text-white">New 2026 Rates</span>.
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-4">
                  <Banknote className="h-5 w-5 text-zinc-500 shrink-0" />
                  <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed">
                    Modeling tax-advantaged accounts. <span className="text-primary animate-pulse">100% Free Analysis</span>.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/calculate-financials" className="flex-1 bg-primary text-black font-black px-6 py-4 rounded-lg uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg shadow-primary/20">
                  Access Calculators <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/auth/gate?mode=signup" className="flex-1 bg-black border border-white/20 text-white font-black px-6 py-4 rounded-lg uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all text-center">
                  Initialize ID
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECONDARY NEWS ROW (Replaces Sidebar) --- */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Second major story */}
          <div className="md:col-span-2">
            {secondStory.map((item) => (
              <a key={item.id} href={item.url} target="_blank" className="group flex gap-6 p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-primary/20 transition-all h-full">
                <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden border border-white/10">
                  <img src={item.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{item.source}</span>
                  <h3 className="text-sm font-bold text-white uppercase leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
              </a>
            ))}
          </div>
          
          {/* Top 2 Business Updates */}
          {businessUpdates.slice(0, 2).map((item) => (
            <a key={item.id} href={item.url} target="_blank" className="group p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-white/10 flex flex-col justify-between">
              <span className="text-[8px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" /> Market Update
              </span>
              <h3 className="text-[11px] font-bold text-zinc-300 uppercase leading-snug group-hover:text-white transition-colors">{item.title}</h3>
            </a>
          ))}
        </section>

        {/* --- LATEST NEWS GRID --- */}
        <section className="space-y-8 pt-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black italic tracking-tighter uppercase text-white">
              Latest <span className="text-primary">News</span>
            </h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <NewsGrid initialItems={initialGridNews} totalCountBeforeGrid={5} />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12 mt-20 text-[10px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center font-black text-black italic text-xs">N</div>
                <span className="font-black italic uppercase text-white tracking-tighter">The Newston</span>
              </div>
              <p className="leading-relaxed text-zinc-400 uppercase tracking-wider max-w-[200px]">
                Institutional grade financial intelligence. 2026 Fiscal parameters applied.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-black uppercase tracking-widest text-white">Terminals</h5>
              <nav className="flex flex-col gap-2 font-bold uppercase text-zinc-500">
                <Link href="/calculate-financials" className="hover:text-primary transition-colors">Free Calculators</Link>
                <Link href="/markets" className="hover:text-primary transition-colors">Markets</Link>
                <Link href="/crypto" className="hover:text-primary transition-colors">Crypto Assets</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="font-black uppercase tracking-widest text-white">Contact</h5>
              <p className="font-mono text-zinc-400 uppercase">info@thenewston.com</p>
            </div>

            <div className="space-y-4 text-right md:text-left">
              <h5 className="font-black uppercase tracking-widest text-white">Status</h5>
              <div className="flex items-center gap-2 justify-end md:justify-start">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-black text-emerald-500 uppercase tracking-widest">Terminal Online</span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 font-bold uppercase tracking-[0.2em]">
            <p>© 2026 THE NEWSTON INTELLIGENCE UNIT</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span className="hover:text-white cursor-pointer transition-colors">API [V1]</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
