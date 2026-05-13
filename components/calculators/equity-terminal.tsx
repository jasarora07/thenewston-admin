"use client"

import React, { useState, useRef, useEffect } from "react"
import { Landmark, ArrowRight, Zap, ShieldCheck, AlertCircle, HelpCircle, AlertTriangle } from "lucide-react"
import { calculateEquityOutcome } from "@/lib/math/equity-logic"

export default function EquityCalculatorTerminal() {
  const [mounted, setMounted] = useState(false)
  const [results, setResults] = useState<any>(null)

  // 1. Using Refs instead of State for inputs. 
  // This prevents the component from re-rendering on every keystroke.
  const homeValueRef = useRef<HTMLInputElement>(null)
  const balanceRef = useRef<HTMLInputElement>(null)
  const rateRef = useRef<HTMLInputElement>(null)
  const cashRef = useRef<HTMLInputElement>(null)
  const helocRef = useRef<HTMLInputElement>(null)
  const refiRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // 2. The ONLY trigger for calculation
  const handleAnalyze = () => {
    const numericInputs = {
      homeValue: parseFloat(homeValueRef.current?.value || "0"),
      mortgageBalance: parseFloat(balanceRef.current?.value || "0"),
      primaryRate: parseFloat(rateRef.current?.value || "0"),
      cashNeeded: parseFloat(cashRef.current?.value || "0"),
      helocRate: parseFloat(helocRef.current?.value || "0"),
      newRefiRate: parseFloat(refiRef.current?.value || "0"),
    }
    
    const outcome = calculateEquityOutcome(numericInputs)
    setResults(outcome)
  }

  const InputWrapper = ({ label, children, tip, align = "left" }: any) => (
    <div className="group relative space-y-1">
      <div className="flex items-center gap-2 mb-1">
        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider cursor-help">{label}</label>
        <div className="relative">
          <HelpCircle className="h-3 w-3 text-zinc-800 cursor-help peer" />
          <div className={`absolute bottom-full mb-2 w-64 p-3 bg-zinc-900 border border-white/10 shadow-2xl rounded-lg opacity-0 peer-hover:opacity-100 transition-opacity z-50 pointer-events-none
            ${align === "right" ? "right-0" : "left-0"}`}>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium uppercase tracking-tight">
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
      {/* ADVISORY */}
      <div className="bg-red-500/5 border border-red-500/20 p-4 rounded flex items-start gap-4 text-left">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">
          <span className="text-red-500 font-black">Advisory Notice:</span> This terminal is an institutional simulation engine. 
          Projections are mathematical and <span className="text-white underline decoration-red-500/50 underline-offset-4">not professional financial advice</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* DEBT ANCHORS */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 italic">
            <Landmark className="h-3 w-3" /> Debt Anchors
          </h3>
          <div className="space-y-4">
            <InputWrapper label="Home Valuation" tip="Use a recent appraisal or a conservative estimate. This helps determine how much equity you can safely use.">
              <input ref={homeValueRef} defaultValue="500000" type="number" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary transition-all" />
            </InputWrapper>

            <div className="grid grid-cols-2 gap-4">
              <InputWrapper label="1st Lien Balance" tip="Check your most recent mortgage statement for your 'Remaining Principal'.">
                <input ref={balanceRef} defaultValue="300000" type="number" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
              <InputWrapper label="Locked Rate %" tip="The interest rate you currently pay. We want to see if we can help you keep this while getting cash out.">
                <input ref={rateRef} defaultValue="3.25" type="number" step="0.01" className="w-full bg-black border border-white/10 rounded-lg p-3 text-green-500 font-mono font-bold outline-none" />
              </InputWrapper>
            </div>
          </div>
        </div>

        {/* EXTRACTION TARGET */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4 shadow-xl shadow-primary/5">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
            <Zap className="h-3 w-3" /> Extraction Target
          </h3>
          <div className="space-y-4">
            <InputWrapper label="Cash Required ($)" tip="Enter the total amount of cash you need to take out of your home.">
              <input ref={cashRef} defaultValue="50000" type="number" className="w-full bg-primary/5 border border-primary/20 rounded-lg p-3 text-primary text-xl font-black italic outline-none" />
            </InputWrapper>
            <div className="grid grid-cols-2 gap-4">
              <InputWrapper label="HELOC Rate %" tip="The current interest rate for a new HELOC. This is a separate, second loan.">
                <input ref={helocRef} defaultValue="8.5" type="number" step="0.01" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
              <InputWrapper label="Refi Rate %" align="right" tip="The interest rate you would get if you replaced your entire mortgage today.">
                <input ref={refiRef} defaultValue="7.2" type="number" step="0.01" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
              </InputWrapper>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleAnalyze} 
        className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5 italic"
      >
        Execute Sync <ArrowRight className="h-4 w-4" />
      </button>

      {/* RESULTS PANEL */}
      {results && (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`p-4 flex items-center justify-between ${results.signal === 'HELOC' ? 'bg-green-600' : 'bg-primary'}`}>
            <h3 className="text-black font-black uppercase italic text-sm tracking-tighter flex items-center gap-2">
               {results.signal === 'HELOC' ? <ShieldCheck className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
               Analysis Signal: {results.signal === 'HELOC' ? 'Keep Primary Mortgage' : 'Total Debt Refinance'}
            </h3>
            <span className="text-black/50 text-[10px] font-black uppercase">LTV: {results.ltv}%</span>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black">
            <div className="space-y-6 text-left">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-relaxed">Effective "Blended" Interest</p>
              <div className="text-6xl font-black italic tracking-tighter text-white">{results.blendedRateHELOC}%</div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl border-l-2 border-l-primary/50">
                <p className="text-[11px] text-zinc-400 font-bold uppercase leading-relaxed italic text-justify">{results.recommendation}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6 border-l border-white/5">
              <div className="text-center">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 leading-relaxed">Efficiency Savings</p>
                <div className="text-5xl font-black italic text-white tracking-tighter">
                  ${results.monthlySavings}<span className="text-lg text-zinc-500 font-normal italic">/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
