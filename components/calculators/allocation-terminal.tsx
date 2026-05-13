"use client"

import React, { useState, useRef, useEffect } from "react"
import { ShieldCheck, ArrowRight, TrendingUp, PieChart, HelpCircle, AlertTriangle, Zap, Landmark } from "lucide-react"
import { calculateAllocationOutcome } from "@/lib/math/allocation-logic"

export default function AllocationTerminal() {
  const [mounted, setMounted] = useState(false)
  const [results, setResults] = useState<any>(null)

  // Stable Refs for typing
  const principalRef = useRef<HTMLInputElement>(null)
  const contributionRef = useRef<HTMLInputElement>(null)
  const yearsRef = useRef<HTMLInputElement>(null)
  const returnRef = useRef<HTMLInputElement>(null)
  const dividendRef = useRef<HTMLInputElement>(null)
  const taxRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const handleAnalyze = () => {
    const numericInputs = {
      principal: parseFloat(principalRef.current?.value || "0"),
      annualContribution: parseFloat(contributionRef.current?.value || "0"),
      years: parseFloat(yearsRef.current?.value || "0"),
      expectedReturn: parseFloat(returnRef.current?.value || "0"),
      dividendYield: parseFloat(dividendRef.current?.value || "0"),
      taxRate: parseFloat(taxRef.current?.value || "0"),
    }
    setResults(calculateAllocationOutcome(numericInputs))
  }

  const InputWrapper = ({ label, children, tip, align = "left" }: any) => (
    <div className="group relative space-y-1 text-left">
      <div className="flex items-center gap-2 mb-1">
        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider cursor-help">{label}</label>
        <div className="relative">
          <HelpCircle className="h-3 w-3 text-zinc-800 cursor-help peer" />
          <div className={`absolute bottom-full mb-2 w-64 p-3 bg-zinc-900 border border-white/10 shadow-2xl rounded-lg opacity-0 peer-hover:opacity-100 transition-opacity z-50 pointer-events-none text-justify
            ${align === "right" ? "right-0" : "left-0"}`}>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium uppercase tracking-tight">{tip}</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4 text-left">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black">Advisory Notice:</span> This terminal models structural tax alpha. 
          Projections are mathematical simulations and <span className="text-white underline decoration-red-500/50 underline-offset-4">not professional investment advice</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ASSET BASE */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 italic">
            <PieChart className="h-3 w-3" /> Asset Base
          </h3>
          <div className="space-y-4">
            <InputWrapper label="Initial Capital ($)" tip="The starting amount you are looking to invest or currently have in the account.">
              <input ref={principalRef} defaultValue="50000" type="number" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary transition-all" />
            </InputWrapper>
            <div className="grid grid-cols-2 gap-4">
              <InputWrapper label="Annual Add ($)" tip="How much extra you plan to save into this account every year.">
                <input ref={contributionRef} defaultValue="12000" type="number" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
              <InputWrapper label="Time Horizon (Yrs)" tip="How many years you plan to let the money grow before taking it out.">
                <input ref={yearsRef} defaultValue="20" type="number" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
            </div>
          </div>
        </div>

        {/* MARKET PARAMS */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4 shadow-xl shadow-primary/5">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
            <Zap className="h-3 w-3" /> Market Parameters
          </h3>
          <div className="space-y-4">
            <InputWrapper label="Expected Return %" tip="Your predicted yearly growth rate (e.g., 7% for the S&P 500 average).">
              <input ref={returnRef} defaultValue="8" type="number" step="0.1" className="w-full bg-primary/5 border border-primary/20 rounded-lg p-3 text-primary text-xl font-black italic outline-none" />
            </InputWrapper>
            <div className="grid grid-cols-2 gap-4">
              <InputWrapper label="Dividend Yield %" tip="The portion of return paid as dividends. These are taxed every year in a brokerage account.">
                <input ref={dividendRef} defaultValue="1.5" type="number" step="0.1" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
              <InputWrapper label="Capital Gains Tax %" align="right" tip="The tax rate you'll pay on profit (usually 15% or 20% in the US).">
                <input ref={taxRef} defaultValue="15" type="number" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleAnalyze} className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5 italic">
        Execute Sync <ArrowRight className="h-4 w-4" />
      </button>

      {results && (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-4 flex items-center justify-between bg-primary">
            <h3 className="text-black font-black uppercase italic text-sm tracking-tighter flex items-center gap-2">
               <ShieldCheck className="h-4 w-4" /> Capital Efficiency Alpha: +{results.alpha}%
            </h3>
            <span className="text-black/50 text-[10px] font-black uppercase tracking-widest">{results.years} Year Horizon</span>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black">
            <div className="space-y-6 text-left">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-relaxed">Taxable Wealth Gap</p>
              <div className="text-6xl font-black italic tracking-tighter text-white">${results.wealthGap}</div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl border-l-2 border-l-primary/50">
                <p className="text-[11px] text-zinc-400 font-bold uppercase leading-relaxed italic text-justify">
                  By utilizing a Tax-Exempt structure, you generate an additional <span className="text-white">${results.wealthGap}</span> in net wealth compared to a standard taxable brokerage account.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6 border-l border-white/5">
              <div className="text-center">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Roth / Tax-Exempt Value</p>
                <div className="text-4xl font-black italic text-white tracking-tighter">${results.exemptValue}</div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Taxable Brokerage (Net)</p>
                <div className="text-2xl font-black italic text-zinc-700 tracking-tighter line-through">${results.taxableValue}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
