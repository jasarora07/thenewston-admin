"use client"

import React, { useState, useMemo, useEffect } from "react"

export default function TaxExemptWealthGap() {
  // 1. BASELINE VALUE CONFIGURATION ARRAYS
  const [initialCapital, setInitialCapital] = useState<number>(100000)
  const [annualContribution, setAnnualContribution] = useState<number>(12000)
  const [expectedReturn, setExpectedReturn] = useState<number>(8.0)
  const [taxRate, setTaxRate] = useState<number>(24)
  const [horizonYears, setHorizonYears] = useState<number>(20)

  // 2. INDUSTRIAL EXPONENTIAL DRAG MATHEMATICS ENGINE
  const data = useMemo(() => {
    let taxableTotal = initialCapital
    let taxExemptTotal = initialCapital
    
    const r = expectedReturn / 100
    const t = taxRate / 100
    const taxedRate = r * (1 - t) // True return rate following annual tax friction degradation

    // Run annual compounding cycles over the structural investment horizon
    for (let i = 0; i < horizonYears; i++) {
      taxExemptTotal = taxExemptTotal * (1 + r) + annualContribution
      taxableTotal = taxableTotal * (1 + taxedRate) + annualContribution
    }

    const wealthGap = taxExemptTotal - taxableTotal
    const capitalErosionPercentage = taxExemptTotal > 0 ? (wealthGap / taxExemptTotal) * 100 : 0

    return {
      taxableGrowthTotal: Math.round(taxableTotal),
      taxExemptGrowthTotal: Math.round(taxExemptTotal),
      absoluteWealthGap: Math.round(wealthGap),
      capitalErosionPercentage: Math.round(capitalErosionPercentage)
    }
  }, [initialCapital, annualContribution, expectedReturn, taxRate, horizonYears])

  // ⚡ DEBNOUNCED BACKGROUND DATABASE TELEMETRY ENGINE
  useEffect(() => {
    // Safety check: Prevent tracking baseline landing parameters on page load cold boots
    if (initialCapital === 100000 && annualContribution === 12000 && taxRate === 24) return

    // Set up a silent 1.5-second countdown timer in browser memory
    const dispatchTelemetry = setTimeout(async () => {
      try {
        const response = await fetch("/api/telemetry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calc_type: "tax_exempt_wealth_gap",
            partner_domain: typeof window !== "undefined" ? window.location.hostname : "direct",
            inputs: {
              initial_principal_capital: initialCapital,
              annual_contribution_vector: annualContribution,
              expected_gross_return: expectedReturn,
              marginal_tax_rate: taxRate,
              investment_horizon_years: horizonYears
            },
            results: {
              taxable_compounding_total: data.taxableGrowthTotal,
              tax_exempt_compounding_total: data.taxExemptGrowthTotal,
              total_wealth_gap_loss: data.absoluteWealthGap,
              portfolio_leakage_ratio: data.capitalErosionPercentage
            }
          })
        })

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => ({ error: "Payload parsing bypassed" }))
          console.error("❌ [TELEMETRY REGISTRY REJECTED BY SERVER]:", response.status, errorPayload)
          return
        }

        console.log("▲ [TELEMETRY METRIC SYNCED SUCCESSFULLY TO SUPABASE]")
      } catch (err) {
        console.warn("Telemetry background upload skipped due to connection parameters.")
      }
    }, 1500) // Transmits payload exactly 1.5 seconds after parameters hold static

    // Cleanup phase: Instantly resets the clock if the user strikes another key before 1.5s
    return () => clearTimeout(dispatchTelemetry)
  }, [initialCapital, annualContribution, expectedReturn, taxRate, horizonYears, data])

  const handleDownloadReport = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 text-white font-sans">
      {/* LEFT COLUMN: CONTROLS */}
      <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl print:border-none print:p-0 print:bg-transparent">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 italic border-b border-white/10 pb-2 print:text-black print:border-black print:not-italic">
          Control Baseline Parameter Arrays
        </h3>

        <div className="space-y-4">
          <div className="space-y-1 text-left">
            <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Initial Capital Base ($)</label>
            <input
              type="number"
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-300 print:text-black"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Math.max(0, Number(e.target.value)))}
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Annual Savings Vector ($)</label>
            <input
              type="number"
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-300 print:text-black"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Math.max(0, Number(e.target.value)))}
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Expected Gross Return (%)</label>
            <input
              type="number" step="0.1"
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-300 print:text-black"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Math.max(0, Number(e.target.value)))}
            />
          </div>

          <div className="space-y-1 text-left border-t border-white/5 pt-4 print:border-zinc-200">
            <label className="text-[9px] font-black text-[#22c55e] uppercase tracking-widest block print:text-black">Marginal Tax Friction Rate (%)</label>
            <input
              type="number"
              className="w-full bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-lg p-3 text-[#22c55e] text-lg font-black italic font-sans outline-none focus:border-[#22c55e] print:bg-white print:border-zinc-400 print:text-black print:not-italic"
              value={taxRate}
              onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value)))}
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Investment Horizon (Years)</label>
            <input
              type="number"
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-300 print:text-black"
              value={horizonYears}
              onChange={(e) => setHorizonYears(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: REAL-TIME OUTPUT TARGETS PANEL */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* CARD 1: TOTAL WEALTH GAP LOSS */}
          <div className="relative group bg-zinc-900/30 border border-[#22c55e]/30 p-5 rounded-xl shadow-lg print:border-2 print:border-black print:bg-transparent text-left">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-bold">Absolute Wealth Gap</span>
              <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
            </div>
            <span className="text-2xl font-black text-[#22c55e] font-sans tracking-tight block mt-1 print:text-black print:text-xl print:font-bold">
              ${data.absoluteWealthGap.toLocaleString()}
            </span>
            <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-800 print:border-zinc-200">
              {"This is pure capital intercepted by the IRS and completely erased from your compounding asset base."}
            </p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl">
              {"Calculates the cumulative multi-decade differential between 100% efficient tax shielding and standard tax accounts."}
            </div>
          </div>

          {/* CARD 2: CAPITAL EROSION RATIO */}
          <div className="relative group bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border-2 print:border-black print:bg-transparent text-left">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-bold">Portfolio Erosion Ratio</span>
              <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
            </div>
            <span className="text-2xl font-black text-white font-sans tracking-tight block mt-1 print:text-black print:text-xl print:font-bold">
              {data.capitalErosionPercentage}% Deficit
            </span>
            <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-800 print:border-zinc-200">
              {"Your ultimate estate generation power drops by this percentage due to annual fiscal friction."}
            </p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl">
              {"The mathematical percentage of maximum wealth killed by non-shielded annual tax allocations."}
            </div>
          </div>

          {/* CARD 3: TAX FRICTION MULTIPLIER */}
          <div className="relative group bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border-2 print:border-black print:bg-transparent text-left">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-bold">Effective Tax Drag</span>
              <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
            </div>
            <span className="text-2xl font-black text-white font-sans tracking-tight block mt-1 print:text-black print:text-xl print:font-bold">
              {taxRate}% / Yr
            </span>
            <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-800 print:border-zinc-200">
              {"Your current annual fiscal penalty line. This rate compounds negatively against market upside."}
            </p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl text-left">
              {"The yearly asset deduction constant pulled out of production, breaking the geometric curve of accumulation."}
            </div>
          </div>
        </div>

        {/* LIFECYCLE MATRIX BREAKDOWN */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 print:border-t print:border-b print:border-black print:rounded-none print:p-4 print:bg-transparent">
          <div className="border-b border-white/10 pb-2 print:border-black">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white italic text-left print:text-black print:font-bold print:not-italic">
              📊 Lifecycle Analytics Matrix Breakdown
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm font-sans pt-2">
            {/* TAXABLE GROWTH BOX */}
            <div className="relative group space-y-1 border-r border-white/5 pr-4 text-left print:border-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-widest text-zinc-500 block print:text-black print:font-bold">Taxable Capital Matrix</span>
                <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
              </div>
              <p className="text-zinc-300 font-bold text-lg print:text-black">${data.taxableGrowthTotal.toLocaleString()}</p>
              <p className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-wider">Horizon: {horizonYears} Years Mature</p>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug pt-1 print:text-zinc-700">
                {"What you accumulate if asset returns face continuous annual retail tax liquidations before re-investing."}
              </p>
              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl">
                {"Total growth projection with returns reduced annually by your configured marginal tax brackets."}
              </div>
            </div>

            {/* TAX EXEMPT GROWTH BOX */}
            <div className="relative group space-y-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-widest text-[#22c55e] block print:text-black print:font-bold">Tax-Exempt Alpha Matrix</span>
                <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
              </div>
              <p className="text-[#22c55e] font-bold text-lg print:text-black">${data.taxExemptGrowthTotal.toLocaleString()}</p>
              <p className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-wider">Efficiency: 100% Retained</p>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug pt-1 print:text-zinc-700">
                {"Your capital potential when asset gains are completely locked behind structural shields."}
              </p>
              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl">
                {"Total accumulation track running at full efficiency, leveraging unbroken interest compounding dynamics."}
              </div>
            </div>
          </div>

          {/* REPORT DISPATCH TRIGGER BUTTON */}
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
  )
}
