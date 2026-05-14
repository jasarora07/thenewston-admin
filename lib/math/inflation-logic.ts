/**
 * PURCHASING POWER & EROSION LOGIC (v1.0)
 * Logic for Module 05: Macro Resilience Terminal
 * Calculates the divergence between nominal growth and inflation-adjusted purchasing power.
 */

interface InflationInputs {
  currentAmount: number;    // Initial Capital
  annualInflation: number;  // Expected CPI (%)
  years: number;           // Time Horizon
  investmentReturn: number; // Portfolio Yield (%)
}

interface InflationResults {
  nominalValue: string;     // Future value without inflation adjustment
  realValue: string;        // Purchasing power in today's dollars
  erosion: string;          // The "Silent Tax" amount lost
  years: number;            // Passed back for UI consistency
}

export function calculateInflationOutcome(inputs: InflationInputs): InflationResults {
  const { currentAmount, annualInflation, years, investmentReturn } = inputs;

  // Convert percentage inputs to decimals
  const i = annualInflation / 100;
  const r = investmentReturn / 100;

  /**
   * FORMULA 1: NOMINAL FUTURE VALUE
   * Calculates what the bank balance will look like after growth.
   * FV = P * (1 + r)^n
   */
  const nominalValue = currentAmount * Math.pow(1 + r, years);

  /**
   * FORMULA 2: REAL PURCHASING POWER
   * Calculates what that future balance is actually worth in today's buying power.
   * Real Value = Nominal Value / (1 + i)^n
   */
  const realValue = nominalValue / Math.pow(1 + i, years);

  /**
   * FORMULA 3: WEALTH EROSION
   * The delta between what you 'have' (nominal) and what you can 'buy' (real).
   */
  const totalErosion = nominalValue - realValue;

  return {
    // Math.round is used to prevent decimal trailing
    // .toLocaleString() adds the institutional comma formatting
    nominalValue: Math.round(nominalValue).toLocaleString(),
    realValue: Math.round(realValue).toLocaleString(),
    erosion: Math.round(totalErosion).toLocaleString(),
    years: years
  };
}
