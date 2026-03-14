import * as React from 'react';
import {
  deriveAccentPalette,
  mixHex,
  hexToRgb,
  isValidHex,
  type AccentPalette,
} from '../../utils/color';

// ============================================================================
// Types
// ============================================================================

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  /** Current theme setting (light/dark/system) */
  mode: ThemeMode;
  /** Resolved theme (light or dark, after system preference) */
  resolvedMode: 'light' | 'dark';
  /** Current accent color (hex) */
  accentColor: string;
  /** Derived accent palette */
  palette: AccentPalette;
  /** Set the theme mode */
  setMode: (mode: ThemeMode) => void;
  /** Set the accent color */
  setAccentColor: (color: string) => void;
  /** Toggle between light and dark */
  toggleMode: () => void;

  // Legacy aliases for backward compatibility
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (mode: ThemeMode) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme mode */
  defaultMode?: ThemeMode;
  /** Default accent color (hex) */
  defaultAccentColor?: string;
  /** Storage key for persisting preferences */
  storageKey?: string;
  /** Force a specific theme (overrides user preference) */
  forcedMode?: 'light' | 'dark';
  /** Force a specific accent color */
  forcedAccentColor?: string;
  /** Attribute to set on document element */
  attribute?: 'class' | 'data-theme';

  // Legacy props
  defaultTheme?: ThemeMode;
  forcedTheme?: 'light' | 'dark';
}

// ============================================================================
// Context
// ============================================================================

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_ACCENT_COLOR = '#FF6B35';

interface StoredTheme {
  mode: ThemeMode;
  accentColor: string;
}

// ============================================================================
// CSS Variable Application
// ============================================================================

function applyThemeToDom(
  resolvedMode: 'light' | 'dark',
  palette: AccentPalette,
  attribute: 'class' | 'data-theme'
): void {
  const root = document.documentElement;

  // Apply theme attribute
  if (attribute === 'class') {
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedMode);
  } else {
    root.setAttribute('data-theme', resolvedMode);
  }

  // Always add 'dark' class for Tailwind compatibility
  root.classList.toggle('dark', resolvedMode === 'dark');

  // Apply accent color CSS variables
  const {
    primary, secondary, light, deep, textOnAccent,
    textAccentDark, textAccentSecondaryDark,
    textAccentLight, textAccentSecondaryLight,
    glowColor,
  } = palette;

  root.style.setProperty('--color-accent-primary', primary);
  root.style.setProperty('--color-accent-secondary', secondary);
  root.style.setProperty('--color-accent-light', light);
  root.style.setProperty('--color-accent-deep', deep);

  // Text colors based on mode
  const textAccent = resolvedMode === 'dark' ? textAccentDark : textAccentLight;
  const textAccentSecondary = resolvedMode === 'dark' ? textAccentSecondaryDark : textAccentSecondaryLight;
  root.style.setProperty('--theme-text-accent', textAccent);
  root.style.setProperty('--theme-text-onAccent', textOnAccent);

  // Narrowed gradient: blend 35% back toward primary for subtle range
  const gradientEnd = mixHex(primary, secondary, 0.65);
  const mid = mixHex(primary, gradientEnd, 0.50);

  // 3-stop gradient matching Scout's approach
  root.style.setProperty(
    '--theme-gradient-accent',
    `linear-gradient(90deg, ${primary} 0%, ${mid} 50%, ${gradientEnd} 100%)`
  );
  root.style.setProperty(
    '--theme-gradient-accentHover',
    `linear-gradient(90deg, ${deep}, ${primary})`
  );
  root.style.setProperty(
    '--theme-gradient-accentStrong',
    `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`
  );

  // Additional gradient vars (Scout compat)
  root.style.setProperty(
    '--gradient-primary',
    `linear-gradient(90deg, ${primary} 0%, ${mid} 50%, ${gradientEnd} 100%)`
  );
  root.style.setProperty(
    '--gradient-primary-hover',
    `linear-gradient(90deg, ${deep}, ${primary})`
  );
  root.style.setProperty(
    '--bg-accent-gradient',
    `linear-gradient(90deg, ${primary} 0%, ${mid} 50%, ${gradientEnd} 100%)`
  );

  // Text gradient for card titles — using readable variants with narrowing
  const textGradientEnd = mixHex(textAccent, textAccentSecondary, 0.65);
  const textMid = mixHex(textAccent, textGradientEnd, 0.50);
  root.style.setProperty(
    '--gradient-card-title',
    `linear-gradient(90deg, ${textAccent} 0%, ${textMid} 50%, ${textGradientEnd} 100%)`
  );
  root.style.setProperty('--title-gradient-from', textAccent);
  root.style.setProperty('--title-gradient-to', textAccentSecondary);

  // Glow effects
  const primaryRgb = hexToRgb(primary);
  const secondaryRgb = hexToRgb(secondary);

  if (resolvedMode === 'dark' && primaryRgb && secondaryRgb) {
    const glowFrom = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.4)`;
    const glowTo = `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.2)`;
    root.style.setProperty('--theme-shadow-glow', `0 0 20px ${glowColor}`);
    root.style.setProperty('--theme-shadow-glowStrong', `0 0 40px ${glowColor}`);
    root.style.setProperty(
      '--theme-gradient-glow',
      `linear-gradient(135deg, ${glowFrom}, ${glowTo})`
    );

    // Accent-tinted card shadows
    root.style.setProperty(
      '--theme-shadow-card',
      `0 8px 16px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.15), 0 0 0 1px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1)`
    );
    root.style.setProperty(
      '--theme-shadow-cardHover',
      `0 12px 24px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.2), 0 0 20px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.15), 0 0 0 1px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.2)`
    );

    // Accent alpha variants
    root.style.setProperty(
      '--accent-color-alpha',
      `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.25)`
    );
    root.style.setProperty(
      '--accent-color-weak',
      `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.12)`
    );
  } else {
    // Light mode: neutral shadows
    root.style.setProperty('--theme-shadow-glow', '0 0 20px rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--theme-shadow-glowStrong', '0 0 40px rgba(0, 0, 0, 0.15)');
    root.style.setProperty(
      '--theme-gradient-glow',
      'linear-gradient(135deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.03))'
    );
    root.style.setProperty(
      '--theme-shadow-card',
      '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)'
    );
    root.style.setProperty(
      '--theme-shadow-cardHover',
      '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)'
    );

    // Accent alpha variants — neutral in light mode
    root.style.setProperty('--accent-color-alpha', 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--accent-color-weak', 'rgba(0, 0, 0, 0.04)');
  }

  // Border accent colors
  if (primaryRgb) {
    root.style.setProperty(
      '--theme-border-accent',
      `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.5)`
    );
    root.style.setProperty('--theme-border-accentStrong', primary);
    root.style.setProperty('--theme-border-focus', primary);

    // Background accent variants
    root.style.setProperty(
      '--theme-bg-accent-subtle',
      `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${resolvedMode === 'dark' ? 0.1 : 0.08})`
    );
    root.style.setProperty(
      '--theme-bg-accent-muted',
      `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${resolvedMode === 'dark' ? 0.2 : 0.15})`
    );
    root.style.setProperty('--theme-bg-accent-emphasis', primary);

    // Selection highlights
    const { r, g, b } = primaryRgb;
    root.style.setProperty(
      '--bg-row-selected',
      resolvedMode === 'dark' ? `rgba(${r}, ${g}, ${b}, 0.08)` : `rgba(${r}, ${g}, ${b}, 0.07)`
    );
    root.style.setProperty(
      '--bg-row-selected-hover',
      resolvedMode === 'dark' ? `rgba(${r}, ${g}, ${b}, 0.14)` : `rgba(${r}, ${g}, ${b}, 0.12)`
    );
  }
}

// ============================================================================
// Provider Component
// ============================================================================

/**
 * Theme provider with customizable accent colors.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultMode="dark" defaultAccentColor="#FF6B35">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultMode,
  defaultTheme,
  defaultAccentColor = DEFAULT_ACCENT_COLOR,
  storageKey = 'alchemy-theme',
  forcedMode,
  forcedTheme,
  forcedAccentColor,
  attribute = 'data-theme',
}: ThemeProviderProps) {
  // Support legacy prop names
  const effectiveDefaultMode = defaultMode || defaultTheme || 'system';
  const effectiveForcedMode = forcedMode || forcedTheme;

  // Initialize from storage or defaults
  const [mode, setModeState] = React.useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return effectiveDefaultMode;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed: StoredTheme = JSON.parse(stored);
        return parsed.mode || effectiveDefaultMode;
      }
    } catch {
      // Ignore storage errors
    }
    return effectiveDefaultMode;
  });

  const [accentColor, setAccentColorState] = React.useState<string>(() => {
    if (typeof window === 'undefined') return defaultAccentColor;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed: StoredTheme = JSON.parse(stored);
        return parsed.accentColor || defaultAccentColor;
      }
    } catch {
      // Ignore storage errors
    }
    return defaultAccentColor;
  });

  const [resolvedMode, setResolvedMode] = React.useState<'light' | 'dark'>('dark');

  // Derive palette from accent color
  const palette = React.useMemo(
    () => deriveAccentPalette(forcedAccentColor || accentColor),
    [accentColor, forcedAccentColor]
  );

  // Get system theme preference
  const getSystemTheme = React.useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Resolve system preference
  React.useEffect(() => {
    const activeMode = effectiveForcedMode || mode;
    if (activeMode === 'system') {
      setResolvedMode(getSystemTheme());
    } else {
      setResolvedMode(activeMode);
    }
  }, [mode, effectiveForcedMode, getSystemTheme]);

  // Listen for system theme changes
  React.useEffect(() => {
    if ((effectiveForcedMode || mode) !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setResolvedMode(getSystemTheme());

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, effectiveForcedMode, getSystemTheme]);

  // Apply theme to DOM
  React.useEffect(() => {
    applyThemeToDom(resolvedMode, palette, attribute);
  }, [resolvedMode, palette, attribute]);

  // Persist to storage
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored: StoredTheme = { mode, accentColor };
      localStorage.setItem(storageKey, JSON.stringify(stored));
    } catch {
      // Ignore storage errors
    }
  }, [mode, accentColor, storageKey]);

  // Actions
  const setMode = React.useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const setAccentColor = React.useCallback((color: string) => {
    if (isValidHex(color)) {
      setAccentColorState(color);
    }
  }, []);

  const toggleMode = React.useCallback(() => {
    setModeState((current) => {
      if (current === 'system') {
        return getSystemTheme() === 'dark' ? 'light' : 'dark';
      }
      return current === 'dark' ? 'light' : 'dark';
    });
  }, [getSystemTheme]);

  const value = React.useMemo(
    (): ThemeContextValue => ({
      mode: effectiveForcedMode || mode,
      resolvedMode,
      accentColor: forcedAccentColor || accentColor,
      palette,
      setMode,
      setAccentColor,
      toggleMode,
      // Legacy aliases
      theme: effectiveForcedMode || mode,
      resolvedTheme: resolvedMode,
      setTheme: setMode,
    }),
    [mode, resolvedMode, accentColor, palette, setMode, setAccentColor, toggleMode, effectiveForcedMode, forcedAccentColor]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Access and control the current theme.
 *
 * @example
 * ```tsx
 * const { mode, resolvedMode, accentColor, setAccentColor, toggleMode } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeContext };
