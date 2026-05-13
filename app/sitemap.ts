import { MetadataRoute } from 'next'
import { createClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thenewston.com'
  const supabase = await createClient()

  // 1. FETCH DYNAMIC NEWS ARTICLES
  // We fetch the latest 100 articles to keep the sitemap fresh without hitting DB limits
  const { data: newsItems } = await supabase
    .from('news')
    .select('url, date')
    .order('date', { ascending: false })
    .limit(100)

  const newsEntries = (newsItems || []).map((item) => ({
    url: item.url, // Supabase stores the full external link or internal slug
    lastModified: new Date(item.date),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // 2. DEFINE STATIC TERMINAL ROUTES
  const staticRoutes = [
    '', // Home
    '/calculators', // Hub
    '/calculators/mortgage-refi-pivot',
    '/calculators/tax-exempt-wealth-gap',
    '/calculators/home-equity-liquidity',
    '/calculators/capital-allocation', // Module 04
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('always' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : 0.9,
  }))

  // 3. MERGE AND RETURN
  return [...staticRoutes, ...newsEntries]
}
