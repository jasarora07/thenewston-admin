"use client"

import React, { useState } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import AdvancedChart from "@/components/advanced-chart"
import { ChevronDown, Globe, Map, Zap, Building2 } from "lucide-react"

// This list only includes the "heavy hitters" for each index to keep the file light
const MARKET_DATA = {
  "North America": {
    "S&P 500": [
      { name: "Index Overview", s: "FOREXCOM:SPX500" },
      { name: "Apple", s: "NASDAQ:AAPL" },
      { name: "Microsoft", s: "NASDAQ:MSFT" },
      { name: "NVIDIA", s: "NASDAQ:NVDA" },
      { name: "Amazon", s: "NASDAQ:AMZN" },
    ],
    "Nasdaq 100": [
      { name: "Index Overview", s: "FOREXCOM:NSXUSD" },
      { name: "Tesla", s: "NASDAQ:TSLA" },
      { name: "Google", s: "NASDAQ:GOOGL" },
      { name: "Meta", s: "NASDAQ:META" },
    ],
    "Dow Jones": [
      { name: "Index Overview", s: "FOREXCOM:DJI" },
      { name: "Goldman Sachs", s: "NYSE:GS" },
      { name: "JPMorgan", s: "NYSE:JPM" },
      { name: "Visa", s: "NYSE:V" },
    ]
  },
  "Europe": {
    "FTSE 100 (UK)": [
      { name: "Index Overview", s: "FOREXCOM:UK100" },
      { name: "AstraZeneca", s: "LSE:AZN" },
      { name: "Shell", s: "LSE:SHEL" },
      { name: "HSBC", s: "LSE:HSBA" },
    ],
    "DAX 40 (Germany)": [
      { name: "Index Overview", s: "FOREXCOM:GER40" },
      { name: "SAP", s: "XETR:SAP" },
      { name: "Siemens", s: "XETR:SIE" },
      { name: "Allianz", s: "XETR:ALV" },
    ],
    "CAC 40 (France)": [
      { name: "Index Overview", s: "FOREXCOM:FRA40" },
      { name: "LVMH", s: "EURONEXT:MC" },
      { name: "TotalEnergies", s: "EURONEXT:TTE" },
      { name: "L'Oreal", s: "EURONEXT:OR" },
    ]
  }
}

export default function MarketsPage() {
  const [region, setRegion] = useState<keyof typeof MARKET_DATA>("North America")
  const [index, setIndex] = useState(Object.keys(MARKET_DATA["North America"])[0])
  const [symbol, setSymbol] = useState(MARKET_DATA["North America"]["S&P 500"][0].s)

  const handleRegionChange = (val: string) => {
    const r = val as keyof typeof MARKET_DATA
    setRegion(r)
    const firstIndex = Object.keys(MARKET_DATA[r])[0]
    setIndex(firstIndex)
    // @ts-ignore
    setSymbol(MARKET_DATA[r][firstIndex][0].s)
  }

  const handleIndexChange = (val: string) => {
    setIndex(val)
    // @ts-ignore
    setSymbol(MARKET_DATA[region][val][0].s)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TickerBar />
      <NewsHeader />

      <main className="flex-1 container mx-auto px-4 py-10 space-y-8">
        <header className="border-b border-border/40 pb-6">
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3 italic">
            WESTERN <span className="text-primary italic">TERMINAL</span>
          </h1>
        </header>

        {/* TRIPLE SELECTOR BOX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-secondary/10 p-6 rounded-2xl border border-border/60">
          
          {/* 1. Region */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Map className="h-3 w-3" /> Region
            </label>
            <select 
              value={region} 
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none"
            >
              {Object.keys(MARKET_DATA).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* 2. Index */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Zap className="h-3 w-3" /> Index
            </label>
            <select 
              value={index} 
              onChange={(e) => handleIndexChange(e.target.value)}
              className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none"
            >
              {/* @ts-ignore */}
              {Object.keys(MARKET_DATA[region]).map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          {/* 3. Symbol */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Building2 className="h-3 w-3" /> Symbol
            </label>
            <select 
              value={symbol} 
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none"
            >
              {/* @ts-ignore */}
              {MARKET_DATA[region][index].map(stock => (
                <option key={stock.s} value={stock.s}>{stock.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* THE CHART - It will now react to all 3 dropdowns */}
        <div className="rounded-xl border border-border bg-[#131722] overflow-hidden h-[600px] shadow-2xl relative z-10">
          <AdvancedChart key={symbol} symbol={symbol} />
        </div>

        {/* OPTIONAL: Keep the scanner as a broad overview only */}
        <section className="space-y-4 pt-10">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Momentum Scanner</h2>
          <div className="h-[600px] rounded-xl border border-border overflow-hidden">
             <MarketScanner key={region} market={region === "North America" ? "america" : "europe"} />
          </div>
        </section>
      </main>
    </div>
  )
}

function MarketScanner({ market }: { market: string }) {
  const container = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
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
        "market": market,
        "showToolbar": true,
        "colorTheme": "dark",
        "locale": "en"
      })
      container.current.appendChild(script)
    }
  }, [market])
  return <div ref={container} className="h-full w-full" />
}
