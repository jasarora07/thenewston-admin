"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/button" // Adjust to your UI lib
import { ShieldCheck, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function MortgageRefiPivot() {
  const [indicators, setIndicators] = useState<any[]>([])
  const [loanAmount, setLoanAmount] = useState(400000)
  const [currentRate, setCurrentRate] = useState(7.5)
  const [newRate, setNewRate] = useState(6.0)
  const [closingCosts, setClosingCosts] = useState(5000)
  const supabase = createClient()

  // 1. Fetch live market rates to guide the user
  useEffect(() => {
    const fetchRates = async () => {
      const { data } = await supabase.from('macro_data').select('*')
      if (data) setIndicators(data)
    }
    fetchRates()
  }, [])

  const fedRate = indicators.find(i => i.symbol === 'FEDFUNDS')?.value || "3.6"

  // 2. The Layman's Math
  const calculateMonthly = (amount: number, rate: number) => {
    const monthlyRate = (rate / 100) / 12
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -360))
  }

  const currentPayment = calculateMonthly(loanAmount, currentRate)
  const newPayment = calculateMonthly(loanAmount, newRate)
  const monthlySavings = currentPayment - newPayment
  const pivotMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0

  // 3. The "Intelligence" Verdict
  const getVerdict = () => {
    if (monthlySavings <= 0) return { label: "NO SAVINGS", color: "text-zinc-500", icon: <AlertTriangle /> }
    if (pivotMonths <= 24) return { label: "STRATEGIC EXECUTE", color: "text-emerald-500", icon: <CheckCircle2 /> }
    if (pivotMonths <= 48) return { label: "MARGINAL GAIN", color: "text-yellow-500", icon: <TrendingDown /> }
    return { label: "CAPITAL DRAG", color: "text-red-500", icon: <AlertTriangle /> }
  }

  const verdict = getVerdict()

  return (
    <div className="space-y-6 bg-zinc-950 p-6 rounded-xl border border-white/5 font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
            Mortgage <span className="text-primary">Refi Pivot</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Live Fed Funds: {fedRate}%
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 ${verdict.color}`}>
          {verdict.icon}
          <span className="text-[10px] font-black uppercase tracking-widest">{verdict.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* INPUTS */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Loan Balance</label>
            <input 
              type="number" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white focus:border-primary outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Current Rate %</label>
              <input 
                type="number" 
                value={currentRate} 
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">New Rate %</label>
              <input 
                type="number" 
                value={newRate} 
                onChange={(e) => setNewRate(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Estimated Closing Costs ($)</label>
            <input 
              type="number" 
              value={closingCosts} 
              onChange={(e) => setClosingCosts(Number(e.target.value))}
              className="w-full bg-black border border-white/10 rounded p-2 text-sm font-mono text-white"
            />
          </div>
        </div>

        {/* ANALYTICS BOX */}
        <div className="bg-black/50 border border-white/5 rounded-lg p-6 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Pivot Point</span>
          <div className="text-5xl font-black italic tracking-tighter text-white mb-1">
            {pivotMonths} <span className="text-sm not-italic text-zinc-500">Months</span>
          </div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase leading-relaxed max-w-[200px]">
            It will take <span className="text-white">{pivotMonths} months</span> of savings to pay back your <span className="text-white">${closingCosts}</span> in fees.
          </p>
          
          <div className="mt-6 pt-6 border-t border-white/5 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-bold text-zinc-500 uppercase">Monthly Savings</span>
              <span className="text-sm font-mono font-black text-emerald-500">+${monthlySavings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-zinc-500 uppercase">Year 1 Net ROI</span>
              <span className="text-sm font-mono font-black text-white">
                {monthlySavings * 12 > closingCosts ? "POSITIVE" : `-$${(closingCosts - (monthlySavings * 12)).toFixed(0)}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
