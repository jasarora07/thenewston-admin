"use client"

import React, { useState, useEffect } from "react"
import { Landmark, ArrowRight, Zap, ShieldCheck, AlertCircle, Info, HelpCircle } from "lucide-react"
import { calculateEquityOutcome } from "@/lib/math/equity-logic"

export default function EquityCalculatorTerminal() {
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
    setMounted(true)
    setResults(calculateEquityOutcome(inputs))
  }, [inputs])

  if (!mounted || !results) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT: DEBT ANCHORS */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
            <Landmark className="h-3 w-3" /> Current Debt Profile
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] font-bold text-zinc-500 uppercase">Home Value</label>
                <span title="Estimated 2026 Market Value" className="cursor-help"><HelpCircle className="h-3 w-3 text-zinc-700" /></span>
              </div>
              <input type="number" name="homeValue" value={inputs.homeValue} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold text-zinc-500 uppercase mb-1 block">Current Balance</label>
                <input type="number" name="mortgageBalance" value={inputs.mortgageBalance} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono" />
              </div>
              <div>
                <label className="text-[9px] font-bold text-zinc-500 uppercase mb-1 block">Interest Rate (%)</label>
                <input type="number" step="0.01" name="primaryRate" value={inputs.primaryRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-green-500 font-mono font-bold" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: LIQUIDITY TARGETS */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
            <Zap className="h-3 w-3" /> Liquidity Extraction
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-[9px] font-bold text-zinc-500 uppercase mb-1 block italic">Cash to Extract ($)</label>
              <input type="number" name="cashNeeded" value={inputs.cashNeeded} onChange={handleInputChange} className="w-full bg-primary/5 border border-primary/20 rounded-lg p-3 text-primary text-xl font-black italic outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[9px] font-bold text-zinc-500 uppercase">HELOC Rate</label>
                  <span title="Market rate for a 2nd mortgage" className="cursor-help"><HelpCircle className="h-3 w-3 text-zinc-700" /></span>
                </div>
                <input type="number" step="0.01" name="helocRate" value={inputs.helocRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[9px] font-bold text-zinc-500 uppercase">Refi Rate</label>
                  <span title="Rate to replace the entire mortgage" className="cursor-help"><HelpCircle className="h-3 w-3 text-zinc-700" /></span>
                </div>
                <input type="number" step="0.01" name="newRefiRate" value={inputs.newRefiRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS: THE "VALUE" PANEL */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className={`p-4 flex items-center justify-between ${results.signal === 'HELOC' ? 'bg-green-500' : 'bg-primary'}`}>
          <h3 className="text-black font-black uppercase italic text-sm tracking-tighter flex items-center gap-2">
             {results.signal === 'HELOC' ? <ShieldCheck className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
             Analysis Signal: {results.signal === 'HELOC' ? 'Defend Primary Rate' : 'Consolidate Debt'}
          </h3>
          <span className="text-black/50 text-[10px] font-black uppercase">LTV: {results.ltv}%</span>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Effective "Blended" Rate</p>
               <div className="text-6xl font-black italic tracking-tighter text-white">
                 {results.blendedRateHELOC}%
               </div>
               <p className="text-[9px] text-zinc-600 font-bold uppercase">The real cost of your debt with a HELOC</p>
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
               <p className="text-[11px] text-zinc-400 font-bold uppercase leading-relaxed">
                 {results.recommendation}
               </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 border-l border-white/5">
             <div className="text-center">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Efficiency Savings</p>
               <div className="text-5xl font-black italic text-white tracking-tighter">
                 ${results.monthlySavings}<span className="text-lg text-zinc-500">/mo</span>
               </div>
             </div>
             <button className="bg-white text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2">
               Execute Analytics <ArrowRight className="h-3 w-3" />
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
