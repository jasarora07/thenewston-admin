"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, ShieldAlert, Zap, Info, MousePointer2 } from "lucide-react"

// Helper Component for Guidance Tips
const InfoTooltip = ({ text }: { text: string }) => (
  <span className="group relative ml-1.5 inline-block cursor-help">
    <Info className="h-3 w-3 text-zinc-600 hover:text-primary transition-colors" />
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-md bg-zinc-900 border border-white/10 p-2.5 text-[9px] font-bold uppercase leading-relaxed text-zinc-300 opacity-0 shadow-2xl transition-opacity group-hover:opacity-100 z-50">
      <span className="text-primary block mb-1 font-black">Terminal Guidance:</span>
      {text}
    </span>
  </span>
);

export default function TaxExemptWealthGap() {
  const [indicators, setIndicators] = useState<any[]>([])
  const [initialInvestment, setInitialInvestment] = useState(50000)
  const [annualContribution, setAnnualContribution] = useState(6000)
  const [years, setYears] = useState(20)
  const [expectedReturn, setExpectedReturn] = useState(7)
  const [taxRate, setTaxRate] = useState(24) 
  
  const supabase = createClient()

  useEffect(() => {
    const fetchMacro = async () => {
      const { data } = await supabase.from('macro_data').select('*')
      if (data) setIndicators(data)
    }
    fetchMacro()
  }, [])

  const inflationRate = indicators.find(i => i.symbol === 'CPIAUCSL')?.value || "3.29"

  const calculateGrowth = (isTaxable: boolean) => {
    let balance = initialInvestment
    const monthlyRate = (expectedReturn / 100) / 12
    const taxMultiplier = isTaxable ? (1 - taxRate / 100) : 1
    
    for (let i = 0; i < years * 12; i++) {
      const interest = balance * monthlyRate
      balance += (interest * taxMultiplier) + (annualContribution / 12)
    }
    return balance
  }

  const taxExemptTotal = calculateGrowth(false)
  const taxableTotal = calculateGrowth(true)
  const wealthGap = taxExemptTotal - taxableTotal
  const realReturn = expectedReturn - Number(inflationRate)

  return (
    <div className="space-y-8 bg-zinc-950 p-8 rounded-xl border border-white/10 font-sans shadow-2xl">
      
      {/* 1. GUIDANCE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">
              Tax-Exempt <span className="text-white">Wealth Gap</span>
            </h2>
            <div className="ml-4 px-2 py-0.5 border border-red-500/30 bg-red-500/5 rounded">
              <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">
                Simulation Only: Not Advice
              </span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Simulate capital growth against <span className="text-white">Tax Drag</span> and <span className="text-white">Inflation</span>.
          </p>
        </div>
        
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">Market Inflation (CPI)</span>
            <span className="text-lg font-mono font-black text-white italic">{inflationRate}%</span>
          </div>
          <div className="h-8 w-px bg-primary/20" />
          <div className="flex items-center gap-2 text-primary">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest italic">Terminal Feed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: USER CONFIGURATION */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <MousePointer2 className="h-3 w-3 text-zinc-500" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">User Strategy Inputs</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 group">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-white transition-colors">
                Initial Principal ($)
                <InfoTooltip text="The starting amount of cash you are placing into this specific investment account." />
              </label>
              <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none" />
            </div>
            <div className="space-y-2 group">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-white transition-colors">
                Annual Addition ($)
                <InfoTooltip text="Your planned yearly savings. Example: If you save $500 per month, enter $6,000." />
              </label>
              <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 group">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Time (Years)
                <InfoTooltip text="The total duration you intend to let the capital compound without withdrawals." />
              </label>
              <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none" />
            </div>
            <div className="space-y-2 group">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Return (%)
                <InfoTooltip text="Expected growth rate. Long-term stock market (S&P 500) average is 7-10%." />
              </label>
              <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none" />
            </div>
            <div className="space-y-2 group">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Tax Bracket (%)
                <InfoTooltip text="Your highest Federal tax rate based on income (e.g., 22% or 24% for most professionals)." />
              </label>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-black border border-primary/30 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none shadow-[0_0_15px_-5px_rgba(34,197,94,0.1)]" />
            </div>
          </div>
        </div>

        {/* RIGHT: ANALYTICAL ENGINE */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Wealth Degradation Analysis</span>
          </div>

          <div className="flex-1 bg-zinc-900/30 border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <ShieldAlert className="h-6 w-6 text-red-500 mb-4 opacity-50" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Total Capital Lost to Taxes</span>
            <div className="text-5xl font-black italic tracking-tighter text-white mb-2">
              ${wealthGap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            
            <p className="text-[11px] font-bold text-zinc-400 uppercase leading-relaxed max-w-[280px]">
              Taxes will reduce your potential net worth by <span className="text-red-500">{( (wealthGap/taxExemptTotal)*100 ).toFixed(1)}%</span> over the next <span className="text-white">{years} years</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg">
              <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1 tracking-widest text-left">Tax-Exempt Strategy</span>
              <span className="text-lg font-mono font-black text-emerald-500">${taxExemptTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg text-right">
              <span className="flex items-center justify-end text-[8px] font-black text-zinc-600 uppercase block mb-1 tracking-widest">
                Purchasing Power (Real)
                <InfoTooltip text="Calculated as (Expected Return - Live Inflation). This shows your actual gain in buying power." />
              </span>
              <span className={`text-lg font-mono font-black ${realReturn > 0 ? 'text-white' : 'text-red-500'}`}>
                {realReturn.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* INSTITUTIONAL FOOTNOTE */}
      <div className="flex items-start gap-3 bg-white/5 p-4 rounded border border-white/5">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed italic">
          <span className="text-white font-bold uppercase not-italic">Terminal Advice:</span> This model simulates structural efficiency and is not a recommendation to invest. To achieve this same outcome in a taxable account, you would need a <span className="text-white">{(expectedReturn / (1 - taxRate/100)).toFixed(2)}%</span> return. Consult a professional for personalized strategy.
        </p>
      </div>
    </div>
  )
}
