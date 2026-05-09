"use client"

import React, { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ChevronDown, Loader2 } from "lucide-react"

interface NewsGridProps {
  initialItems: any[]
}

export function NewsGrid({ initialItems }: NewsGridProps) {
  const [items, setItems] = useState(initialItems)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const supabase = createClient()

  const loadMore = async () => {
    if (loading) return
    setLoading(true)

    // Calculate the range based on current items count
    const from = items.length
    const to = from + 7 // Fetch 8 more

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
      .range(from, to)

    if (error) {
      console.error("Fetch error:", error)
      setLoading(false)
      return
    }

    if (data && data.length > 0) {
      setItems(prev => [...prev, ...data])
      // If we got fewer than 8, there are no more articles left
      if (data.length < 8) setHasMore(false)
    } else {
      setHasMore(false)
    }
    
    setLoading(false)
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {items.map((item) => (
          <a 
            key={item.id} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block space-y-3"
          >
            <div className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-900 shadow-xl">
              <img 
                src={item.imageUrl || "/placeholder.jpg"} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                alt={item.title} 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] px-2 py-0.5 bg-primary/10 rounded">
                  {item.source}
                </span>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <h3 className="font-bold text-[13px] leading-snug group-hover:text-primary transition-colors line-clamp-3 text-zinc-200 tracking-tight">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4 pb-12">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="min-w-[240px] group px-8 py-4 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <>
                Load More Articles 
                <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
