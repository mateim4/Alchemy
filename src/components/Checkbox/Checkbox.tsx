import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const checkboxVariants = cva(
  [
    'shrink-0 appearance-none rounded border cursor-pointer transition-all',
    'border-[var(--theme-border-primary)]',
    'bg-[var(--theme-bg-secondary)]',
    'checked:bg-[var(--color-accent-primary)] checked:border-[var(--color-accent-primary)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--theme-border-focus)]',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    // Checkmark via background-image (CSS-only, no extra element)
    'checked:bg-[length:100%_100%] checked:bg-center checked:bg-no-repeat',
    "checked:bg-[url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")]",
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 rounded',
        md: 'h-5 w-5 rounded',
        lg: 'h-6 w-6 rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Error message */
  error?: string;
  /** Hint/helper text */
  hint?: string;
}

/**
 * Styled checkbox with label, error, and hint support.
 *
 * @example
 * ```tsx
 * <Checkbox label="I agree to the terms" />
 * <Checkbox label="Enable notifications" size="sm" hint="You can change this later" />
 * <Checkbox label="Required field" error="You must accept" />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, label, error, hint, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className={cn(
            'inline-flex items-center gap-2 cursor-pointer',
            props.disabled && 'cursor-not-allowed opacity-60',
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn(checkboxVariants({ size }), className)}
            aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
            aria-invalid={!!error}
            {...props}
          />
          {label && (
            <span className="text-sm text-[var(--theme-text-primary)] select-none">{label}</span>
          )}
        </label>
        {hint && !error && (
          <p id={hintId} className="ml-7 text-xs text-[var(--theme-text-muted)]">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="ml-7 text-xs text-[var(--color-status-error-DEFAULT)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { checkboxVariants };
