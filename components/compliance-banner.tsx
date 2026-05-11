"use client"

import React, { useState, useEffect } from "react"
import { X, Globe } from "lucide-react"

export function ComplianceBanner() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem("newston_consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptConsent = () => {
    localStorage.setItem("newston_consent", "accepted")
    setIsVisible(false)
  }

  // Prevent rendering on the server entirely
  if (!mounted || !isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] p-4">
      <div className="container mx-auto max-w-6xl bg-zinc-950 border border-primary/30 shadow-[0_-10px_40px_-15px_rgba(34,197,94,0.3)] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
        
        <div className="flex items-start gap-4 flex-1">
          <div className="h-10 w-10 shrink-0 bg-primary/10 border border-primary/20 rounded flex items-center justify-center">
            <Globe className="h-5 w-5 text-primary animate-pulse" />
          </div>
          <div className="space-y-1 text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-2">
              Privacy & Data Protocol <span className="text-zinc-600 font-bold">[GDPR / CCPA COMPLIANT]</span>
            </h4>
            <p className="text-[9px] text-zinc-400 font-bold uppercase leading-relaxed tracking-wider">
              This terminal uses encrypted sessions and cookies to optimize financial simulations. By continuing, you acknowledge our data processing standards under European <span className="text-white underline underline-offset-2">GDPR</span> and California <span className="text-white underline underline-offset-2">CCPA/CPRA</span> regulations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={acceptConsent}
            className="flex-1 md:flex-none bg-primary text-black text-[10px] font-black px-8 py-3 rounded uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-primary/10"
          >
            Authorize Session
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-3 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
