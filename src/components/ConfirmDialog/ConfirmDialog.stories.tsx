import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog, useConfirmDialog } from './ConfirmDialog';
import { Button } from '../Button';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  argTypes: {
    variant: {
      control: 'select',
      options: ['danger', 'warning', 'info'],
    },
    title: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
  },
  args: {
    variant: 'danger',
    title: 'Delete item?',
    message: 'This action cannot be undone.',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

function ConfirmDialogDemo({
  variant,
  title,
  message,
  confirmLabel,
  cancelLabel,
}: {
  variant?: 'danger' | 'warning' | 'info';
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open {variant || 'danger'} dialog
      </Button>
      <ConfirmDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title={title}
        message={message}
        variant={variant}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
      />
    </>
  );
}

export const Default: Story = {
  render: (args) => (
    <ConfirmDialogDemo
      variant={args.variant as 'danger' | 'warning' | 'info'}
      title={args.title!}
      message={args.message as string}
      confirmLabel={args.confirmLabel}
      cancelLabel={args.cancelLabel}
    />
  ),
};

export const Danger: Story = {
  render: () => (
    <ConfirmDialogDemo
      variant="danger"
      title="Delete project?"
      message="All data associated with this project will be permanently removed."
      confirmLabel="Delete"
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ConfirmDialogDemo
      variant="warning"
      title="Unsaved changes"
      message="You have unsaved changes. Do you want to discard them?"
      confirmLabel="Discard"
      cancelLabel="Keep editing"
    />
  ),
};

export const Info: Story = {
  render: () => (
    <ConfirmDialogDemo
      variant="info"
      title="Update available"
      message="A new version is ready to install. Would you like to update now?"
      confirmLabel="Update"
      cancelLabel="Later"
    />
  ),
};

export const UseConfirmDialogHook: Story = {
  render: () => {
    function HookDemo() {
      const { confirm, dialogProps } = useConfirmDialog();
      const [result, setResult] = React.useState<string>('');

      const handleDelete = async () => {
        const ok = await confirm({
          title: 'Delete item?',
          message: 'This action is irreversible.',
          variant: 'danger',
          confirmLabel: 'Delete',
        });
        setResult(ok ? 'Confirmed!' : 'Cancelled.');
      };

      const handleUpdate = async () => {
        const ok = await confirm({
          title: 'Install update?',
          message: 'The application will restart.',
          variant: 'info',
          confirmLabel: 'Install',
        });
        setResult(ok ? 'Installing...' : 'Skipped.');
      };

      return (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
            <Button variant="primary" onClick={handleUpdate}>Update</Button>
          </div>
          {result && (
            <p className="text-sm text-[var(--theme-text-secondary)]">Result: {result}</p>
          )}
          <ConfirmDialog {...dialogProps} />
        </div>
      );
    }
    return <HookDemo />;
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ConfirmDialogDemo variant="danger" title="Danger" message="Danger variant." />
      <ConfirmDialogDemo variant="warning" title="Warning" message="Warning variant." />
      <ConfirmDialogDemo variant="info" title="Info" message="Info variant." />
    </div>
  ),
};
