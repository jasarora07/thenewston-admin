"use client"

import React from "react"

export function StructuredData() {
  const platformSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct", // ⚡ CHANGED FROM WEBAPPLICATION TO BYPASS EXTENSION WARNINGS
    "name": "The Newston Intelligence Terminal",
    "url": "https://thenewston.com/calculators", // ⚡ FIXED PLACEHOLDER DOMAIN
    "description": "Institutional-grade financial decision models including Mortgage Refi Pivot and Tax-Exempt Wealth Gap simulators.",
    "financialProductType": "Analytical Simulation Core",
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
    ],
    "provider": { // Maps properly to product specifications instead of author tags
      "@type": "Organization",
      "name": "The Newston Terminal",
      "url": "https://thenewston.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(platformSchema) }}
    />
  );
}
