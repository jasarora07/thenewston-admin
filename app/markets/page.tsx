"use client"

import { useState, useMemo } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import MarketWidget from "@/components/market-widget"
import AdvancedChart from "@/components/advanced-chart"
import { ChevronDown, Globe, Map, Zap } from "lucide-react"

// Global Market Data Structure
const GLOBAL_MARKETS = {
  "US Indices": [
    { name: "S&P 500", s: "FOREXCOM:SPX500" },
    { name: "Nasdaq 100", s: "FOREXCOM:NSXUSD" },
    { name: "Dow Jones 30", s: "FOREXCOM:DJI" },
    { name: "Russell 2000", s: "FOREXCOM:RUT" },
  ],
  "European Indices": [
    { name: "FTSE 100 (UK)", s: "FOREXCOM:UK100" },
    { name: "DAX 40 (Germany)", s: "FOREXCOM:GER40" },
    { name: "CAC 40 (France)", s: "FOREXCOM:FRA40" },
    { name: "Euro Stoxx 50", s: "FOREXCOM:EU50" },
  ],
  "Asian Indices": [
    { name: "Nikkei 225 (Japan)", s: "TSE:8035" },
    { name: "Hang Seng (HK)", s: "HSI:HSI" },
    { name: "Nifty 50 (India)", s: "NSE:NIFTY" },
    { name: "ASX 200 (Australia)", s: "ASX:XJO" },
  ],
  "Global Commodities": [
    { name: "Gold", s: "TVC:GOLD" },
    { name: "Silver", s: "TVC:SILVER" },
    { name: "Crude Oil (WTI)", s: "TVC:USOIL" },
    { name: "Brent Oil", s: "TVC:UKOIL" },
    { name: "Natural Gas", s: "TVC:NATGAS" },
  ],
  "Major Crypto": [
    { name: "Bitcoin / USD", s: "BINANCE:BTCUSDT" },
    { name: "Ethereum / USD", s: "BINANCE:ETHUSDT" },
    { name: "Solana / USD", s: "BINANCE:SOLUSDT" },
  ]
}

type MarketCategory = keyof typeof GLOBAL_MARKETS;

export default function MarketsPage() {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>("US Indices")
  const [activeSymbol, setActiveSymbol] = useState("FOREXCOM:SPX500")

  // Handle category change: update category and reset symbol to the first item in that group
  const handleCategoryChange = (cat: MarketCategory) => {
    setActiveCategory(cat)
    setActiveSymbol(GLOBAL_MARKETS[cat][0].s)
  }

  return (
    <div className="min-h-screen bg-background">
      <TickerBar />
      <NewsHeader />

      <main className="container mx-auto px-4 py-8 space-y-10">
        <header className="border-b border-border/50 pb-6">
          <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary animate-pulse" />
            GLOBAL <span className="text-primary">TERMINAL</span>
          </h1>
        </header>

        {/* DUAL SELECTOR ENGINE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-secondary/20 p-6 rounded-2xl border border-primary/10 shadow-xl">
          
          {/* Dropdown 1: Region/Class */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Map className="h-3 w-3" /> 1. Select Region / Class
            </label>
            <div className="relative">
              <select 
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value as MarketCategory)}
                className="w-full h-14 bg-background border border-border rounded-xl px-5 text-sm font-bold text-white appearance-none cursor-pointer focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {Object.keys(GLOBAL_MARKETS).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          {/* Dropdown 2: Dynamic Symbols */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Zap className="h-3 w-3" /> 2. Select Instrument
            </label>
            <div className="relative">
              <select 
                value={activeSymbol}
                onChange={(e) => setActiveSymbol(e.target.value)}
                className="w-full h-14 bg-background border border-border rounded-xl px-5 text-sm font-bold text-white appearance-none cursor-pointer focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {GLOBAL_MARKETS[activeCategory].map((item) => (
                  <option key={item.s} value={item.s}>{item.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="rounded-2xl border border-border bg-[#131722] overflow-hidden h-[600px] shadow-2xl relative z-10">
          <AdvancedChart key={activeSymbol} symbol={activeSymbol} />
        </div>

        {/* FOOTER HEATMAP */}
        <section className="pt-6">
           <MarketWidget />
        </section>
      </main>
    </div>
  )
}
