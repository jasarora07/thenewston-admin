import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/', 
      disallow: [
        '/admin/', 
        '/api/',
        '/auth/gate', // FIXED: Specifically block the gate page to save crawl budget
      ],
    },
    // FIXED: Ensured absolute URL for sitemap discovery
    sitemap: 'https://thenewston.com/sitemap.xml',
  }
}
