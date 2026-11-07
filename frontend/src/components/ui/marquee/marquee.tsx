import type * as React from 'react';

import { cn } from '@/utils/cn';

export type MarqueeProps = {
  items: readonly string[];
  // Optional glyph rendered before each item.
  separator?: React.ReactNode;
  className?: string;
};

type MarqueeListProps = Pick<MarqueeProps, 'items' | 'separator'> & {
  hidden?: boolean;
};

const MarqueeList = ({ items, separator, hidden }: MarqueeListProps) => (
  <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
    {items.map((item) => (
      <li key={item} className="flex items-center gap-3 px-3 whitespace-nowrap">
        {separator}
        {item}
      </li>
    ))}
  </ul>
);

// Endless horizontal ticker. The list is rendered twice and shifted by half
// its width, so the loop is seamless. Screen readers get the list once.
export const Marquee = ({ items, separator, className }: MarqueeProps) => (
  <div className={cn('overflow-hidden', className)}>
    <div className="flex w-max motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused]">
      <MarqueeList items={items} separator={separator} />
      <MarqueeList items={items} separator={separator} hidden />
    </div>
  </div>
);
