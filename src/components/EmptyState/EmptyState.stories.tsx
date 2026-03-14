import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';
import { InfoRegular, AddRegular } from '@fluentui/react-icons';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: 'No items found',
    description: 'Get started by creating your first item.',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Empty',
    description: 'Nothing here yet.',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    title: 'No results',
    description: 'Try adjusting your search or filter criteria.',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Welcome!',
    description: 'Your dashboard is empty. Start by adding some data.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <InfoRegular style={{ width: 40, height: 40 }} />,
    title: 'No notifications',
    description: 'You are all caught up!',
  },
};

export const WithAction: Story = {
  args: {
    icon: <AddRegular style={{ width: 40, height: 40 }} />,
    title: 'No projects',
    description: 'Create your first project to get started.',
    action: <Button variant="primary" leftIcon={<AddRegular />}>Create Project</Button>,
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'No data available',
    description: undefined,
  },
};

export const WithoutIcon: Story = {
  args: {
    icon: undefined,
    title: 'Nothing to show',
    description: 'Add some items to see them here.',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <EmptyState
        size="sm"
        icon={<InfoRegular style={{ width: 24, height: 24 }} />}
        title="Small"
        description="Compact empty state."
      />
      <EmptyState
        size="md"
        icon={<InfoRegular style={{ width: 32, height: 32 }} />}
        title="Medium"
        description="Default empty state size."
      />
      <EmptyState
        size="lg"
        icon={<InfoRegular style={{ width: 48, height: 48 }} />}
        title="Large"
        description="Spacious empty state for full-page views."
      />
    </div>
  ),
};
