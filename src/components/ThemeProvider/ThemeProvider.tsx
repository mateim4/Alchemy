import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme to use */
  defaultTheme?: Theme;
  /** Storage key for persisting theme preference */
  storageKey?: string;
  /** Force a specific theme (overrides user preference) */
  forcedTheme?: 'light' | 'dark';
  /** Attribute to set on the document element */
  attribute?: 'class' | 'data-theme';
}

/**
 * Theme provider for managing light/dark mode.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'alchemy-theme',
  forcedTheme,
  attribute = 'data-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('dark');

  // Get system preference
  const getSystemTheme = React.useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Apply theme to document
  const applyTheme = React.useCallback(
    (newTheme: 'light' | 'dark') => {
      const root = document.documentElement;

      if (attribute === 'class') {
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
      } else {
        root.setAttribute('data-theme', newTheme);
      }

      // Also set class for Tailwind dark mode
      root.classList.toggle('dark', newTheme === 'dark');

      setResolvedTheme(newTheme);
    },
    [attribute]
  );

  // Update theme when it changes
  React.useEffect(() => {
    const resolvedTheme = forcedTheme || (theme === 'system' ? getSystemTheme() : theme);
    applyTheme(resolvedTheme);
  }, [theme, forcedTheme, getSystemTheme, applyTheme]);

  // Listen for system theme changes
  React.useEffect(() => {
    if (theme !== 'system' || forcedTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme(getSystemTheme());

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, forcedTheme, getSystemTheme, applyTheme]);

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, newTheme);
      }
    },
    [storageKey]
  );

  const value = React.useMemo(
    () => ({
      theme: forcedTheme || theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme, forcedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access and control the current theme.
 *
 * @example
 * ```tsx
 * const { theme, setTheme, resolvedTheme } = useTheme();
 * ```
 */
export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeContext };
