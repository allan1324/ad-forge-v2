import React from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-sm shadow-lg text-brand-ink',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export { Card };