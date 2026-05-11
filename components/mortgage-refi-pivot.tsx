"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Info, Zap, Settings2 } from "lucide-react"

const InfoTooltip = ({ text }: { text: string }) => (
  <span className="group relative ml-1.5 inline-block cursor-help">
    <Info className="h-3 w-3 text-zinc-600 hover:text-primary transition-colors" />
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-md bg-zinc-900 border border-white/10 p-2.5 text-[9px] font-bold uppercase leading-relaxed text-zinc-300 opacity-0 shadow-2xl transition-opacity group-hover:opacity-100 z-50">
      <span className="text-primary block mb-1 font-black">Terminal Guidance:</span>
      {text}
    </span>
  </span>
);

export default function MortgageRefiPivot() {
  const [indicators, setIndicators] = useState<any[]>([])
  const [loanAmount, setLoanAmount] = useState(400000)
  const [currentRate, setCurrentRate] = useState(7.5)
  const [newRate, setNewRate] = useState(6.0)
  const [closingCosts, setClosingCosts] = useState(5000)
  const supabase = createClient()

  useEffect(() => {
    const fetchRates = async () => {
      const { data } = await supabase.from('macro_data').select('*')
      if (data) setIndicators(data)
    }
    fetchRates()
  }, [supabase])

  const fedRate = indicators.find(i => i.symbol === 'FEDFUNDS')?.value || "3.64"

  const calculateMonthly = (amount: number, rate: number) => {
    const monthlyRate = (rate / 100) / 12
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -360))
  }

  const currentPayment = calculateMonthly(loanAmount, currentRate)
  const newPayment = calculateMonthly(loanAmount, newRate)
  const monthlySavings = currentPayment - newPayment
  const pivotMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0

  return (
    <div className="space-y-8 bg-zinc-950 p-8 rounded-xl border border-white/10 font-sans shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings2 className="h-4 w-4 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">
              Mortgage <span className="text-white">Refi Pivot</span>
            </h2>
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Adjust your <span className="text-white">Manual Inputs</span> to calculate the break-even threshold.
          </p>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">Live Market Rate</span>
            <span className="text-lg font-mono font-black text-white italic">{fedRate}%</span>
          </div>
          <div className="h-8 w-px bg-primary/20" />
          <div className="flex items-center gap-2 text-primary">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">Fetched: Fed Funds</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-4 bg-zinc-700" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">User Manual Inputs</span>
          </div>
          <div className="group space-y-2">
            <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-white transition-colors">
              Loan Principal Remaining
              <InfoTooltip text="Check your 'Remaining Balance' on your last monthly mortgage statement." />
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">$</span>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 pl-8 pr-4 text-white font-mono font-bold text-base focus:border-primary outline-none transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Current Rate (%)
                <InfoTooltip text="Your current interest rate. Usually found on the first page of your mortgage statement." />
              </label>
              <input type="number" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none" />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                New Target Rate (%)
                <InfoTooltip text="The interest rate offered in your new bank proposal or 'Initial Loan Estimate' document." />
              </label>
              <input type="number" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400 text-primary">
              Est. Closing Costs ($)
              <InfoTooltip text="Total fees (Bank, Title, Appraisal). Look for 'Total Closing Costs' in Section J of your Loan Estimate." />
            </label>
            <input type="number" value={closingCosts} onChange={(e) => setClosingCosts(Number(e.target.value))}
              className="w-full bg-black border border-primary/30 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-4 bg-primary/50" />
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Terminal Intelligence</span>
          </div>
          <div className="flex-1 bg-zinc-900/30 border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <Zap className="h-6 w-6 text-primary mb-4 opacity-50" />
            <span className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">
              Pivot Point Reached In
              <InfoTooltip text="The exact month your accumulated monthly savings equal your initial closing costs." />
            </span>
            <div className="text-6xl font-black italic tracking-tighter text-white mb-2">
              {pivotMonths} <span className="text-sm not-italic text-zinc-500 uppercase tracking-widest ml-1 font-sans">Months</span>
            </div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase leading-relaxed max-w-[240px]">
              At <span className="text-white">${monthlySavings.toFixed(0)}/mo</span> savings, you recoup your costs in <span className="text-primary italic">{ (pivotMonths / 12).toFixed(1) } years</span>.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg">
              <span className="flex items-center text-[8px] font-black text-zinc-600 uppercase block mb-1 tracking-widest">
                Monthly Surplus
                <InfoTooltip text="BENEFIT: The pure cash profit remaining in your budget each month after switching loans." />
              </span>
              <span className="text-lg font-mono font-black text-emerald-500">+${monthlySavings.toFixed(0)}</span>
            </div>
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg text-right">
              <span className="flex items-center justify-end text-[8px] font-black text-zinc-600 uppercase block mb-1 tracking-widest">
                Efficiency Score
                <InfoTooltip text="HIGH: Break-even under 2 years. MID: 2-4 years. LOW: Over 4 years." />
              </span>
              <span className={`text-lg font-mono font-black ${pivotMonths < 24 ? 'text-emerald-500' : 'text-yellow-500'}`}>
                {pivotMonths < 24 ? 'HIGH' : 'MID'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
