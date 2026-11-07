import type * as React from 'react';

import { Link } from '@/components/ui/link';
import { type NavLink } from '@/config/site';

type NavAnchorProps = Omit<React.ComponentProps<'a'>, 'href'> & {
  item: NavLink;
};

// Route links go through the router; landing anchors stay plain <a> tags so
// the browser scrolls to the section (the router does not scroll to hashes).
export const NavAnchor = ({
  item,
  children,
  className,
  ...props
}: NavAnchorProps) =>
  item.isRoute ? (
    <Link variant="unstyled" to={item.href} className={className} {...props}>
      {children ?? item.label}
    </Link>
  ) : (
    <a href={item.href} className={className} {...props}>
      {children ?? item.label}
    </a>
  );
