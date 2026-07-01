export interface UnemploymentResult {
  percent: number;
  monthlyAmount: number;
  months: number;
  total: number;
}

function baseMonths(years: number): number {
  if (years < 5) return 6;
  if (years < 10) return 12;
  if (years < 20) return 18;
  return 26;
}

function dependentMonths(years: number): number {
  if (years < 5) return 12;
  if (years < 10) return 18;
  if (years < 20) return 26;
  return 36;
}

export function calcUnemploymentInsurance(
  salary: number,
  years: number,
  married: boolean,
  dependents: number,
): UnemploymentResult {
  const deps = Math.min(Math.max(dependents, 0), 4);
  const percent = Math.min(55 + deps * 10, 95);
  const monthlyAmount = Math.round((salary * percent) / 100);
  const months = married || deps > 0 ? dependentMonths(years) : baseMonths(years);
  const total = monthlyAmount * months;
  return { percent, monthlyAmount, months, total };
}
