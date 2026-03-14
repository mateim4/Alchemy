import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center',
  {
    variants: {
      size: {
        sm: 'gap-2 py-6 px-4',
        md: 'gap-3 py-10 px-6',
        lg: 'gap-4 py-16 px-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
  /** Icon displayed above the title */
  icon?: React.ReactNode;
  /** Main heading text */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional action element (e.g. a Button) */
  action?: React.ReactNode;
  /** Additional CSS class(es) */
  className?: string;
}

/**
 * Placeholder for zero-data states.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<FolderOpenRegular className="h-10 w-10" />}
 *   title="No items yet"
 *   description="Create your first item to get started."
 *   action={<Button variant="primary">Create Item</Button>}
 * />
 * ```
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  size,
  className,
}) => {
  return (
    <div className={cn(emptyStateVariants({ size }), className)}>
      {icon && (
        <div className="text-[var(--theme-text-muted)]">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-[var(--theme-text-primary)]">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-[var(--theme-text-secondary)]">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export { emptyStateVariants };
