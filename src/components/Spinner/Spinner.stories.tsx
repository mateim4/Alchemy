import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'current'],
    },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

// -- Sizes --

export const ExtraSmall: Story = {
  args: { size: 'xs' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl' },
};

// -- Colors --

export const PrimaryColor: Story = {
  args: { color: 'primary' },
};

export const SecondaryColor: Story = {
  args: { color: 'secondary' },
};

export const WhiteColor: Story = {
  args: { color: 'white' },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const CurrentColor: Story = {
  args: { color: 'current' },
};

// -- Custom label --

export const CustomLabel: Story = {
  args: { label: 'Loading data...', size: 'lg' },
};

// -- Showcase --

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="current" />
      <div className="rounded-lg bg-gray-800 p-3">
        <Spinner color="white" />
      </div>
    </div>
  ),
};
