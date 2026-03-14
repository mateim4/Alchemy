import * as React from 'react';
import { cn } from '../../utils/cn';

export interface SegmentedOption<T extends string> {
  id: T;
  label: string;
  icon?: React.ElementType;
}

export interface SegmentedControlProps<T extends string> {
  /** Available options */
  options: SegmentedOption<T>[];
  /** Currently selected option ID */
  value: T;
  /** Called when selection changes */
  onChange: (value: T) => void;
  /** Accessible label for the group */
  ariaLabel?: string;
  /** Icon size in px (default 16) */
  iconSize?: number;
  /** Make all items equal width */
  equalWidth?: boolean;
  /** Additional CSS class(es) */
  className?: string;
}

/**
 * Pill-style segmented control with radio group semantics.
 *
 * Generic over `T extends string` for type-safe option IDs.
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   options={[
 *     { id: 'grid', label: 'Grid', icon: GridIcon },
 *     { id: 'list', label: 'List', icon: ListIcon },
 *   ]}
 *   value={view}
 *   onChange={setView}
 *   ariaLabel="View mode"
 * />
 * ```
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  iconSize = 16,
  equalWidth = false,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-lg p-0.5',
        'bg-[var(--theme-bg-tertiary)]',
        'border border-[var(--theme-border-secondary)]',
        className,
      )}
    >
      {options.map((option) => {
        const isSelected = option.id === value;
        const Icon = option.icon;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]',
              equalWidth && 'flex-1',
              isSelected
                ? 'bg-[var(--theme-bg-accent-emphasis)] text-[var(--theme-text-onAccent)] shadow-sm'
                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent-subtle)]',
            )}
            onClick={() => onChange(option.id)}
          >
            {Icon && <Icon style={{ width: iconSize, height: iconSize }} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

SegmentedControl.displayName = 'SegmentedControl';
