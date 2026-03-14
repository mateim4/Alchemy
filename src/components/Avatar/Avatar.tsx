import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center',
    'overflow-hidden rounded-full',
    'bg-[var(--theme-bg-tertiary)]',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-20 w-20 text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (usually initials) when no image */
  fallback?: string;
  /** Show status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away';
}

/**
 * Avatar component for user/entity representation.
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 * <Avatar fallback="JD" size="lg" />
 * <Avatar src="/avatar.jpg" status="online" />
 * ```
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, status, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const showFallback = !src || imageError;

    const statusColors = {
      online: 'bg-[var(--color-status-success-DEFAULT)]',
      offline: 'bg-[var(--theme-text-muted)]',
      busy: 'bg-[var(--color-status-error-DEFAULT)]',
      away: 'bg-[var(--color-status-warning-DEFAULT)]',
    };

    const statusSizes = {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-3.5 w-3.5',
      '2xl': 'h-4 w-4',
    };

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {showFallback ? (
          <span className="font-medium text-[var(--theme-text-secondary)] uppercase">
            {fallback || '?'}
          </span>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        )}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full ring-2 ring-[var(--theme-bg-primary)]',
              statusColors[status],
              statusSizes[size || 'md']
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show */
  max?: number;
  /** Size of avatars in the group */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  children: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 4, size = 'md', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    const overlapSizes = {
      xs: '-space-x-2',
      sm: '-space-x-2',
      md: '-space-x-3',
      lg: '-space-x-3',
      xl: '-space-x-4',
      '2xl': '-space-x-5',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', overlapSizes[size], className)}
        {...props}
      >
        {visibleChildren.map((child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                size,
                className: cn(
                  'ring-2 ring-[var(--theme-bg-primary)]',
                  (child as React.ReactElement<AvatarProps>).props.className
                ),
              })
            : child
        )}
        {remainingCount > 0 && (
          <div
            className={cn(
              avatarVariants({ size }),
              'ring-2 ring-[var(--theme-bg-primary)]',
              'bg-[var(--theme-bg-secondary)]'
            )}
          >
            <span className="font-medium text-[var(--theme-text-secondary)]">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { avatarVariants };
