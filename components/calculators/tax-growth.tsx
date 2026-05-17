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
    const taxedRate = r * (1 - t)

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
          console.error("❌ [TELEMETRY REGISTRY REJECTED BY SERVER]:", response.status)
          return
        }

        console.log("▲ [TELEMETRY METRIC SYNCED SUCCESSFULLY TO SUPABASE]")
      } catch (err) {
        console.warn("Telemetry background upload skipped.")
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
    <div className="w-full text-white font-sans print:bg-white print:text-black print:p-0 print:max-h-screen print:overflow-hidden">
      
      {/* 📥 EXCLUSIVE PDF REPORT BRANDING HEADER */}
      <div className="hidden print:block text-left mb-6 border-b-2 border-black pb-3">
        <div className="text-xl font-black uppercase tracking-tight text-black">
          THE NEWSTON TERMINAL
        </div>
        <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mt-1 flex justify-between">
          <span>Module 02: Capital Efficiency Audit Profile</span>
          <span>Reference Date // {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* CORE WRAPPER LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 print:flex print:flex-row print:gap-6 print:space-y-0">
        
        {/* INPUTS PANEL */}
        <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl print:border-none print:p-0 print:bg-transparent print:w-[35%]">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 italic border-b border-white/10 pb-2 print:text-black print:border-black print:not-italic print:text-[11px] print:font-black">
            Control Baseline Parameter Arrays
          </h3>

          <div className="space-y-4">
            <div className="text-left">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest print:text-black print:font-black">Initial Capital ($)</label>
              <div className="text-sm font-mono font-bold text-white print:text-black print:text-sm print:bg-zinc-100 print:p-2 print:rounded mt-1">
                ${initialCapital.toLocaleString()}
              </div>
            </div>

            <div className="text-left">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest print:text-black print:font-black">Annual Savings ($)</label>
              <div className="text-sm font-mono font-bold text-white print:text-black print:text-sm print:bg-zinc-100 print:p-2 print:rounded mt-1">
                ${annualContribution.toLocaleString()}
              </div>
            </div>

            <div className="text-left">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest print:text-black print:font-black">Gross Return (%)</label>
              <div className="text-sm font-mono font-bold text-white print:text-black print:text-sm print:bg-zinc-100 print:p-2 print:rounded mt-1">
                {expectedReturn}%
              </div>
            </div>

            <div className="text-left">
              <label className="text-[9px] font-black text-[#22c55e] uppercase tracking-widest block print:text-black print:font-black">Tax Drag Rate (%)</label>
              <div className="text-sm font-mono font-bold text-[#22c55e] print:text-black print:text-sm print:bg-zinc-100 print:p-2 print:rounded mt-1">
                {taxRate}%
              </div>
            </div>

            <div className="text-left">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest print:text-black print:font-black">Horizon (Years)</label>
              <div className="text-sm font-mono font-bold text-white print:text-black print:text-sm print:bg-zinc-100 print:p-2 print:rounded mt-1">
                {horizonYears} Years
              </div>
            </div>
          </div>
        </div>

        {/* OUTPUT TARGETS PANEL */}
        <div className="lg:col-span-2 space-y-6 print:w-[65%] print:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:grid-cols-2 print:gap-4">
            
            {/* ABSOLUTE WEALTH GAP */}
            <div className="relative group bg-zinc-900/30 border border-[#22c55e]/30 p-5 rounded-xl shadow-lg print:border print:border-black print:bg-transparent text-left">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-black print:text-[9px]">Absolute Wealth Gap</span>
              <span className="text-2xl font-black text-[#22c55e] font-sans tracking-tight block mt-1 print:text-black print:text-xl">
                ${data.absoluteWealthGap.toLocaleString()}
              </span>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-700 print:border-zinc-300">
                {"Pure cash capital structural value intercepted entirely by annual tax drag parameters."}
              </p>
            </div>

            {/* PORTFOLIO EROSION DEFICIT */}
            <div className="relative group bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border print:border-black print:bg-transparent text-left">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-black print:text-[9px]">Portfolio Erosion Ratio</span>
              <span className="text-2xl font-black text-white font-sans tracking-tight block mt-1 print:text-black print:text-xl">
                {data.capitalErosionPercentage}% Deficit
              </span>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-700 print:border-zinc-300">
                {"Your ultimate estate accumulation potential dropped by this exact margin via asset friction."}
              </p>
            </div>
          </div>

          {/* LIFECYCLE ANALYTICS MATRIX BREAKDOWN */}
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4 print:border print:border-black print:rounded-none print:p-4 print:bg-transparent">
            <div className="border-b border-white/10 pb-2 print:border-black">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white italic text-left print:text-black print:font-black print:not-italic print:text-[10px]">
                📊 Lifecycle Analytics Matrix Breakdown
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm font-sans pt-1">
              <div className="text-left">
                <span className="text-[8px] uppercase tracking-widest text-zinc-500 block print:text-zinc-600 print:font-bold">Baseline Taxable Matrix</span>
                <p className="text-zinc-300 font-bold text-lg mt-0.5 print:text-black print:text-sm">${data.taxableGrowthTotal.toLocaleString()}</p>
                <p className="text-[9px] text-zinc-400 font-medium tracking-tight mt-1 print:text-zinc-600 print:text-[10px]">
                  {"Final performance yield facing ongoing multi-decade retail tax liquidations."}
                </p>
              </div>

              <div className="text-left">
                <span className="text-[8px] uppercase tracking-widest text-[#22c55e] block print:text-black print:font-black">Tax-Exempt Account</span>
                <p className="text-[#22c55e] font-bold text-lg mt-0.5 print:text-black print:text-sm">${data.taxExemptGrowthTotal.toLocaleString()}</p>
                <p className="text-[9px] text-zinc-400 font-medium tracking-tight mt-1 print:text-zinc-600 print:text-[10px]">
                  {"Maximum target growth achieved when asset compounding runs at 100% full legal efficiency."}
                </p>
              </div>
            </div>

            {/* SCREEN ONLY ACTION LAYERS */}
            <div className="pt-4 border-t border-white/5 flex justify-end print:hidden">
              <button
                onClick={handleDownloadReport}
                className="bg-white text-black font-black text-[9px] uppercase tracking-widest px-4 py-2.5 rounded-md hover:bg-[#22c55e] transition-all active:scale-[0.98] shadow-lg flex items-center gap-2"
              >
                <span>📥</span> Download Full Verified Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📝 REGULATORY COMPLIANCE ATTESTATION */}
      <div className="hidden print:block text-left mt-6 border-t border-black pt-3">
        <p className="text-[8px] font-black uppercase tracking-widest text-black mb-1">
          Institutional Analysis Disclosures & Regulatory Disclaimer
        </p>
        <p className="text-[7px] leading-relaxed text-zinc-700 text-justify font-medium uppercase tracking-tight">
          All simulation processing calculations are derived client-side via industry-standard compound capital appreciation mathematical expressions. Performance numbers are provided for objective scenario illustrations and do not represent formal tax, CPA, or fiduciary financial counsel. The terminal framework operates an anonymous tracking layout and completely avoids processing unique identity specifications.
        </p>
        <p className="text-[7px] font-mono font-bold text-zinc-500 mt-1">
          Extraction Sourced From: https://thenewston.com/calculators/tax-exempt-wealth-gap • SEC 2026 Distribution Verification.
        </p>
      </div>

      {/* ❌ SCREEN-ONLY NAVIGATION ELEMENT CARD HUB */}
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
