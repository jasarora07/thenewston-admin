"use client"

import React, { useState, useEffect } from "react"
import { Landmark, ArrowRight, Zap, ShieldCheck, AlertCircle, HelpCircle, AlertTriangle } from "lucide-react"
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
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* 1. ADVISORY PROTOCOL (Matches Tax/Refi Modules) */}
      <div className="bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black">Advisory Notice:</span> This terminal is an institutional simulation engine. 
          Projections are mathematical and <span className="text-white underline decoration-red-500/50 underline-offset-4">not professional financial advice</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 2. DEBT ANCHORS (Grouped like Tax Inputs) */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 italic">
            <Landmark className="h-3 w-3" /> Debt Anchors
          </h3>
          
          <div className="space-y-4">
            <div className="group relative">
              <div className="flex items-center gap-2 mb-1">
                <label className="text-[9px] font-bold text-zinc-600 uppercase">Home Valuation</label>
                <HelpCircle className="h-3 w-3 text-zinc-800 cursor-help peer" />
                <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-black border border-white/10 text-[8px] text-zinc-400 uppercase font-black rounded opacity-0 peer-hover:opacity-100 transition-opacity z-50">
                  Total market value used to calculate LTV safety margins.
                </div>
              </div>
              <input type="number" name="homeValue" value={inputs.homeValue} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold text-zinc-600 uppercase mb-1 block">1st Lien Balance</label>
                <input type="number" name="mortgageBalance" value={inputs.mortgageBalance} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono" />
              </div>
              <div>
                <label className="text-[9px] font-bold text-green-500 uppercase mb-1 block italic">Locked Rate %</label>
                <input type="number" step="0.01" name="primaryRate" value={inputs.primaryRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-green-500 font-mono font-bold" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. EXTRACTION TARGETS */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4 shadow-xl shadow-primary/5">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
            <Zap className="h-3 w-3" /> Extraction Target
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-[9px] font-bold text-zinc-500 uppercase mb-1 block">Cash Required ($)</label>
              <input type="number" name="cashNeeded" value={inputs.cashNeeded} onChange={handleInputChange} className="w-full bg-primary/5 border border-primary/20 rounded-lg p-3 text-primary text-xl font-black italic outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group relative">
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-[9px] font-bold text-zinc-600 uppercase">HELOC Rate %</label>
                  <HelpCircle className="h-3 w-3 text-zinc-800 cursor-help peer" />
                  <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-black border border-white/10 text-[8px] text-zinc-400 uppercase font-black rounded opacity-0 peer-hover:opacity-100 transition-opacity z-50">
                    Expected interest for secondary liquidity.
                  </div>
                </div>
                <input type="number" step="0.01" name="helocRate" value={inputs.helocRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono" />
              </div>
              <div className="group relative">
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-[9px] font-bold text-zinc-600 uppercase">Refi Rate %</label>
                  <HelpCircle className="h-3 w-3 text-zinc-800 cursor-help peer" />
                  <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-black border border-white/10 text-[8px] text-zinc-400 uppercase font-black rounded opacity-0 peer-hover:opacity-100 transition-opacity z-50 text-right">
                    Current rate for a total unified refinance.
                  </div>
                </div>
                <input type="number" step="0.01" name="newRefiRate" value={inputs.newRefiRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. STRATEGIC SIGNAL PANEL (Matches Tax Model Results) */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className={`p-4 flex items-center justify-between ${results.signal === 'HELOC' ? 'bg-green-600' : 'bg-primary'}`}>
          <h3 className="text-black font-black uppercase italic text-sm tracking-tighter flex items-center gap-2">
             {results.signal === 'HELOC' ? <ShieldCheck className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
             Analysis Signal: {results.signal === 'HELOC' ? 'Keep Primary Mortgage' : 'Total Debt Refinance'}
          </h3>
          <span className="text-black/50 text-[10px] font-black uppercase">LTV: {results.ltv}%</span>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black">
          <div className="space-y-6">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Effective "Blended" Interest</p>
               <div className="text-6xl font-black italic tracking-tighter text-white">
                 {results.blendedRateHELOC}%
               </div>
               <p className="text-[9px] text-zinc-600 font-bold uppercase italic">Real cost of debt across all combined liens</p>
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
               <p className="text-[11px] text-zinc-400 font-bold uppercase leading-relaxed">
                 {results.recommendation}
               </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 border-l border-white/5">
             <div className="text-center">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Efficiency Arbitrage</p>
               <div className="text-5xl font-black italic text-white tracking-tighter">
                 ${results.monthlySavings}<span className="text-lg text-zinc-500">/mo</span>
               </div>
             </div>
             <button className="bg-white text-black px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2 shadow-xl shadow-white/5">
               Synchronize Session <ArrowRight className="h-3 w-3" />
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
