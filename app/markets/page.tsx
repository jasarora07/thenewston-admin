"use client"

import React, { useState } from "react"
import dynamic from 'next/dynamic' // Added for SEO performance
import { ChevronDown, Map, Zap, Building2 } from "lucide-react"

// Performance: Lazy load the heavy chart to boost First Contentful Paint (FCP)
const AdvancedChart = dynamic(() => import("@/components/advanced-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#131722] gap-4">
      <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 animate-pulse">
        Initializing Western Terminal Visualizer...
      </span>
    </div>
  ),
})

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
      { name: "Caterpillar (CAT)", s: "NYSE:
