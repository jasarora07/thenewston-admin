"use client"

import React from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import { FeaturedNews } from "@/components/featured-news"
import { NewsGrid } from "@/components/news-grid"
import { TrendingSidebar } from "@/components/trending-sidebar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Global Live Ticker */}
      <TickerBar />
      
      {/* Branding and Navigation */}
      <NewsHeader />

      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        {/* Top Story Section */}
        <section>
          <FeaturedNews />
        </section>

        {/* Main Content Area: News Grid + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <header className="flex items-center justify-between border-b border-border/40 pb-4">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">
                Latest <span className="text-primary">Intelligence</span>
              </h2>
            </header>
            
            <NewsGrid />
          </div>

          {/* Sidebar with Trending Content */}
          <aside className="space-y-10">
            <TrendingSidebar />
          </aside>
        </div>
      </main>
      
      {/* Footer / Bottom Spacer */}
      <footer className="border-t border-border/40 py-10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            © 2026 THE NEWSTON TERMINAL • ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  )
}
