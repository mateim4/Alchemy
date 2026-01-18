import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { DismissCircle20Filled } from '@fluentui/react-icons';

const inputVariants = cva(
  [
    'flex w-full',
    'bg-[rgba(100,100,100,0.05)]',
    'border border-[var(--theme-border-primary)]',
    'text-[var(--theme-text-primary)]',
    'placeholder:text-[var(--theme-text-muted)]',
    'transition-all duration-200',
    'focus:outline-none focus:border-[var(--theme-text-muted)]',
    'focus:shadow-[0_0_0_3px_rgba(100,100,100,0.15)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-sm rounded-md',
        md: 'h-10 px-3 text-sm rounded-lg',
        lg: 'h-12 px-4 text-base rounded-lg',
      },
      variant: {
        default: '',
        error: [
          'border-[var(--theme-border-status-error)]',
          'focus:border-[var(--color-status-error-DEFAULT)]',
          'focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
        ],
        success: [
          'border-[var(--theme-border-status-success)]',
          'focus:border-[var(--color-status-success-DEFAULT)]',
          'focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Show a clear button when there's a value */
  clearable?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Error message to display */
  error?: string;
  /** Hint text to display below the input */
  hint?: string;
}

/**
 * Input component with icons and validation states.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter email" leftIcon={<MailIcon />} />
 * <Input variant="error" error="Invalid email address" />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size,
      variant,
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      error,
      hint,
      value,
      ...props
    },
    ref
  ) => {
    const hasValue = value !== undefined && value !== '';
    const showClear = clearable && hasValue && onClear;

    return (
      <div className="w-full">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            value={value}
            className={cn(
              inputVariants({ size, variant: error ? 'error' : variant }),
              leftIcon && 'pl-10',
              (rightIcon || showClear) && 'pr-10',
              className
            )}
            {...props}
          />
          {(rightIcon || showClear) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]">
              {showClear ? (
                <button
                  type="button"
                  onClick={onClear}
                  className="hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  <DismissCircle20Filled />
                </button>
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
        {(error || hint) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              error
                ? 'text-[var(--theme-text-status-error)]'
                : 'text-[var(--theme-text-muted)]'
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { inputVariants };
