import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  [
    'rounded-xl transition-all',
    'border border-[var(--theme-border-glass)]',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--theme-bg-glass-primary)]',
          'backdrop-blur-xl',
          'shadow-[var(--theme-shadow-card)]',
        ],
        elevated: [
          'bg-[var(--theme-bg-elevated)]',
          'shadow-[var(--theme-shadow-lg)]',
        ],
        outline: [
          'bg-transparent',
          'border-[var(--theme-border-primary)]',
        ],
        ghost: [
          'bg-transparent',
          'border-transparent',
        ],
        glass: [
          'bg-[var(--theme-bg-glass-secondary)]',
          'backdrop-blur-2xl',
          'shadow-[var(--theme-shadow-card)]',
        ],
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:shadow-[var(--theme-shadow-cardHover)]',
          'hover:-translate-y-1',
          'hover:border-[var(--theme-border-accent)]',
        ],
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card container component with glass morphism effect.
 *
 * @example
 * ```tsx
 * <Card variant="glass" padding="lg">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, interactive, padding }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card Header
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

// Card Title
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-tight',
        'text-[var(--theme-text-primary)]',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

// Card Description
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[var(--theme-text-muted)]', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

// Card Content
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

// Card Footer
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4 border-t border-[var(--theme-border-secondary)]', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { cardVariants };
