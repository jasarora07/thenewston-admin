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
    "@type": "FinancialService", // ⚡ CHANGED FROM WEBAPPLICATION TO DROP RATING WARNINGS
    "@id": url,
    "url": url,
    "name": name,
    "description": description,
    "serviceType": "Macroeconomic Simulation Terminal", // Defines what the service executes
    "provider": { // Replaces 'author' with the proper financial service entity
      "@type": "Organization",
      "name": "The Newston Terminal",
      "url": "https://thenewston.com"
    },
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
