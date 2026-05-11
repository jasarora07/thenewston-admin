"use client"

import { useState } from "react"
import Link from "next/link"
import { ShieldCheck, Lock, ChevronRight } from "lucide-react"
import { login, signup } from "../actions"

export default function AuthGate({ searchParams }: { searchParams: { error?: string } }) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 rounded-xl bg-primary items-center justify-center mb-4">
            <ShieldCheck className="text-black h-7 w-7" />
          </div>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            {mode === 'signup' ? 'Create Intelligence ID' : 'Access Terminal'}
          </h2>
          {searchParams.error && (
            <p className="text-red-500 text-[10px] font-bold uppercase mt-2">{searchParams.error}</p>
          )}
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Work Email</label>
            <input 
              name="email" type="email" required 
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-all text-sm"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Security Key (Password)</label>
            <input 
              name="password" type="password" required 
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-all text-sm"
              placeholder="••••••••"
            />
            {/* Added: Forgot Password Link */}
            {mode === 'login' && (
              <Link 
                href="/auth/forgot-password" 
                className="block text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-2 hover:text-primary transition-colors text-right"
              >
                Lost Access? Reset Key
              </Link>
            )}
          </div>

          {/* Legal Compliance Checkbox */}
          <div className="pt-2">
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5 transition-all hover:bg-white/10">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={() => setAgreed(!agreed)}
                className="mt-1 accent-primary h-4 w-4 cursor-pointer" 
              />
              <p className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase">
                I accept the <Link href="/terms" className="text-primary hover:underline">Terms</Link> & <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                Calculations are for educational use only.
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className={`pt-4 transition-all ${!agreed ? 'opacity-30' : 'opacity-100'}`}>
            <button 
              formAction={mode === 'signup' ? signup : login}
              disabled={!agreed}
              className="w-full bg-primary text-black font-black py-4 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              {mode === 'signup' ? 'Initialize Account' : 'Decrypt & Enter'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Switch Mode */}
        <button 
          type="button"
          onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          className="w-full mt-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
        >
          {mode === 'signup' ? 'Already have an ID? Sign In' : 'Need an ID? Create Account'}
        </button>
      </div>
    </div>
  )
}
