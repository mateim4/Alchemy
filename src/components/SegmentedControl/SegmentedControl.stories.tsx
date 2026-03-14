import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';
import { HomeRegular, SettingsRegular, InfoRegular } from '@fluentui/react-icons';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    equalWidth: { control: 'boolean' },
    iconSize: { control: 'number' },
  },
  args: {
    equalWidth: false,
    iconSize: 16,
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const basicOptions = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
] as const;

type BasicId = (typeof basicOptions)[number]['id'];

const iconOptions = [
  { id: 'home', label: 'Home', icon: HomeRegular },
  { id: 'settings', label: 'Settings', icon: SettingsRegular },
  { id: 'info', label: 'Info', icon: InfoRegular },
] as const;

type IconId = (typeof iconOptions)[number]['id'];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<BasicId>('overview');
    return (
      <SegmentedControl
        options={[...basicOptions]}
        value={value}
        onChange={setValue}
        ariaLabel="Section"
      />
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = React.useState<IconId>('home');
    return (
      <SegmentedControl
        options={[...iconOptions]}
        value={value}
        onChange={setValue}
        ariaLabel="Navigation"
      />
    );
  },
};

export const EqualWidth: Story = {
  render: () => {
    const [value, setValue] = React.useState<BasicId>('overview');
    return (
      <div style={{ width: 400 }}>
        <SegmentedControl
          options={[...basicOptions]}
          value={value}
          onChange={setValue}
          equalWidth
          ariaLabel="Section"
        />
      </div>
    );
  },
};

export const TwoOptions: Story = {
  render: () => {
    const [value, setValue] = React.useState<'on' | 'off'>('on');
    return (
      <SegmentedControl
        options={[
          { id: 'on' as const, label: 'On' },
          { id: 'off' as const, label: 'Off' },
        ]}
        value={value}
        onChange={setValue}
        ariaLabel="Toggle"
      />
    );
  },
};

export const IconsEqualWidth: Story = {
  render: () => {
    const [value, setValue] = React.useState<IconId>('home');
    return (
      <div style={{ width: 500 }}>
        <SegmentedControl
          options={[...iconOptions]}
          value={value}
          onChange={setValue}
          equalWidth
          ariaLabel="Navigation"
        />
      </div>
    );
  },
};

export const TypeSafeOptions: Story = {
  render: () => {
    type ViewMode = 'grid' | 'list' | 'kanban';
    const [value, setValue] = React.useState<ViewMode>('grid');
    return (
      <div className="flex flex-col gap-2">
        <SegmentedControl<ViewMode>
          options={[
            { id: 'grid', label: 'Grid' },
            { id: 'list', label: 'List' },
            { id: 'kanban', label: 'Kanban' },
          ]}
          value={value}
          onChange={setValue}
          ariaLabel="View mode"
        />
        <p className="text-sm text-[var(--theme-text-secondary)]">
          Selected: <span className="font-mono">{value}</span>
        </p>
      </div>
    );
  },
};
