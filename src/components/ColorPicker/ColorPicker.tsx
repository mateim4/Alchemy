import * as React from 'react';
import { cn } from '../../utils/cn';
import { isValidHex, normalizeHex, presetAccentColors } from '../../utils/color';
import { Checkmark16Filled } from '@fluentui/react-icons';

export interface ColorPickerProps {
  /** Current color value (hex) */
  value: string;
  /** Callback when color changes */
  onChange: (color: string) => void;
  /** Show preset color swatches */
  showPresets?: boolean;
  /** Show hex input field */
  showInput?: boolean;
  /** Additional class names */
  className?: string;
  /** Size of swatches */
  size?: 'sm' | 'md' | 'lg';
}

const swatchSizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

/**
 * Color picker component with preset swatches and hex input.
 *
 * @example
 * ```tsx
 * const [color, setColor] = useState('#FF6B35');
 * <ColorPicker value={color} onChange={setColor} />
 * ```
 */
export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      onChange,
      showPresets = true,
      showInput = true,
      className,
      size = 'md',
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState(value);

    // Sync input with external value changes
    React.useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Only call onChange if valid hex
      if (isValidHex(newValue)) {
        onChange(normalizeHex(newValue));
      }
    };

    const handleInputBlur = () => {
      // Reset to current value if invalid
      if (!isValidHex(inputValue)) {
        setInputValue(value);
      }
    };

    const handlePresetClick = (color: string) => {
      onChange(color);
      setInputValue(color);
    };

    return (
      <div ref={ref} className={cn('space-y-3', className)}>
        {showPresets && (
          <div className="flex flex-wrap gap-2">
            {presetAccentColors.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => handlePresetClick(preset.value)}
                title={preset.name}
                className={cn(
                  'relative rounded-full transition-all duration-200',
                  'ring-offset-2 ring-offset-[var(--theme-bg-primary)]',
                  'hover:scale-110 hover:ring-2 hover:ring-[var(--theme-border-primary)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border-focus)]',
                  swatchSizes[size],
                  value.toLowerCase() === preset.value.toLowerCase() &&
                    'ring-2 ring-[var(--theme-text-primary)]'
                )}
                style={{ backgroundColor: preset.value }}
              >
                {value.toLowerCase() === preset.value.toLowerCase() && (
                  <Checkmark16Filled
                    className="absolute inset-0 m-auto text-white drop-shadow-md"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {showInput && (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'rounded-lg border border-[var(--theme-border-primary)]',
                swatchSizes[size]
              )}
              style={{ backgroundColor: isValidHex(inputValue) ? inputValue : value }}
            />
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="#FF6B35"
              className={cn(
                'flex-1 px-3 py-2 rounded-lg',
                'bg-[rgba(100,100,100,0.05)]',
                'border border-[var(--theme-border-primary)]',
                'text-[var(--theme-text-primary)]',
                'placeholder:text-[var(--theme-text-muted)]',
                'focus:outline-none focus:border-[var(--theme-text-muted)]',
                'focus:shadow-[0_0_0_3px_rgba(100,100,100,0.15)]',
                'transition-all duration-200',
                'font-mono text-sm uppercase'
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
