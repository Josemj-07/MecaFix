import { cn } from '../cn';

test('keeps a background color next to a brand texture', () => {
  expect(cn('bg-inverse', 'bg-hex-mesh')).toBe('bg-inverse bg-hex-mesh');
  expect(cn('bg-primary bg-tread')).toBe('bg-primary bg-tread');
});

test('still lets the last background color win', () => {
  expect(cn('bg-card', 'bg-inverse')).toBe('bg-inverse');
});
