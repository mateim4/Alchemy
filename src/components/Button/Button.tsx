import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { SpinnerIos20Regular } from '@fluentui/react-icons';

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]',
          'text-white shadow-lg',
          'hover:from-[var(--color-accent-primary)] hover:to-[var(--color-accent-primary)]',
          'hover:shadow-xl hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-md',
          'focus-visible:ring-[var(--color-accent-primary)]',
        ],
        secondary: [
          'bg-[var(--theme-bg-secondary)]',
          'text-[var(--theme-text-primary)]',
          'border border-[var(--theme-border-primary)]',
          'hover:bg-[var(--theme-bg-tertiary)]',
          'hover:border-[var(--theme-border-accent)]',
          'focus-visible:ring-[var(--theme-border-focus)]',
        ],
        ghost: [
          'bg-transparent',
          'text-[var(--theme-text-secondary)]',
          'hover:bg-[var(--theme-bg-accent-subtle)]',
          'hover:text-[var(--theme-text-primary)]',
          'focus-visible:ring-[var(--theme-border-focus)]',
        ],
        outline: [
          'bg-transparent',
          'text-[var(--color-accent-primary)]',
          'border border-[var(--theme-border-accent)]',
          'hover:bg-[var(--theme-bg-accent-subtle)]',
          'focus-visible:ring-[var(--color-accent-primary)]',
        ],
        danger: [
          'bg-[var(--theme-bg-status-error)]',
          'text-[var(--theme-text-status-error)]',
          'border border-[var(--theme-border-status-error)]',
          'hover:bg-[var(--color-status-error-DEFAULT)]',
          'hover:text-white',
          'focus-visible:ring-[var(--color-status-error-DEFAULT)]',
        ],
        success: [
          'bg-[var(--theme-bg-status-success)]',
          'text-[var(--theme-text-status-success)]',
          'border border-[var(--theme-border-status-success)]',
          'hover:bg-[var(--color-status-success-DEFAULT)]',
          'hover:text-white',
          'focus-visible:ring-[var(--color-status-success-DEFAULT)]',
        ],
        link: [
          'bg-transparent',
          'text-[var(--theme-text-link-DEFAULT)]',
          'underline-offset-4 hover:underline',
          'focus-visible:ring-[var(--theme-text-link-DEFAULT)]',
        ],
      },
      size: {
        xs: 'h-7 px-2 text-xs rounded-md',
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-11 px-5 text-base rounded-lg',
        xl: 'h-12 px-6 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-lg',
        'icon-sm': 'h-8 w-8 rounded-md',
        'icon-lg': 'h-12 w-12 rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows a loading spinner and disables the button */
  isLoading?: boolean;
  /** Icon to display before the button text */
  leftIcon?: React.ReactNode;
  /** Icon to display after the button text */
  rightIcon?: React.ReactNode;
  /** Use as child for composition */
  asChild?: boolean;
}

/**
 * Button component with multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="secondary" leftIcon={<AddIcon />}>Add item</Button>
 * <Button variant="danger" isLoading>Deleting...</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <SpinnerIos20Regular className="h-4 w-4 animate-spin" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
