import { formatCurrency, formatNumber, formatPhone } from '../format';

test('formatCurrency includes the amount', () => {
  expect(formatCurrency(1234.5, 'USD')).toMatch(/1.?234/);
});

test('formatCurrency writes pesos without cents', () => {
  expect(formatCurrency(495000)).not.toMatch(/,\d{2}$/);
  expect(formatCurrency(495000)).toMatch(/495.000/);
});

test('formatNumber formats integers', () => {
  expect(formatNumber(1000)).toMatch(/1.?000/);
});

test('formatPhone groups a Colombian mobile number', () => {
  expect(formatPhone('3001234567')).toBe('300 123 4567');
  expect(formatPhone('300 123 4567')).toBe('300 123 4567');
});

test('formatPhone leaves other numbers as typed', () => {
  expect(formatPhone('12345')).toBe('12345');
});
