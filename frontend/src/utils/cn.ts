import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge must know the brand utilities of globals.css: otherwise it
// reads `bg-hex-mesh` as a background color and drops `bg-inverse`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'bg-image': ['bg-hex-mesh', 'bg-tread', 'bg-blueprint', 'bg-ruler'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
