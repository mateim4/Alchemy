import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Unchecked: Story = {
  args: { defaultChecked: false },
};

export const WithLabel: Story = {
  args: { label: 'Enable notifications' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled switch' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: 'Disabled checked' },
};

export const SmallSize: Story = {
  args: { size: 'sm', label: 'Small switch' },
};

export const MediumSize: Story = {
  args: { size: 'md', label: 'Medium switch' },
};

export const LargeSize: Story = {
  args: { size: 'lg', label: 'Large switch' },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-2">
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          label={checked ? 'Dark mode: ON' : 'Dark mode: OFF'}
        />
        <p className="text-sm text-[var(--theme-text-secondary)]">
          State: {checked ? 'checked' : 'unchecked'}
        </p>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" defaultChecked label="SM" />
      <Switch size="md" defaultChecked label="MD" />
      <Switch size="lg" defaultChecked label="LG" />
    </div>
  ),
};
