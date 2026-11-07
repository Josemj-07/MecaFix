import { Nut } from '@/components/ui/nut';

import { type FaqItem } from '../utils/faq';

// Native <details> accordion: accessible and usable without JavaScript.
// The nut turns a quarter when an answer opens.
export const FaqList = ({ items }: { items: FaqItem[] }) => (
  <div className="divide-y bg-card shadow-[inset_0_0_0_1px_var(--color-border)]">
    {items.map((item, index) => (
      <details
        key={item.question}
        open={index === 0}
        className="group/faq [&_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-[1.0625rem] font-semibold transition-colors outline-none group-open/faq:text-primary hover:text-primary focus-visible:bg-secondary sm:px-7">
          {item.question}
          <Nut className="size-5 text-primary group-open/faq:rotate-90 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-bolt" />
        </summary>
        <p className="max-w-[68ch] px-5 pb-6 leading-relaxed text-muted-foreground motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 sm:px-7">
          {item.answer}
        </p>
      </details>
    ))}
  </div>
);
