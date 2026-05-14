export function calculateInflationOutcome(inputs: {
  currentAmount: number;
  annualInflation: number;
  years: number;
  investmentReturn: number;
}) {
  const { currentAmount, annualInflation, years, investmentReturn } = inputs;

  const i = annualInflation / 100;
  const r = investmentReturn / 100;

  // Future Value in Nominal Terms (The number on the screen)
  const nominalValue = currentAmount * Math.pow(1 + r, years);

  // Real Value (What that money actually buys in today's dollars)
  // Formula: Nominal / (1 + inflation)^years
  const realValue = nominalValue / Math.pow(1 + i, years);

  const totalErosion = nominalValue - realValue;

  return {
    nominalValue: Math.round(nominalValue).toLocaleString(),
    realValue: Math.round(realValue).toLocaleString(),
    erosion: Math.round(totalErosion).toLocaleString(),
    years
  };
}
