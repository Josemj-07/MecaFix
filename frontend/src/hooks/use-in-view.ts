import * as React from 'react';

type UseInViewOptions = {
  // Stop observing after the first time the element enters the viewport.
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

// Tracks whether an element is in the viewport. Without IntersectionObserver
// (old browsers, tests) the element is reported as visible, so content that
// animates in is never left hidden.
export const useInView = <T extends Element>({
  once = true,
  rootMargin = '0px 0px -10% 0px',
  threshold = 0,
}: UseInViewOptions = {}) => {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(
    () => typeof IntersectionObserver === 'undefined',
  );

  React.useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView] as const;
};
