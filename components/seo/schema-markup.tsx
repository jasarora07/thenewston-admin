"use client"

import React from 'react'

interface SchemaProps {
  name: string
  description: string
  url: string
}

export default function CalculatorSchema({ name, description, url }: SchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": url,
    "url": url,
    "name": name,
    "description": description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "The Newston Terminal",
      "url": "https://thenewston.com"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
