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
