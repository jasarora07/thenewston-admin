/**
 * THE NEWSTON TERMINAL: MODULE 03 LOGIC
 * Core logic for the Home Equity & Lifestyle Liquidity Engine
 */

export interface EquityInput {
  homeValue: number;
  mortgageBalance: number;
  primaryRate: number;
  cashNeeded: number;
  helocRate: number;
  newRefiRate: number;
}

export const calculateEquityOutcome = (input: EquityInput) => {
  const { 
    mortgageBalance, 
    primaryRate, 
    cashNeeded, 
    helocRate, 
    newRefiRate, 
    homeValue 
  } = input;

  // 1. SCENARIO A: HELOC (Weighted Average Cost of Capital)
  // Logic: Keep the low-rate primary mortgage and add a smaller secondary loan.
  const totalDebtHELOC = mortgageBalance + cashNeeded;
  const blendedRateHELOC = ((mortgageBalance * primaryRate) + (cashNeeded * helocRate)) / totalDebtHELOC;

  // 2. SCENARIO B: CASH-OUT REFI (Unified Debt Replacement)
  // Logic: Replace the entire balance (Primary + New Cash) with the current market rate.
  const totalDebtRefi = mortgageBalance + cashNeeded;
  const blendedRateRefi = newRefiRate; 

  // 3. EQUITY SAFETY CHECK (LTV Guardrails)
  const ltv = ((mortgageBalance + cashNeeded) / homeValue) * 100;
  const isSafeLTV = ltv <= 80; // Standard 2026 institutional ceiling

  // 4. SIGNAL GENERATION
  let signal = "HOLD";
  let recommendation = "";

  if (blendedRateHELOC < blendedRateRefi) {
    signal = "HELOC";
    recommendation = `DEFEND PRIMARY RATE: Scenario A is mathematically superior. By keeping your ${primaryRate}% mortgage, your total cost of debt is ${(blendedRateRefi - blendedRateHELOC).toFixed(2)}% lower than a full refinance.`;
  } else {
    signal = "REFI";
    recommendation = `CONSOLIDATE DEBT: Scenario B is optimal. The total cost of debt is lower under a unified loan structure.`;
  }

  // If LTV is too high, override recommendation with a warning
  if (!isSafeLTV) {
    recommendation = `WARNING: LTV AT ${ltv.toFixed(1)}%. This exceeds the 80% safety ceiling. Liquidity access may be restricted by institutional lenders.`;
  }

  return {
    blendedRateHELOC: blendedRateHELOC.toFixed(2),
    blendedRateRefi: blendedRateRefi.toFixed(2),
    monthlySavings: Math.abs(((blendedRateRefi - blendedRateHELOC) / 100 / 12) * totalDebtRefi).toFixed(0),
    ltv: ltv.toFixed(1),
    signal,
    recommendation,
    isSafeLTV
  };
};
