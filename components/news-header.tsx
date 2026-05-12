"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, House, ChevronDown, LogOut, Terminal, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client" 
import { signout } from "@/app/auth/actions"

export function NewsHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setUser(session?.user ?? null);
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // FIXED: Restored professional labels and removed redundant "Terminal Feed" to clean up UI
  const navLinks = [
    { name: "Home", href: "/", icon: <House className="h-3 w-3" /> },
    { name: "Financial Analysis", href: "/calculate-financials" }, 
    { name: "Markets", href: "/markets" },
    { name: "Crypto", href: "/crypto" },
  ];

  const activeLink = navLinks.find(link => link.href === pathname) || navLinks[0];

  return (
    // FIXED: Sticky placement with backdrop-blur and specific z-index to manage ticker layering
    <header className="sticky top-0 w-full bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl z-50">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        
        <div className="flex items-center gap-4 sm:gap-8 flex-1">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Terminal className="h-5 w-5 text-black" />
            </div>
            <span className="font-black text-sm sm:text-xl text-white italic uppercase tracking-tighter">
              The Newston
            </span>
          </Link>

          {/* MOBILE DROPDOWN */}
          <div className="relative sm:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-[9px] font-black uppercase tracking-widest text-primary"
            >
              {activeLink.name}
              <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-950 border border-white/10 rounded-lg shadow-2xl py-2 z-[60]">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-[10px] font-black uppercase tracking-widest ${
                      pathname === link.href ? "text-primary bg-primary/5" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`flex items-center gap-1.5 uppercase font-black text-[10px] tracking-[0.2em] transition-all py-1 border-b-2 ${
                  pathname === link.href ? "text-primary border-primary" : "text-zinc-500 border-transparent hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* AUTH & SESSION ACTIONS */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-500 hover:text-white hidden xs:flex">
            <Bell className="h-4 w-4" />
          </Button>

          {user ? (
            <div className="flex items-center gap-4 ml-2 border-l border-white/10 pl-4">
              <div className="hidden lg:flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-2.5 w-2.5 text-primary" />
                  <span className="text-[8px] font-black text-primary uppercase tracking-widest leading-none">ID: Active</span>
                </div>
                <span className="text-[10px] text-white font-bold truncate max-w-[120px] uppercase tracking-tighter">
                  {user.email?.split('@')[0]}
                </span>
              </div>
              
              <form action={signout}>
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-3 py-2 rounded bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-red-500 group"
                >
                  <span className="text-[9px] font-black uppercase tracking-widest hidden sm:block">Terminate ID</span>
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          ) : (
            <Link href="/auth/gate?mode=login">
              <Button 
                className="bg-primary text-black font-black text-[10px] uppercase tracking-widest px-4 py-2 hover:bg-white transition-colors"
              >
                Initialize ID
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
