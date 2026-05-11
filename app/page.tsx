import { createClient } from "@/lib/supabase/server"
import { NewsGrid } from "@/components/news-grid"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { MacroBar } from "@/components/macro-bar"
import Link from "next/link"
import { ArrowRight, Calculator, ShieldCheck, TrendingUp, Home } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch 15 items: 2 for Hero, 5 for Sidebar, 8 for Grid
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(15)

  const featured = newsItems?.slice(0, 2) || []
  const businessUpdates = newsItems?.slice(2, 7) || []
  const initialGridNews = newsItems?.slice(7, 15) || []

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

      <main className="flex-1 container mx-auto px-4 py-8">
        
        {/* TOP SECTION: HERO & SIDEBAR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {featured.map((item) => (
                <a key={item.id} href={item.url} target="_blank" className="group relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900 aspect-[4/5] md:aspect-auto flex flex-col">
                  <div className="relative flex-1 overflow-hidden">
                    <img 
                      src={item.imageUrl || "/api/placeholder/400/600"} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      alt="Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 p-5 space-y-2 w-full">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{item.source}</span>
                    <h2 className="text-sm md:text-base font-bold text-white uppercase leading-tight tracking-tighter line-clamp-3">
                      {item.title}
                    </h2>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/20 pb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                Business <span className="text-primary font-black">Updates</span>
              </h4>
            </div>
            <div className="space-y-5">
              {businessUpdates.map((item) => (
                <a key={item.id} href={item.url} target="_blank" className="flex gap-4 group items-start">
                  <div className="w-14 h-14 shrink-0 rounded border border-white/10 bg-zinc-900 overflow-hidden">
                    <img 
                      src={item.imageUrl || "/api/placeholder/100/100"} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                    />
                  </div>
                  <h5 className="font-bold text-[11px] leading-snug text-white group-hover:text-primary transition-colors uppercase">
                    {item.title}
                  </h5>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* --- INTELLIGENCE TERMINAL CTA --- */}
        <section className="bg-zinc-900 border border-white/5 rounded-3xl py-16 px-8 mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Institutional Access</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-6">
              The <span className="text-primary">Intelligence</span> Terminal
            </h2>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-10 max-w-2xl mx-auto leading-relaxed">
              Analyze mortgage pivot points and tax-exempt growth with encrypted 2026 fiscal modeling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculate-financials" className="bg-primary text-black font-black px-10 py-4 rounded-lg uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white transition-all group">
                Access Calculators <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/auth/gate" className="bg-black border border-white/10 text-white font-black px-10 py-4 rounded-lg uppercase tracking-widest text-[11px] hover:bg-white/5 transition-all">
                Initialize ID
              </Link>
            </div>
          </div>
        </section>

        {/* LATEST NEWS GRID */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black italic tracking-tighter uppercase text-white">
              Latest <span className="text-primary">News</span>
            </h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <NewsGrid initialItems={initialGridNews} totalCountBeforeGrid={7} />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center font-black text-black italic text-xs">N</div>
                <span className="font-black italic uppercase text-white tracking-tighter">The Newston</span>
              </div>
              <p className="text-[10px] leading-relaxed text-zinc-400 uppercase tracking-wider">
                Institutional grade financial intelligence. Real-time data and market analysis for the modern era.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Terminals</h5>
              <nav className="flex flex-col gap-2 text-[10px] font-bold uppercase text-zinc-500">
                <Link href="/calculate-financials" className="hover:text-primary transition-colors">Calculators</Link>
                <Link href="/markets" className="hover:text-primary transition-colors">Markets</Link>
                <Link href="/crypto" className="hover:text-primary transition-colors">Crypto Assets</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Contact</h5>
              <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-tight">info@thenewston.com</p>
            </div>

            <div className="space-y-4 text-right md:text-left">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Status</h5>
              <div className="flex items-center gap-2 justify-end md:justify-start">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Systems Nominal</span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em]">© 2026 THE NEWSTON INTELLIGENCE UNIT</p>
            <div className="flex gap-6 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
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
