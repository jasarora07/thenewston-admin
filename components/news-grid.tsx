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

    // Fetch next 8 items starting from where we left off
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
      .range(items.length, items.length + 7)

    if (error || !data || data.length < 8) {
      setHasMore(false)
    }

    if (data) {
      setItems([...items, ...data])
    }
    setLoading(false)
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {items.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="space-y-3 group">
            <div className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-900">
              <img 
                src={item.imageUrl} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                alt={item.title} 
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[8px] font-black text-primary uppercase tracking-widest">{item.source}</p>
                <p className="text-[8px] font-bold text-zinc-500">{item.date?.split('T')[0]}</p>
              </div>
              <h3 className="font-bold text-xs leading-snug group-hover:text-primary transition-colors line-clamp-3 text-zinc-200">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="group px-10 py-3 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <>
                Load More Articles 
                <ChevronDown className="h-3 w-3 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
