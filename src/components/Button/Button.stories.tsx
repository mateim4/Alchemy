import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { AddRegular, DeleteRegular, SettingsRegular } from '@fluentui/react-icons';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'success', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
    },
    isLoading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

// -- Variants --

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

// -- Sizes --

export const ExtraSmall: Story = {
  args: { size: 'xs', children: 'Extra Small' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl', children: 'Extra Large' },
};

export const IconSize: Story = {
  args: { size: 'icon', children: <AddRegular /> },
};

export const IconSmall: Story = {
  args: { size: 'icon-sm', children: <SettingsRegular /> },
};

export const IconLarge: Story = {
  args: { size: 'icon-lg', children: <DeleteRegular /> },
};

// -- Interactive states --

export const Loading: Story = {
  args: { isLoading: true, children: 'Saving...' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width' },
};

export const WithLeftIcon: Story = {
  args: { leftIcon: <AddRegular />, children: 'Add Item' },
};

export const WithRightIcon: Story = {
  args: { rightIcon: <SettingsRegular />, children: 'Settings' },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <AddRegular />,
    rightIcon: <SettingsRegular />,
    children: 'Both Icons',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
      <Button size="icon"><AddRegular /></Button>
      <Button size="icon-sm"><AddRegular /></Button>
      <Button size="icon-lg"><AddRegular /></Button>
    </div>
  ),
};
