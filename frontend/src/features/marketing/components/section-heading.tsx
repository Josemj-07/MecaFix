import type * as React from 'react';

import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { cn } from '@/utils/cn';

type SectionHeadingProps = {
  // Id of the heading, referenced by the section's aria-labelledby.
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: 'default' | 'inverse';
  align?: 'left' | 'center';
  className?: string;
};

// Eyebrow with the claws + section title + optional lead, with the scroll
// entrance shared by every section of the marketing pages.
export const SectionHeading = ({
  id,
  eyebrow,
  title,
  description,
  tone = 'default',
  align = 'left',
  className,
}: SectionHeadingProps) => (
  <Reveal
    className={cn(
      'flex max-w-2xl flex-col gap-4',
      align === 'center' && 'mx-auto items-center text-center',
      className,
    )}
  >
    <Eyebrow tone={tone === 'inverse' ? 'inverse' : 'default'}>
      {eyebrow}
    </Eyebrow>
    <Heading
      id={id}
      level="h2"
      className={cn(tone === 'inverse' && 'text-inverse-foreground')}
    >
      {title}
    </Heading>
    {description && (
      <Text
        variant="lead"
        className={cn(tone === 'inverse' && 'text-inverse-muted-foreground')}
      >
        {description}
      </Text>
    )}
  </Reveal>
);
