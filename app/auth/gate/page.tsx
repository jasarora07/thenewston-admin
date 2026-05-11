"use client"

import { useState } from "react"
import Link from "next/link"
import { ShieldCheck, Lock, FileText } from "lucide-react"

export default function AuthGate() {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <ShieldCheck className="text-black h-7 w-7" />
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter text-center mb-2">
          The Intelligence Suite
        </h2>
        <p className="text-zinc-500 text-xs text-center mb-8 uppercase tracking-widest font-bold">
          Unlock Institutional Grade Calculators
        </p>

        {/* COMPLIANCE SECTION */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <input 
              type="checkbox" 
              checked={agreed} 
              onChange={() => setAgreed(!agreed)}
              className="mt-1 accent-primary" 
              id="terms"
            />
            <label htmlFor="terms" className="text-[10px] text-zinc-400 leading-relaxed uppercase font-bold">
              I agree to the <Link href="/terms" className="text-primary underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>. 
              I understand my inputs are stored securely for my personal history.
            </label>
          </div>
        </div>

        {/* AUTH ACTIONS */}
        <div className={`space-y-3 ${!agreed ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          <button className="w-full bg-white text-black font-black py-3 rounded-lg uppercase tracking-widest text-xs hover:bg-primary transition-colors">
            Create Intelligence Account
          </button>
          <button className="w-full bg-transparent border border-white/20 text-white font-black py-3 rounded-lg uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
            Sign In
          </button>
        </div>
        
        <div className="mt-6 flex justify-center gap-4 text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1"><Lock className="h-3 w-3"/> AES-256 Encrypted</span>
          <span className="flex items-center gap-1"><FileText className="h-3 w-3"/> GDPR Compliant</span>
        </div>
      </div>
    </div>
  )
}
