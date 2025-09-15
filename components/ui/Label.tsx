import React from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'af-text-sm af-font-medium af-text-text-hi af-leading-none peer-disabled:af-cursor-not-allowed peer-disabled:af-opacity-70 af-block af-mb-2',
      className
    )}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };