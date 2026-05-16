"use client"

import React, { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { X, Send, ShieldCheck, Loader2, AlertCircle } from "lucide-react"

export default function ContactForm({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setFormError(null)
    
    const formData = new FormData(e.currentTarget)
    const full_name = formData.get('full_name')?.toString().trim()
    const email_id = formData.get('email_id')?.toString().trim()
    const firm_name = formData.get('firm_name')?.toString().trim()
    const message = formData.get('message')?.toString().trim()

    // 1. STRICT VALIDATION
    if (!full_name || !email_id || !message) {
      setFormError("All fields except Firm Name are strictly mandatory.")
      setLoading(false)
      return
    }
    
    // 2. EXCLUSIVE PAYLOAD: No 'email' or 'query' keys allowed here anymore!
    const payload = {
      full_name,
      email_id,
      firm_name: firm_name || null,
      message
    }

    const { error } = await supabase
      .from('contact_queries')
      .insert([payload])

    if (!error) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 3000)
    } else {
      console.error("Supabase Database Sync Error:", error)
      setFormError(error.message || "Database transmission rejected.")
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
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="p-12 text-center space-y-4">
            <div className="h-12 w-12 bg-[#22c55e]/20 rounded-full flex items-center justify-center mx-auto">
              <Send className="h-6 w-6 text-[#22c55e]" />
            </div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm">Transmission Successful</h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Our analysts will review your query shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* ERROR DISPATCH DISPLAY */}
            {formError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-left animate-in fade-in duration-200">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{formError}</p>
              </div>
            )}

            {/* FULL NAME (MANDATORY) */}
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest">
                Full Name <span className="text-red-500 font-black">*</span>
              </label>
              <input 
                name="full_name" 
                required 
                type="text" 
                placeholder="e.g. Alexander Hamilton"
                className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-[#22c55e] outline-none transition-all font-mono placeholder:text-zinc-700" 
              />
            </div>

            {/* EMAIL ID (MANDATORY) */}
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest">
                Email ID <span className="text-red-500 font-black">*</span>
              </label>
              <input 
                name="email_id" 
                required 
                type="email" 
                placeholder="corporate@institution.com"
                className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-[#22c55e] outline-none transition-all font-mono placeholder:text-zinc-700" 
              />
            </div>

            {/* FIRM NAME (OPTIONAL) */}
            <div className="space-y-1 text-left">
              <div className="flex justify-between items-center">
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

            {/* MESSAGE BOX (MANDATORY) */}
            <div className="space-y-1 text-left">
              <label className="text-[9px] font-black text-white uppercase tracking-widest">
                How can we assist you? <span className="text-red-500 font-black">*</span>
              </label>
              <textarea 
                name="message" 
                required 
                rows={5} 
                placeholder="Outline your regulatory compliance requirements, custom calculator metrics, or platform verification questions..."
                className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-[#22c55e] outline-none resize-none transition-all font-mono placeholder:text-zinc-700" 
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              disabled={loading} 
              type="submit" 
              className="w-full bg-white disabled:opacity-50 text-black font-black uppercase text-[11px] tracking-[0.2em] py-4 rounded flex items-center justify-center gap-2 group hover:bg-[#22c55e] transition-colors duration-300 italic"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Send Query <Send className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
