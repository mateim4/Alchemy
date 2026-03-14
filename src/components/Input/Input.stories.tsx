import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { HomeRegular, SettingsRegular } from '@fluentui/react-icons';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm', placeholder: 'Small input' },
};

export const Medium: Story = {
  args: { size: 'md', placeholder: 'Medium input' },
};

export const Large: Story = {
  args: { size: 'lg', placeholder: 'Large input' },
};

export const WithLeftIcon: Story = {
  args: { leftIcon: <HomeRegular />, placeholder: 'Search...' },
};

export const WithRightIcon: Story = {
  args: { rightIcon: <SettingsRegular />, placeholder: 'Settings...' },
};

export const WithError: Story = {
  args: { error: 'This field is required', placeholder: 'Enter email...' },
};

export const WithHint: Story = {
  args: { hint: 'We will never share your email.', placeholder: 'Enter email...' },
};

export const Clearable: Story = {
  render: () => {
    const [value, setValue] = React.useState('Clear me');
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearable
        onClear={() => setValue('')}
        placeholder="Type then clear..."
      />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled input' },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ maxWidth: 400 }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};
