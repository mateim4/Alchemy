import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import {
  CheckmarkCircle20Filled,
  Warning20Filled,
  ErrorCircle20Filled,
  Info20Filled,
  Dismiss20Regular,
} from '@fluentui/react-icons';

const toastVariants = cva(
  [
    'pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden',
    'rounded-xl p-4 shadow-lg',
    'bg-[var(--theme-bg-glass-secondary)] backdrop-blur-xl',
    'border border-[var(--theme-border-glass)]',
    'transition-all duration-300',
  ],
  {
    variants: {
      variant: {
        default: '',
        success: 'border-l-4 border-l-[var(--color-status-success-DEFAULT)]',
        warning: 'border-l-4 border-l-[var(--color-status-warning-DEFAULT)]',
        error: 'border-l-4 border-l-[var(--color-status-error-DEFAULT)]',
        info: 'border-l-4 border-l-[var(--color-status-info-DEFAULT)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconMap = {
  default: null,
  success: CheckmarkCircle20Filled,
  warning: Warning20Filled,
  error: ErrorCircle20Filled,
  info: Info20Filled,
};

const iconColorMap = {
  default: '',
  success: 'text-[var(--color-status-success-DEFAULT)]',
  warning: 'text-[var(--color-status-warning-DEFAULT)]',
  error: 'text-[var(--color-status-error-DEFAULT)]',
  info: 'text-[var(--color-status-info-DEFAULT)]',
};

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /** Title of the toast */
  title?: string;
  /** Description/message of the toast */
  description?: string;
  /** Whether the toast can be dismissed */
  dismissible?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
  /** Custom action element */
  action?: React.ReactNode;
}

/**
 * Toast notification component.
 *
 * @example
 * ```tsx
 * <Toast variant="success" title="Success!" description="Your changes have been saved." />
 * <Toast variant="error" title="Error" description="Something went wrong." dismissible onDismiss={handleDismiss} />
 * ```
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = 'default',
      title,
      description,
      dismissible,
      onDismiss,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const Icon = iconMap[variant || 'default'];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {Icon && (
          <Icon className={cn('h-5 w-5 shrink-0', iconColorMap[variant || 'default'])} />
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-medium text-[var(--theme-text-primary)]">
              {title}
            </p>
          )}
          {description && (
            <p className="text-sm text-[var(--theme-text-secondary)] mt-0.5">
              {description}
            </p>
          )}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              'shrink-0 rounded-lg p-1.5',
              'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]',
              'hover:bg-[var(--theme-bg-tertiary)]',
              'transition-colors'
            )}
          >
            <Dismiss20Regular />
            <span className="sr-only">Dismiss</span>
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// Toast Container for positioning
export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position of the toast container */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

export const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className, position = 'bottom-right', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-[var(--zIndex-toast)] flex flex-col gap-2 w-full max-w-sm pointer-events-none',
          positionClasses[position],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToastContainer.displayName = 'ToastContainer';

export { toastVariants };
