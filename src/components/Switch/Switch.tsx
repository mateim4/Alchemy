import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const switchVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer rounded-full',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-[var(--theme-border-focus)] focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  [
    'pointer-events-none inline-block rounded-full bg-white shadow-lg',
    'transform ring-0 transition duration-200 ease-in-out',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      checked: {
        true: '',
        false: 'translate-x-0.5',
      },
    },
    compoundVariants: [
      { size: 'sm', checked: true, className: 'translate-x-4' },
      { size: 'md', checked: true, className: 'translate-x-5' },
      { size: 'lg', checked: true, className: 'translate-x-7' },
    ],
    defaultVariants: {
      size: 'md',
      checked: false,
    },
  }
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof switchVariants> {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback when the switch state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
}

/**
 * Toggle switch component.
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * <Switch label="Dark mode" />
 * ```
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleClick = () => {
      if (disabled) return;
      const newValue = !checked;
      if (!isControlled) {
        setInternalChecked(newValue);
      }
      onCheckedChange?.(newValue);
    };

    const switchElement = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          switchVariants({ size }),
          checked
            ? 'bg-[var(--color-accent-primary)]'
            : 'bg-[var(--theme-bg-tertiary)]',
          className
        )}
        {...props}
      >
        <span
          className={cn(thumbVariants({ size, checked }))}
        />
      </button>
    );

    if (label) {
      return (
        <label className="inline-flex items-center gap-2 cursor-pointer">
          {switchElement}
          <span className="text-sm text-[var(--theme-text-primary)]">{label}</span>
        </label>
      );
    }

    return switchElement;
  }
);

Switch.displayName = 'Switch';

export { switchVariants };
