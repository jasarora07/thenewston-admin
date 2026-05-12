import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Capture current time to signal a fresh 2026 deployment
  const lastUpdated = new Date() 

  return [
    {
      url: 'https://thenewston.com',
      lastModified: lastUpdated, // Updates to current timestamp
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://thenewston.com/calculate-financials',
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://thenewston.com/crypto',
      lastModified: lastUpdated,
      changeFrequency: 'always',
      priority: 0.8,
    },
    {
      url: 'https://thenewston.com/markets',
      lastModified: lastUpdated,
      changeFrequency: 'hourly',
      priority: 0.7,
    },
    {
      url: 'https://thenewston.com/privacy',
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
