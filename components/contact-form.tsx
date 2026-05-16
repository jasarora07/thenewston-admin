"use client"

import React, { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { X, Send, ShieldCheck, Loader2 } from "lucide-react"

export default function ContactForm({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    /**
     * DATABASE COLUMN MAPPING PROTOCOL:
     * Maps the updated interface fields directly into your 'contact_queries' table keys.
     */
    const payload = {
      full_name: formData.get('full_name'),
      email_id: formData.get('email_id'),
      firm_name: formData.get('firm_name') || null, // Handles optional inputs safely
      message: formData.get('message'),
      // Structural fallbacks to avoid breaking existing schema rows if columns are NOT NULL
      first_name: formData.get('full_name'), 
      last_name: "Provided via Unified Field",
      email: formData.get('email_id'),
      query: formData.get('message')
    }

    const { error } = await supabase.from('contact_queries').insert([payload])

    if (!error) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 3000)
    } else {
      console.error("Supabase Uplink Error:", error)
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-white/10 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden font-sans">
        
        {/* HEADER */}
        <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#22c55e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Secure Data Uplink</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
        </div>

        {success ? (
          <div className="p-12 text-center space-y-4">
            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Send className="h-6 w-6 text-[#22c55e]" />
            </div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm">Transmission Successful</h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Our analysts will review your query shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* FULL NAME FIELD */}
            <div className="space-y-1 text-left">
              {/* UPDATED: Changed text-zinc-600 to text-white */}
              <label className="text-[9px] font-black text-white uppercase tracking-widest">Full Name</label>
              <input 
                name="full_name" 
                required 
                type="text" 
                placeholder="e.g. Alexander Hamilton"
                className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-[#22c55e] outline-none transition-all font-mono placeholder:text-zinc-700" 
              />
            </div>

            {/* EMAIL ID FIELD */}
            <div className="space-y-1 text-left">
              {/* UPDATED: Changed text-zinc-600 to text-white */}
              <label className="text-[9px] font-black text-white uppercase tracking-widest">Email ID</label>
              <input 
                name="email_id" 
                required 
                type="email" 
                placeholder="corporate@institution.com"
                className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-[#22c55e] outline-none transition-all font-mono placeholder:text-zinc-700" 
              />
            </div>

            {/* FIRM NAME FIELD (OPTIONAL) */}
            <div className="space-y-1 text-left">
              <div className="flex justify-between items-center">
                {/* UPDATED: Changed text-zinc-600 to text-white */}
                <label className="text-[9px] font-black text-white uppercase tracking-widest">Firm Name</label>
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest italic">Optional</span>
              </div>
              <input 
                name="firm_name" 
                type="text" 
                placeholder="Capital Management LLC"
                className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-[#22c55e] outline-none transition-all font-mono placeholder:text-zinc-700" 
              />
            </div>

            {/* BIG MESSAGE BOX */}
            <div className="space-y-1 text-left">
              {/* UPDATED: Changed text-zinc-600 to text-white */}
              <label className="text-[9px] font-black text-white uppercase tracking-widest">How can we assist you?</label>
              <textarea 
                name="message" 
                required 
                rows={5} 
                placeholder="Outline your regulatory compliance requirements, custom calculator metrics, or platform verification questions..."
                className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-[#22c55e] outline-none resize-none transition-all font-mono placeholder:text-zinc-700" 
              />
            </div>

            {/* TRANSMIT BUTTON */}
            <button 
              disabled={loading} 
              type="submit" 
              className="w-full bg-white disabled:opacity-50 text-black font-black uppercase text-[11px] tracking-[0.2em] py-4 rounded flex items-center justify-center gap-2 group hover:bg-[#22c55e] transition-colors duration-300 italic"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Transmit Data <Send className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
