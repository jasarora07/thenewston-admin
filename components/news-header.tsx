"use client"

import Link from "next/link"
import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsHeader() {
  return (
    <header className="sticky top-[36px] sm:top-[44px] z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-12 sm:h-14 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm sm:text-lg">N</span>
            </div>
            <span className="font-heading text-base sm:text-xl font-bold text-foreground">The Newston</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Markets
            </Link>
            <Link href="/stocks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Stocks
            </Link>
            <Link href="/crypto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Crypto
            </Link>
            <Link href="/economy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Economy
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden lg:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:hidden" />
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 hidden lg:block" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
