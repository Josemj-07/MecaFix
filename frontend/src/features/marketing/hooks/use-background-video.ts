import * as React from 'react';

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

// A decorative background video must never compete with the first paint:
// - it is not requested until the page has loaded and the browser is idle,
// - it is skipped with reduced motion, Data Saver or a 2G connection,
// - it only plays while it is on screen.
// Until it can play, the poster image is shown (and is what counts for LCP).
const canAutoplay = () => {
  if (typeof window === 'undefined') return false;
  if (typeof IntersectionObserver === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /2g/.test(connection.effectiveType)) {
    return false;
  }
  return true;
};

const whenIdleAfterLoad = (callback: () => void) => {
  let cancelled = false;
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const schedule = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(callback, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(callback, 300);
    }
  };

  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener('load', schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
};

export const useBackgroundVideo = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  // Sources are rendered only once this is true, so nothing is downloaded before.
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!canAutoplay()) return;
    return whenIdleAfterLoad(() => setShouldLoad(true));
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!shouldLoad || !video) return;

    video.muted = true;
    video.load();

    const play = () => {
      video.play().catch(() => {
        // Autoplay refused (e.g. low power mode): keep the poster.
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else video.pause();
    });
    observer.observe(video);

    return () => observer.disconnect();
  }, [shouldLoad]);

  const onPlaying = React.useCallback(() => setIsPlaying(true), []);

  return { videoRef, shouldLoad, isPlaying, onPlaying };
};
