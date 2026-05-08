import React from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { createClient } from "@/lib/supabase/server"
import { Clock, ArrowUpRight, Newspaper, ChevronDown } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch 14 items: 1 Hero, 5 Sidebar, 8 Grid
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(14)

  const featured = newsItems?.[0]
  const businessUpdates = newsItems?.slice(1, 6)
  const latestNewsGrid = newsItems?.slice(6, 14)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TickerBar />
      {/* Search is enabled within the NewsHeader component */}
      <NewsHeader />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        
        {/* HERO SECTION: Ultra-Compact (75% reduction scale) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 group">
            {featured ? (
              <a href={featured.url} target="_blank" rel="noopener noreferrer" 
                 className="relative block aspect-[25/7] overflow-hidden rounded-2xl border border-border bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10" />
                <img 
                  src={featured.imageUrl} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000"
                  alt={featured.title}
                />
                <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-primary text-primary-foreground text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      FEATURED NEWS
                    </span>
                    <span className="text-white/60 text-[8px] font-bold uppercase flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-3xl font-black text-white leading-tight tracking-tighter italic uppercase max-w-[90%]">
                    {featured.title}
                  </h2>
                </div>
              </a>
            ) : null}
          </div>
          
          {/* SIDEBAR: Business Updates */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex-1 p-6 rounded-2xl bg-secondary/10 border border-border">
              <h3 className="text-[10px] font-black flex items-center gap-2 mb-6 text-primary italic tracking-widest uppercase">
                <Newspaper className="h-3.5 w-3.5" /> Business Updates
              </h3>
              <div className="space-y-4">
                {businessUpdates?.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="group block border-b border-border/40 pb-3 last:border-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">{item.source}</p>
                        <h4 className="font-bold text-[11px] leading-tight group-hover:text-primary transition-colors line-clamp-2">
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

        {/* LATEST NEWS: 8 Item Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-lg font-black italic tracking-tighter uppercase">LATEST <span className="text-primary">NEWS</span></h2>
            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Global Feed • Live Terminal</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {latestNewsGrid?.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="space-y-3 group">
                <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted shadow-sm">
                  <img src={item.imageUrl} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[8px] font-black text-primary uppercase tracking-widest">{item.source}</p>
                    <p className="text-[8px] font-bold text-muted-foreground">{item.date.split('T')[0]}</p>
                  </div>
                  <h3 className="font-bold text-xs leading-snug group-hover:text-primary transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          {/* LOAD MORE */}
          <div className="flex justify-center pt-12">
            <button className="px-10 py-3 border border-border rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Access News Archive <ChevronDown className="ml-2 h-3 w-3 inline" />
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-12 bg-secondary/5 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-black tracking-tighter italic">THE<span className="text-primary">NEWSTON</span></h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Institutional Grade News Terminal</p>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            © 2026 ALL RIGHTS RESERVED • PROPRIETARY NEWS FEED
          </p>
        </div>
      </footer>
    </div>
  )
}
