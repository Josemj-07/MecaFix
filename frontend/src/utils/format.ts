// Formatting helpers. Always format dates, numbers and money through these
// functions so the whole app is consistent.

const LOCALE = 'es-CO';

export const formatDate = (
  date: number | string | Date,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
) => new Intl.DateTimeFormat(LOCALE, options).format(new Date(date));

export const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {},
) => new Intl.NumberFormat(LOCALE, options).format(value);

// Pesos are written without cents in Colombia ($ 495.000).
const WHOLE_UNIT_CURRENCIES = new Set(['COP']);

export const formatCurrency = (
  amount: number,
  currency = 'COP',
  options: Intl.NumberFormatOptions = {},
) =>
  new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
    ...(WHOLE_UNIT_CURRENCIES.has(currency) && {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    ...options,
  }).format(amount);

// Colombian mobile numbers as people write them: 300 123 4567.
export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) return phone;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
};
