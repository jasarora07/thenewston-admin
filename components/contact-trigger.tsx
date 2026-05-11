"use client"

import React from "react"

export function ContactTrigger() {
  const handleOpen = () => {
    // This broadcasts a signal that our ClientLayout in layout.tsx is listening for
    const event = new CustomEvent("open-terminal-contact")
    window.dispatchEvent(event)
  }

  return (
    <button 
      onClick={handleOpen}
      className="font-mono text-zinc-400 hover:text-primary transition-colors uppercase tracking-tight text-[9px] text-left underline underline-offset-4 decoration-zinc-800 hover:decoration-primary"
    >
      Establish Secure Channel (Contact)
    </button>
  )
}
