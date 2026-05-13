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

  // REUSABLE TOOLTIP COMPONENT FOR THE TERMINAL
  const InputWrapper = ({ label, children, tip, align = "left" }: any) => (
    <div className="group relative space-y-1">
      <div className="flex items-center gap-2 mb-1">
        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">{label}</label>
        <div className="relative">
          <HelpCircle className="h-3 w-3 text-zinc-800 cursor-help peer" />
          {/* TOOLTIP CONTENT: Formatted like the Intelligence Briefing */}
          <div className={`absolute bottom-full mb-2 w-56 p-3 bg-zinc-900 border border-white/10 shadow-2xl rounded-lg opacity-0 peer-hover:opacity-100 transition-opacity z-50 pointer-events-none
            ${align === "right" ? "right-0" : "left-0"}`}>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
              {tip}
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT: ASSET ANCHORS */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 italic">
            <Landmark className="h-3 w-3" /> Debt Anchors
          </h3>
          
          <div className="space-y-4">
            <InputWrapper 
              label="Home Valuation" 
              tip="The estimated market value of your property. You can use a recent appraisal or a conservative estimate from sites like Zillow.">
              <input type="number" name="homeValue" value={inputs.homeValue} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary" />
            </InputWrapper>

            <div className="grid grid-cols-2 gap-4">
              <InputWrapper 
                label="1st Lien Balance" 
                tip="How much you still owe on your main mortgage. You can find this 'Remaining Principal' on your latest monthly statement.">
                <input type="number" name="mortgageBalance" value={inputs.mortgageBalance} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
              
              <InputWrapper 
                label="Locked Rate %" 
                tip="The interest rate you pay on your current mortgage. The calculator checks if we can help you keep this low rate.">
                <input type="number" step="0.01" name="primaryRate" value={inputs.primaryRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-green-500 font-mono font-bold outline-none" />
              </InputWrapper>
            </div>
          </div>
        </div>

        {/* RIGHT: EXTRACTION TARGETS */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4 shadow-xl shadow-primary/5">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
            <Zap className="h-3 w-3" /> Extraction Target
          </h3>

          <div className="space-y-4">
            <InputWrapper 
              label="Cash Required ($)" 
              tip="The total amount of money you want to take out of your home for your specific financial goals.">
              <input type="number" name="cashNeeded" value={inputs.cashNeeded} onChange={handleInputChange} className="w-full bg-primary/5 border border-primary/20 rounded-lg p-3 text-primary text-xl font-black italic outline-none" />
            </InputWrapper>

            <div className="grid grid-cols-2 gap-4">
              <InputWrapper 
                label="HELOC Rate %" 
                tip="The interest rate for a new second loan. This sits on top of your current mortgage without replacing it.">
                <input type="number" step="0.01" name="helocRate" value={inputs.helocRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
              
              <InputWrapper 
                label="Refi Rate %" 
                align="right"
                tip="The rate you would get if you replaced your current mortgage entirely with one big new loan.">
                <input type="number" step="0.01" name="newRefiRate" value={inputs.newRefiRate} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS PANEL */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className={`p-4 flex items-center justify-between ${results.signal === 'HELOC' ? 'bg-green-600' : 'bg-primary'}`}>
          <h3 className="text-black font-black uppercase italic text-sm tracking-tighter flex items-center gap-2">
             {results.signal === 'HELOC' ? <ShieldCheck className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
             Analysis Signal: {results.signal === 'HELOC' ? 'Keep Primary Mortgage' : 'Total Debt Refinance'}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-black/50 text-[10px] font-black uppercase">LTV: {results.ltv}%</span>
            <div className="relative group">
              <HelpCircle className="h-3 w-3 text-black/40 cursor-help peer" />
              <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-zinc-900 border border-white/10 text-[9px] text-zinc-400 font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-2xl">
                Lenders typically want to see your total debt stay below 80% of your home's value.
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black">
          <div className="space-y-6">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Effective "Blended" Interest</p>
               <div className="text-6xl font-black italic tracking-tighter text-white">
                 {results.blendedRateHELOC}%
               </div>
               <p className="text-[9px] text-zinc-600 font-bold uppercase italic">The average cost of all your debt combined</p>
            </div>

            <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
               <p className="text-[11px] text-zinc-400 font-bold uppercase leading-relaxed">
                 {results.recommendation}
               </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 border-l border-white/5 font-bold">
             <div className="text-center">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Efficiency Savings</p>
               <div className="text-5xl font-black italic text-white tracking-tighter">
                 ${results.monthlySavings}<span className="text-lg text-zinc-500 font-normal italic">/mo</span>
               </div>
             </div>
             <button className="bg-white text-black px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2 shadow-xl shadow-white/5 uppercase italic">
               Execute Sync <ArrowRight className="h-3 w-3 text-black" />
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
