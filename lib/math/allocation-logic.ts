export function calculateAllocationOutcome(inputs: any) {
  const {
    principal,
    annualContribution,
    years,
    expectedReturn,
    dividendYield,
    taxRate,
  } = inputs;

  const r = expectedReturn / 100;
  const d = dividendYield / 100;
  const t = taxRate / 100;
  
  // 1. Tax-Exempt Model (Pure Compounding)
  let exemptValue = principal;
  for (let i = 0; i < years; i++) {
    exemptValue = (exemptValue + annualContribution) * (1 + r);
  }

  // 2. Taxable Model (Accounting for Dividend Drag & Capital Gains)
  // Dividend Drag: annual tax on the dividend portion of return
  const dividendDrag = d * t;
  const effectiveAnnualRate = r - dividendDrag;
  
  let taxableValue = principal;
  for (let i = 0; i < years; i++) {
    taxableValue = (taxableValue + annualContribution) * (1 + effectiveAnnualRate);
  }

  // Capital Gains Tax on the growth at the end
  const totalContributions = principal + (annualContribution * years);
  const taxableGrowth = Math.max(0, taxableValue - totalContributions);
  const finalTaxableValue = taxableValue - (taxableGrowth * t);

  const wealthGap = exemptValue - finalTaxableValue;
  const efficiencyAlpha = ((exemptValue / finalTaxableValue) - 1) * 100;

  return {
    exemptValue: Math.round(exemptValue).toLocaleString(),
    taxableValue: Math.round(finalTaxableValue).toLocaleString(),
    wealthGap: Math.round(wealthGap).toLocaleString(),
    alpha: efficiencyAlpha.toFixed(2),
    years
  };
}
