/**
 * Alchemy Color Utilities
 *
 * Comprehensive color manipulation functions for dynamic theming.
 * Supports hex, RGB, and HSL color spaces with accessibility-focused utilities.
 */

// ============================================================================
// Types
// ============================================================================

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface AccentPalette {
  primary: string;
  secondary: string;
  light: string;
  deep: string;
  textOnAccent: string;
  textAccentDark: string;
  textAccentSecondaryDark: string;
  textAccentLight: string;
  textAccentSecondaryLight: string;
  glowColor: string;
}

// ============================================================================
// Hex ↔ RGB Conversion
// ============================================================================

/**
 * Convert hex color to RGB object
 * Supports 3-digit (#RGB) and 6-digit (#RRGGBB) formats
 */
export function hexToRgb(hex: string): RGB | null {
  const sanitized = hex.replace(/^#/, '');

  if (sanitized.length === 3) {
    const [r, g, b] = sanitized.split('').map((c) => parseInt(c + c, 16));
    return { r, g, b };
  }

  if (sanitized.length === 6) {
    const r = parseInt(sanitized.slice(0, 2), 16);
    const g = parseInt(sanitized.slice(2, 4), 16);
    const b = parseInt(sanitized.slice(4, 6), 16);
    return { r, g, b };
  }

  return null;
}

/**
 * Convert RGB object to hex string
 */
export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ============================================================================
// RGB ↔ HSL Conversion
// ============================================================================

/**
 * Convert RGB to HSL color space
 * Returns h in degrees (0-360), s and l as decimals (0-1)
 */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case rNorm:
      h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
      break;
    case gNorm:
      h = ((bNorm - rNorm) / d + 2) / 6;
      break;
    case bNorm:
      h = ((rNorm - gNorm) / d + 4) / 6;
      break;
  }

  return { h: h * 360, s, l };
}

/**
 * Convert HSL to RGB color space
 * h in degrees (0-360), s and l as decimals (0-1)
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  const hNorm = ((h % 360) + 360) % 360 / 360;

  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hNorm) * 255),
    b: Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255),
  };
}

// ============================================================================
// Color Mixing
// ============================================================================

/**
 * Mix two RGB colors with linear interpolation
 * @param a First color
 * @param b Second color
 * @param t Mix ratio (0 = all a, 1 = all b)
 */
export function mixRgb(a: RGB, b: RGB, t: number): RGB {
  const tt = Math.max(0, Math.min(1, t));
  return {
    r: Math.round(a.r + (b.r - a.r) * tt),
    g: Math.round(a.g + (b.g - a.g) * tt),
    b: Math.round(a.b + (b.b - a.b) * tt),
  };
}

/**
 * Mix two hex colors
 */
export function mixHex(a: string, b: string, t: number): string {
  const aRgb = hexToRgb(a);
  const bRgb = hexToRgb(b);
  if (!aRgb || !bRgb) return a;
  return rgbToHex(mixRgb(aRgb, bRgb, t));
}

// ============================================================================
// Luminance & Contrast
// ============================================================================

/**
 * Calculate relative luminance (WCAG 2.1 formula)
 * Returns value between 0 (black) and 1 (white)
 */
export function getRelativeLuminance(rgb: RGB): number {
  const [rs, gs, bs] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio between 1 (same color) and 21 (black/white)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 1;

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get the best contrasting text color (black or white) for a background
 */
export function getContrastTextColor(backgroundHex: string): string {
  const rgb = hexToRgb(backgroundHex);
  if (!rgb) return '#ffffff';

  const luminance = getRelativeLuminance(rgb);
  // Use a higher threshold for better readability
  return luminance > 0.45 ? '#000000' : '#ffffff';
}

/**
 * Check if a color combination meets WCAG AA contrast requirements
 * @param ratio Minimum contrast ratio (4.5 for normal text, 3 for large text)
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  ratio: number = 4.5
): boolean {
  return getContrastRatio(foreground, background) >= ratio;
}

// ============================================================================
// Readability Adjustments
// ============================================================================

/**
 * Ensure a color is readable on dark backgrounds (~#101010)
 * Brightens colors that are too dark
 */
export function ensureReadableOnDark(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const luminance = getRelativeLuminance(rgb);
  if (luminance >= 0.18) return hex;

  // Brighten the color while preserving hue
  const { h, s } = rgbToHsl(rgb);
  const minLightness = 0.58;
  return rgbToHex(hslToRgb(h, s, minLightness));
}

/**
 * Ensure a color is readable on light backgrounds (~#F7F7FF)
 * Darkens colors that are too light
 */
export function ensureReadableOnLight(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const luminance = getRelativeLuminance(rgb);
  if (luminance <= 0.40) return hex;

  // Darken the color while preserving hue
  const { h, s } = rgbToHsl(rgb);
  const maxLightness = 0.42;
  return rgbToHex(hslToRgb(h, s, maxLightness));
}

// ============================================================================
// Color Manipulation
// ============================================================================

/**
 * Lighten a color by a percentage
 */
export function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { h, s, l } = rgbToHsl(rgb);
  const newL = Math.min(1, l + amount);
  return rgbToHex(hslToRgb(h, s, newL));
}

/**
 * Darken a color by a percentage
 */
export function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { h, s, l } = rgbToHsl(rgb);
  const newL = Math.max(0, l - amount);
  return rgbToHex(hslToRgb(h, s, newL));
}

/**
 * Saturate a color by a percentage
 */
export function saturate(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { h, s, l } = rgbToHsl(rgb);
  const newS = Math.min(1, s + amount);
  return rgbToHex(hslToRgb(h, newS, l));
}

/**
 * Desaturate a color by a percentage
 */
export function desaturate(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { h, s, l } = rgbToHsl(rgb);
  const newS = Math.max(0, s - amount);
  return rgbToHex(hslToRgb(h, newS, l));
}

/**
 * Shift hue by degrees
 */
export function shiftHue(hex: string, degrees: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { h, s, l } = rgbToHsl(rgb);
  const newH = (h + degrees + 360) % 360;
  return rgbToHex(hslToRgb(newH, s, l));
}

/**
 * Create an alpha version of a color
 */
export function alpha(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.max(0, Math.min(1, opacity))})`;
}

// ============================================================================
// Accent Palette Generation
// ============================================================================

/**
 * Generate a complete accent palette from a single base color
 * Creates harmonious variants for use throughout the UI
 */
export function deriveAccentPalette(accentHex: string): AccentPalette {
  const rgb = hexToRgb(accentHex);
  if (!rgb) {
    // Fallback to default orange
    return deriveAccentPalette('#FF6B35');
  }

  const { h, s, l } = rgbToHsl(rgb);

  // Boost saturation for vivid gradients
  const boostedSaturation = Math.min(1, s * 1.15);
  const primaryL = Math.max(0.35, Math.min(0.55, l));

  // Generate palette variants — 8° hue shift keeps gradient cohesive
  const primary = rgbToHex(hslToRgb(h, boostedSaturation, primaryL));
  const secondary = rgbToHex(hslToRgb((h + 8) % 360, boostedSaturation, primaryL));
  const light = rgbToHex(hslToRgb(h, Math.min(1, s * 1.05), Math.min(0.65, primaryL + 0.12)));
  const deep = rgbToHex(hslToRgb(h, Math.min(1, s * 1.2), Math.max(0.28, primaryL - 0.1)));

  // Text colors for accessibility
  const textOnAccent = getContrastTextColor(primary);
  const textAccentDark = ensureReadableOnDark(primary);
  const textAccentSecondaryDark = ensureReadableOnDark(secondary);
  const textAccentLight = ensureReadableOnLight(primary);
  const textAccentSecondaryLight = ensureReadableOnLight(secondary);

  // Glow color (slightly transparent primary)
  const glowColor = alpha(primary, 0.4);

  return {
    primary,
    secondary,
    light,
    deep,
    textOnAccent,
    textAccentDark,
    textAccentSecondaryDark,
    textAccentLight,
    textAccentSecondaryLight,
    glowColor,
  };
}

// ============================================================================
// Preset Accent Colors
// ============================================================================

export const presetAccentColors = [
  { name: 'Orange', value: '#FF6B35' },
  { name: 'Gold', value: '#FF9F1C' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Fuchsia', value: '#D946EF' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Violet', value: '#8B5CF6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Sky', value: '#0EA5E9' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Green', value: '#22C55E' },
] as const;

// ============================================================================
// Validation
// ============================================================================

/**
 * Check if a string is a valid hex color
 */
export function isValidHex(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

/**
 * Normalize a hex color to 6-digit format
 */
export function normalizeHex(hex: string): string {
  if (!isValidHex(hex)) return hex;

  const sanitized = hex.replace(/^#/, '');
  if (sanitized.length === 3) {
    return `#${sanitized
      .split('')
      .map((c) => c + c)
      .join('')}`;
  }
  return `#${sanitized}`;
}
