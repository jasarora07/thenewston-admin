import { MetadataRoute } from 'next'

/**
 * INSTITUTIONAL HARDENED ROBOTS CONFIGURATION
 * Fixes asset blocks for both Googlebot and Bingbot layout snapshot cameras.
 * Wide-opens static code bundles while strictly guarding backend directories.
 */
export default function robots(): MetadataRoute.Robots {
  const sharedRules = {
    allow: [
      '/',
      '/_next/static/css/',     // ✅ Allows layout stylesheets
      '/_next/static/chunks/',  // ✅ CRITICAL: Allows script bundle rendering
      '/_next/static/media/',   // Allows UI image vectors and icons
      '/calculators',
      '/calculators/mortgage-refi-pivot',
      '/calculators/tax-exempt-wealth-gap',
      '/calculators/home-equity-liquidity',
      '/calculators/capital-allocation',
      '/calculators/purchasing-power',
    ],
    disallow: [
      '/private/',
      '/_next/static/development/', 
      '/_next/data/',               // Restricts access to raw JSON data paths
      '/api/',                      // Prevents access to serverless endpoints
      '/*?*',                       // Optimizes crawl budget against dynamic parameters
    ],
  }

  return {
    rules: [
      {
        userAgent: '*', // Covers Google and general search spiders
        ...sharedRules,
      },
      {
        userAgent: 'Bingbot', // 🦾 Dedicated override guaranteeing Bingbot access
        ...sharedRules,
      }
    ],
    sitemap: 'https://thenewston.com/sitemap.xml',
  }
}
