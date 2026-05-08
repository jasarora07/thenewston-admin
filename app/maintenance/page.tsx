"use client"

import { Clock, Construction, TrendingUp } from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      {/* Logo Area */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-primary p-2 rounded-lg">
          <TrendingUp className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-foreground">
          THENEWSTON
        </span>
      </div>

      {/* Main Content */}
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center justify-center p-3 bg-secondary rounded-full mb-4">
          <Construction className="h-8 w-8 text-primary" />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Upgrading the <span className="text-primary">Engine</span>
        </h1>
        
        <p className="text-lg text-muted-foreground">
          We're currently syncing our live market data and refining our deep-dive analysis. 
          thenewston.com will be back online shortly with real-time insights.
        </p>

        {/* Status Box */}
        <div className="p-4 bg-secondary/50 rounded-xl border border-border flex items-center justify-center gap-3">
          <Clock className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            Estimated Update: Today
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-muted-foreground">
        &copy; 2026 Thenewston Financial Media Group
      </footer>
    </div>
  )
}
