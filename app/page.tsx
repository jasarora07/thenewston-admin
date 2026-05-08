import React from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { createClient } from "@/lib/supabase/server"
import { Clock, ArrowUpRight, Newspaper, ChevronDown } from "lucide-react"
import Link from "next/link"

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
      <NewsHeader />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        
        {/* HERO & SIDEBAR: Height Matched, Hero Width Reduced to 60% */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Hero Section: lg:col-span-9 represents 75% of a 12-column grid */}
          <div className="lg:col-span-9 group flex">
            {featured ? (
              <a href={featured.url} target="_blank" rel="noopener noreferrer" 
                 className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted flex flex-col justify-end min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10" />
                <img 
                  src={featured.imageUrl} 
                  className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000"
                  alt={featured.title}
                />
                <div className="relative p-6 md:p-10 z-20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary text-primary-foreground text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      FEATURED NEWS
                    </span>
                    <span className="text-white/60 text-[9px] font-bold uppercase flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tighter italic uppercase max-w-2xl">
                    {featured.title}
                  </h2>
                </div>
              </a>
            ) : null}
          </div>
          
          {/* SIDEBAR: Business Updates (40% width) */}
          <div className="lg:col-span-3 flex">
            <div className="w-full p-6 rounded-2xl bg-secondary/10 border border-border flex flex-col">
              <h3 className="text-[10px] font-black flex items-center gap-2 mb-6 text-primary italic tracking-widest uppercase">
                <Newspaper className="h-3.5 w-3.5" /> Business Updates
              </h3>
              <div className="space-y-5 flex-1">
                {businessUpdates?.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="group block border-b border-border/40 pb-3 last:border-0">
                    <div>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">{item.source}</p>
                      <h4 className="font-bold text-[11px] leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST NEWS GRID (8 Items) */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-lg font-black italic tracking-tighter uppercase">LATEST <span className="text-primary">NEWS</span></h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {latestNewsGrid?.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="space-y-3 group">
                <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted">
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

          <div className="flex justify-center pt-12">
            <button className="px-10 py-3 border border-border rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-secondary/20 transition-all">
              Access News Archive <ChevronDown className="ml-2 h-3 w-3 inline" />
            </button>
          </div>
        </div>
      </main>

      {/* COMPREHENSIVE COMPLIANCE FOOTER */}
      <footer className="border-t border-border/40 py-16 bg-secondary/5 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-black tracking-tighter italic mb-4">THE<span className="text-primary">NEWSTON</span></h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                The Newston provides institutional-grade market data and proprietary financial news feeds. Built for the modern terminal user.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Company</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/about" className="text-[11px] font-bold text-muted-foreground hover:text-foreground">About Us</Link>
                <Link href="/contact" className="text-[11px] font-bold text-muted-foreground hover:text-foreground">Contact</Link>
                <Link href="/careers" className="text-[11px] font-bold text-muted-foreground hover:text-foreground">Careers</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Legal & Compliance</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/privacy" className="text-[11px] font-bold text-muted-foreground hover:text-foreground">Privacy Policy</Link>
                <Link href="/terms" className="text-[11px] font-bold text-muted-foreground hover:text-foreground">Terms of Service</Link>
                <Link href="/gdpr" className="text-[11px] font-bold text-muted-foreground hover:text-foreground">GDPR Statement</Link>
                <Link href="/ccpa" className="text-[11px] font-bold text-muted-foreground hover:text-foreground">California Privacy Rights</Link>
              </nav>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest text-center">
              © 2026 THE NEWSTON TERMINAL. ALL CONTENT PROPRIETARY. UNLAWFUL DISTRIBUTION PROHIBITED.
            </p>
            <div className="flex gap-6">
               <span className="text-[9px] font-black text-primary">LIVE DATA FEED ACTIVE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
