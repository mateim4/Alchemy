import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const textVariants = cva('', {
  variants: {
    variant: {
      hero1: 'text-[4.25rem] font-bold leading-tight tracking-tight',
      hero2: 'text-[2.5rem] font-bold leading-tight tracking-tight',
      hero3: 'text-[2rem] font-semibold leading-snug',
      h1: 'text-2xl font-semibold leading-snug',
      h2: 'text-xl font-semibold leading-snug',
      h3: 'text-base font-semibold leading-normal',
      h4: 'text-sm font-semibold leading-normal',
      bodyLg: 'text-base font-normal leading-relaxed',
      body: 'text-sm font-normal leading-normal',
      bodySm: 'text-xs font-normal leading-normal',
      labelLg: 'text-sm font-medium leading-normal',
      label: 'text-xs font-medium leading-normal',
      labelSm: 'text-[10px] font-medium leading-normal tracking-wide uppercase',
      code: 'font-mono text-xs leading-relaxed',
    },
    color: {
      primary: 'text-[var(--theme-text-primary)]',
      secondary: 'text-[var(--theme-text-secondary)]',
      tertiary: 'text-[var(--theme-text-tertiary)]',
      muted: 'text-[var(--theme-text-muted)]',
      disabled: 'text-[var(--theme-text-disabled)]',
      accent: 'text-[var(--theme-text-accent)]',
      success: 'text-[var(--theme-text-status-success)]',
      warning: 'text-[var(--theme-text-status-warning)]',
      error: 'text-[var(--theme-text-status-error)]',
      info: 'text-[var(--theme-text-status-info)]',
      inherit: 'text-inherit',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    truncate: {
      true: 'truncate',
    },
    gradient: {
      true: [
        'bg-clip-text text-transparent',
        'bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]',
      ],
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'code';

const variantElementMap: Record<string, TextElement> = {
  hero1: 'h1',
  hero2: 'h1',
  hero3: 'h2',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  bodyLg: 'p',
  body: 'p',
  bodySm: 'p',
  labelLg: 'label',
  label: 'label',
  labelSm: 'label',
  code: 'code',
};

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  /** Override the default element */
  as?: TextElement;
}

/**
 * Text component for consistent typography.
 *
 * @example
 * ```tsx
 * <Text variant="h1">Page Title</Text>
 * <Text variant="body" color="secondary">Description text</Text>
 * <Text variant="hero1" gradient>Gradient Hero</Text>
 * ```
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant = 'body',
      color,
      align,
      truncate,
      gradient,
      as,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || variantElementMap[variant || 'body'] || 'p';

    return React.createElement(
      Component,
      {
        ref,
        className: cn(textVariants({ variant, color, align, truncate, gradient }), className),
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';

export { textVariants };
