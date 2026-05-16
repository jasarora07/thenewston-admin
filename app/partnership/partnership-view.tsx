"use client"

import React, { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Send, Loader2, CheckCircle2, ShieldAlert, Lock, Info, AlertCircle } from "lucide-react"

export default function PartnershipView() {
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [serverError, setServerError] = useState<string | null>(null)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setServerError(null)

    const formData = new FormData(e.currentTarget)
    const full_name = formData.get("full_name")?.toString().trim()
    const email_id = formData.get("email_id")?.toString().trim()
    const firm_name = formData.get("firm_name")?.toString().trim()
    const message = formData.get("message")?.toString().trim()

    // STRICT RUNTIME VALIDATION
    if (!full_name || !email_id || !message) {
      setServerError("All fields except Firm Name are strictly mandatory.")
      setStatus("error")
      return
    }

    /**
     * CLEAN ARCHITECTURE MATRIX PAYLOAD:
     * Dispatches data strictly into the 4 text columns of your contact_queries schema.
     */
    const payload = {
      full_name,
      email_id,
      firm_name: firm_name || null, // Gracefully maps empty text to database NULL 
      message
    }

    try {
      const { error } = await supabase
        .from("contact_queries")
        .insert([payload])

      if (error) throw error
      setStatus("success")
    } catch (err: any) {
      console.error("Supabase Partnership Sync Error:", err)
      setServerError(err.message || "Database transmission rejected by terminal directory.")
      setStatus("error")
    }
  }

  return (
    <main className="container mx-auto px-4 py-16 bg-black min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full">
        
        {/* 1. INSTITUTIONAL HEADER */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock className="h-3 w-3 text-[#22c55e]" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#22c55e]">
              Professional Protocol // 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">
            Partner <span className="text-[#22c55e]">Network</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] italic max-w-xl mx-auto leading-relaxed">
            Integrating high-authority financial professionals into the Newston Intelligence ecosystem.
          </p>
        </div>

        {/* 2. SELECTION CRITERIA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 border-y border-white/5 py-12">
          <div className="space-y-6 text-left">
            <h4 className="text-white font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-2">
              <ShieldAlert className="h-3 w-3 text-[#22c55e]" /> 
              Selection Criteria
            </h4>
            <ul className="space-y-4">
              {[
                "Verified NMLS, CRD, or State Licensing",
                "Fiduciary-aligned advisory standards",
                "Minimum 5-year clean regulatory record",
                "Mastery of complex amortization & fiscal modeling"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-left">
                  <div className="h-1 w-1 bg-[#22c55e] rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6 text-left">
            <h4 className="text-white font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-2">
              <Info className="h-3 w-3 text-[#22c55e]" /> 
              Protocol Benefits
            </h4>
            <ul className="space-y-4">
              {[
                "Direct lead-integration from terminal modules",
                "Custom rate-sheet synchronization",
                "Verified Newston Partner digital badge",
                "Early access to 2026 market projections"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-left">
                  <CheckCircle2 className="h-3 w-3 text-[#22c55e]/40" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. CONTACT TRIGGER & FORM */}
        <div className="max-w-2xl mx-auto w-full mb-16">
          {!showForm ? (
            <div className="text-center animate-in fade-in duration-700">
              <button 
                onClick={() => setShowForm(true)}
                className="px-12 py-5 bg-[#22c55e] text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-all rounded shadow-[0_0_30px_rgba(34,197,94,0.15)]"
              >
                Contact Us
              </button>
            </div>
          ) : status === "success" ? (
            <div className="p-12 bg-zinc-900/20 border border-[#22c55e]/20 rounded-2xl text-center animate-in zoom-in duration-300">
              <CheckCircle2 className="h-10 w-10 text-[#22c55e] mx-auto mb-4" />
              <h2 className="text-xl font-black uppercase italic text-white mb-2">Transmission Received</h2>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                Protocol initialized. Our network leads will respond via secure channel.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900/10 p-8 border border-white/5 rounded-2xl animate-in slide-in-from-bottom-4">
              
              {/* BACKEND EXCEPTION SUMMARY */}
              {serverError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-left animate-in fade-in duration-200">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{serverError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  required 
                  name="full_name"
                  type="text" 
                  placeholder="FULL IDENTITY *" 
                  className="bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#22c55e] focus:outline-none transition-colors rounded font-mono" 
                />
                <input 
                  required 
                  name="email_id"
                  type="email" 
                  placeholder="SECURE EMAIL *" 
                  className="bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#22c55e] focus:outline-none transition-colors rounded font-mono" 
                />
              </div>
              
              {/* Optional Field Input */}
              <input 
                name="firm_name"
                type="text" 
                placeholder="FIRM NAME / NMLS # (OPTIONAL)" 
                className="w-full bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#22c55e] focus:outline-none transition-colors rounded font-mono" 
              />
              
              <textarea 
                required 
                name="message"
                placeholder="HOW CAN WE ASSIST YOUR FIRM? *" 
                rows={4} 
                className="w-full bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#22c55e] focus:outline-none transition-colors rounded resize-none font-mono" 
              />

              <button 
                disabled={status === "loading"} 
                type="submit" 
                className="w-full py-5 bg-[#22c55e] text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-all rounded flex items-center justify-center gap-3 italic"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Send Transmission <Send className="h-3 w-3" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* 4. DISCLAIMER */}
        <footer className="max-w-2xl mx-auto text-center opacity-40">
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
            <span className="text-[#22c55e]">Disclaimer:</span> Selection for the Newston Partner Network is subject to background verification and regulatory audit. Submission of this form does not constitute a formal agreement or endorsement by The Newston Terminal. All lead-data is processed in accordance with 2026 data privacy protocols.
          </p>
        </footer>
      </div>
    </main>
  )
}
