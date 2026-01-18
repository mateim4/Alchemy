import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium transition-colors',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--theme-bg-accent-subtle)]',
          'text-[var(--color-accent-primary)]',
          'border border-[var(--theme-border-accent)]',
        ],
        secondary: [
          'bg-[var(--theme-bg-secondary)]',
          'text-[var(--theme-text-secondary)]',
          'border border-[var(--theme-border-secondary)]',
        ],
        success: [
          'bg-[var(--theme-bg-status-success)]',
          'text-[var(--theme-text-status-success)]',
          'border border-[var(--theme-border-status-success)]',
        ],
        warning: [
          'bg-[var(--theme-bg-status-warning)]',
          'text-[var(--theme-text-status-warning)]',
          'border border-[var(--theme-border-status-warning)]',
        ],
        error: [
          'bg-[var(--theme-bg-status-error)]',
          'text-[var(--theme-text-status-error)]',
          'border border-[var(--theme-border-status-error)]',
        ],
        info: [
          'bg-[var(--theme-bg-status-info)]',
          'text-[var(--theme-text-status-info)]',
          'border border-[var(--theme-border-status-info)]',
        ],
        outline: [
          'bg-transparent',
          'text-[var(--theme-text-primary)]',
          'border border-[var(--theme-border-primary)]',
        ],
      },
      size: {
        sm: 'h-5 px-1.5 text-[10px] rounded',
        md: 'h-6 px-2 text-xs rounded-md',
        lg: 'h-7 px-2.5 text-sm rounded-md',
      },
      dot: {
        true: 'pl-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a colored dot indicator */
  dot?: boolean;
}

/**
 * Badge component for status indicators and labels.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" dot>Pending</Badge>
 * <Badge variant="error" size="sm">Error</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    const dotColors: Record<string, string> = {
      default: 'bg-[var(--color-accent-primary)]',
      secondary: 'bg-[var(--theme-text-muted)]',
      success: 'bg-[var(--color-status-success-DEFAULT)]',
      warning: 'bg-[var(--color-status-warning-DEFAULT)]',
      error: 'bg-[var(--color-status-error-DEFAULT)]',
      info: 'bg-[var(--color-status-info-DEFAULT)]',
      outline: 'bg-[var(--theme-text-primary)]',
    };

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full mr-1.5',
              dotColors[variant || 'default']
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { badgeVariants };
