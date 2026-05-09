import { createClient } from "@/lib/supabase/server"
import { NewsGrid } from "@/components/news-grid"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { MacroBar } from "@/components/macro-bar"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch initial 15 items: 2 for Hero, 5 for Sidebar, 8 for Grid
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(15)

  const featured = newsItems?.slice(0, 2) || []
  const businessUpdates = newsItems?.slice(2, 7) || []
  const initialGridNews = newsItems?.slice(7, 15) || []

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <TickerBar />
      <NewsHeader />
      <MacroBar />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-16">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feature Cards (2) */}
          <div className="lg:col-span-8 space-y-8">
            {featured.map((item) => (
              <a key={item.id} href={item.url} target="_blank" className="group block relative aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
                <img src={item.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-8 space-y-3">
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest">{item.source}</p>
                   <h2 className="text-2xl font-black text-white italic uppercase leading-none tracking-tighter">{item.title}</h2>
                </div>
              </a>
            ))}
          </div>

          {/* Business Sidebar (5) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 border-b border-white/5 pb-2">Business Updates</h4>
            {businessUpdates.map((item) => (
              <a key={item.id} href={item.url} target="_blank" className="flex gap-4 group">
                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-white/5 bg-zinc-900">
                  <img src={item.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h5 className="font-bold text-xs leading-snug group-hover:text-primary transition-colors text-zinc-300">{item.title}</h5>
              </a>
            ))}
          </div>
        </section>

        {/* LATEST NEWS GRID SECTION */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
             <div className="h-px bg-white/10 flex-1" />
             <h2 className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">Latest <span className="text-primary">Intelligence</span></h2>
             <div className="h-px bg-white/10 flex-1" />
          </div>
          
          <NewsGrid initialItems={initialGridNews} />
        </section>
      </main>
    </div>
  )
}
