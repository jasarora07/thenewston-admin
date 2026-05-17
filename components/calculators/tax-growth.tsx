"use client"

import React, { useState, useMemo, useEffect } from "react"

export default function TaxExemptWealthGap() {
  // 1. BASELINE INTERACTIVE PARAMETER ARRAYS
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
    const taxedRate = r * (1 - t) // Return adjustments following annual fiscal drag degradation

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

        if (!response.ok) return
        console.log("▲ [TELEMETRY METRIC SYNCED SUCCESSFULLY TO SUPABASE]")
      } catch (err) {
        console.warn("Telemetry connection skipped.")
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
    <div className="w-full text-white font-sans selection:bg-[#22c55e]/30 print:bg-white print:text-black print:p-0">
      
      {/* 📥 INJECTED CSS PRINT-MODE STYLESHEET FIREWALL OVERRIDE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Force hide the layout files headers, tickers, and global navigation models */
          html, body, header, footer, nav, aside, [class*="navbar"], [class*="header"], [class*="footer"], [class*="ticker"] {
            display: none !important;
            height: 0 !important;
            opacity: 0 !important;
          }
          /* Force print parameters to process a clean background */
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
        }
      `}} />

      {/* 📥 PDF AUDIT STATEMENT HEADER - Only pops into the print preview output */}
      <div className="hidden print:block text-left mb-6 border-b-2 border-black pb-3">
        <div className="text-xl font-black uppercase tracking-tight text-black">
          THE NEWSTON TERMINAL
        </div>
        <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mt-1 flex justify-between">
          <span>Module 02: Capital Efficiency Audit Profile</span>
          <span>Reference Date // {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 print:flex print:flex-row print:gap-6 print:space-y-0">
        
        {/* LEFT COLUMN: PARAMETER ARRAYS CONTROLS */}
        <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl print:border-none print:p-0 print:bg-transparent print:w-[35%]">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 italic border-b border-white/10 pb-2 print:text-black print:border-black print:not-italic print:text-[11px] print:font-black">
            Control Baseline Parameter Arrays
          </h3>

          <div className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest print:text-black print:font-black">Initial Capital Base ($)</label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:hidden"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Math.max(0, Number(e.target.value)))}
              />
              <div className="hidden print:block text-sm font-mono font-bold text-black bg-zinc-100 p-2 rounded mt-0.5">
                ${initialCapital.toLocaleString()}
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest print:text-black print:font-black">Annual Savings Vector ($)</label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:hidden"
                value={annualContribution}
                onChange={(e) => setAnnualContribution(Math.max(0, Number(e.target.value)))}
              />
              <div className="hidden print:block text-sm font-mono font-bold text-black bg-zinc-100 p-2 rounded mt-0.5">
                ${annualContribution.toLocaleString()}
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest print:text-black print:font-black">Expected Gross Return (%)</label>
              <input
                type="number" step="0.1"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:hidden"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Math.max(0, Number(e.target.value)))}
              />
              <div className="hidden print:block text-sm font-mono font-bold text-black bg-zinc-100 p-2 rounded mt-0.5">
                {expectedReturn}%
              </div>
            </div>

            <div className="space-y-1 text-left border-t border-white/5 pt-4 print:border-none print:pt-0">
              <label className="text-[9px] font-black text-[#22c55e] uppercase tracking-widest block print:text-black print:font-black">Marginal Tax Friction Rate (%)</label>
              <input
                type="number"
                className="w-full bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-lg p-3 text-[#22c55e] text-lg font-black italic font-sans outline-none focus:border-[#22c55e] print:hidden"
                value={taxRate}
                onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value)))}
              />
              <div className="hidden print:block text-sm font-mono font-bold text-black bg-zinc-100 p-2 rounded mt-0.5">
                {taxRate}%
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest print:text-black print:font-black">Investment Horizon (Years)</label>
              <input
                type="number"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-[#22c55e] text-sm print:hidden"
                value={horizonYears}
                onChange={(e) => setHorizonYears(Math.max(1, Number(e.target.value)))}
              />
              <div className="hidden print:block text-sm font-mono font-bold text-black bg-zinc-100 p-2 rounded mt-0.5">
                {horizonYears} Years
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SCREEN METRICS & MOUSE OVER HOVER HOOKS */}
        <div className="lg:col-span-2 space-y-6 print:w-[65%] print:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:grid-cols-2 print:gap-4">
            
            {/* HOVER METRIC 1 */}
            <div className="relative group bg-zinc-900/30 border border-[#22c55e]/30 p-5 rounded-xl shadow-lg print:border print:border-black print:bg-transparent text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-black print:text-[9px]">Absolute Wealth Gap</span>
                <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
              </div>
              <span className="text-2xl font-black text-[#22c55e] font-sans tracking-tight block mt-1 print:text-black print:text-xl">
                ${data.absoluteWealthGap.toLocaleString()}
              </span>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-700 print:border-zinc-300">
                {"Pure cash capital structural value intercepted entirely by annual tax drag parameters."}
              </p>
              {/* INTERACTIVE HOVER MOUSE-OVER TIP */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity json-data-lock z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl print:hidden">
                {"Calculates the cumulative multi-decade performance metric variance between complete tax shielding and unshielded interest streams."}
              </div>
            </div>

            {/* HOVER METRIC 2 */}
            <div className="relative group bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border print:border-black print:bg-transparent text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-black print:text-[9px]">Portfolio Erosion Ratio</span>
                <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
              </div>
              <span className="text-2xl font-black text-white font-sans tracking-tight block mt-1 print:text-black print:text-xl">
                {data.capitalErosionPercentage}% Deficit
              </span>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-700 print:border-zinc-300">
                {"Your ultimate estate generation potential dropped by this exact margin via asset friction."}
              </p>
              {/* INTERACTIVE HOVER MOUSE-OVER TIP */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity json-data-lock z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl print:hidden">
                {"The percentage loss coefficient representing potential generational wealth surrendered to ongoing annual tax leakage events."}
              </div>
            </div>

            {/* HOVER METRIC 3 */}
            <div className="relative group bg-zinc-900/30 border border-white/5 p-5 rounded-xl print:border print:border-black print:bg-transparent text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block print:text-black print:font-black print:text-[9px]">Effective Tax Drag</span>
                <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
              </div>
              <span className="text-2xl font-black text-white font-sans tracking-tight block mt-1 print:text-black print:text-xl">
                {taxRate}% / Yr
              </span>
              <p className="text-[9px] text-zinc-400 font-medium tracking-tight leading-snug mt-2 border-t border-white/5 pt-2 print:text-zinc-700 print:border-zinc-300">
                {"Your current annual fiscal penalty line. This rate compounds negatively against market upside."}
              </p>
              {/* INTERACTIVE HOVER MOUSE-OVER TIP */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity json-data-lock z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl print:hidden">
                {"The yearly asset deduction constant pulled out of aggregate production, breaking geometric wealth curves."}
              </div>
            </div>
          </div>

          {/* LIFECYCLE MATRIX BREAKDOWN EXPANDED CARD */}
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl space-y-4 print:border print:border-black print:rounded-none print:p-4 print:bg-transparent">
            <div className="border-b border-white/10 pb-2 print:border-black">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white italic text-left print:text-black print:font-black print:not-italic print:text-[10px]">
                📊 Lifecycle Analytics Matrix Breakdown
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm font-sans pt-1">
              <div className="text-left relative group">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-widest text-zinc-500 block print:text-zinc-600 print:font-bold">Baseline Taxable Matrix</span>
                  <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
                </div>
                <p className="text-zinc-300 font-bold text-lg mt-0.5 print:text-black print:text-sm">${data.taxableGrowthTotal.toLocaleString()}</p>
                <p className="text-[9px] text-zinc-400 font-medium tracking-tight mt-1 print:text-zinc-600 print:text-[10px]">
                  {"Final performance yield facing ongoing multi-decade retail tax liquidations."}
                </p>
                {/* TOOLTIP TRACKER */}
                <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity json-data-lock z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl print:hidden">
                  {"Compound growth values attained when profits face annual asset deductions before compounding returns."}
                </div>
              </div>

              <div className="text-left relative group">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-widest text-[#22c55e] block print:text-black print:font-black">Tax-Exempt Account</span>
                  <span className="text-zinc-600 cursor-help text-[10px] font-bold print:hidden">[?]</span>
                </div>
                <p className="text-[#22c55e] font-bold text-lg mt-0.5 print:text-black print:text-sm">${data.taxExemptGrowthTotal.toLocaleString()}</p>
                <p className="text-[9px] text-zinc-400 font-medium tracking-tight mt-1 print:text-zinc-600 print:text-[10px]">
                  {"Maximum target growth achieved when asset compounding runs at 100% full legal efficiency."}
                </p>
                {/* TOOLTIP TRACKER */}
                <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-950 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity json-data-lock z-50 pointer-events-none text-[9px] font-bold uppercase text-zinc-400 tracking-tight leading-normal shadow-2xl print:hidden">
                  {"Capital track velocity generated when growth runs unobstructed by annual revenue deductions."}
                </div>
              </div>
            </div>

            {/* SCREEN ONLY DOWNLOAD ACTIONS LAYERS */}
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

      {/* ❌ SCREEN-ONLY NAVIGATION ELEMENT CARD HUB (Nuked cleanly during print export layout matches) */}
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
