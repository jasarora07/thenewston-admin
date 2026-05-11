"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Info, Zap, Settings2, Landmark } from "lucide-react"

// Standardized Tooltip: Triggers on the entire label group
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

export default function MortgageRefiPivot() {
  const [loanAmount, setLoanAmount] = useState(400000)
  const [currentRate, setCurrentRate] = useState(7.5)
  const [currentRemainingYears, setCurrentRemainingYears] = useState(22)
  const [newRate, setNewRate] = useState(6.0)
  const [newTermYears, setNewTermYears] = useState(30)
  const [closingCosts, setClosingCosts] = useState(5000)
  const [frequency, setFrequency] = useState(12) 

  const calculateTotalCost = (principal: number, rate: number, years: number, freq: number) => {
    const periodicRate = (rate / 100) / freq
    const totalPayments = years * freq
    const periodicPayment = (principal * periodicRate) / (1 - Math.pow(1 + periodicRate, -totalPayments))
    const totalCost = periodicPayment * totalPayments
    return {
      installment: periodicPayment,
      totalInterest: totalCost - principal,
      totalCost: totalCost
    }
  }

  const currentData = calculateTotalCost(loanAmount, currentRate, currentRemainingYears, frequency)
  const newData = calculateTotalCost(loanAmount, newRate, newTermYears, frequency)
  
  const netBenefit = currentData.totalInterest - (newData.totalInterest + closingCosts)
  const monthlySavings = (currentData.installment * (frequency/12)) - (newData.installment * (frequency/12))

  return (
    <div className="space-y-8 bg-zinc-950 p-8 rounded-xl border border-white/10 font-sans shadow-2xl text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings2 className="h-4 w-4 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">
              Mortgage <span className="text-white">Refi Pivot</span>
            </h2>
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-tight">
            Comparing <span className="text-white">Total Debt Cost</span>: Lifecycle Interest vs. Structural Cost.
          </p>
        </div>
        
        <div className="flex bg-black border border-white/10 rounded p-1">
          <button onClick={() => setFrequency(12)} className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded ${frequency === 12 ? 'bg-primary text-black' : 'text-zinc-500'}`}>Monthly</button>
          <button onClick={() => setFrequency(26)} className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded ${frequency === 26 ? 'bg-primary text-black' : 'text-zinc-500'}`}>Bi-Weekly</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2"><Landmark className="h-3 w-3" /> Current Loan</span>
              <div className="space-y-3">
                <div className="space-y-1">
                  <InfoTooltip label="Principal ($)" tip="Your current outstanding balance. Do not include your original loan amount, only what is left to pay." />
                  <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md p-2 text-white font-mono text-sm outline-none focus:border-primary" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Rate (%)</span>
                  <input type="number" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md p-2 text-white font-mono text-sm outline-none" />
                </div>
                <div className="space-y-1">
                  <InfoTooltip label="Remaining Yrs" tip="How many years are actually left on your current mortgage? (e.g., if you are 8 years into a 30yr loan, enter 22)." />
                  <input type="number" value={currentRemainingYears} onChange={(e) => setCurrentRemainingYears(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md p-2 text-white font-mono text-sm outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2"><Zap className="h-3 w-3" /> New Proposal</span>
              <div className="space-y-3">
                <div className="space-y-1">
                  <InfoTooltip label="Closing Costs ($)" tip="Total fees to execute the new loan. Found in Section J of your Loan Estimate." />
                  <input type="number" value={closingCosts} onChange={(e) => setClosingCosts(Number(e.target.value))} className="w-full bg-black border border-primary/20 rounded-md p-2 text-white font-mono text-sm outline-none focus:border-primary" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">New Rate (%)</span>
                  <input type="number" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md p-2 text-white font-mono text-sm outline-none" />
                </div>
                <div className="space-y-1">
                  <InfoTooltip label="New Term (Yrs)" tip="Duration of the new loan. WARNING: Resetting to 30 years often increases total interest cost." />
                  <input type="number" value={newTermYears} onChange={(e) => setNewTermYears(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-md p-2 text-white font-mono text-sm outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-zinc-900/30 border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
            <InfoTooltip label="Net Life-of-Loan Benefit" tip="Total Interest of Current Loan MINUS (Total Interest of New Loan + Closing Costs)." />
            <div className={`text-5xl font-black italic tracking-tighter mb-2 ${netBenefit > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {netBenefit > 0 ? '+' : ''}${netBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase leading-relaxed max-w-[280px]">
              {netBenefit > 0 ? `Refinancing saves you $${netBenefit.toLocaleString()} in interest.` : `This move costs you $${Math.abs(netBenefit).toLocaleString()} more in long-term interest.`}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg">
              <InfoTooltip label="Installment Change" tip="The difference in your individual payment. Affects monthly cash flow." />
              <span className={`text-lg font-mono font-black block ${monthlySavings > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {monthlySavings > 0 ? '-' : '+'}${Math.abs(currentData.installment - newData.installment).toFixed(0)}
              </span>
            </div>
            <div className="bg-black/50 border border-white/5 p-4 rounded-lg text-right flex flex-col items-end">
              <InfoTooltip label="Gross Interest Saved" tip="Total interest avoided over the timeline. Does NOT subtract closing costs." />
              <span className="text-lg font-mono font-black text-white italic">
                ${Math.max(0, currentData.totalInterest - newData.totalInterest).toLocaleString(undefined, {maximumFractionDigits: 0})}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
