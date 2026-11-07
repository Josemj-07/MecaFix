import { cn } from '@/utils/cn';

// The hex nut of the logo (the dot over the i of MecaFix): the brand mark
// before section labels, bullets and confirmations. Decorative.
export const Nut = ({
  className,
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className={cn('size-4 shrink-0', className)}
  >
    {filled ? (
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M7 2.5h10l5 9.5-5 9.5H7L2 12zM12 8.2a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6z"
      />
    ) : (
      <>
        <path
          d="M7 2.5h10l5 9.5-5 9.5H7L2 12z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </>
    )}
  </svg>
);
