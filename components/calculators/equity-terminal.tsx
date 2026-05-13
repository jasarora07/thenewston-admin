"use client"

import React, { useState, useEffect } from "react"
// FIXED: Added ShieldCheck to imports to prevent crash in Results Panel
import { Landmark, Home, ArrowRight, Info, Zap, AlertCircle, ShieldCheck } from "lucide-react"
import { calculateEquityOutcome } from "@/lib/math/equity-logic"

export default function EquityCalculatorTerminal() {
  // 1. HYDRATION GUARD: Prevents "This page couldn't load" errors
  const [mounted, setMounted] = useState(false)
  const [inputs, setInputs] = useState({
    homeValue: 500000,
    mortgageBalance: 300000,
    primaryRate: 3.25,
    cashNeeded: 50000,
    helocRate: 8.5,
    newRefiRate: 7.2
  })

  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    setMounted(true) // Signals that we are safely in the browser
    const outcome = calculateEquityOutcome(inputs)
    setResults(outcome)
  }, [inputs])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }

  // 2. SAFETY RENDER: Shows a loading state if the browser isn't ready
  if (!mounted || !results) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-zinc-900/20 rounded-2xl border border-white/5">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">Initializing Terminal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* --- INPUT PANEL (LEFT) --- */}
      <div className="lg:col-span-5 space-y-6 bg-zinc-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Property Valuation</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-zinc-600 font-bold">$</span>
            <input 
              type="number" name="homeValue" value={inputs.homeValue} onChange={handleInputChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 pl-8 text-primary font-black italic focus:border-primary/50 outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-500">Current Balance</label>
            <input type="number" name="mortgageBalance" value={inputs.mortgageBalance} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm font-bold" />
          </div>
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-500">Primary Rate %</label>
            <input type="number" step="0.01" name="primaryRate" value={inputs.primaryRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm font-bold text-green-500" />
          </div>
        </div>

        <div className="h-px bg-white/5 my-4" />

        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-widest text-primary italic flex items-center gap-2">
            <Zap className="h-3 w-3" /> Liquidity Target (Cash Out)
          </label>
          <div className="relative">
             <span className="absolute left-4 top-4 text-primary/40 text-xl font-black">$</span>
             <input 
                type="number" name="cashNeeded" value={inputs.cashNeeded} onChange={handleInputChange}
                className="w-full bg-primary/5 border border-primary/20 rounded-lg p-4 pl-10 text-2xl font-black italic text-primary outline-none"
             />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-500">Current HELOC Rate %</label>
            <input type="number" step="0.01" name="helocRate" value={inputs.helocRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm font-bold" />
          </div>
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-500">New Refi Rate %</label>
            <input type="number" step="0.01" name="newRefiRate" value={inputs.newRefiRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm font-bold" />
          </div>
        </div>
      </div>

      {/* --- RESULTS PANEL (RIGHT) --- */}
      <div className="lg:col-span-7 bg-zinc-900/10 border border-white/5 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 ${results.signal === 'HELOC' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
              {results.signal === 'HELOC' ? <ShieldCheck className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
              SIGNAL: {results.signal === 'HELOC' ? 'DEFEND PRIMARY RATE' : 'CONSOLIDATE DEBT'}
            </span>
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">LTV: {results.ltv}%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Blended HELOC Rate</span>
              <div className="text-5xl font-black italic tracking-tighter">{results.blendedRateHELOC}%</div>
              <p className="text-[9px] text-zinc-600 font-bold uppercase italic">Weighted average of all debt</p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">New Unified Refi Rate</span>
              <div className="text-5xl font-black italic tracking-tighter text-zinc-800">{results.blendedRateRefi}%</div>
              <p className="text-[9px] text-zinc-600 font-bold uppercase italic">Global rate replacement</p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
            <p className={`text-xs font-bold uppercase leading-relaxed ${!results.isSafeLTV ? 'text-red-400' : 'text-zinc-300'}`}>
              {results.recommendation}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Monthly Efficiency Gap</span>
              <span className="text-xl font-black italic text-white">${results.monthlySavings} <span className="text-[10px] text-zinc-500">/ mo</span></span>
            </div>
          </div>
          <button className="w-full sm:w-auto bg-primary text-black px-8 py-3 rounded font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
            Analyze Liquidity <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        
        <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-primary/5 rounded-full blur-3xl -z-0" />
      </div>
    </div>
  )
}
