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
    if (initialCapital === 100000 && annualContribution === 12000 && taxRate === 24) return

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
    }, 1500)

    return () => clearTimeout(dispatchTelemetry)
  }, [initialCapital, annualContribution, expectedReturn, taxRate, horizonYears, data])

  const handleDownloadReport = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <div className="w-full text-white font-sans print:bg-white print:text-black print:p-0">
      
      {/* 📥 BRANDED PRINT HEADER BLOCK (Only prints inside PDF reports, hidden on screen view) */}
      <div className="hidden print:block text-left mb-8 border-b-2 border-black pb-4">
        <div className="text-xl font-black uppercase tracking-tight text-black">
          The Newston <span className="underline">Intelligence Terminal</span>
        </div>
        <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mt-1 flex justify-between">
          <span>Module 02: Capital Efficiency Audit Profile</span>
          <span>Date Root Reference // {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 print:block print:space-y-8">
        {/* LEFT COLUMN: CONTROLS */}
        <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl print:border-none print:p-0 print:bg-transparent">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 italic border-b border-white/10 pb-2 print:text-black print:border-black print:not-italic print:text-xs">
            Control Baseline Parameter Arrays
          </h3>

          <div className="space-y-4 print:grid print:grid-cols-2 print:gap-4 print:space-y-0">
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Initial Capital Base ($)</label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-400 print:text-black"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Annual Savings Vector ($)</label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-400 print:text-black"
                value={annualContribution}
                onChange={(e) => setAnnualContribution(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Expected Gross Return (%)</label>
              <input
                type="number" step="0.1"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-400 print:text-black"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1 text-left print:border-none print:pt-0">
              <label className="text-[9px] font-black text-white uppercase tracking-widest block print:text-black">Marginal Tax Friction Rate (%)</label>
              <input
                type="number"
                className="w-full bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-lg p-3 text-[#22c55e] text-lg font-black italic font-sans outline-none focus:border-[#22c55e] print:bg-white print:border-zinc-400 print:text-black print:not-italic print:text-sm print:p-3"
                value={taxRate}
                onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value)))}
              />
            </div>

            <div className="space-y-1 text-left col-span-2">
              <label className="text-[9px] font-black text-white uppercase tracking-widest print:text-black">Investment Horizon (Years)</label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:bg-white print:border-zinc-400 print:text-black"
                value={horizonYears}
                onChange={(e) => setHorizonYears(Math.max(1, Number(e.target.value)))}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME OUTPUT TARGETS PANEL */}
        <div className="lg:col-span-2 space-y-6 print:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:grid-cols-3 print:gap-4">
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
                {"This is pure cash intercepted by annual tax structures and completely erased from your compounding asset base."}
              </p>
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
                {"Your ultimate estate generation potential drops by this exact percentage due to annual fiscal leakage constants."}
              </p>
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
                {"Your current annual fiscal penalty line. This percentage line continuously drags against maximum market upside."}
              </p>
            </div>
          </div>

          {/* LIFECYCLE MATRIX BREAKDOWN CARD */}
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 print:border-2 print:border-black print:rounded-none print:p-4 print:bg-transparent">
            <div className="border-b border-white/10 pb-2 print:border-black">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white italic text-left print:text-black print:font-bold print:not-italic">
                📊 Lifecycle Analytics Matrix Breakdown
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm font-sans pt-2 print:grid-cols-2 print:gap-6">
              {/* TAXABLE ACCOUNT CARD */}
              <div className="relative group space-y-1 border-r border-white/5 pr-4 text-left print:border-zinc-300">
                <span className="text-[8px] uppercase tracking-widest text-zinc-500 block print:text-black print:font-bold">Baseline Taxable Matrix</span>
                <p className="text-zinc-300 font-bold text-lg print:text-black">${data.taxableGrowthTotal.toLocaleString()}</p>
                <p className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-wider">Horizon: {horizonYears} Years Mature</p>
                <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug pt-1 print:text-zinc-700">
                  {"What you will accumulate if your investment returns face ongoing retail tax liquidations before re-investing."}
                </p>
              </div>

              {/* TAX EXEMPT CARD */}
              <div className="relative group space-y-1 text-left">
                <span className="text-[8px] uppercase tracking-widest text-[#22c55e] block print:text-black print:font-bold">Tax-Exempt Alpha Matrix</span>
                <p className="text-[#22c55e] font-bold text-lg print:text-black">${data.taxExemptGrowthTotal.toLocaleString()}</p>
                <p className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-wider">Efficiency: 100% Retained</p>
                <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug pt-1 print:text-zinc-700">
                  {"Your total capital accumulation potential when investment growth is entirely protected from tax liabilities."}
                </p>
              </div>
            </div>

            {/* DOWNLOAD TRIGGER */}
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

      {/* 📝 REGULATORY DISCLAIMER PROTOCOL (Locks neatly to bottom of printed page) */}
      <div className="hidden print:block text-left mt-12 border-t border-dashed border-zinc-400 pt-4">
        <p className="text-[9px] font-black uppercase tracking-widest text-black mb-1">
          Institutional Analysis Disclosures & Regulatory Disclaimer
        </p>
        <p className="text-[8px] leading-relaxed text-zinc-700 text-justify font-medium uppercase tracking-tight">
          All processing modeling projections are derived client-side via industry-standard annualized capital appreciation mathematical expressions. Evaluation numbers are for scenario mapping illustrations and do not represent official investment, taxation, or professional CPA legal accounting advice. The Newston Terminal operates an anonymous edge network data tracker and does not retain individual client identification properties. For formal capital structuring audits, consult certified fiduciary professionals.
        </p>
        <p className="text-[8px] font-mono font-bold text-zinc-500 mt-2">
          Extraction Sourced From: https://thenewston.com/calculators/tax-exempt-wealth-gap • SEC Compliance 2026 Distribution Verification Code Block.
        </p>
      </div>

      {/* SYNCHRONIZED THREE FOOTER NAVIGATION / ADVERTISING CARDS */}
      <section className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-white/5 text-left print:hidden mt-8">
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
    </div>
  )
}
