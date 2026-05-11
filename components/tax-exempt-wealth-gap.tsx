"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, ShieldAlert, Zap, Info } from "lucide-react"

export default function TaxExemptWealthGap() {
  const [indicators, setIndicators] = useState<any[]>([])
  const [initialInvestment, setInitialInvestment] = useState(50000)
  const [annualContribution, setAnnualContribution] = useState(6000)
  const [years, setYears] = useState(20)
  const [expectedReturn, setExpectedReturn] = useState(7)
  const [taxRate, setTaxRate] = useState(24) // Default federal bracket
  
  const supabase = createClient()

  useEffect(() => {
    const fetchMacro = async () => {
      const { data } = await supabase.from('macro_data').select('*')
      if (data) setIndicators(data)
    }
    fetchMacro()
  }, [])

  const inflationRate = indicators.find(i => i.symbol === 'CPIAUCSL')?.value || "3.0"

  // Analytical Calculation: Taxable vs Tax-Exempt
  const calculateGrowth = (isTaxable: boolean) => {
    let balance = initialInvestment
    const monthlyRate = (expectedReturn / 100) / 12
    const taxMultiplier = isTaxable ? (1 - taxRate / 100) : 1
    
    for (let i = 0; i < years * 12; i++) {
      const interest = balance * monthlyRate
      // Taxes apply to the interest earned every month/year in a taxable account
      balance += (interest * taxMultiplier) + (annualContribution / 12)
    }
    return balance
  }

  const taxExemptTotal = calculateGrowth(false)
  const taxableTotal = calculateGrowth(true)
  const wealthGap = taxExemptTotal - taxableTotal
  const realReturn = expectedReturn - Number(inflationRate)

  return (
    <div className="space-y-6 bg-zinc-950 p-6 rounded-xl border border-white/5 font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
            Tax-Exempt <span className="text-primary">Wealth Gap</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Live Inflation (CPI): {inflationRate}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary">
          <Zap className="h-3.5 w-3.5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Compounding Alpha</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* INPUTS */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Initial Principal</label>
              <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white outline-none focus:border-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Annual Addition</label>
              <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white outline-none focus:border-primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Years</label>
              <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Return %</label>
              <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Tax Rate %</label>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white outline-none" />
            </div>
          </div>
        </div>

        {/* ANALYTICS BOX */}
        <div className="relative group overflow-hidden bg-black/50 border border-white/5 rounded-lg p-6 text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
          
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2 block">Wealth Gap (Capital Lost)</span>
          <div className="text-4xl font-black italic tracking-tighter text-white mb-1">
            ${wealthGap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <ShieldAlert className="h-3 w-3 text-red-500" />
            <p className="text-[9px] font-bold text-red-500/80 uppercase">Taxes reduced your outcome by {( (wealthGap/taxExemptTotal)*100 ).toFixed(1)}%</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="text-left">
              <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Tax-Exempt Total</span>
              <span className="text-xs font-mono font-black text-white">${taxExemptTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-black text-zinc-600 uppercase block mb-1">Real Return Adj.</span>
              <span className={`text-xs font-mono font-black ${realReturn > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {realReturn.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-start gap-3 bg-white/5 p-4 rounded border border-white/5">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed italic">
          <span className="text-white font-bold uppercase not-italic">Institutional Insight:</span> In a taxable account, you must earn a <span className="text-white">{(expectedReturn / (1 - taxRate/100)).toFixed(2)}%</span> return just to match a tax-free return of {expectedReturn}%. Your "Wealth Gap" represents money earned that was never reinvested due to annual tax liabilities.
        </p>
      </div>
    </div>
  )
}
