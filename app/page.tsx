"use client"

import React from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { HomeMarketBar } from "@/components/home-market-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 1. Global Price Tape (Smallest top bar) */}
      <TickerBar />
      
      {/* 2. Navigation & Branding */}
      <NewsHeader />
      
      {/* 3. Live Market Pulse (The dynamic replacement) */}
      <section className="border-b border-border/40 bg-secondary/5">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            {/* Live Indicator Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              Real-Time Terminal • Global Pulse
            </p>
          </div>
          
          {/* Your new live scrolling component */}
          <HomeMarketBar />
        </div>
      </section>

      {/* 4. Main News Content */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Your existing news articles and sections go here */}
           <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-black italic tracking-tighter">FEATURED <span className="text-primary">STORIES</span></h2>
              {/* News Cards... */}
           </div>
           
           <aside className="space-y-8">
              {/* Trending Sidebar... */}
           </aside>
        </div>
      </main>
    </div>
  )
}
