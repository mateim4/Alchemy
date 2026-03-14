import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
  },
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true, label: 'Checked by default' },
};

export const Unchecked: Story = {
  args: { label: 'Unchecked checkbox' },
};

// -- Sizes --

export const Small: Story = {
  args: { size: 'sm', label: 'Small checkbox' },
};

export const Medium: Story = {
  args: { size: 'md', label: 'Medium checkbox' },
};

export const Large: Story = {
  args: { size: 'lg', label: 'Large checkbox' },
};

// -- With hint --

export const WithHint: Story = {
  args: {
    label: 'Enable notifications',
    hint: 'You can change this later in settings.',
  },
};

// -- With error --

export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must accept the terms to continue.',
  },
};

// -- Disabled --

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled checkbox' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: 'Disabled and checked' },
};

// -- Without label --

export const WithoutLabel: Story = {
  args: { label: undefined },
};

// -- Controlled --

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-2">
        <Checkbox
          label={checked ? 'Checked' : 'Unchecked'}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p className="text-sm text-[var(--theme-text-secondary)]">
          State: {String(checked)}
        </p>
      </div>
    );
  },
};

// -- All sizes showcase --

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Default" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="With hint" hint="Helper text goes here." />
      <Checkbox label="With error" error="This field is required." />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};
