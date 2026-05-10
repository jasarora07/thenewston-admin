import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',     // Don't crawl your internal API routes
          '/admin/',   // Don't crawl admin panels
          '/_next/',   // Don't crawl Next.js internal files
        ],
      },
    ],
    sitemap: 'https://thenewston.com/sitemap.xml',
  }
}
