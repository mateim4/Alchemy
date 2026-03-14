import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown20Regular } from '@fluentui/react-icons';
import { cn } from '../../utils/cn';

// ── CVA Variants ──────────────────────────────────────────────────────────

const selectTriggerVariants = cva(
  [
    'inline-flex items-center justify-between gap-2 w-full',
    'rounded-lg border transition-colors',
    'border-[var(--theme-border-primary)]',
    'bg-[var(--theme-bg-secondary)]',
    'text-[var(--theme-text-primary)]',
    'hover:border-[var(--theme-border-accent)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]',
    'disabled:opacity-40 disabled:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-11 px-4 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ── Types ─────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
  /** Optional dot color indicator */
  dotColor?: string;
  disabled?: boolean;
}

export interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
  /** Available options */
  options: SelectOption[];
  /** Currently selected value */
  value: string;
  /** Called when selection changes */
  onChange: (value: string) => void;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Accessible label */
  'aria-label'?: string;
  /** Disable the select */
  disabled?: boolean;
  /** Additional CSS class(es) */
  className?: string;
}

/**
 * Accessible custom select with keyboard navigation.
 *
 * Supports: Arrow keys, Enter/Space, Escape, Home/End, type-ahead.
 * Uses ARIA combobox pattern with portal-rendered dropdown.
 *
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { value: 'a', label: 'Option A' },
 *     { value: 'b', label: 'Option B', dotColor: '#10b981' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   aria-label="Choose option"
 * />
 * ```
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  'aria-label': ariaLabel,
  disabled,
  size,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const [dropdownPos, setDropdownPos] = React.useState({ top: 0, left: 0, width: 0 });
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const listboxId = React.useId();

  const selectedOption = options.find((o) => o.value === value);

  // Position dropdown relative to trigger
  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  const open = React.useCallback(() => {
    if (disabled) return;
    updatePosition();
    setIsOpen(true);
    const idx = options.findIndex((o) => o.value === value);
    setHighlightedIndex(idx >= 0 ? idx : 0);
  }, [disabled, updatePosition, options, value]);

  const close = React.useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const selectOption = React.useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;
      onChange(option.value);
      close();
    },
    [onChange, close],
  );

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        listRef.current?.contains(e.target as Node)
      )
        return;
      close();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, close]);

  // Keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const enabledOptions = options.filter((o) => !o.disabled);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            open();
          } else {
            setHighlightedIndex((prev) => {
              let next = prev + 1;
              while (next < options.length && options[next].disabled) next++;
              return next < options.length ? next : prev;
            });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => {
              let next = prev - 1;
              while (next >= 0 && options[next].disabled) next--;
              return next >= 0 ? next : prev;
            });
          }
          break;
        case 'Home':
          e.preventDefault();
          if (isOpen && enabledOptions.length) {
            setHighlightedIndex(options.indexOf(enabledOptions[0]));
          }
          break;
        case 'End':
          e.preventDefault();
          if (isOpen && enabledOptions.length) {
            setHighlightedIndex(options.indexOf(enabledOptions[enabledOptions.length - 1]));
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            selectOption(options[highlightedIndex]);
          } else {
            open();
          }
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'Tab':
          close();
          break;
      }
    },
    [isOpen, options, highlightedIndex, open, close, selectOption],
  );

  // Scroll highlighted option into view
  React.useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;
    const list = listRef.current;
    const item = list?.children[highlightedIndex] as HTMLElement;
    item?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={
          isOpen && highlightedIndex >= 0 ? `${listboxId}-${highlightedIndex}` : undefined
        }
        aria-label={ariaLabel}
        disabled={disabled}
        className={cn(selectTriggerVariants({ size }), className)}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
      >
        <span className={cn('truncate', !selectedOption && 'text-[var(--theme-text-muted)]')}>
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.dotColor && (
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: selectedOption.dotColor }}
                />
              )}
              {selectedOption.label}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown20Regular
          className={cn(
            'h-4 w-4 shrink-0 text-[var(--theme-text-muted)] transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen &&
        createPortal(
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className={cn(
              'fixed z-[9999] overflow-y-auto rounded-lg border py-1',
              'max-h-60',
              'border-[var(--theme-border-primary)]',
              'bg-[var(--theme-bg-glass-secondary)]',
              'backdrop-blur-[20px]',
              'shadow-[var(--theme-shadow-lg)]',
            )}
            style={{
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
            }}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
                className={cn(
                  'flex items-center gap-2 cursor-pointer px-3 py-2 text-sm transition-colors',
                  option.value === value && 'text-[var(--theme-text-accent)] font-medium',
                  option.value !== value && 'text-[var(--theme-text-primary)]',
                  index === highlightedIndex && 'bg-[var(--theme-bg-accent-subtle)]',
                  option.disabled && 'opacity-40 cursor-not-allowed',
                )}
                onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectOption(option);
                }}
              >
                {option.dotColor && (
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: option.dotColor }}
                  />
                )}
                {option.label}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </>
  );
};

Select.displayName = 'Select';

export { selectTriggerVariants };
