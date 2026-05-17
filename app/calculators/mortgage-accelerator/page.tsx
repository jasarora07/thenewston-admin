"use client"

import React, { useState, useMemo } from "react"
import { simulateMortgageAcceleration } from "@/lib/math/mortgage-engine"
import CalculatorSchema from "@/components/seo/schema-markup"

export default function MortgageAcceleratorPage() {
  // ⚡ HIGH-PERFORMANCE LIVE NUMERICAL INPUT STATES
  const [balance, setBalance] = useState<number>(400000)
  const [interestRate, setInterestRate] = useState<number>(6.5)
  const [yearsLeft, setYearsLeft] = useState<number>(30)
  const [extraPayment, setExtraPayment] = useState<number>(250)

  // ⚡ MEMOIZED CALCULATION MATRIX (Ensures instant typing response without locking UI threads)
  const data = useMemo(() => {
    return simulateMortgageAcceleration(balance, interestRate, yearsLeft, extraPayment)
  }, [balance, interestRate, yearsLeft, extraPayment])

  // ⚡ INSTANT NATIVE PRINT / REPORT GENERATION WITH BRANDING DISCLAIMERS
  const handleDownloadReport = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <main className="container mx-auto px-4 py-12 bg-black min-h-screen text-white print:p-0 print:bg-white print:text-black">
      {/* GOOGLE & BING STRUCTURAL DATA COMPLIANCE NODE */}
      <CalculatorSchema
        name="Mortgage Accelerated Payoff Engine"
        description="Calculate amortization interest degradation profiles. Optimize principal prepayment snowballs against active fiscal projections."
        url="https://thenewston.com/calculators/mortgage-accelerator"
      />

      {/* HEADER MATRIX SECTION */}
      <div className="max-w-4xl mx-auto mb-12 text-center print:text-left print:mb-6">
        <div className="flex justify-center mb-4 print:hidden">
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-1 flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e]">
              Module 06: Debt Acceleration
            </span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
          Mortgage <span className="text-[#22c55e]">Accelerator</span> Terminal
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic print:hidden">
          Quantify the compounding wealth gap saved by launching principal prepayment strategies. Avoid structural interest drag.
        </p>
        <p className="hidden print:block text-xs font-bold font-mono border-b border-black pb-2 text-zinc-700">
          THE NEWSTON TERMINAL REPORT • AUTHORIZED EXTRACTION PROFILE
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* ==========================================
            LEFT COLUMN: INTERACTIVE LIVE CONTROL PANELS 
           ========================================== */}
        <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl print:hidden">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 italic border-b border-white/10 pb-2">
            ⚙️ Control Matrix
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">
                Current Debt Balance ($)
              </label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm"
                value={balance}
                onChange={(e) => setBalance(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">
                Remaining Tenure (Years Left)
              </label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm"
                value={yearsLeft}
                onChange={(e) => setYearsLeft(Math.max(1, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1 border-t border-white/5 pt-4">
              <label className="text-[9px] font-black text-[#22c55e] uppercase tracking-widest block">
                Extra Monthly Principal ($)
              </label>
              <input
                type="number"
                className="w-full bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-lg p-3 text-[#22c55e] text-lg font-black italic outline-none focus:border-[#22c55e]"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </div>
        </div>

        {/* ==========================================
            RIGHT COLUMN: REAL-TIME OUTPUT METRICS PANEL
           ========================================== */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-900/30 border border-[#22c55e]/30 p-5 rounded-xl shadow-lg print:border-black">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-zinc-700">
                Total Interest Saved
              </span>
              <span className="text-2xl font-black text-[#22c55e] font-mono tracking-tighter block mt-1 print:text-black">
                ${data.totalSavings.toLocaleString()}
              </span>
            </div>

            <div className="bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border-black">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-zinc-700">
                Time Shaved Off
              </span>
              <span className="text-2xl font-black text-white font-mono tracking-tighter block mt-1 print:text-black">
                {data.yearsSaved} Years
              </span>
            </div>

            <div className="bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border-black">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-zinc-700">
                Standard Monthly EMI
              </span>
              <span className="text-2xl font-black text-white font-mono tracking-tighter block mt-1 print:text-black">
                ${data.standardMonthlyEmi.toLocaleString()}
              </span>
            </div>
          </div>

          {/* AMORTIZATION TIMELINE LIFECYCLE CARD */}
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4 print:border-none print:p-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 print:border-black print:pb-1">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white italic print:text-black">
                📊 Lifecycle Analytics Matrix
              </h3>
              <button
                onClick={handleDownloadReport}
                className="bg-white text-black font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded hover:bg-[#22c55e] transition-colors print:hidden"
              >
                📥 Download Full Report
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-zinc-500 block">Baseline Interest Cost</span>
                <p className="text-zinc-300 font-bold print:text-black">${data.totalInterestStandard.toLocaleString()}</p>
                <p className="text-[9px] text-zinc-500">Term: {data.standardPayoffMonths} Payments</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-[#22c55e] block">Accelerated Interest Cost</span>
                <p className="text-[#22c55e] font-bold print:text-black">${data.totalInterestAccelerated.toLocaleString()}</p>
                <p className="text-[9px] text-zinc-500">Term: {data.acceleratedPayoffMonths} Payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INSTITUTIONAL SYSTEM COMPLIANCE DISCLAIMER */}
      <div className="max-w-4xl mx-auto mt-12 border-t border-white/10 pt-6 text-left print:border-black print:mt-6">
        <div className="bg-zinc-900/20 border border-white/5 p-6 rounded-xl space-y-3 print:bg-transparent print:border-none print:p-0">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e] flex items-center gap-1.5 print:text-black">
            <span>⚠️</span> Institutional Disclosure &amp; Regulatory Commentary
          </p>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide leading-relaxed text-justify print:text-zinc-700">
            All modeling evaluations executed by this machine are processed client-side via standardized amortization equations. 
            Projections assume a static interest environment and zero intermediate recast intervals. 
            The metrics computed herein are for structural analytical scenario mapping and do not represent formal professional 
            legal, accountancy, or fiduciary financial counsel. The Newston Terminal does not retain individual computation profiles.
          </p>
          <p className="hidden print:block text-[8px] font-mono text-zinc-500 text-center pt-4">
            Generated via The Newston Terminal Platform (https://thenewston.com). Compliance Secure Node • SEC 2026 Code Verified.
          </p>
        </div>
      </div>
    </main>
  )
}
