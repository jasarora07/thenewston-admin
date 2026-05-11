"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, ShieldAlert, Zap, Info, MousePointer2 } from "lucide-react"

// Standardized Tooltip
const InfoTooltip = ({ label, tip }: { label: string, tip: string }) => (
  <div className="group relative flex items-center gap-1.5 cursor-help w-fit">
    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">
      {label}
    </span>
    <Info className="h-3 w-3 text-zinc-600 group-hover:text-primary transition-colors" />
    <span className="pointer-events-none absolute bottom-full left-0 mb-2 w-56 rounded-md bg-zinc-900 border border-white/10 p-2.5 text-[9px] font-bold uppercase leading-relaxed text-zinc-300 opacity-0 shadow-2xl transition-opacity group-hover:opacity-100 z-50">
      <span className="text-primary block mb-1 font-black">Terminal Guidance:</span>
      {tip}
    </span>
  </div>
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
    <div className="space-y-8 bg-zinc-950 p-8 rounded-xl border border-white/10 font-sans shadow-2xl text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">
              Tax-Exempt <span className="text-white">Wealth Gap</span>
            </h2>
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <InfoTooltip label="Initial Principal ($)" tip="Starting cash placed into this specific investment account." />
              <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base outline-none" />
            </div>
            <div className="space-y-2">
              <InfoTooltip label="Annual Addition ($)" tip="Your planned yearly savings. (e.g., $500/mo = $6,000)." />
              <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <InfoTooltip label="Horizon (Yrs)" tip="Total duration to let capital compound without withdrawals." />
              <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base outline-none" />
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Return (%)</span>
              <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base outline-none" />
            </div>
            <div className="space-y-2">
              <InfoTooltip label="Tax Rate (%)" tip="Your Federal tax bracket. Used to calculate annual 'Tax Drag'." />
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full bg-black border border-primary/30 rounded-md py-3 px-4 text-white font-mono font-bold text-base outline-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center">
          <div className="flex-1 bg-zinc-900/30 border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <ShieldAlert className="h-6 w-6 text-red-500 mb-4 opacity-50" />
            <InfoTooltip label="Net Strategy Gain" tip="Total extra wealth created specifically by avoiding annual taxes." />
            <div className="text-5xl font-black italic tracking-tighter text-white mb-2">
              +${wealthGap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase leading-relaxed max-w-[280px]">
              Tax drag reduces your potential net worth by <span className="text-red-500">{((wealthGap/taxExemptTotal)*100).toFixed(1)}%</span> over {years} years.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg text-left">
              <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Tax-Exempt Total</span>
              <span className="text-lg font-mono font-black text-emerald-500">${taxExemptTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg text-right flex flex-col items-end">
              <InfoTooltip label="Real Return" tip="Growth rate minus market inflation. Shows actual buying power gain." />
              <span className={`text-lg font-mono font-black ${realReturn > 0 ? 'text-white' : 'text-red-500'}`}>
                {realReturn.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
