"use client"

import React from "react"

export function StructuredData() {
  const platformSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication", // ⚡ MATCHES SINGLE PAGE GENERATORS PERFECTLY
    "name": "The Newston Intelligence Terminal",
    "url": "https://thenewston.com/calculators",
    "description": "Institutional-grade financial decision models including Mortgage Refi Pivot and Tax-Exempt Wealth Gap simulators.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Total Lifecycle Interest Expense Analysis",
      "Mortgage Break-Even Pivot Calculation",
      "Bi-Weekly vs Monthly Amortization Comparison",
      "Tax Drag Wealth Degradation Projections",
      "Real-time Inflation-Adjusted Purchasing Power"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchema) }}
    />
  );
}
