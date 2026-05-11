"use client"

import React, { useState, useEffect } from "react"
import ContactForm from "@/components/contact-form"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  // This listener catches the "broadcast" from the ContactTrigger button
  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true)
    window.addEventListener("open-terminal-contact", handleOpenContact)
    return () => window.removeEventListener("open-terminal-contact", handleOpenContact)
  }, [])

  return (
    <>
      {children}
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
