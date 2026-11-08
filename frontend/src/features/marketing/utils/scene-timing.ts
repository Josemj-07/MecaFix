import type * as React from 'react';

// Animation delay for a piece of a product scene.
export const at = (ms: number): React.CSSProperties => ({
  animationDelay: `${ms}ms`,
});

// Moment the tap of <SceneCursor delay={cursorDelay} /> lands. Keep in sync
// with --animate-cursor in theme.css (1.8s, deepest press at 80%).
export const tapAt = (cursorDelay: number) => cursorDelay + 1800 * 0.8;

// Half of --animate-press: the pressed control is deepest at the tap and
// back up this long after it.
export const pressHalf = 120;

// Moment the screen answers a tap: once the pressed control is back up, so
// the effect never shows before its cause.
export const reactionAt = (cursorDelay: number) =>
  tapAt(cursorDelay) + pressHalf;
