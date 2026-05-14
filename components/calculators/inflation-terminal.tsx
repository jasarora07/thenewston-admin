"use client"

import React, { useState, useEffect } from "react"
import { Wind, ArrowRight, Activity, ShieldCheck, HelpCircle } from "lucide-react"
import { calculateInflationOutcome } from "@/lib/math/inflation-logic"

export default function InflationTerminal() {
  const [mounted, setMounted] = useState(false)
  const [inputs, setInputs] = useState({
    currentAmount: 100000,
    annualInflation: 3.5,
    years: 10,
    investmentReturn: 4.5
  })
  const [results, setResults] = useState<any>(null)

  // Ensure hydration consistency for Next.js
  useEffect(() => { setMounted(true) }, [])
  
  if (!mounted) return null

  const handleAnalyze = () => {
    // Calls the formatted logic file created in the previous step
    setResults(calculateInflationOutcome(inputs))
  }

  /**
   * REUSABLE UI COMPONENT: InputWrapper
   * Maintains tooltip and label consistency across the Terminal Hub.
   */
  const InputWrapper = ({ label, children, tip }: { label: string; children: React.ReactNode; tip: string }) => (
    <div className="group relative space-y-1 text-left">
      <div className="flex items-center gap-2 mb-1">
        <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">
          {label}
        </label>
        <div className="relative">
          <HelpCircle className="h-3 w-3 text-zinc-800 cursor-help peer" />
          <div className="absolute bottom-full mb-2 w-64 p-3 bg-zinc-900 border border-white/10 shadow-2xl rounded-lg opacity-0 peer-hover:opacity-100 transition-opacity z-50 pointer-events-none">
            <p className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase tracking-tight">
              {tip}
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: CAPITAL PARAMETERS */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 italic">
            <Activity className="h-3.5 w-3.5" /> Capital Baseline
          </h3>
          
          <div className="space-y-4">
            <InputWrapper 
              label="Liquid Capital ($)" 
              tip="The total sum of cash or cash-equivalent reserves currently being modeled for erosion."
            >
              <input 
                type="number" 
                value={inputs.currentAmount}
                onChange={(e) => setInputs({...inputs, currentAmount: Number(e.target.value)})}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary transition-all text-sm" 
              />
            </InputWrapper>

            <InputWrapper 
              label="Time Horizon (Years)" 
              tip="The duration over which the purchasing power erosion will be analyzed based on CPI targets."
            >
              <input 
                type="number" 
                value={inputs.years}
                onChange={(e) => setInputs({...inputs, years: Number(e.target.value)})}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary transition-all text-sm" 
              />
            </InputWrapper>
          </div>
        </div>

        {/* RIGHT COLUMN: MACRO PRESSURES */}
        <div className="bg-zinc-900/50 border border-primary/10 p-6 rounded-2xl space-y-4 shadow-xl shadow-primary/5">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
            <Wind className="h-3.5 w-3.5" /> Macro Pressure
          </h3>
          
          <div className="space-y-4">
            <InputWrapper 
              label="Expected Inflation (%)" 
              tip="Projected annual CPI. 2026 institutional estimates range between 3.2% and 4.8%."
            >
              <input 
                type="number" 
                step="0.1"
                value={inputs.annualInflation}
                onChange={(e) => setInputs({...inputs, annualInflation: Number(e.target.value)})}
                className="w-full bg-primary/5 border border-primary/20 rounded-lg p-3 text-primary text-xl font-black italic outline-none focus:border-primary transition-all" 
              />
            </InputWrapper>

            <InputWrapper 
              label="Portfolio Yield (%)" 
              tip="The annual return on the modeled capital (e.g., HYSA rates or dividend yields) to offset inflation."
            >
              <input 
                type="number" 
                step="0.1"
                value={inputs.investmentReturn}
                onChange={(e) => setInputs({...inputs, investmentReturn: Number(e.target.value)})}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary transition-all text-sm" 
              />
            </InputWrapper>
          </div>
        </div>
      </div>

      <button 
        onClick={handleAnalyze} 
        className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-2 italic shadow-xl shadow-white/5 active:scale-[0.98]"
      >
        Execute Erosion Analysis <ArrowRight className="h-4 w-4" />
      </button>

      {/* RESULTS DISPLAY: DYNAMICALLY RENDERED */}
      {results && (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* RESULTS HEADER */}
          <div className="p-4 flex items-center justify-between bg-primary">
            <h3 className="text-black font-black uppercase italic text-sm tracking-tighter flex items-center gap-2">
               <Activity className="h-4 w-4" /> Erosion Analysis Complete
            </h3>
            <span className="text-black/50 text-[10px] font-black uppercase tracking-widest italic">
              {results.years} Year Outlook
            </span>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black">
            {/* PRIMARY RESULT */}
            <div className="text-left space-y-6">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Real Purchasing Power</p>
              <div className="text-6xl font-black italic tracking-tighter text-white">
                ${results.realValue}
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl border-l-2 border-l-red-500">
                <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed italic">
                  Inflation has eroded <span className="text-red-500 font-black">${results.erosion}</span> of your relative wealth compared to nominal growth projections.
                </p>
              </div>
            </div>
            
            {/* SECONDARY STATS */}
            <div className="flex flex-col items-center justify-center space-y-6 md:border-l border-white/5">
              <div className="text-center">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 leading-none">Nominal Future Value</p>
                <div className="text-4xl font-black italic text-zinc-400 tracking-tighter leading-none">
                  ${results.nominalValue}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[8px] text-zinc-600 uppercase tracking-widest italic">
                <ShieldCheck className="h-3 w-3 text-primary" /> Verified 2026 Fiscal Parameters
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
