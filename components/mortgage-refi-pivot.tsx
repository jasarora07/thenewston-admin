"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { ShieldCheck, Info, Zap, Settings2 } from "lucide-react"

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
  }, [])

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
      
      {/* 1. GUIDANCE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings2 className="h-4 w-4 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">
              Mortgage <span className="text-primary">Refi Pivot</span>
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
        
        {/* LEFT: MANUAL CONTROLS */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-4 bg-zinc-700" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">User Manual Inputs</span>
          </div>

          <div className="group space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-white transition-colors">
                Loan Principal Remaining
                <InfoTooltip text="Check your 'Remaining Balance' on your last monthly mortgage statement." />
              </label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">$</span>
              <input 
                type="number" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 pl-8 pr-4 text-white font-mono font-bold text-base focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Current Rate (%)
                <InfoTooltip text="The interest rate you are currently paying. Found on your current mortgage statement." />
              </label>
              <input 
                type="number" 
                value={currentRate} 
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-md py-3 px-4 text-white font-mono font-bold text-base focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                New Target Rate (%)
                <InfoTooltip text
