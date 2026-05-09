import { createClient } from "@/lib/supabase/server"
import { NewsGrid } from "@/components/news-grid"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { MacroBar } from "@/components/macro-bar"
import Link from "next/link"

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

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans flex flex-col">
      <TickerBar />
      <NewsHeader />
      <MacroBar />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-16">
        
        {/* TOP SECTION: HERO & SIDEBAR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* HERO: Two Posts Side by Side */}
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

          {/* BUSINESS UPDATES: Color Corrected */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Business Updates</h4>
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
                  <h5 className="font-bold text-[11px] leading-snug text-zinc-300 group-hover:text-primary transition-colors uppercase">
                    {item.title}
                  </h5>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST NEWS GRID */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black italic tracking-tighter uppercase text-white">Latest <span className="text-primary">Intelligence</span></h2>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <NewsGrid initialItems={initialGridNews} totalCountBeforeGrid={7} />
        </section>
      </main>

      {/* FOOTER: Fixed with Privacy Link */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center font-black text-black italic text-xs">N</div>
                <span className="font-black italic uppercase text-white tracking-tighter">The Newston</span>
              </div>
              <p className="text-[10px] leading-relaxed text-zinc-600 uppercase tracking-wider">
                Institutional grade financial intelligence. Real-time data and market analysis for the modern era.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Terminals</h5>
              <nav className="flex flex-col gap-2 text-[10px] font-bold uppercase text-zinc-500">
                <Link href="/markets" className="hover:text-primary transition-colors">Markets</Link>
                <Link href="/crypto" className="hover:text-primary transition-colors">Crypto Assets</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Contact</h5>
              <p className="text-[10px] font-mono text-zinc-600 uppercase">terminal@thenewston.com</p>
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
            <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]">© 2026 THE NEWSTON INTELLIGENCE UNIT</p>
            <div className="flex gap-6 text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em]">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">API</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
