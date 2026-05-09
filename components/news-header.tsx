"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Bell, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-[36px] sm:top-[44px] z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-12 sm:h-14 items-center justify-between px-3 sm:px-4">
        
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-8 w-8 text-muted-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm sm:text-lg">N</span>
            </div>
            <span className="font-heading text-base sm:text-xl font-bold text-foreground italic uppercase tracking-tighter shrink-0">
              The Newston
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 uppercase font-black text-[10px] tracking-widest">
            <Link href="/markets" className="text-muted-foreground hover:text-primary transition-colors">
              Markets
            </Link>
            <Link href="/stocks" className="text-muted-foreground hover:text-primary transition-colors">
              Stocks
            </Link>
            <Link href="/crypto" className="text-muted-foreground hover:text-primary transition-colors">
              Crypto
            </Link>
            <Link href="/economy" className="text-muted-foreground hover:text-primary transition-colors">
              Economy
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-4 uppercase font-black text-xs tracking-widest">
            <Link 
              href="/markets" 
              className="text-muted-foreground hover:text-primary py-2 border-b border-border/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Markets
            </Link>
            <Link 
              href="/crypto" 
              className="text-muted-foreground hover:text-primary py-2 border-b border-border/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Crypto
            </Link>
            <Link 
              href="/economy" 
              className="text-muted-foreground hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Economy
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
