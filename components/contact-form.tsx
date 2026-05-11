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
    const payload = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      country: formData.get('country'),
      phone: formData.get('phone'),
      query: formData.get('query'),
    }

    const { error } = await supabase.from('contact_queries').insert([payload])

    if (!error) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 3000)
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
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Secure Data Uplink</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
        </div>

        {success ? (
          <div className="p-12 text-center space-y-4">
            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm">Transmission Successful</h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Our analysts will review your query shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">First Name</label>
                <input name="first_name" required type="text" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Last Name</label>
                <input name="last_name" required type="text" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Email Address</label>
              <input name="email" required type="email" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Country</label>
                <input name="country" type="text" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Phone</label>
                <input name="phone" type="tel" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Message / Query</label>
              <textarea name="query" required rows={4} className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none resize-none transition-all" />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-primary disabled:opacity-50 text-black font-black uppercase text-[11px] tracking-[0.2em] py-4 rounded flex items-center justify-center gap-2 group">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Transmit Data <Send className="h-3 w-3 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
