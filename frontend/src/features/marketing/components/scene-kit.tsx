import { MousePointer2 } from 'lucide-react';
import * as React from 'react';

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/utils/cn';

// Building blocks for the product scenes of the marketing pages. A scene is
// a screen of the product whose pieces enter one after another (a few
// seconds, like a short video) and then rest, fully readable. Nothing is
// tied to the scroll position.

// Animation delay for a piece of a scene.
export const at = (ms: number): React.CSSProperties => ({
  animationDelay: `${ms}ms`,
});

// Plays the animations inside it when it scrolls into view. Until then they
// wait paused on their first frame. With `loop` (ms) the scene starts over
// every `loop` milliseconds while it stays on screen, so it reads like a
// short video; off screen or with reduced motion it simply rests.
export const PlayOnView = ({
  children,
  className,
  loop,
}: {
  children: React.ReactNode;
  className?: string;
  loop?: number;
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({
    once: !loop,
    rootMargin: '0px 0px -20% 0px',
  });
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    if (!loop || !inView) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const id = setInterval(() => setCycle((value) => value + 1), loop);
    return () => clearInterval(id);
  }, [loop, inView]);

  return (
    <div
      ref={ref}
      className={cn(
        !inView && '[&_*]:[animation-play-state:paused]',
        className,
      )}
    >
      <div key={cycle}>{children}</div>
    </div>
  );
};

type CursorProps = {
  // Start and end position, relative to the closest positioned ancestor.
  from: [string, string];
  to: [string, string];
  delay: number;
};

// Pointer that travels to a control and taps it.
export const SceneCursor = ({ from, to, delay }: CursorProps) => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute top-0 left-0 z-10 opacity-0 motion-safe:animate-cursor motion-reduce:hidden"
    style={
      {
        '--cx0': from[0],
        '--cy0': from[1],
        '--cx1': to[0],
        '--cy1': to[1],
        ...at(delay),
      } as React.CSSProperties
    }
  >
    <MousePointer2 className="size-5 fill-foreground text-card drop-shadow-sm" />
  </span>
);

// Label that is replaced by another one at `delay` (e.g. a status change).
export const SceneSwap = ({
  before,
  after,
  delay,
  className,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  delay: number;
  className?: string;
}) => (
  <span className={cn('relative inline-grid', className)}>
    <span
      aria-hidden="true"
      className="col-start-1 row-start-1 motion-safe:animate-swap-out motion-reduce:hidden"
      style={at(delay)}
    >
      {before}
    </span>
    <span
      className="col-start-1 row-start-1 motion-safe:animate-pop"
      style={at(delay + 150)}
    >
      {after}
    </span>
  </span>
);

// Thin label above a block of a scene.
export const SceneLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
    {children}
  </span>
);
