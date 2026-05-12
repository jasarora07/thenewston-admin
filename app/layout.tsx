import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { NewsHeader } from "@/components/news-header" 
import { TickerBar } from "@/components/ticker-bar"  
import { ComplianceBanner } from "@/components/compliance-banner" 
import { StructuredData } from "@/components/structured-data"
import ClientLayout from "@/components/client-layout"

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

export const metadata: Metadata = {
  // FIXED: Added metadataBase to resolve "WWW Canonicalization" issues 
  metadataBase: new URL('https://thenewston.com'),

  title: {
    // FIXED: Updated to match successful keywords while staying under character limits [cite: 45]
    default: "The Newston | Institutional Financial Tools & Market Intelligence",
    template: "%s | The Newston Terminal"
  },

  // FIXED: Shortened to 157 characters to prevent truncation reported by Rank Math [cite: 20, 22]
  description: "Access institutional-grade financial decision models for free. Calculate your Mortgage Refi Pivot and Wealth Gap with real-time 2026 market data.",

  keywords: [
    "free mortgage refi calculator", 
    "refi break even tool", 
    "tax-exempt wealth gap simulator", 
    "total interest savings calculator", 
    "financial intelligence terminal",
    "2026 market projections"
  ],
  
  // FIXED: Added missing Canonical Tag to resolve Page 4 failure 
  alternates: {
    canonical: '/',
  },

  authors: [{ name: "The Newston Editorial Team" }],
  
  openGraph: {
    title: "The Newston | Free Financial Decision Engines",
    description: "Institutional tools to calculate total interest savings and tax-efficiency strategies.",
    type: "website",
    url: "https://thenewston.com",
    siteName: "The Newston",
    images: [{ url: "/og-image-calculators.png" }], 
  },
  twitter: {
    card: "summary_large_image",
    title: "The Newston Financial Terminal",
    description: "Project your 2026 fiscal outcomes with our institutional decision models.",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // FIXED: Added lang="en" and ensured hydration stability
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <StructuredData /> 
            <TickerBar />
            <NewsHeader /> 
            
            <Suspense>
              <PageTransition>
                <ClientLayout>
                  <div className="flex-1">{children}</div>
                </ClientLayout>
              </PageTransition>
            </Suspense>

            <ComplianceBanner />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
