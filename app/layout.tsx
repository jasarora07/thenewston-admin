"use client"

import React, { useState } from "react"
import { Inter, Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { NewsHeader } from "@/components/news-header" 
import { TickerBar } from "@/components/ticker-bar"  
import { ComplianceBanner } from "@/components/compliance-banner" 
import { StructuredData } from "@/components/structured-data"
import ContactForm from "@/components/contact-form" // IMPORTED FORM

import "@/app/globals.css"
import { Suspense } from "react"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
})

const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            {/* SEO & DATA LAYER */}
            <StructuredData /> 
            
            <TickerBar />
            
            {/* Pass the state toggle to the Header if you want a 
              'Support' or 'Contact' button in the top nav 
            */}
            <NewsHeader /> 
            
            <Suspense>
              <PageTransition>
                <div className="flex-1">{children}</div>
              </PageTransition>
            </Suspense>

            {/* INSTITUTIONAL FOOTER */}
            <footer className="py-12 border-t border-white/5 bg-black flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-8">
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-primary transition-all underline underline-offset-8 decoration-zinc-800 hover:decoration-primary"
                >
                  Establish Connection (Contact)
                </button>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-800 selection:bg-transparent">|</span>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                  SEC 2026 Node: {typeof window !== 'undefined' ? window.location.hostname : 'Terminal'}
                </p>
              </div>
              <p className="text-[8px] font-medium text-zinc-700 uppercase tracking-[0.4em]">
                All transmissions encrypted via 256-bit institutional protocol
              </p>
            </footer>

            <ComplianceBanner />

            {/* CONTACT OVERLAY LAYER */}
            <ContactForm 
              isOpen={isContactOpen} 
              onClose={() => setIsContactOpen(false)} 
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
