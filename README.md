<p align="center">
  <img src="docs/assets/alchemy-logo.svg" alt="Alchemy Design System" width="120" height="120" />
</p>

<h1 align="center">Alchemy Design System</h1>

<p align="center">
  <strong>A modern, tokenized design system with multi-theme support</strong>
</p>

<p align="center">
  Built with Style Dictionary • React • Tailwind CSS
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#tokens">Tokens</a> •
  <a href="#components">Components</a> •
  <a href="#theming">Theming</a> •
  <a href="#tailwind">Tailwind</a>
</p>

---

## ✨ Features

- **🎨 Design Tokens** — Consistent, scalable design decisions as code
- **🌙 Multi-Theme** — Built-in dark/light modes with extensible theming
- **⚛️ React Components** — Accessible, composable UI components
- **🎯 Tailwind Preset** — Drop-in Tailwind CSS integration
- **📦 Tree-Shakeable** — Import only what you need
- **🔧 Style Dictionary** — Platform-agnostic token generation
- **💎 Glass Morphism** — Modern glass UI effects out of the box
- **♿ Accessible** — WCAG 2.1 compliant components

---

## 📦 Installation

```bash
npm install @alchemy-ui/core
# or
yarn add @alchemy-ui/core
# or
pnpm add @alchemy-ui/core
```

---

## 🚀 Quick Start

### 1. Import the CSS

```tsx
// In your app entry point
import '@alchemy-ui/core/css';
```

### 2. Wrap with ThemeProvider

```tsx
import { ThemeProvider } from '@alchemy-ui/core';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

### 3. Use Components

```tsx
import { Button, Card, Text, Badge } from '@alchemy-ui/core';

function Example() {
  return (
    <Card variant="glass" padding="lg">
      <Text variant="h2">Welcome to Alchemy</Text>
      <Text color="secondary">A modern design system</Text>
      <div className="flex gap-2 mt-4">
        <Button variant="primary">Get Started</Button>
        <Button variant="secondary">Learn More</Button>
      </div>
      <Badge variant="success" className="mt-4">New</Badge>
    </Card>
  );
}
```

---

## 🎨 Design Tokens

Alchemy uses a layered token architecture:

```
┌─────────────────────────────────────┐
│           Semantic Tokens           │  ← Context-specific (accent, status)
├─────────────────────────────────────┤
│           Theme Tokens              │  ← Theme-aware (bg, text, border)
├─────────────────────────────────────┤
│           Core Tokens               │  ← Primitives (colors, spacing)
└─────────────────────────────────────┘
```

### Core Tokens

| Category | Examples |
|----------|----------|
| **Colors** | `orange.500`, `carbon.500`, `frost.300` |
| **Typography** | `font.size.md`, `font.weight.semibold` |
| **Spacing** | `spacing.4` (16px), `spacing.8` (32px) |
| **Shadows** | `shadow.md`, `shadow.glow.accent` |
| **Radii** | `radius.lg` (8px), `radius.xl` (12px) |
| **Motion** | `duration.normal` (200ms), `easing.smooth` |

### Using CSS Variables

```css
.custom-element {
  background: var(--theme-bg-primary);
  color: var(--theme-text-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--theme-shadow-card);
}
```

### Using TypeScript Tokens

```tsx
import { tokens } from '@alchemy-ui/core/tokens';

const styles = {
  color: tokens['color-accent-primary'],
  padding: tokens['spacing-4'],
};
```

---

## 🧩 Components

### Button

```tsx
import { Button } from '@alchemy-ui/core';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowIcon />}>Continue</Button>

// Loading state
<Button isLoading>Saving...</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@alchemy-ui/core';

<Card variant="glass" interactive>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

### Input

```tsx
import { Input } from '@alchemy-ui/core';

<Input placeholder="Enter email" />
<Input leftIcon={<SearchIcon />} placeholder="Search..." />
<Input variant="error" error="Invalid email" />
<Input clearable onClear={() => setValue('')} />
```

### Badge

```tsx
import { Badge } from '@alchemy-ui/core';

<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
```

### Text

```tsx
import { Text } from '@alchemy-ui/core';

<Text variant="hero1" gradient>Hero Text</Text>
<Text variant="h1">Heading</Text>
<Text variant="body" color="secondary">Body text</Text>
<Text variant="label" color="muted">Label</Text>
```

### Toast

```tsx
import { Toast, ToastContainer } from '@alchemy-ui/core';

<ToastContainer position="bottom-right">
  <Toast
    variant="success"
    title="Success!"
    description="Your changes have been saved."
    dismissible
    onDismiss={handleDismiss}
  />
</ToastContainer>
```

### Switch

```tsx
import { Switch } from '@alchemy-ui/core';

<Switch checked={enabled} onCheckedChange={setEnabled} />
<Switch label="Dark mode" size="lg" />
```

### Avatar

```tsx
import { Avatar, AvatarGroup } from '@alchemy-ui/core';

<Avatar src="/avatar.jpg" alt="John" status="online" />
<Avatar fallback="JD" size="lg" />

<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
  <Avatar src="/user4.jpg" />
</AvatarGroup>
```

---

## 🌙 Theming

### Theme Provider

```tsx
import { ThemeProvider, useTheme } from '@alchemy-ui/core';

// Wrap your app
<ThemeProvider defaultTheme="system" storageKey="my-app-theme">
  <App />
</ThemeProvider>

// Use the hook
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### Theme Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultTheme` | `'light' \| 'dark' \| 'system'` | `'system'` | Initial theme |
| `storageKey` | `string` | `'alchemy-theme'` | localStorage key |
| `forcedTheme` | `'light' \| 'dark'` | — | Force a specific theme |
| `attribute` | `'class' \| 'data-theme'` | `'data-theme'` | HTML attribute |

### Custom Themes

Create custom themes by defining CSS variables:

```css
[data-theme="ocean"] {
  --theme-bg-primary: #0a1628;
  --theme-bg-secondary: #0f1f35;
  --theme-text-primary: #e0f2fe;
  --color-accent-primary: #0ea5e9;
  /* ... */
}
```

---

## 🎯 Tailwind CSS Integration

### Using the Preset

```js
// tailwind.config.js
module.exports = {
  presets: [require('@alchemy-ui/core/tailwind')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@alchemy-ui/core/dist/**/*.js',
  ],
};
```

### Tailwind Classes

```tsx
// Use Alchemy's design tokens as Tailwind classes
<div className="bg-carbon-500 text-frost-300 rounded-xl shadow-card">
  <h1 className="text-2xl font-semibold text-accent">Title</h1>
  <p className="text-text-secondary">Description</p>
</div>
```

---

## 📁 Project Structure

```
@alchemy-ui/core/
├── dist/
│   ├── css/
│   │   ├── alchemy.css        # Combined CSS
│   │   ├── tokens.css         # Core tokens
│   │   └── themes/
│   │       ├── dark.css       # Dark theme
│   │       └── light.css      # Light theme
│   ├── tokens/
│   │   └── index.ts           # TypeScript token exports
│   ├── tailwind/
│   │   └── preset.js          # Tailwind preset
│   └── index.js               # React components
├── tokens/
│   ├── core/                  # Primitive tokens
│   ├── semantic/              # Semantic tokens
│   └── themes/                # Theme tokens
└── src/
    └── components/            # React components
```

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Build tokens
npm run build:tokens

# Build everything
npm run build

# Development mode
npm run dev

# Run Storybook
npm run storybook
```

---

## 📚 Resources

- [Fluent UI Icons](https://react.fluentui.dev/?path=/docs/icons-catalog--docs) — Icon library
- [Style Dictionary](https://amzn.github.io/style-dictionary/) — Token platform
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS

---

## 📄 License

MIT © [mateim4](https://github.com/mateim4)

---

<p align="center">
  <sub>Built with ❤️ and ☕</sub>
</p>
