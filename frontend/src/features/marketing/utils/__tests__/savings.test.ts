import { estimateYearlySavings, paybackDays } from '../savings';

test('estimates the yearly money a workshop recovers', () => {
  const estimate = estimateYearlySavings({
    carsPerMonth: 100,
    averageTicket: 400000,
    paperworkHoursPerWeek: 10,
  });

  // 100 × 400.000 × 2 % × 12
  expect(estimate.uncharged).toBe(9600000);
  // 10 h × 4,33 × 50 % × 15.000 × 12
  expect(estimate.paperwork).toBe(3897000);
  // 100 × 3 % × 400.000 × 35 % × 12
  expect(estimate.returning).toBe(5040000);
  expect(estimate.total).toBe(9600000 + 3897000 + 5040000);
});

test('counts the days of recovered money that pay a year of MecaFix', () => {
  expect(paybackDays(3650000, 3468000)).toBe(347);
  expect(paybackDays(36500000, 3468000)).toBe(35);
  expect(paybackDays(0, 3468000)).toBeNull();
});
