import { createClient } from "@/lib/supabase/server"
import { NewsGrid } from "@/components/news-grid"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { MacroBar } from "@/components/macro-bar"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  // We fetch 15: 2 for Hero, 5 for Sidebar, 8 for Grid
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(15)

  const featured = newsItems?.slice(0, 2) || []
  const businessUpdates = newsItems?.slice(2, 7) || []
  const initialGridNews = newsItems?.slice(7, 15) || []

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans">
      <TickerBar />
      <NewsHeader />
      <MacroBar />

      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* HERO & SIDEBAR SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Hero Section: Two stacked 16:9 cards */}
          <div className="lg:col-span-8 space-y-6">
            {featured.map((item) => (
              <a key={item.id} href={item.url} target="_blank" className="group block relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                <img src={item.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6 space-y-2">
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest">{item.source}</p>
                   <h2 className="text-xl font-bold text-white uppercase leading-tight tracking-tighter">{item.title}</h2>
                </div>
              </a>
            ))}
          </div>

          {/* Business Update: Height-matched to Hero */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4 px-1">Business Updates</h4>
            <div className="flex-1 space-y-5">
              {businessUpdates.map((item) => (
                <a key={item.id} href={item.url} target="_blank" className="flex gap-4 group items-center">
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-white/5 bg-zinc-900">
                    <img src={item.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <h5 className="font-bold text-[11px] leading-snug group-hover:text-primary transition-colors text-zinc-300 line-clamp-2 uppercase">
                    {item.title}
                  </h5>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* NEWS GRID SECTION */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
             <h2 className="text-lg font-black italic tracking-tighter uppercase whitespace-nowrap text-white">Latest <span className="text-primary">Intelligence</span></h2>
             <div className="h-px bg-white/10 flex-1" />
          </div>
          {/* Passing the next 8 items to avoid duplication */}
          <NewsGrid initialItems={initialGridNews} totalCountBeforeGrid={7} />
        </section>
      </main>
    </div>
  )
}
