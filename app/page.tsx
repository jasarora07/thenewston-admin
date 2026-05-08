import React from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { createClient } from "@/lib/supabase/server"
import { Clock, Flame, ArrowUpRight, Newspaper } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()

  // 1. Fetching all 10 columns from your Supabase table
  const { data: newsItems, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(6)

  // Use the first item for the Hero Section
  const featured = newsItems?.[0]
  const trending = newsItems?.slice(1, 4)
  const remaining = newsItems?.slice(4)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TickerBar />
      <NewsHeader />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        
        {/* HERO SECTION: Dynamic from DB */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 group">
            {featured ? (
              <a href={featured.url} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                <img 
                  src={featured.imageUrl || "https://images.unsplash.com/photo-1611974714851-48206138d73e"} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  alt={featured.title}
                />
                <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {featured.category}
                    </span>
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter italic uppercase">
                    {featured.title}
                  </h2>
                </div>
              </a>
            ) : (
              <div className="aspect-[16/9] rounded-2xl bg-secondary/10 flex items-center justify-center text-muted-foreground italic">No Featured Intel Found</div>
            )}
          </div>
          
          {/* TRENDING SIDEBAR (TOP 3) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex-1 p-6 rounded-2xl bg-secondary/10 border border-border">
              <h3 className="text-xs font-black flex items-center gap-2 mb-6 text-primary italic tracking-widest uppercase">
                <Flame className="h-4 w-4" /> Market Momentum
              </h3>
              <div className="space-y-6">
                {trending?.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="group block border-b border-border/40 pb-4 last:border-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">{item.source}</p>
                        <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST NEWS GRID (Remaining Items) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-xl font-black italic tracking-tighter uppercase">LATEST <span className="text-primary">INTELLIGENCE</span></h2>
              <span className="text-[10px] font-black text-muted-foreground tracking-widest animate-pulse">● LIVE TERMINAL FEED</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remaining?.map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="space-y-4 group">
                  <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                    <img 
                      src={item.imageUrl} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">{item.source}</p>
                      <span className="text-muted-foreground text-[10px]">•</span>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.date}</p>
                    </div>
                    <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* NEWSLETTER SIDEBAR */}
          <aside className="space-y-8">
            <div className="bg-primary p-8 rounded-2xl text-primary-foreground">
              <h3 className="font-black italic text-2xl mb-2 tracking-tighter uppercase">THE TERMINAL</h3>
              <p className="text-sm opacity-90 mb-6 font-medium leading-relaxed">
                Automated institutional-grade insights.
              </p>
              <div className="space-y-3">
                <input type="email" placeholder="ENTER EMAIL" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-xs font-bold focus:outline-none focus:bg-white/20" />
                <button className="w-full bg-white text-black font-black py-3 rounded-lg text-xs uppercase tracking-widest hover:invert transition-all">Join Pulse</button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-border/40 py-12 bg-secondary/5 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-black tracking-tighter italic">THE<span className="text-primary">NEWSTON</span></h2>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            © 2026 POWERED BY SUPABASE & GITHUB AUTOMATION
          </p>
        </div>
      </footer>
    </div>
  )
}
