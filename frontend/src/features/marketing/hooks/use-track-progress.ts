import * as React from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

// Progress (0 → 1) of the race car along the trust track.
// - With a mouse, the car follows the pointer across the track.
// - On touch screens, it advances as the section scrolls through the view.
// - With reduced motion, it starts at the finish line.
export const useTrackProgress = <
  TSection extends HTMLElement,
  TTrack extends HTMLElement,
>() => {
  const sectionRef = React.useRef<TSection>(null);
  const trackRef = React.useRef<TTrack>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    const canHover = window.matchMedia?.('(hover: hover)').matches ?? false;

    if (canHover) {
      const onPointerMove = (event: PointerEvent) => {
        const rect = track.getBoundingClientRect();
        setProgress(clamp((event.clientX - rect.left) / rect.width));
      };
      section.addEventListener('pointermove', onPointerMove);
      return () => section.removeEventListener('pointermove', onPointerMove);
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewport = window.innerHeight;
        setProgress(
          clamp((viewport * 0.85 - rect.top) / (rect.height + viewport * 0.2)),
        );
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { sectionRef, trackRef, progress };
};
