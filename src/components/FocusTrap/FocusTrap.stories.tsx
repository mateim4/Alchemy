import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FocusTrap } from './FocusTrap';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof FocusTrap> = {
  title: 'Components/FocusTrap',
  component: FocusTrap,
  parameters: {
    docs: {
      description: {
        component:
          'Traps keyboard focus within its children. Tab and Shift+Tab wrap around, Escape deactivates.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FocusTrap>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Button variant="primary" onClick={() => setActive(true)}>
          Activate Focus Trap
        </Button>

        <FocusTrap isActive={active} onDeactivate={() => setActive(false)}>
          <div
            className={`rounded-xl border p-6 transition-all ${
              active
                ? 'border-[var(--theme-border-accent)] bg-[var(--theme-bg-glass-secondary)] shadow-lg'
                : 'border-[var(--theme-border-primary)] bg-[var(--theme-bg-secondary)]'
            }`}
          >
            <p className="mb-4 text-sm text-[var(--theme-text-secondary)]">
              {active
                ? 'Focus is trapped! Tab wraps around. Press Escape to deactivate.'
                : 'Click the button above to activate the focus trap.'}
            </p>
            <div className="flex flex-col gap-3">
              <Input placeholder="First input" />
              <Input placeholder="Second input" />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setActive(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setActive(false)}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </FocusTrap>
      </div>
    );
  },
};

export const ModalLikeContainer: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Modal-like Trap
        </Button>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <FocusTrap isActive={open} onDeactivate={() => setOpen(false)}>
              <div className="rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-glass-modal)] p-6 shadow-lg backdrop-blur-xl" style={{ width: 400 }}>
                <h2 className="mb-3 text-lg font-semibold text-[var(--theme-text-primary)]">
                  Trapped Modal
                </h2>
                <p className="mb-4 text-sm text-[var(--theme-text-secondary)]">
                  Tab and Shift+Tab stay inside. Escape closes.
                </p>
                <Input placeholder="Name" className="mb-3" />
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
                </div>
              </div>
            </FocusTrap>
          </div>
        )}
      </>
    );
  },
};
