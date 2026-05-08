"use client"

import React from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { Clock, Flame, ArrowUpRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Global Scrolling Ticker */}
      <TickerBar />
      
      {/* Main Navigation & Branding */}
      <NewsHeader />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        
        {/* HERO SECTION: Featured News */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1611974714851-48206138d73e?q=80&w=2070&auto=format&fit=crop" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                alt="Main Market Story"
              />
              <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Market Alert</span>
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 12 MIN AGO
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter italic uppercase">
                  Global Liquidity <span className="text-primary">Surge</span>: How Markets are Reacting to Q2 Shifts
                </h2>
              </div>
            </div>
          </div>
          
          {/* TRENDING SIDEBAR (TOP) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex-1 p-6 rounded-2xl bg-secondary/10 border border-border">
              <h3 className="text-xs font-black flex items-center gap-2 mb-6 text-primary italic tracking-widest uppercase">
                <Flame className="h-4 w-4" /> Market Momentum
              </h3>
              <div className="space-y-6">
                {[
                  "Why Bitcoin is decoupling from tech stocks in 2026.",
                  "European energy markets face new volatility hurdles.",
                  "Institutional pivot: The return to commodity-backed assets."
                ].map((headline, i) => (
                  <div key={i} className="group cursor-pointer border-b border-border/40 pb-4 last:border-0">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                        {headline}
                      </h4>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST NEWS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-xl font-black italic tracking-tighter">LATEST <span className="text-primary">INTELLIGENCE</span></h2>
              <button className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">View All Analysis</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 4, 5].map((i) => (
                <div key={i} className="space-y-4 group cursor-pointer">
                  <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                    <img 
                      src={`https://images.unsplash.com/photo-1640343130733-0e4125bd549b?q=80&w=800&auto=format&fit=crop&sig=${i}`} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      alt="news thumbnail"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Quarterly Report</p>
                    <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                      The impact of algorithmic trading on mid-cap volatility in Western markets.
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEWSLETTER / CTA SIDEBAR */}
          <aside className="space-y-8">
            <div className="bg-primary p-8 rounded-2xl text-primary-foreground relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-black italic text-2xl mb-2 tracking-tighter">THE TERMINAL</h3>
                <p className="text-sm opacity-90 mb-6 font-medium leading-relaxed">
                  Get institutional-grade insights delivered to your inbox every morning.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="ENTER EMAIL" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-xs font-bold placeholder:text-white/40 focus:outline-none focus:bg-white/20"
                  />
                  <button className="w-full bg-white text-black font-black py-3 rounded-lg text-xs uppercase tracking-widest hover:invert transition-all">
                    Access Intelligence
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* CLEAN FOOTER */}
      <footer className="border-t border-border/40 py-12 bg-secondary/5 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h2 className="text-xl font-black tracking-tighter italic">THE<span className="text-primary">NEWSTON</span></h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Institutional Grade News Terminal</p>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            © 2026 ALL RIGHTS RESERVED • PROPRIETARY INTELLIGENCE
          </p>
        </div>
      </footer>
    </div>
  )
}
