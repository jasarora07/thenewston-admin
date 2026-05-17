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
                type="
