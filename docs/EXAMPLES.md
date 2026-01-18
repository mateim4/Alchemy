# Alchemy Design System — Examples

This document provides comprehensive examples for using Alchemy components and tokens.

---

## Table of Contents

- [Complete App Layout](#complete-app-layout)
- [Form Patterns](#form-patterns)
- [Card Layouts](#card-layouts)
- [Status Indicators](#status-indicators)
- [Navigation Patterns](#navigation-patterns)
- [Data Display](#data-display)
- [Glass Morphism Effects](#glass-morphism-effects)

---

## Complete App Layout

```tsx
import {
  ThemeProvider,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Text,
  Switch,
  useTheme,
} from '@alchemy-ui/core';
import '@alchemy-ui/core/css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-bg-primary">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Dashboard />
        </main>
      </div>
    </ThemeProvider>
  );
}

function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="glass border-b border-border-glass px-6 py-4">
      <div className="flex items-center justify-between">
        <Text variant="h2" gradient>
          My Application
        </Text>
        <Switch
          label={resolvedTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          checked={resolvedTheme === 'dark'}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard title="Users" value="12,543" change="+12%" />
      <StatsCard title="Revenue" value="$45,231" change="+8%" />
      <StatsCard title="Orders" value="1,234" change="-3%" />
    </div>
  );
}
```

---

## Form Patterns

### Login Form

```tsx
import { Card, CardHeader, CardTitle, CardContent, Input, Button, Text } from '@alchemy-ui/core';
import { Mail20Regular, LockClosed20Regular } from '@fluentui/react-icons';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle login...
  };

  return (
    <Card variant="glass" padding="lg" className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <Text color="secondary">Sign in to your account</Text>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            leftIcon={<Mail20Regular />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            leftIcon={<LockClosed20Regular />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Sign In
          </Button>
          <Button variant="link" fullWidth>
            Forgot password?
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Settings Form

```tsx
import { Card, Input, Switch, Button, Text } from '@alchemy-ui/core';

function SettingsForm() {
  return (
    <Card variant="glass" padding="lg">
      <Text variant="h3" className="mb-6">Preferences</Text>

      <div className="space-y-6">
        <div className="space-y-2">
          <Text variant="label">Display Name</Text>
          <Input placeholder="Enter your name" />
        </div>

        <div className="space-y-2">
          <Text variant="label">Email</Text>
          <Input type="email" placeholder="your@email.com" />
        </div>

        <div className="flex items-center justify-between py-3 border-t border-border-secondary">
          <div>
            <Text variant="label">Email Notifications</Text>
            <Text variant="bodySm" color="muted">Receive updates via email</Text>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between py-3 border-t border-border-secondary">
          <div>
            <Text variant="label">Marketing Emails</Text>
            <Text variant="bodySm" color="muted">Receive promotional content</Text>
          </div>
          <Switch />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="primary">Save Changes</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </div>
    </Card>
  );
}
```

---

## Card Layouts

### Feature Cards Grid

```tsx
import { Card, CardContent, Text, Badge } from '@alchemy-ui/core';
import { Rocket20Regular, Shield20Regular, Gauge20Regular } from '@fluentui/react-icons';

const features = [
  {
    icon: Rocket20Regular,
    title: 'Lightning Fast',
    description: 'Optimized for performance with tree-shaking support.',
    badge: 'New',
  },
  {
    icon: Shield20Regular,
    title: 'Type Safe',
    description: 'Full TypeScript support with comprehensive types.',
    badge: null,
  },
  {
    icon: Gauge20Regular,
    title: 'Accessible',
    description: 'WCAG 2.1 compliant components out of the box.',
    badge: null,
  },
];

function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature) => (
        <Card key={feature.title} variant="glass" interactive padding="lg">
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-bg-accent-subtle">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              {feature.badge && (
                <Badge variant="success" size="sm">{feature.badge}</Badge>
              )}
            </div>
            <Text variant="h4">{feature.title}</Text>
            <Text color="secondary">{feature.description}</Text>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### Pricing Cards

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Text, Badge } from '@alchemy-ui/core';
import { Checkmark20Regular } from '@fluentui/react-icons';

function PricingCard({ plan, price, features, popular }) {
  return (
    <Card
      variant={popular ? 'glass' : 'outline'}
      padding="lg"
      className={popular ? 'ring-2 ring-accent' : ''}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{plan}</CardTitle>
          {popular && <Badge variant="default">Popular</Badge>}
        </div>
        <div className="mt-2">
          <Text variant="hero3">${price}</Text>
          <Text color="muted">/month</Text>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Checkmark20Regular className="text-success" />
              <Text color="secondary">{feature}</Text>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant={popular ? 'primary' : 'secondary'}
          fullWidth
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## Status Indicators

### Status Badges

```tsx
import { Badge } from '@alchemy-ui/core';

function StatusBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Offline</Badge>
      <Badge variant="info" dot>Syncing</Badge>
      <Badge variant="secondary">Draft</Badge>
    </div>
  );
}
```

### User Status List

```tsx
import { Avatar, Badge, Text } from '@alchemy-ui/core';

const users = [
  { name: 'Alice Johnson', avatar: '/alice.jpg', status: 'online' },
  { name: 'Bob Smith', avatar: '/bob.jpg', status: 'away' },
  { name: 'Carol White', avatar: null, initials: 'CW', status: 'busy' },
];

function UserList() {
  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div key={user.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-secondary">
          <Avatar
            src={user.avatar}
            fallback={user.initials}
            status={user.status}
          />
          <div>
            <Text variant="label">{user.name}</Text>
            <Text variant="bodySm" color="muted" className="capitalize">
              {user.status}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Navigation Patterns

### Sidebar Navigation

```tsx
import { Button, Text, Badge } from '@alchemy-ui/core';
import {
  Home20Regular,
  People20Regular,
  Settings20Regular,
  ChartMultiple20Regular,
} from '@fluentui/react-icons';

const navItems = [
  { icon: Home20Regular, label: 'Dashboard', badge: null },
  { icon: People20Regular, label: 'Users', badge: '12' },
  { icon: ChartMultiple20Regular, label: 'Analytics', badge: 'New' },
  { icon: Settings20Regular, label: 'Settings', badge: null },
];

function Sidebar() {
  const [active, setActive] = useState('Dashboard');

  return (
    <aside className="w-64 p-4 glass-heavy min-h-screen">
      <Text variant="h3" gradient className="mb-8 px-3">
        Alchemy
      </Text>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
              active === item.label
                ? 'bg-bg-accent-subtle text-accent'
                : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge
                variant={item.badge === 'New' ? 'success' : 'secondary'}
                size="sm"
              >
                {item.badge}
              </Badge>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
```

---

## Glass Morphism Effects

### Glass Card with Glow

```tsx
function GlassCard() {
  return (
    <div className="relative p-8">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-gold-400/20 blur-3xl" />

      {/* Glass card */}
      <Card variant="glass" className="relative">
        <CardContent className="p-8">
          <Text variant="hero2" gradient>
            Glass Morphism
          </Text>
          <Text color="secondary" className="mt-2">
            Beautiful frosted glass effects with customizable blur and opacity.
          </Text>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Layered Glass Panels

```tsx
function LayeredGlass() {
  return (
    <div className="relative h-96">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-transparent to-gold-400/30" />

      {/* Glass panels at different depths */}
      <div className="glass absolute top-8 left-8 w-64 h-48 rounded-2xl p-6">
        <Text variant="h4">Layer 1</Text>
      </div>

      <div className="glass-heavy absolute top-16 left-24 w-64 h-48 rounded-2xl p-6">
        <Text variant="h4">Layer 2</Text>
      </div>

      <div className="glass-modal absolute top-24 left-40 w-64 h-48 rounded-2xl p-6">
        <Text variant="h4">Layer 3</Text>
      </div>
    </div>
  );
}
```

---

## Toast Notifications

### Toast Examples

```tsx
import { Toast, ToastContainer, Button } from '@alchemy-ui/core';
import { useState } from 'react';

function ToastDemo() {
  const [toasts, setToasts] = useState([]);

  const addToast = (variant) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => addToast('success')}>Success</Button>
        <Button onClick={() => addToast('error')}>Error</Button>
        <Button onClick={() => addToast('warning')}>Warning</Button>
        <Button onClick={() => addToast('info')}>Info</Button>
      </div>

      <ToastContainer position="bottom-right">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            title={`${toast.variant.charAt(0).toUpperCase() + toast.variant.slice(1)} Toast`}
            description="This is a notification message."
            dismissible
            onDismiss={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </ToastContainer>
    </>
  );
}
```

---

## Typography Scale

```tsx
import { Text } from '@alchemy-ui/core';

function TypographyScale() {
  return (
    <div className="space-y-4">
      <Text variant="hero1">Hero 1 — 68px</Text>
      <Text variant="hero2">Hero 2 — 40px</Text>
      <Text variant="hero3">Hero 3 — 32px</Text>
      <Text variant="h1">Heading 1 — 24px</Text>
      <Text variant="h2">Heading 2 — 20px</Text>
      <Text variant="h3">Heading 3 — 16px</Text>
      <Text variant="h4">Heading 4 — 14px</Text>
      <Text variant="bodyLg">Body Large — 16px</Text>
      <Text variant="body">Body — 14px</Text>
      <Text variant="bodySm">Body Small — 12px</Text>
      <Text variant="labelLg">Label Large</Text>
      <Text variant="label">Label</Text>
      <Text variant="labelSm">LABEL SMALL</Text>
      <Text variant="code">Code — monospace</Text>
    </div>
  );
}
```

---

For more examples and live demos, visit our [Storybook](https://alchemy-storybook.vercel.app).
