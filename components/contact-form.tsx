"use client"

import React, { useState } from "react"
import { X, Send, ShieldCheck } from "lucide-react"

export default function ContactForm({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-white/10 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden font-sans">
        {/* FORM HEADER */}
        <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Secure Communication Channel</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">First Name</label>
              <input required type="text" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Last Name</label>
              <input required type="text" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Email Address</label>
            <input required type="email" placeholder="name@domain.com" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Country (Optional)</label>
              <input type="text" placeholder="e.g. USA" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Phone Number</label>
              <input type="tel" className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Message / Query</label>
            <textarea rows={4} className="w-full bg-black border border-white/10 rounded p-2.5 text-sm text-white focus:border-primary outline-none resize-none" placeholder="Describe your technical or financial query..." />
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase text-[11px] tracking-[0.2em] py-4 rounded transition-all flex items-center justify-center gap-2 group">
            Transmit Data <Send className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-[8px] text-zinc-600 text-center uppercase tracking-widest">
            Encrypted session • Response turnaround: 24-48 Hours
          </p>
        </form>
      </div>
    </div>
  )
}
