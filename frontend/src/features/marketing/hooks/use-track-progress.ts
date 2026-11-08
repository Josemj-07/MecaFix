import * as React from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

// Height of the screen where the car sits on the vertical rail: low enough
// that it reaches the finish while the goal is still on screen.
const readingLine = 0.72;

// Progress (0 → 1) of the race car along the trust track.
// - On a phone the track is a vertical rail beside the list: the car sits
//   at the reading line, so it goes down with the scroll and reaches the
//   finish when the last item is read. `vertical` is then true.
// - With a mouse, the car follows the pointer across the horizontal track.
// - On other touch screens, it advances as the section scrolls through.
// - With reduced motion, it starts at the finish line.
export const useTrackProgress = <
  TSection extends HTMLElement,
  TTrack extends HTMLElement,
  TRail extends HTMLElement,
>() => {
  const sectionRef = React.useRef<TSection>(null);
  const trackRef = React.useRef<TTrack>(null);
  const railRef = React.useRef<TRail>(null);
  const [progress, setProgress] = React.useState(0);
  const [vertical, setVertical] = React.useState(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    if (!section || !track || !rail) return;

    // The rail is only laid out on a phone (it is hidden from sm up).
    const isVertical = () => rail.offsetHeight > 0;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVertical(isVertical());
      setProgress(1);
      return;
    }

    const measureScroll = () => {
      const viewport = window.innerHeight;
      if (isVertical()) {
        const rect = rail.getBoundingClientRect();
        setVertical(true);
        setProgress(clamp((viewport * readingLine - rect.top) / rect.height));
        return;
      }
      const rect = section.getBoundingClientRect();
      setVertical(false);
      setProgress(
        clamp((viewport * 0.85 - rect.top) / (rect.height + viewport * 0.2)),
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      if (isVertical()) return;
      const rect = track.getBoundingClientRect();
      setProgress(clamp((event.clientX - rect.left) / rect.width));
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measureScroll);
    };

    const canHover = window.matchMedia?.('(hover: hover)').matches ?? false;
    // A mouse drives the horizontal track; the rail always follows the scroll.
    const followScroll = () => !canHover || isVertical();

    const onScrollIfNeeded = () => {
      if (followScroll()) onScroll();
    };

    if (followScroll()) measureScroll();
    else setVertical(false);

    if (canHover) section.addEventListener('pointermove', onPointerMove);
    window.addEventListener('scroll', onScrollIfNeeded, { passive: true });
    window.addEventListener('resize', onScrollIfNeeded);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScrollIfNeeded);
      window.removeEventListener('resize', onScrollIfNeeded);
    };
  }, []);

  return { sectionRef, trackRef, railRef, progress, vertical };
};
