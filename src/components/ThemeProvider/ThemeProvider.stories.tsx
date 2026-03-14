import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { Button } from '../Button';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Theme provider with mode switching (light/dark/system) and accent color customization. Stories demonstrate the useTheme hook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

function ThemeDemo() {
  const { mode, resolvedMode, accentColor, setMode, toggleMode } = useTheme();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--theme-border-primary)] bg-[var(--theme-bg-secondary)] p-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-[var(--theme-text-secondary)]">
          Mode: <span className="font-mono font-medium text-[var(--theme-text-primary)]">{mode}</span>
        </p>
        <p className="text-sm text-[var(--theme-text-secondary)]">
          Resolved: <span className="font-mono font-medium text-[var(--theme-text-primary)]">{resolvedMode}</span>
        </p>
        <p className="text-sm text-[var(--theme-text-secondary)]">
          Accent: <span className="font-mono font-medium text-[var(--theme-text-primary)]">{accentColor}</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => setMode('light')}>Light</Button>
        <Button variant="secondary" size="sm" onClick={() => setMode('dark')}>Dark</Button>
        <Button variant="secondary" size="sm" onClick={() => setMode('system')}>System</Button>
        <Button variant="primary" size="sm" onClick={toggleMode}>Toggle</Button>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ThemeProvider defaultMode="dark">
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const LightMode: Story = {
  render: () => (
    <ThemeProvider defaultMode="light">
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultMode="dark">
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const SystemMode: Story = {
  render: () => (
    <ThemeProvider defaultMode="system">
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const CustomAccentColor: Story = {
  render: () => (
    <ThemeProvider defaultMode="dark" defaultAccentColor="#6366F1">
      <ThemeDemo />
    </ThemeProvider>
  ),
};
