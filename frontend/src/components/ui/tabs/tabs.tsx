import * as TabsPrimitive from '@radix-ui/react-tabs';
import type * as React from 'react';

import { cn } from '@/utils/cn';

// Accessible tabs (keyboard arrows, roving focus) styled for the brand:
// the active tab is marked by a red bar at the slope of the logo X.
export const Tabs = TabsPrimitive.Root;

export const TabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn('flex overflow-x-auto border-b', className)}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'relative flex shrink-0 items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:bg-accent data-[state=active]:text-foreground [&_svg]:size-4 [&_svg]:shrink-0 data-[state=active]:[&_svg]:text-primary',
      'after:absolute after:inset-x-4 after:-bottom-px after:h-1 after:origin-left after:scale-x-0 after:-skew-x-[14deg] after:bg-primary data-[state=active]:after:scale-x-100 motion-safe:after:transition-transform motion-safe:after:duration-300',
      className,
    )}
    {...props}
  />
);

export const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={cn('outline-none', className)} {...props} />
);
