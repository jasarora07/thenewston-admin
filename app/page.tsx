import React from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { createClient } from "@/lib/supabase/server"
import { Clock, Flame, ArrowUpRight, Newspaper, ChevronDown } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetching 10 items to fill: 1 (Hero) + 5 (Sidebar) + 4 (Grid)
  const { data: newsItems, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(10)

  const featured = newsItems?.[0]
  const businessUpdates = newsItems?.slice(1, 6) // Grabs next 5 for sidebar
  const intelligenceGrid = newsItems?.slice(6, 10) // Grabs remaining 4 for grid

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TickerBar />
      <NewsHeader />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        
        {/* HERO SECTION: 75% Scale Applied */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 group">
            {featured ? (
              <a href={featured.url} target="_blank" rel="noopener noreferrer" 
                 className="relative block aspect-[21/9] overflow-hidden rounded-2xl border border-border bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                <img 
                  src={featured.imageUrl} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  alt={featured.title}
                />
                <div className="absolute bottom-0 left-0 p-5 md:p-8 z-20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary text-primary-foreground text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {featured.category}
                    </span>
                    <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tighter italic uppercase">
                    {featured.title}
                  </h2>
                </div>
              </a>
            ) : null}
          </div>
          
          {/* BUSINESS UPDATES SIDEBAR (Now 5 items) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex-1 p-6 rounded-2xl bg-secondary/10 border border-border">
              <h3 className="text-xs font-black flex items-center gap-2 mb-6 text-primary italic tracking-widest uppercase">
                <Newspaper className="h-4 w-4" /> Business Updates
              </h3>
              <div className="space-y-5">
                {businessUpdates?.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="group block border-b border-border/40 pb-3 last:border-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">{item.source}</p>
                        <h4 className="font-bold text-xs leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-primary shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST INTELLIGENCE GRID (4 items) */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-black italic tracking-tighter uppercase">LATEST <span className="text-primary">INTELLIGENCE</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {intelligenceGrid?.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="space-y-3 group">
                <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                  <img src={item.imageUrl} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{item.source}</p>
                  <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          {/* LOAD MORE BUTTON */}
          <div className="flex justify-center pt-8">
            <button className="flex items-center gap-2 px-8 py-3 border border-border rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-secondary/10 transition-all">
              Load Historical Intelligence <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-12 bg-secondary/5 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-xl font-black tracking-tighter italic">THE<span className="text-primary">NEWSTON</span></h2>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            © 2026 PROPRIETARY TERMINAL FEED
          </p>
        </div>
      </footer>
    </div>
  )
}
