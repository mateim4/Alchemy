import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { SettingsRegular } from '@fluentui/react-icons';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnBackdrop: { control: 'boolean' },
  },
  args: {
    size: 'md',
    closeOnBackdrop: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo({ size, closeOnBackdrop }: { size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; closeOnBackdrop?: boolean }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal ({size || 'md'})
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} size={size} closeOnBackdrop={closeOnBackdrop}>
        <Modal.Header title="Modal Title" subtitle="Optional subtitle" onClose={() => setOpen(false)} />
        <Modal.Body>
          <p className="text-sm text-[var(--theme-text-secondary)]">
            This is the modal body content. It supports any React content.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const SmallSize: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const MediumSize: Story = {
  render: () => <ModalDemo size="md" />,
};

export const LargeSize: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const ExtraLargeSize: Story = {
  render: () => <ModalDemo size="xl" />,
};

export const FullSize: Story = {
  render: () => <ModalDemo size="full" />,
};

export const NoBackdropClose: Story = {
  render: () => <ModalDemo closeOnBackdrop={false} />,
};

export const WithIcon: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open with Icon</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} size="md">
          <Modal.Header
            icon={<SettingsRegular />}
            iconBg="var(--color-accent-primary)"
            title="Settings"
            subtitle="Manage your preferences"
            onClose={() => setOpen(false)}
          />
          <Modal.Body>
            <div className="flex flex-col gap-3">
              <Input placeholder="Display Name" />
              <Input placeholder="Email" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ModalDemo size="sm" />
      <ModalDemo size="md" />
      <ModalDemo size="lg" />
      <ModalDemo size="xl" />
      <ModalDemo size="full" />
    </div>
  ),
};
