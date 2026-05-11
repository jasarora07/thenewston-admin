"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, ShieldAlert } from "lucide-react"

export default function TaxGrowth() {
  const [initial, setInitial] = useState(10000)
  const [contribution, setContribution] = useState(500)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(20)
  const [taxRate, setTaxRate] = useState(22) // Standard income tax
  
  const [results, setResults] = useState<{ taxFree: number; taxable: number; gap: number } | null>(null)

  const calculateGrowth = async () => {
    let taxFreeTotal = initial
    let taxableTotal = initial
    const monthlyRate = rate / 100 / 12
    const months = years * 12

    for (let i = 0; i < months; i++) {
      // Tax Free (New Policy Style)
      taxFreeTotal = (taxFreeTotal + contribution) * (1 + monthlyRate)
      
      // Taxable (Standard Brokerage Style)
      const interest = (taxableTotal + contribution) * monthlyRate
      const taxOnInterest = interest * (taxRate / 100)
      taxableTotal = (taxableTotal + contribution) + (interest - taxOnInterest)
    }

    setResults({
      taxFree: taxFreeTotal,
      taxable: taxableTotal,
      gap: taxFreeTotal - taxableTotal
    })

    // Save to History
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('calculation_history').insert({
        user_id: user.id,
        calc_type: 'tax_growth_model',
        inputs: { initial, contribution, rate, years, taxRate },
        results: { tax_free_final: taxFreeTotal, tax_saved: taxFreeTotal - taxableTotal }
      })
    }
  }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
      <div className="bg-white p-4 flex items-center justify-between">
        <h3 className="text-black font-black uppercase italic text-sm tracking-tighter flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> Tax-Exempt Growth Model
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Initial Deposit ($)</label>
            <input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white font-mono outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Monthly Add ($)</label>
            <input type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white font-mono outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Return (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white font-mono outline-none" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Years</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white font-mono outline-none" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Tax Rate (%)</label>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white font-mono outline-none" />
          </div>
        </div>

        <button onClick={calculateGrowth} className="w-full bg-primary text-black font-black py-3 rounded-lg uppercase tracking-widest text-xs hover:bg-white transition-all">
          Project Wealth Gap
        </button>

        {results && (
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center">
              <span className="text-[9px] text-zinc-400 uppercase font-bold">Tax-Exempt Value</span>
              <span className="text-white font-mono">${results.taxFree.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
            <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg flex justify-between items-center">
              <span className="text-[9px] text-primary uppercase font-black">Tax Savings Advantage</span>
              <span className="text-primary font-mono font-bold">+${results.gap.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
            <p className="text-[8px] text-zinc-600 uppercase text-center mt-2 flex items-center justify-center gap-1">
              <ShieldAlert className="h-2 w-2" /> Calculated based on 2026 projected tax brackets
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
