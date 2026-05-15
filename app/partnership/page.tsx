"use client"

import React, { useState } from "react"
import { Send, Loader2, CheckCircle2 } from "lucide-react"

export default function PartnershipPage() {
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    // Replace with your actual submission logic (Supabase, Resend, etc.)
    setTimeout(() => setStatus("success"), 1500)
  }

  return (
    <main className="container mx-auto px-4 py-20 bg-black min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full text-center">
        
        {/* HEADER SECTION */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">
            Partner <span className="text-primary text-[#22c55e]">Protocol</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] italic">
            Professional Network Integration // 2026
          </p>
        </div>

        {!showForm ? (
          /* INITIAL STATE: CONTACT BUTTON */
          <div className="animate-in fade-in duration-700">
            <button 
              onClick={() => setShowForm(true)}
              className="px-12 py-5 bg-[#22c55e] text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-all rounded shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              Contact Us
            </button>
          </div>
        ) : status === "success" ? (
          /* SUCCESS STATE */
          <div className="p-12 bg-zinc-900/40 border border-[#22c55e]/30 rounded-2xl animate-in zoom-in duration-300">
            <CheckCircle2 className="h-12 w-12 text-[#22c55e] mx-auto mb-4" />
            <h2 className="text-xl font-black uppercase italic text-white mb-2">Message Logged</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
              Our team has received your transmission. <br /> A response will be issued shortly.
            </p>
          </div>
        ) : (
          /* FORM STATE */
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900/20 p-8 border border-white/5 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="FULL NAME"
                  className="bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#22c55e] focus:outline-none transition-colors rounded w-full"
                />
                <input
                  required
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#22c55e] focus:outline-none transition-colors rounded w-full"
                />
              </div>
              <input
                required
                type="text"
                placeholder="FIRM / ORGANIZATION"
                className="w-full bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#22c55e] focus:outline-none transition-colors rounded"
              />
              <textarea
                required
                placeholder="HOW CAN WE ASSIST?"
                rows={4}
                className="w-full bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-[#22c55e] focus:outline-none transition-colors rounded resize-none"
              />
              <button
                disabled={status === "loading"}
                type="submit"
                className="w-full py-5 bg-[#22c55e] text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-all rounded flex items-center justify-center gap-3 group"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="text-zinc-600 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

      </div>
    </main>
  )
}
