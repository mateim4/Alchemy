import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';
import { Button } from '../Button';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      description: {
        component:
          'Catches React rendering errors and displays a fallback UI. Supports default and custom fallbacks.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

function BuggyComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Something went wrong in the component!');
  }
  return (
    <div className="rounded-lg border border-[var(--theme-border-primary)] p-4">
      <p className="text-sm text-[var(--theme-text-primary)]">This component is working fine.</p>
    </div>
  );
}

export const Default: Story = {
  render: () => {
    const [crash, setCrash] = React.useState(false);
    // Use key to force re-mount when toggling
    return (
      <div className="flex flex-col gap-4">
        <Button variant="danger" onClick={() => setCrash(true)}>
          Trigger Error
        </Button>
        <ErrorBoundary key={String(crash)}>
          <BuggyComponent shouldThrow={crash} />
        </ErrorBoundary>
      </div>
    );
  },
};

export const DefaultFallback: Story = {
  render: () => (
    <ErrorBoundary>
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
};

export const CustomFallbackNode: Story = {
  render: () => (
    <ErrorBoundary
      fallback={
        <div className="rounded-xl border border-[var(--theme-border-status-error)] bg-[var(--theme-bg-status-error)] p-6 text-center">
          <h3 className="text-lg font-bold text-[var(--theme-text-status-error)]">Oops!</h3>
          <p className="mt-1 text-sm text-[var(--theme-text-secondary)]">
            A custom error fallback is displayed here.
          </p>
        </div>
      }
    >
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
};

export const CustomFallbackFunction: Story = {
  render: () => (
    <ErrorBoundary
      fallback={(error) => (
        <div className="rounded-xl border border-[var(--theme-border-status-error)] bg-[var(--theme-bg-status-error)] p-6">
          <h3 className="text-lg font-bold text-[var(--theme-text-status-error)]">Error caught!</h3>
          <p className="mt-1 font-mono text-xs text-[var(--theme-text-secondary)]">
            {error.message}
          </p>
        </div>
      )}
    >
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
};

export const WorkingChild: Story = {
  render: () => (
    <ErrorBoundary>
      <BuggyComponent shouldThrow={false} />
    </ErrorBoundary>
  ),
};
