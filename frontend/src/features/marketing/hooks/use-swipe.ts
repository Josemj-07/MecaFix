import * as React from 'react';

// Distance a finger must travel sideways to count as a swipe.
const threshold = 48;

// Horizontal swipe on touch screens: `onSwipe(1)` for "next" (finger moves
// left), `onSwipe(-1)` for "previous". Mostly vertical gestures are left to
// the page scroll. Spread the returned handlers on the element and give it
// `touch-pan-y`.
export const useSwipe = (onSwipe: (direction: 1 | -1) => void) => {
  const start = React.useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (event: React.TouchEvent) => {
      const touch = event.touches[0];
      start.current = { x: touch.clientX, y: touch.clientY };
    },
    onTouchEnd: (event: React.TouchEvent) => {
      const origin = start.current;
      start.current = null;
      if (!origin) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - origin.x;
      const dy = touch.clientY - origin.y;
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.5) {
        onSwipe(dx < 0 ? 1 : -1);
      }
    },
  };
};
