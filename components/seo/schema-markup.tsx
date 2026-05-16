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
    "@type": "SoftwareApplication", // ⚡ EXPLICITLY SUPPORTED BY GOOGLE RICH RESULTS
    "@id": url,
    "url": url,
    "name": name,
    "description": description,
    "applicationCategory": "FinanceApplication", // Tells Google it's a financial tool
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
