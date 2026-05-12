import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Manual timestamp to ensure a hard signal to Google/Bing bots
  // that a structural change (Removal of Auth Gate) has occurred.
  const lastUpdated = new Date('2026-05-13T04:00:00Z') 

  return [
    {
      url: 'https://thenewston.com',
      lastModified: lastUpdated,
      changeFrequency: 'daily', // Changed from always to reduce server ping
      priority: 1,
    },
    {
      url: 'https://thenewston.com/calculate-financials',
      lastModified: lastUpdated,
      changeFrequency: 'always', // Boosted to 'always' to prioritize the lead magnet
      priority: 1, // Set to 1 to match homepage authority
    },
    {
      url: 'https://thenewston.com/crypto',
      lastModified: lastUpdated,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: 'https://thenewston.com/markets',
      lastModified: lastUpdated,
      changeFrequency: 'hourly',
      priority: 0.8, // Increased priority for market data nodes
    },
    {
      url: 'https://thenewston.com/privacy',
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.1, // Lowered to keep crawl budget on tools
    },
  ]
}
