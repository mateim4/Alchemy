import type { Meta, StoryObj } from '@storybook/react';
import { HelpTooltip, HelpIcon } from './HelpTooltip';

const meta: Meta<typeof HelpTooltip> = {
  title: 'Components/HelpTooltip',
  component: HelpTooltip,
  argTypes: {
    content: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    showIcon: { control: 'boolean' },
    iconSize: { control: 'number' },
  },
  args: {
    content: 'This is a helpful tooltip.',
    position: 'top',
    showIcon: true,
    iconSize: 16,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HelpTooltip>;

export const Default: Story = {
  args: {
    children: <span className="text-sm text-[var(--theme-text-primary)]">Hover for help</span>,
  },
};

export const WithLabel: Story = {
  render: () => (
    <HelpTooltip content="Maximum file size is 50MB." position="top">
      <span className="text-sm font-medium text-[var(--theme-text-primary)]">Upload file</span>
    </HelpTooltip>
  ),
};

export const PositionTop: Story = {
  render: () => (
    <HelpTooltip content="Positioned on top" position="top">
      <span className="text-sm text-[var(--theme-text-primary)]">Top</span>
    </HelpTooltip>
  ),
};

export const PositionBottom: Story = {
  render: () => (
    <HelpTooltip content="Positioned on bottom" position="bottom">
      <span className="text-sm text-[var(--theme-text-primary)]">Bottom</span>
    </HelpTooltip>
  ),
};

export const PositionLeft: Story = {
  render: () => (
    <HelpTooltip content="Positioned on left" position="left">
      <span className="text-sm text-[var(--theme-text-primary)]">Left</span>
    </HelpTooltip>
  ),
};

export const PositionRight: Story = {
  render: () => (
    <HelpTooltip content="Positioned on right" position="right">
      <span className="text-sm text-[var(--theme-text-primary)]">Right</span>
    </HelpTooltip>
  ),
};

export const WithoutChildren: Story = {
  render: () => (
    <HelpTooltip content="Standalone help icon" />
  ),
};

export const HelpIconStandalone: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <HelpIcon content="What is this?" position="top" />
      <HelpIcon content="Click for info" position="bottom" />
      <HelpIcon content="Left tooltip" position="left" />
      <HelpIcon content="Right tooltip" position="right" />
    </div>
  ),
};

export const HiddenIcon: Story = {
  render: () => (
    <HelpTooltip content="Tooltip without the question mark icon" showIcon={false}>
      <span className="text-sm text-[var(--theme-text-primary)]">Hover (no icon)</span>
    </HelpTooltip>
  ),
};

export const LargeIcon: Story = {
  render: () => (
    <HelpTooltip content="Larger help icon" iconSize={24}>
      <span className="text-sm text-[var(--theme-text-primary)]">Large icon</span>
    </HelpTooltip>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex gap-6">
      <HelpTooltip content="Top" position="top">
        <span className="text-sm text-[var(--theme-text-primary)]">Top</span>
      </HelpTooltip>
      <HelpTooltip content="Bottom" position="bottom">
        <span className="text-sm text-[var(--theme-text-primary)]">Bottom</span>
      </HelpTooltip>
      <HelpTooltip content="Left" position="left">
        <span className="text-sm text-[var(--theme-text-primary)]">Left</span>
      </HelpTooltip>
      <HelpTooltip content="Right" position="right">
        <span className="text-sm text-[var(--theme-text-primary)]">Right</span>
      </HelpTooltip>
    </div>
  ),
};
