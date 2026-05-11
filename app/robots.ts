import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/', 
        '/calculate-financials', // Explicitly allow the lead magnet
        '/markets', 
        '/crypto'
      ],
      disallow: [
        '/admin/', 
        '/api/',      // Prevents bots from crawling your internal data fetches
        '/_next/',     // Prevents crawling of internal Next.js build files
        '/static/'     // Keeps bots focused on content, not assets
      ],
    },
    sitemap: 'https://thenewston.com/sitemap.xml',
  }
}
