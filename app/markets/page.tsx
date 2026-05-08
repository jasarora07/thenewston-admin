"use client"

import React, { useState, useEffect, useRef } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import AdvancedChart from "@/components/advanced-chart"
import { ChevronDown, Globe, Map, Zap, LayoutList } from "lucide-react"

const DATA_TREE = {
  "North America": {
    marketId: "america",
    indices: {
      "S&P 500": "SPX500",
      "Nasdaq 100": "NAS100",
      "Dow 30": "DJI",
    }
  },
  "Europe": {
    marketId: "uk", // 'uk' or 'france' etc. 'uk' is a good global default for EU
    indices: {
      "FTSE 100 (UK)": "UK100",
      "DAX 40 (Germany)": "GER40",
      "CAC 40 (France)": "FRA40",
      "Euro Stoxx 50": "EU50",
    }
  }
}

export default function MarketsPage() {
  const [region, setRegion] = useState<keyof typeof DATA_TREE>("North America")
  const [indexLabel, setIndexLabel] = useState(Object.keys(DATA_TREE["North America"].indices)[0])
  
  // Logic to get the correct symbol and market ID
  const activeMarketId = DATA_TREE[region].marketId
  const activeIndexSymbol = DATA_TREE[region].indices[indexLabel as keyof (typeof DATA_TREE)["North America"]["indices"]]

  const handleRegionChange = (newRegion: keyof typeof DATA_TREE) => {
    setRegion(newRegion)
    const firstIndex = Object.keys(DATA_TREE[newRegion].indices)[0]
    setIndexLabel(firstIndex)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TickerBar />
      <NewsHeader />

      <main className="container mx-auto px-4 py-10 space-y-8">
        <header className="border-b border-border/40 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              WESTERN <span className="text-primary">TERMINAL</span>
            </h1>
            <p className="text-muted-foreground text-[10px] mt-1 uppercase tracking-[0.2em]">Real-Time Market Intelligence</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/10 p-6 rounded-2xl border border-border/60">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Map className="h-3 w-3" /> 1. Region
            </label>
            <div className="relative">
              <select 
                value={region}
                onChange={(e) => handleRegionChange(e.target.value as any)}
                className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none cursor-pointer"
              >
                {Object.keys(DATA_TREE).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Zap className="h-3 w-3" /> 2. Index
            </label>
            <div className="relative">
              <select 
                value={indexLabel}
                onChange={(e) => setIndexLabel(e.target.value)}
                className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none cursor-pointer"
              >
                {Object.keys(DATA_TREE[region].indices).map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-[#131722] overflow-hidden h-[550px] shadow-2xl">
          <AdvancedChart key={activeIndexSymbol} symbol={`FOREXCOM:${activeIndexSymbol}`} />
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1 text-primary">
            <LayoutList className="h-4 w-4" />
            <h2 className="text-[10px] font-black uppercase tracking-widest">
              {indexLabel} — Full Component Scanner
            </h2>
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden h-[600px]">
            {/* We pass the marketId as a key to force a full widget refresh */}
            <MarketScanner key={activeMarketId} market={activeMarketId} />
          </div>
        </section>
      </main>
    </div>
  )
}

function MarketScanner({ market }: { market: string }) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ""
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        "width": "100%",
        "height": "100%",
        "defaultColumn": "overview",
        "defaultScreen": "most_capitalized",
        "market": market, // Dynamically set based on region selection
        "showToolbar": true,
        "colorTheme": "dark",
        "locale": "en"
      })
      container.current.appendChild(script)
    }
  }, [market])

  return <div ref={container} className="h-full w-full" />
}
