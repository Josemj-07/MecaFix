import type * as React from 'react';

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/utils/cn';

const hiddenOffset = {
  bottom: 'motion-safe:data-[state=hidden]:translate-y-6',
  left: 'motion-safe:data-[state=hidden]:-translate-x-12',
  right: 'motion-safe:data-[state=hidden]:translate-x-12',
} as const;

export type RevealProps = React.ComponentProps<'div'> & {
  // Delay in ms, to stagger siblings.
  delay?: number;
  // Side the content enters from.
  from?: keyof typeof hiddenOffset;
};

// Fades its content in, from below or from a side, the first time it
// scrolls into view. Children can react too with
// `group-data-[state=hidden]:...`. With reduced motion the content is
// simply shown.
export const Reveal = ({
  delay = 0,
  from = 'bottom',
  className,
  style,
  children,
  ...props
}: RevealProps) => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-state={inView ? 'visible' : 'hidden'}
      className={cn(
        'group/reveal motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-brand motion-safe:data-[state=hidden]:opacity-0',
        hiddenOffset[from],
        className,
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};
