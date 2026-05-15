"use client"

import React, { useState } from "react"
import { ShieldCheck, Send, Loader2 } from "lucide-react"

export default function PartnershipForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    
    // Simulate API call - Connect this to your Supabase or Resend action later
    setTimeout(() => setStatus("success"), 1500)
  }

  if (status === "success") {
    return (
      <div className="p-12 bg-zinc-900/40 border border-primary/50 rounded-3xl text-center animate-in fade-in zoom-in duration-500">
        <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-black uppercase italic text-white mb-2">Protocol Initialized</h2>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
          Your credentials have been logged. A Newston agent will contact you shortly.
        </p>
      </div>
    )
  }

  return (
    <section className="p-8 md:p-12 bg-zinc-900/40 border border-white/5 rounded-3xl">
      <div className="mb-8 text-left">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">
          Initialize <span className="text-primary">Sequence</span>
        </h2>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
          Submit professional credentials for verification.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required
            type="text"
            placeholder="FULL NAME / IDENTITY"
            className="bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-primary focus:outline-none transition-colors rounded"
          />
          <input
            required
            type="email"
            placeholder="PROFESSIONAL EMAIL"
            className="bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-primary focus:outline-none transition-colors rounded"
          />
        </div>
        
        <input
          required
          type="text"
          placeholder="FIRM NAME / NMLS / CRD #"
          className="w-full bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-primary focus:outline-none transition-colors rounded"
        />

        <textarea
          placeholder="BRIEF MESSAGE (OPTIONAL)"
          rows={3}
          className="w-full bg-black border border-white/10 p-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-primary focus:outline-none transition-colors rounded resize-none"
        />

        <button
          disabled={status === "loading"}
          type="submit"
          className="w-full py-4 bg-primary text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-all rounded flex items-center justify-center gap-2 group"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Submit Application
              <Send className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </section>
  )
}
