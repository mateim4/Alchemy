import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: 'Notification',
    description: 'This is a toast message.',
    variant: 'default',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {};

export const SuccessToast: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your changes have been saved.',
  },
};

export const WarningToast: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Your session is about to expire.',
  },
};

export const ErrorToast: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
};

export const InfoToast: Story = {
  args: {
    variant: 'info',
    title: 'Info',
    description: 'A new update is available.',
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) {
      return (
        <Button variant="secondary" onClick={() => setVisible(true)}>
          Show Toast
        </Button>
      );
    }
    return (
      <Toast
        variant="success"
        title="Dismissible Toast"
        description="Click the X to dismiss."
        dismissible
        onDismiss={() => setVisible(false)}
      />
    );
  },
};

export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'New update',
    description: 'Version 2.0 is available.',
    action: <Button variant="outline" size="sm">Update</Button>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toast variant="default" title="Default" description="Default toast notification." />
      <Toast variant="success" title="Success" description="Operation completed." />
      <Toast variant="warning" title="Warning" description="Please review your settings." />
      <Toast variant="error" title="Error" description="An error occurred." />
      <Toast variant="info" title="Info" description="Here is some information." />
    </div>
  ),
};
