import React from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'af-bg-panel af-border-line af-text-text-hi',
    destructive: 'af-bg-red-900/50 af-border-red-500/50 af-text-red-200',
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'af-relative af-w-full af-rounded-lg af-border af-p-4',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('af-mb-1 af-font-bold af-font-display af-leading-none af-tracking-tight af-text-text-hi', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('af-text-sm [&_p]:af-leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };