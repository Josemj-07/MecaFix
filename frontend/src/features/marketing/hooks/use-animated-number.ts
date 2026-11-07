import * as React from 'react';

// Eases a displayed number towards `value` (≈450 ms) each time it changes.
// With reduced motion the value is shown right away.
export const useAnimatedNumber = (value: number, duration = 450) => {
  const [display, setDisplay] = React.useState(value);
  const displayRef = React.useRef(value);

  React.useEffect(() => {
    const reduce = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce || typeof requestAnimationFrame === 'undefined') {
      displayRef.current = value;
      setDisplay(value);
      return;
    }

    const from = displayRef.current;
    let start: number | null = null;
    let frame = 0;
    const step = (time: number) => {
      if (start === null) start = time;
      const progress = Math.min(1, (time - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + (value - from) * eased);
      displayRef.current = next;
      setDisplay(next);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
};
