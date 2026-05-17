export interface AmortizationMonth {
  monthNumber: number
  standardInterest: number
  standardPrincipal: number
  standardBalance: number
  acceleratedInterest: number
  acceleratedPrincipal: number
  acceleratedBalance: number
}

export interface AcceleratedMortgageOutput {
  standardMonthlyEmi: number
  totalInterestStandard: number
  totalInterestAccelerated: number
  totalSavings: number
  monthsSaved: number
  yearsSaved: number
  standardPayoffMonths: number
  acceleratedPayoffMonths: number
  amortizationSchedule: AmortizationMonth[]
}

/**
 * Calculates high-precision mortgage acceleration pathways.
 * Handles both new total tenure or existing remaining tenure left.
 */
export function simulateMortgageAcceleration(
  currentBalance: number,
  annualInterestRate: number,
  remainingYears: number,
  extraMonthlyPayment: number
): AcceleratedMortgageOutput {
  const monthlyRate = annualInterestRate / 100 / 12
  const totalMonths = Math.round(remainingYears * 12)

  // Standard Monthly EMI Amortization Formula: M = P [ i(1+i)^n ] / [ (1+i)^n - 1 ]
  let standardEmi = 0
  if (monthlyRate > 0) {
    standardEmi = (currentBalance * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
                  (Math.pow(1 + monthlyRate, totalMonths) - 1)
  } else {
    standardEmi = currentBalance / totalMonths
  }

  // --- PATHWAY A: RUN STANDARD LIFECYCLE ---
  let balStandard = currentBalance
  let interestStandardSum = 0
  const standardSchedule: { interest: number; principal: number; bal: number }[] = []

  for (let m = 1; m <= totalMonths; m++) {
    const intPaid = balStandard * monthlyRate
    let princPaid = standardEmi - intPaid

    if (princPaid > balStandard) {
      princPaid = balStandard
    }

    interestStandardSum += intPaid
    balStandard -= princPaid

    standardSchedule.push({
      interest: intPaid,
      principal: princPaid,
      bal: Math.max(0, balStandard)
    })

    if (balStandard <= 0) break
  }

  // --- PATHWAY B: RUN ACCELERATED LIFECYCLE ---
  let balAccelerated = currentBalance
  let interestAcceleratedSum = 0
  let acceleratedMonthsCount = 0
  const acceleratedSchedule: { interest: number; principal: number; bal: number }[] = []

  for (let m = 1; m <= totalMonths; m++) {
    if (balAccelerated <= 0) {
      acceleratedSchedule.push({ interest: 0, principal: 0, bal: 0 })
      continue
    }

    acceleratedMonthsCount++
    const intPaid = balAccelerated * monthlyRate
    // Extra principal payment stacks directly into raw baseline reductions here:
    let princPaid = (standardEmi - intPaid) + extraMonthlyPayment

    if (princPaid > balAccelerated) {
      princPaid = balAccelerated
    }

    interestAcceleratedSum += intPaid
    balAccelerated -= princPaid

    acceleratedSchedule.push({
      interest: intPaid,
      principal: princPaid,
      bal: Math.max(0, balAccelerated)
    })
  }

  // --- PHASE C: COMPILING DATA GRID MATRIX ---
  const masterSchedule: AmortizationMonth[] = []
  const maxIterationLength = Math.max(standardSchedule.length, acceleratedMonthsCount)

  for (let i = 0; i < maxIterationLength; i++) {
    masterSchedule.push({
      monthNumber: i + 1,
      standardInterest: standardSchedule[i]?.interest || 0,
      standardPrincipal: standardSchedule[i]?.principal || 0,
      standardBalance: standardSchedule[i]?.bal ?? 0,
      acceleratedInterest: acceleratedSchedule[i]?.interest || 0,
      acceleratedPrincipal: acceleratedSchedule[i]?.principal || 0,
      acceleratedBalance: acceleratedSchedule[i]?.bal ?? 0
    })
  }

  const totalSavings = interestStandardSum - interestAcceleratedSum
  const monthsSaved = standardSchedule.length - acceleratedMonthsCount

  return {
    standardMonthlyEmi: Math.round(standardEmi * 100) / 100,
    totalInterestStandard: Math.round(interestStandardSum),
    totalInterestAccelerated: Math.round(interestAcceleratedSum),
    totalSavings: Math.max(0, Math.round(totalSavings)),
    monthsSaved: Math.max(0, monthsSaved),
    yearsSaved: Math.max(0, Math.round((monthsSaved / 12) * 10) / 10),
    standardPayoffMonths: standardSchedule.length,
    acceleratedPayoffMonths: acceleratedMonthsCount,
    amortizationSchedule: masterSchedule
  }
}
