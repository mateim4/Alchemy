import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { InfoRegular } from '@fluentui/react-icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
    text: { control: 'text' },
  },
  args: {
    text: 'Tooltip text',
    position: 'top',
    delay: 300,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '6rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
};

export const Top: Story = {
  render: () => (
    <Tooltip text="Positioned on top" position="top">
      <Button variant="secondary">Top</Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip text="Positioned on bottom" position="bottom">
      <Button variant="secondary">Bottom</Button>
    </Tooltip>
  ),
};

export const Left: Story = {
  render: () => (
    <Tooltip text="Positioned on left" position="left">
      <Button variant="secondary">Left</Button>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <Tooltip text="Positioned on right" position="right">
      <Button variant="secondary">Right</Button>
    </Tooltip>
  ),
};

export const NoDelay: Story = {
  render: () => (
    <Tooltip text="Appears instantly" position="top" delay={0}>
      <Button variant="secondary">No delay</Button>
    </Tooltip>
  ),
};

export const LongDelay: Story = {
  render: () => (
    <Tooltip text="Appears after 1 second" position="top" delay={1000}>
      <Button variant="secondary">Long delay (1s)</Button>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip text="More information" position="right">
      <span className="text-[var(--theme-text-accent)]">
        <InfoRegular />
      </span>
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip text="Top" position="top"><Button variant="outline">Top</Button></Tooltip>
      <Tooltip text="Bottom" position="bottom"><Button variant="outline">Bottom</Button></Tooltip>
      <Tooltip text="Left" position="left"><Button variant="outline">Left</Button></Tooltip>
      <Tooltip text="Right" position="right"><Button variant="outline">Right</Button></Tooltip>
    </div>
  ),
};
