"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Calculator, RefreshCcw } from "lucide-react"

export default function MortgageRefi() {
  const [balance, setBalance] = useState(400000)
  const [currentRate, setCurrentRate] = useState(7.2)
  const [newRate, setNewRate] = useState(5.8)
  const [term, setTerm] = useState(30)
  
  const [savings, setSavings] = useState<{ monthly: number; total: number } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const calculateRefi = async () => {
    const calcMonthly = (principal: number, annualRate: number, years: number) => {
      const monthlyRate = annualRate / 100 / 12
      const numPayments = years * 12
      return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
             (Math.pow(1 + monthlyRate, numPayments) - 1)
    }

    const currentMonthly = calcMonthly(balance, currentRate, term)
    const newMonthly = calcMonthly(balance, newRate, term)
    const monthlySaved = currentMonthly - newMonthly
    const totalSaved = monthlySaved * (term * 12)

    setSavings({ monthly: monthlySaved, total: totalSaved })
    await saveCalculation(monthlySaved, totalSaved)
  }

  const saveCalculation = async (m: number, t: number) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setIsSaving(true)
      await supabase.from('calculation_history').insert({
        user_id: user.id,
        calc_type: 'mortgage_refi',
        inputs: { balance, currentRate, newRate, term },
        results: { monthly_savings: m, total_savings: t }
      })
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-primary p-4 flex items-center justify-between">
        <h3 className="text-black font-black uppercase italic text-sm tracking-tighter flex items-center gap-2">
          <Calculator className="h-4 w-4" /> Mortgage Refi Master
        </h3>
        {isSaving && <span className="text-[9px] font-bold text-black animate-pulse uppercase tracking-widest">Syncing...</span>}
      </div>

      <div className="p-6 space-y-6">
        <div title="The remaining principal balance on your current mortgage loan.">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Remaining Balance ($)</label>
          <input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none focus:border-primary transition-all" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div title="Your current interest rate. This is the rate we are looking to pivot away from.">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Current Rate (%)</label>
            <input type="number" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none" />
          </div>
          <div title="The target interest rate for the new loan. We use this to find the pivot point.">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">New Rate (%)</label>
            <input type="number" step="0.1" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white font-mono outline-none border-primary/30" />
          </div>
        </div>

        <button onClick={calculateRefi} className="w-full bg-white text-black font-black py-4 rounded-lg uppercase tracking-widest text-xs hover:bg-primary transition-all flex items-center justify-center gap-2">
          <RefreshCcw className="h-4 w-4" /> Run Analysis
        </button>

        {savings && (
          <div className="mt-6 space-y-3 bg-black/50 p-6 rounded-xl border border-white/5 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Monthly Efficiency Gap</span>
              <span className="text-white font-mono font-black text-2xl">${savings.monthly.toFixed(0)}</span>
            </div>
            
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg flex justify-between items-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-primary">Lifetime Savings Alpha</span>
              <span className="text-primary font-mono font-black text-2xl">${savings.total.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
