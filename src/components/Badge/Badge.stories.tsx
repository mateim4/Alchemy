import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'error', 'info', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dot: { control: 'boolean' },
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

// -- Variants --

export const Primary: Story = {
  args: { variant: 'default', children: 'Default' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
};

export const Error: Story = {
  args: { variant: 'error', children: 'Error' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'Info' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

// -- Sizes --

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

// -- Dot indicator --

export const WithDot: Story = {
  args: { dot: true, variant: 'success', children: 'Active' },
};

export const DotWarning: Story = {
  args: { dot: true, variant: 'warning', children: 'Pending' },
};

export const DotError: Story = {
  args: { dot: true, variant: 'error', children: 'Failed' },
};

// -- Showcase --

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const AllVariantsWithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" dot>Default</Badge>
      <Badge variant="secondary" dot>Secondary</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="warning" dot>Warning</Badge>
      <Badge variant="error" dot>Error</Badge>
      <Badge variant="info" dot>Info</Badge>
      <Badge variant="outline" dot>Outline</Badge>
    </div>
  ),
};
