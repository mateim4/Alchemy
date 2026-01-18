import type { Config } from 'tailwindcss';

/**
 * Alchemy Design System Tailwind Preset
 *
 * @example
 * ```js
 * // tailwind.config.js
 * module.exports = {
 *   presets: [require('@alchemy-ui/core/tailwind')],
 *   // ... your config
 * }
 * ```
 */
const alchemyPreset: Partial<Config> = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Primitive Colors
        carbon: {
          50: '#2a2a2a',
          100: '#252525',
          200: '#202020',
          300: '#1a1a1a',
          400: '#151515',
          500: '#101010',
          600: '#0d0d0d',
          700: '#0a0a0a',
          800: '#070707',
          900: '#050505',
        },
        frost: {
          50: '#ffffff',
          100: '#fdfdfff',
          200: '#fafaff',
          300: '#F7F7FF',
          400: '#EDEDF5',
          500: '#E3E3EF',
          600: '#d4d4e0',
          700: '#c5c5d1',
          800: '#b6b6c2',
          900: '#a7a7b3',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF6B35',
          600: '#ea580c',
          700: '#E55934',
          800: '#9a3412',
          900: '#7c2d12',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#FFBC42',
          400: '#FF9F1C',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Semantic colors
        accent: {
          DEFAULT: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
        },
        success: {
          DEFAULT: 'var(--color-status-success-DEFAULT)',
          light: 'var(--color-status-success-light)',
          dark: 'var(--color-status-success-dark)',
        },
        warning: {
          DEFAULT: 'var(--color-status-warning-DEFAULT)',
          light: 'var(--color-status-warning-light)',
          dark: 'var(--color-status-warning-dark)',
        },
        error: {
          DEFAULT: 'var(--color-status-error-DEFAULT)',
          light: 'var(--color-status-error-light)',
          dark: 'var(--color-status-error-dark)',
        },
        info: {
          DEFAULT: 'var(--color-status-info-DEFAULT)',
          light: 'var(--color-status-info-light)',
          dark: 'var(--color-status-info-dark)',
        },
        // Theme-aware colors
        bg: {
          primary: 'var(--theme-bg-primary)',
          secondary: 'var(--theme-bg-secondary)',
          tertiary: 'var(--theme-bg-tertiary)',
          elevated: 'var(--theme-bg-elevated)',
          glass: 'var(--theme-bg-glass-primary)',
        },
        text: {
          primary: 'var(--theme-text-primary)',
          secondary: 'var(--theme-text-secondary)',
          tertiary: 'var(--theme-text-tertiary)',
          muted: 'var(--theme-text-muted)',
          accent: 'var(--theme-text-accent)',
        },
        border: {
          primary: 'var(--theme-border-primary)',
          secondary: 'var(--theme-border-secondary)',
          accent: 'var(--theme-border-accent)',
          glass: 'var(--theme-border-glass)',
        },
      },
      fontFamily: {
        sans: ["'Poppins'", 'system-ui', '-apple-system', 'sans-serif'],
        mono: ["'IBM Plex Mono'", 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        xs: ['0.625rem', { lineHeight: '1' }],        // 10px
        sm: ['0.75rem', { lineHeight: '1' }],         // 12px
        base: ['0.875rem', { lineHeight: '1.5' }],    // 14px
        md: ['1rem', { lineHeight: '1.5' }],          // 16px
        lg: ['1.125rem', { lineHeight: '1.5' }],      // 18px
        xl: ['1.25rem', { lineHeight: '1.375' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '1.375' }],   // 24px
        '3xl': ['1.75rem', { lineHeight: '1.25' }],   // 28px
        '4xl': ['2rem', { lineHeight: '1.25' }],      // 32px
        '5xl': ['2.5rem', { lineHeight: '1.25' }],    // 40px
        '6xl': ['3rem', { lineHeight: '1.125' }],     // 48px
        '7xl': ['4.25rem', { lineHeight: '1.125' }],  // 68px
      },
      borderRadius: {
        xs: '0.125rem',    // 2px
        sm: '0.25rem',     // 4px
        md: '0.375rem',    // 6px
        lg: '0.5rem',      // 8px
        xl: '0.75rem',     // 12px
        '2xl': '1rem',     // 16px
        '3xl': '1.5rem',   // 24px
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        card: 'var(--theme-shadow-card)',
        'card-hover': 'var(--theme-shadow-cardHover)',
        glow: 'var(--theme-shadow-glow)',
        'glow-strong': 'var(--theme-shadow-glowStrong)',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      transitionDuration: {
        instant: '0ms',
        fastest: '50ms',
        faster: '100ms',
        fast: '150ms',
        normal: '200ms',
        moderate: '250ms',
        slow: '300ms',
        slower: '400ms',
        slowest: '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        smooth: 'cubic-bezier(0.33, 0, 0.67, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      zIndex: {
        hide: '-1',
        base: '0',
        docked: '10',
        dropdown: '1000',
        sticky: '1100',
        banner: '1200',
        overlay: '1300',
        modal: '1400',
        popover: '1500',
        tooltip: '1600',
        toast: '1700',
        max: '9999',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-out': 'fadeOut 200ms ease-in',
        'slide-up': 'slideUp 300ms ease-out',
        'slide-down': 'slideDown 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'scale-out': 'scaleOut 200ms ease-in',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default alchemyPreset;
