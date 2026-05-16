/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserving your bypass safety toggles
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, 
  },
  
  /**
   * CANARY FIXES: In Next.js 16+ Canary, global options are nested under experimental flags
   * to ensure Turbopack serves raw static assets to external web crawlers smoothly.
   */
  experimental: {
    eslint: {
      ignoreDuringBuilds: true, // Moves the root lint bypass down into the valid execution layer
    }
  },

  // INSTITUTIONAL SECURITY HEADERS + CACHE INVALIDATION BYPASS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // ⚡ THE CACHE SKIP METHOD: Forces Vercel to bypass edge caching for real-time crawler diagnostics
          {
            key: 'x-vercel-skip-cache',
            value: '1',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // SEO PROTECTION: Preserving your ghost maintenance asset page fallback loop
  async redirects() {
    return [
      {
        source: '/maintenance',
        destination: '/',
        permanent: true, 
      },
    ]
  },
}

export default nextConfig;
