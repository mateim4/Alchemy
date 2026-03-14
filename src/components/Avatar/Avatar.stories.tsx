import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
    },
    fallback: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
  args: {
    size: 'md',
    fallback: 'JD',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=avatar1',
    alt: 'John Doe',
  },
};

export const WithFallback: Story = {
  args: { fallback: 'AB' },
};

export const NoFallback: Story = {
  args: { fallback: undefined, src: undefined },
};

// -- Sizes --

export const ExtraSmall: Story = {
  args: { size: 'xs', fallback: 'XS' },
};

export const Small: Story = {
  args: { size: 'sm', fallback: 'SM' },
};

export const Medium: Story = {
  args: { size: 'md', fallback: 'MD' },
};

export const Large: Story = {
  args: { size: 'lg', fallback: 'LG' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl', fallback: 'XL' },
};

export const DoubleExtraLarge: Story = {
  args: { size: '2xl', fallback: '2X' },
};

// -- Status indicators --

export const Online: Story = {
  args: { status: 'online', fallback: 'ON' },
};

export const Offline: Story = {
  args: { status: 'offline', fallback: 'OF' },
};

export const Busy: Story = {
  args: { status: 'busy', fallback: 'BS' },
};

export const Away: Story = {
  args: { status: 'away', fallback: 'AW' },
};

// -- All sizes showcase --

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
      <Avatar size="2xl" fallback="2X" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar fallback="ON" status="online" />
      <Avatar fallback="OF" status="offline" />
      <Avatar fallback="BS" status="busy" />
      <Avatar fallback="AW" status="away" />
    </div>
  ),
};

// -- AvatarGroup --

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3} size="md">
      <Avatar fallback="A" />
      <Avatar fallback="B" />
      <Avatar fallback="C" />
      <Avatar fallback="D" />
      <Avatar fallback="E" />
    </AvatarGroup>
  ),
};

export const GroupLarge: Story = {
  render: () => (
    <AvatarGroup max={4} size="lg">
      <Avatar fallback="JD" />
      <Avatar fallback="AB" />
      <Avatar fallback="CD" />
      <Avatar fallback="EF" />
      <Avatar fallback="GH" />
      <Avatar fallback="IJ" />
    </AvatarGroup>
  ),
};
