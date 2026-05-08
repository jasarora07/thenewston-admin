"use client"

import React, { useState } from "react"
import { TickerBar } from "@/components/ticker-bar"
import { NewsHeader } from "@/components/news-header"
import AdvancedChart from "@/components/advanced-chart"
import { ChevronDown, Globe, Map, Zap, Building2 } from "lucide-react"

const MARKET_DATA = {
  "North America": {
    "S&P 500": [
      { name: "Index Overview", s: "FOREXCOM:SPX500" },
      { name: "Apple (AAPL)", s: "NASDAQ:AAPL" },
      { name: "Microsoft (MSFT)", s: "NASDAQ:MSFT" },
      { name: "NVIDIA (NVDA)", s: "NASDAQ:NVDA" },
      { name: "Amazon (AMZN)", s: "NASDAQ:AMZN" },
      { name: "Meta (META)", s: "NASDAQ:META" },
      { name: "Alphabet A (GOOGL)", s: "NASDAQ:GOOGL" },
      { name: "Alphabet C (GOOG)", s: "NASDAQ:GOOG" },
      { name: "Berkshire Hathaway (BRK.B)", s: "NYSE:BRK.B" },
      { name: "Eli Lilly (LLY)", s: "NYSE:LLY" },
      { name: "Broadcom (AVGO)", s: "NASDAQ:AVGO" },
      { name: "JPMorgan Chase (JPM)", s: "NYSE:JPM" },
      { name: "Tesla (TSLA)", s: "NASDAQ:TSLA" },
      { name: "UnitedHealth (UNH)", s: "NYSE:UNH" },
      { name: "Visa (V)", s: "NYSE:V" },
      { name: "Exxon Mobil (XOM)", s: "NYSE:XOM" },
      { name: "Mastercard (MA)", s: "NYSE:MA" },
      { name: "Johnson & Johnson (JNJ)", s: "NYSE:JNJ" },
      { name: "Procter & Gamble (PG)", s: "NYSE:PG" },
      { name: "Costco (COST)", s: "NASDAQ:COST" },
      { name: "Home Depot (HD)", s: "NYSE:HD" },
      { name: "Chevron (CVX)", s: "NYSE:CVX" },
      { name: "Netflix (NFLX)", s: "NASDAQ:NFLX" },
      { name: "AMD (AMD)", s: "NASDAQ:AMD" },
      { name: "PepsiCo (PEP)", s: "NASDAQ:PEP" },
    ],
    "Nasdaq 100": [
      { name: "Index Overview", s: "FOREXCOM:NSXUSD" },
      { name: "Adobe (ADBE)", s: "NASDAQ:ADBE" },
      { name: "Cisco (CSCO)", s: "NASDAQ:CSCO" },
      { name: "Intel (INTC)", s: "NASDAQ:INTC" },
      { name: "Intuit (INTU)", s: "NASDAQ:INTU" },
      { name: "Qualcomm (QCOM)", s: "NASDAQ:QCOM" },
      { name: "Amgen (AMGN)", s: "NASDAQ:AMGN" },
      { name: "Honeywell (HON)", s: "NASDAQ:HON" },
      { name: "Starbucks (SBUX)", s: "NASDAQ:SBUX" },
      { name: "Intuitive Surgical (ISRG)", s: "NASDAQ:ISRG" },
      { name: "Applied Materials (AMAT)", s: "NASDAQ:AMAT" },
      { name: "Booking Holdings (BKNG)", s: "NASDAQ:BKNG" },
    ],
    "Dow Jones": [
      { name: "Index Overview", s: "FOREXCOM:DJI" },
      { name: "Goldman Sachs (GS)", s: "NYSE:GS" },
      { name: "Boeing (BA)", s: "NYSE:BA" },
      { name: "Caterpillar (CAT)", s: "NYSE:CAT" },
      { name: "Salesforce (CRM)", s: "NYSE:CRM" },
      { name: "Disney (DIS)", s: "NYSE:DIS" },
      { name: "McDonald's (MCD)", s: "NYSE:MCD" },
      { name: "Walmart (WMT)", s: "NYSE:WMT" },
      { name: "Coca-Cola (KO)", s: "NYSE:KO" },
    ]
  },
  "Europe": {
    "FTSE 100 (UK)": [
      { name: "Index Overview", s: "FOREXCOM:UK100" },
      { name: "AstraZeneca", s: "LSE:AZN" },
      { name: "Shell", s: "LSE:SHEL" },
      { name: "HSBC Holdings", s: "LSE:HSBA" },
      { name: "Unilever", s: "LSE:ULVR" },
      { name: "BP", s: "LSE:BP." },
      { name: "Rio Tinto", s: "LSE:RIO" },
      { name: "Diageo", s: "LSE:DGE" },
      { name: "GSK", s: "LSE:GSK" },
      { name: "Relx", s: "LSE:REL" },
      { name: "Glencore", s: "LSE:GLEN" },
    ],
    "DAX 40 (Germany)": [
      { name: "Index Overview", s: "FOREXCOM:GER40" },
      { name: "SAP", s: "XETR:SAP" },
      { name: "Siemens", s: "XETR:SIE" },
      { name: "Allianz", s: "XETR:ALV" },
      { name: "Airbus", s: "XETR:AIR" },
      { name: "Deutsche Telekom", s: "XETR:DTE" },
      { name: "Mercedes-Benz", s: "XETR:MBG" },
      { name: "BMW", s: "XETR:BMW" },
      { name: "Volkswagen", s: "XETR:VOW3" },
      { name: "Bayer", s: "XETR:BAYN" },
      { name: "Adidas", s: "XETR:ADS" },
    ],
    "CAC 40 (France)": [
      { name: "Index Overview", s: "FOREXCOM:FRA40" },
      { name: "LVMH", s: "EURONEXT:MC" },
      { name: "L'Oreal", s: "EURONEXT:OR" },
      { name: "Hermes", s: "EURONEXT:RMS" },
      { name: "TotalEnergies", s: "EURONEXT:TTE" },
      { name: "Sanofi", s: "EURONEXT:SAN" },
      { name: "Schneider Electric", s: "EURONEXT:SU" },
      { name: "Air Liquide", s: "EURONEXT:AI" },
      { name: "BNP Paribas", s: "EURONEXT:BNP" },
      { name: "Safran", s: "EURONEXT:SAF" },
      { name: "AXA", s: "EURONEXT:CS" },
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

      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <header className="border-b border-border/40 pb-6">
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3 italic">
            WESTERN <span className="text-primary italic">TERMINAL</span>
          </h1>
        </header>

        {/* TRIPLE SELECTOR - DESIGNED FOR EXTENSIVE LISTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-secondary/10 p-6 rounded-2xl border border-border/60">
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Map className="h-3 w-3" /> Region
            </label>
            <div className="relative">
              <select 
                value={region} 
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none cursor-pointer focus:ring-1 focus:ring-primary"
              >
                {Object.keys(MARKET_DATA).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Zap className="h-3 w-3" /> Index
            </label>
            <div className="relative">
              <select 
                value={index} 
                onChange={(e) => handleIndexChange(e.target.value)}
                className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none cursor-pointer focus:ring-1 focus:ring-primary"
              >
                {/* @ts-ignore */}
                {Object.keys(MARKET_DATA[region]).map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Building2 className="h-3 w-3" /> Symbol
            </label>
            <div className="relative">
              <select 
                value={symbol} 
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full h-12 bg-background border border-border rounded-lg px-4 text-sm font-semibold appearance-none cursor-pointer focus:ring-1 focus:ring-primary"
              >
                {/* @ts-ignore */}
                {MARKET_DATA[region][index].map(stock => (
                  <option key={stock.s} value={stock.s}>{stock.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* CHART - Reacts to the third dropdown */}
        <div className="rounded-xl border border-border bg-[#131722] overflow-hidden h-[650px] shadow-2xl relative z-10">
          <AdvancedChart key={symbol} symbol={symbol} />
        </div>

        <div className="h-10" />
      </main>
    </div>
  )
}
