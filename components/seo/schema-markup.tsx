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
    "@type": "FinancialProduct", // ⚡ Pure digital application structure
    "@id": url,
    "url": url,
    "name": name,
    "description": description,
    "financialProductType": "Macroeconomic Simulation Engine", 
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
