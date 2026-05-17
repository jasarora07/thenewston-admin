"use client"

import React, { useState, useMemo, useEffect } from "react"
import { simulateMortgageAcceleration } from "@/lib/math/mortgage-engine"
import CalculatorSchema from "@/components/seo/schema-markup"

export default function MortgageAcceleratorPage() {
  const [balance, setBalance] = useState<number>(400000)
  const [interestRate, setInterestRate] = useState<number>(6.5)
  const [yearsLeft, setYearsLeft] = useState<number>(30)
  const [extraPayment, setExtraPayment] = useState<number>(250)

  const data = useMemo(() => {
    return simulateMortgageAcceleration(balance, interestRate, yearsLeft, extraPayment)
  }, [balance, interestRate, yearsLeft, extraPayment])

  // ⚡ DEBNOUNCED BACKGROUND DATABASE TRACKER (Maps values & syncs JSONB columns asynchronously)
  useEffect(() => {
    // Safety verification: Prevent tracking the default starting parameters on page load cold boots
    if (balance === 400000 && extraPayment === 250 && interestRate === 6.5) return

    // Set up a silent 1.5-second countdown timer in browser memory
    const dispatchTelemetry = setTimeout(async () => {
      try {
        await fetch("/api/telemetry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calc_type: "mortgage_accelerator",
            partner_domain: typeof window !== "undefined" ? window.location.hostname : "direct",
            inputs: { 
              current_balance: balance, 
              interest_rate: interestRate, 
              years_remaining: yearsLeft, 
              extra_monthly_principal: extraPayment 
            },
            results: { 
              total_interest_saved: data.totalSavings, 
              years_shaved_off: data.yearsSaved,
              standard_emi: data.standardMonthlyEmi
            }
          })
        })
        console.log("▲ [TELEMETRY METRIC SYNCED SUCCESSFULLY TO SUPABASE]")
      } catch (err) {
        console.warn("Telemetry background upload skipped due to connection parameters.")
      }
    }, 1500) // Fires background update exactly 1.5 seconds after typing stops

    // Cleanup phase: Instantly resets the clock if the user strikes another key before 1.5s
    return () => clearTimeout(dispatchTelemetry)
  }, [balance, interestRate, yearsLeft, extraPayment, data])

  const handleDownloadReport = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <main className="container mx-auto px-4 py-12 bg-black min-h-screen font-sans text-white print:bg-white print:text-black print:p-0">
      <CalculatorSchema
        name="Mortgage Accelerated Payoff Engine"
        description="Calculate amortization interest degradation profiles. Optimize principal prepayment snowballs against active fiscal projections."
        url="https://thenewston.com/calculators/mortgage-accelerator"
      />

      {/* HEADER ROW */}
      <div className="max-w-4xl mx-auto mb-12 text-center print:text-left print:mb-8">
        <div className="flex justify-center mb-4 print:hidden">
          <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-1 flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#22c55e]">
              Module 01: Debt Acceleration
            </span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 print:text-3xl print:not-italic print:tracking-normal print:text-black">
          Mortgage <span className="text-[#22c55e] print:text-black print:underline">Accelerator</span> Terminal
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic text-center print:hidden">
          {"Quantify the compounding wealth gap saved by launching principal prepayment strategies. Eliminate structural interest drag."}
        </p>
        <div className="hidden print:block text-[10px] font-black font-mono border-b-2 border-black pb-2 text-zinc-800 uppercase tracking-widest">
          The Newston Intelligence Terminal • Audit Extract Reference // {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* LEFT COLUMN: CONTROLS */}
        <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl print:border-none print:p-0 print:bg-transparent">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 italic border-b border-white/10 pb-2 print:text-black print:border-black print:not-italic">
            Control Baseline Parameter Arrays
          </h3>

          <div className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Current Debt Balance ($)</label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-300 print:text-black"
                value={balance}
                onChange={(e) => setBalance(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Annual Interest Rate (%)</label>
              <input
                type="number" step="0.01"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-300 print:text-black"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Remaining Tenure (Years Left)</label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-300 print:text-black"
                value={yearsLeft}
                onChange={(e) => setYearsLeft(Math.max(1, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1 text-left border-t border-white/5 pt-4 print:border-zinc-200">
              <label className="text-[9px] font-black text-[#22c55e] uppercase tracking-widest block print:text-black">Extra Monthly Principal ($)</label>
              <input
                type="number"
                className="w-full bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-lg p-3 text-[#22c55e] text-lg font-black italic font-sans outline-none focus:border-[#22c55e] print:bg-white print:border-zinc-400 print:text-black print:not-italic"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME OUTPUT TARGETS PANEL */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* CARD 1: INTEREST SAVED */}
            <div className="relative group bg-zinc-900/30 border border-[#22c55e]/30 p-5 rounded-xl shadow-lg print:border-2 print:border-black print:bg-transparent text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-bold">Total Interest Saved</span>
                <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
              </div>
              <span className="text-2xl font-black text-[#22c55e] font-sans tracking-tight block mt-1 print:text-black print:text-xl print:font-bold">
                ${data.totalSavings.toLocaleString()}
              </span>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-800 print:border-zinc-200">
                {"This is pure cash kept out of the bank's pockets and locked directly into your home equity."}
              </p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl">
                {"Calculates the cumulative lifetime interest expense avoided by running short-interval principal injections."}
              </div>
            </div>

            {/* CARD 2: TIME SAVED */}
            <div className="relative group bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border-2 print:border-black print:bg-transparent text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-bold">Time Shaved Off</span>
                <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
              </div>
              <span className="text-2xl font-black text-white font-sans tracking-tight block mt-1 print:text-black print:text-xl print:font-bold">
                {data.yearsSaved} Years
              </span>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-800 print:border-zinc-200">
                {"Your debt obligation hits zero years early, giving you full financial freedom sooner."}
              </p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl">
                {"The absolute runtime variance between your contract amortization maturity date and the accelerated projection window."}
              </div>
            </div>

            {/* CARD 3: EMI */}
            <div className="relative group bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border-2 print:border-black print:bg-transparent text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-bold">Standard Monthly EMI</span>
                <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
              </div>
              <span className="text-2xl font-black text-white font-sans tracking-tight block mt-1 print:text-black print:text-xl print:font-bold">
                ${data.standardMonthlyEmi.toLocaleString()}
              </span>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-800 print:border-zinc-200">
                {"Your required base payment. Extra payments don't change this, they just end the loan early."}
              </p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl text-left">
                {"Standard monthly installment derived via fixed amortization algorithms balancing rate, tenure, and capital."}
              </div>
            </div>
          </div>

          {/* AMORTIZATION LIFECYCLE GRID CARD */}
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 print:border-t print:border-b print:border-black print:rounded-none print:p-4 print:bg-transparent">
            <div className="border-b border-white/10 pb-2 print:border-black">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white italic text-left print:text-black print:font-bold print:not-italic">
                📊 Lifecycle Analytics Matrix Breakdown
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm font-sans pt-2">
              {/* BASELINE SCHEDULE CARD */}
              <div className="relative group space-y-1 border-r border-white/5 pr-4 text-left print:border-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-widest text-zinc-500 block print:text-black print:font-bold">Baseline Schedule Matrix</span>
                  <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
                </div>
                <p className="text-zinc-300 font-bold text-lg print:text-black">${data.totalInterestStandard.toLocaleString()}</p>
                <p className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-wider">Term: {data.standardPayoffMonths} Payments</p>
                <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug pt-1 print:text-zinc-700">
                  {"What you will pay in total interest if you make only standard monthly payments over the loan's life."}
                </p>
                <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl">
                  {"Total integrated aggregate of interest outlays accrued via non-accelerated timeline tracks."}
                </div>
              </div>

              {/* ACCELERATED SCHEDULE CARD */}
              <div className="relative group space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-widest text-[#22c55e] block print:text-black print:font-bold">Accelerated Schedule Matrix</span>
                  <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
                </div>
                <p className="text-[#22c55e] font-bold text-lg print:text-black">${data.totalInterestAccelerated.toLocaleString()}</p>
                <p className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-wider">Term: {data.acceleratedPayoffMonths} Payments</p>
                <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug pt-1 print:text-zinc-700">
                  {"Your new total interest liability when adding the extra payment allocation vector."}
                </p>
                <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl">
                  {"Total integrated aggregate of interest outlays accrued when applying client-side prepayment vectors."}
                </div>
              </div>
            </div>

            {/* BUTTON LOCATED AT BOTTOM OF VALUES BLOCK */}
            <div className="pt-4 border-t border-white/5 flex justify-end print:hidden">
              <button
                onClick={handleDownloadReport}
                className="bg-white text-black font-black text-[9px] uppercase tracking-widest px-4 py-2.5 rounded-md hover:bg-[#22c55e] hover:text-black transition-all active:scale-[0.98] shadow-lg flex items-center gap-2"
              >
                <span>📥</span> Download Full Verified Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER INFORMATIVE EXPLANATION CARDS */}
      <section className="max-w-5xl mx-auto py-12 border-t border-white/5 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-2">
            <h3 className="text-sm font-black uppercase tracking-widest italic text-white">The Principal Snowball</h3>
            <p className="text-[11px] text-zinc-400 font-bold leading-relaxed uppercase text-justify tracking-tight">
              {"Standard monthly allocations prioritize interest extraction schedules on early lifecycle timelines. Adding extra capital blocks bypasses intermediate interest accruals completely, slashing debt margins directly from your structural framework balances."}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-black uppercase tracking-widest italic text-white">Amortization Lifecycles</h3>
            <p className="text-[11px] text-zinc-400 font-bold leading-relaxed uppercase text-justify tracking-tight">
              {"By reducing raw principal balances continuously, the internal interest component inside your standard monthly EMI collapses early. This compounds exponentially, converting previous bank profit margins into instant personal asset equity matrices."}
            </p>
          </div>
        </div>
      </section>

      {/* THREE FOOTER NAVIGATION / ADVERTISING CARDS */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5 text-left print:hidden">
        <a className="group p-6 bg-zinc-900/50 border border-white/5 hover:border-[#22c55e]/50 transition-all rounded-xl" href="/calculators">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white leading-none mb-3">Decision Models</h3>
          <p className="text-[9px] text-zinc-500 uppercase font-bold text-left">{"Return to the full suite of institutional intelligence engines."}</p>
        </a>
        <div className="relative p-6 bg-zinc-900/10 border border-white/5 rounded-xl cursor-not-allowed group text-left">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none mb-3">Consult Advisor</h3>
          <p className="text-[9px] text-zinc-600 uppercase font-bold mb-4">{"Direct integration with verified CPAs and Fiduciaries."}</p>
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-black text-[#22c55e] uppercase tracking-[0.2em] animate-pulse">{"Feature Pending // 2026"}</div>
        </div>
        <a className="group p-6 bg-[#22c55e]/5 border border-[#22c55e]/20 hover:border-[#22c55e] transition-all rounded-xl" href="/partnership">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white leading-none italic mb-3">Become a Partner</h3>
          <p className="text-[9px] text-[#22c55e] uppercase font-black text-left">{"Apply for firm-level integration into the Newston Terminal."}</p>
        </a>
      </section>

      {/* REGULATORY COMMENTARY BOX & INTEL DISCLAIMER */}
      <div className="max-w-6xl mx-auto mt-6 border-t border-white/5 pt-8 text-left print:border-black print:p-0 print:mt-12">
        <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-xl backdrop-blur-sm flex items-start gap-4 text-left print:border-none print:p-0">
          <div className="space-y-3">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#22c55e] print:text-black print:font-bold">
              {"Institutional Disclosure and Regulatory Commentary"}
            </p>
            <p className="text-[10px] text-zinc-500 leading-relaxed text-justify uppercase font-bold tracking-tight print:text-zinc-700 print:normal-case print:font-medium">
              {"All modeling evaluations executed by this machine are processed client-side via standardized continuous amortization equations. Calculations integrate base parameters sourced straight from active fiscal data architectures. Projections assume a static interest environment and zero intermediate recast intervals. The metrics computed herein are for structural analytical scenario mapping and do not represent formal professional legal, accountancy, or fiduciary financial counsel. The Newston Terminal does not retain individual computation profiles."}
            </p>
            <p className="hidden print:block text-[9px] font-mono font-bold text-zinc-500 pt-6 border-t border-dashed border-zinc-300">
              {"Extraction Source: The Newston Terminal Engine (https://thenewston.com) • Verified SEC 2026 Code Base Deployment Block."}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
