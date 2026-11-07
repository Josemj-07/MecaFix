// Estimate behind "¿Cuánta plata se le escapa a tu taller al año?".
// TODO: los supuestos son estimaciones conservadoras del equipo, no datos de
// clientes. Reemplazarlos cuando haya mediciones reales de talleres.
export const savingsAssumptions = {
  // Share of the monthly billing that leaves the shop uncharged.
  unchargedRate: 0.02,
  // Share of the paperwork hours MecaFix removes.
  paperworkReduction: 0.5,
  // Value of one administrative hour, in COP.
  hourValue: 15000,
  // Extra cars per month from customers who come back (reminders).
  returningRate: 0.03,
  // Margin kept from each returning car.
  returningMargin: 0.35,
  weeksPerMonth: 4.33,
} as const;

export type SavingsInput = {
  carsPerMonth: number;
  averageTicket: number;
  paperworkHoursPerWeek: number;
};

export type SavingsEstimate = {
  uncharged: number;
  paperwork: number;
  returning: number;
  total: number;
};

const MONTHS = 12;

export const estimateYearlySavings = ({
  carsPerMonth,
  averageTicket,
  paperworkHoursPerWeek,
}: SavingsInput): SavingsEstimate => {
  const a = savingsAssumptions;
  const monthlyBilling = carsPerMonth * averageTicket;

  const uncharged = Math.round(monthlyBilling * a.unchargedRate * MONTHS);
  const paperwork = Math.round(
    paperworkHoursPerWeek *
      a.weeksPerMonth *
      a.paperworkReduction *
      a.hourValue *
      MONTHS,
  );
  const returning = Math.round(
    carsPerMonth * a.returningRate * averageTicket * a.returningMargin * MONTHS,
  );

  return {
    uncharged,
    paperwork,
    returning,
    total: uncharged + paperwork + returning,
  };
};

// Days of recovered money needed to cover a year of MecaFix.
export const paybackDays = (yearlySavings: number, yearlyCost: number) =>
  yearlySavings <= 0
    ? null
    : Math.max(1, Math.ceil(yearlyCost / (yearlySavings / 365)));
