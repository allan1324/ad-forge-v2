import React from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Simplified CVA-like function
const buttonVariants = ({ variant, size, className }: { variant?: string | null, size?: string | null, className?: string }) => {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-brand-bg transform hover:-translate-y-px';
  
  const variants: Record<string, string> = {
    default: 'bg-gradient-to-r from-brand-primary to-brand-accent text-brand-bg font-semibold hover:shadow-brand-primary/40 shadow-lg shadow-brand-primary/20',
    destructive: 'bg-danger text-brand-ink hover:bg-danger/90',
    secondary: 'bg-brand-surface text-brand-ink hover:bg-brand-surface/80 border border-slate-800',
    ghost: 'hover:bg-brand-surface hover:text-brand-ink',
    link: 'underline-offset-4 hover:underline text-brand-primary',
  };

  const sizes: Record<string, string> = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-12 px-8 rounded-lg text-base',
  };
  
  const variantClass = variants[variant || 'default'] || variants['default'];
  const sizeClass = sizes[size || 'default'] || sizes['default'];
  
  return cn(base, variantClass, sizeClass, className);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };