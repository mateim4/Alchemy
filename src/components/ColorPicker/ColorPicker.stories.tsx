import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  argTypes: {
    showPresets: { control: 'boolean' },
    showInput: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    showPresets: true,
    showInput: true,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  render: (args) => {
    const [color, setColor] = React.useState('#FF6B35');
    return <ColorPicker {...args} value={color} onChange={setColor} />;
  },
};

export const PresetsOnly: Story = {
  render: () => {
    const [color, setColor] = React.useState('#FF6B35');
    return <ColorPicker value={color} onChange={setColor} showPresets showInput={false} />;
  },
};

export const InputOnly: Story = {
  render: () => {
    const [color, setColor] = React.useState('#FF6B35');
    return <ColorPicker value={color} onChange={setColor} showPresets={false} showInput />;
  },
};

export const SmallSwatches: Story = {
  render: () => {
    const [color, setColor] = React.useState('#FF6B35');
    return <ColorPicker value={color} onChange={setColor} size="sm" />;
  },
};

export const MediumSwatches: Story = {
  render: () => {
    const [color, setColor] = React.useState('#FF6B35');
    return <ColorPicker value={color} onChange={setColor} size="md" />;
  },
};

export const LargeSwatches: Story = {
  render: () => {
    const [color, setColor] = React.useState('#FF6B35');
    return <ColorPicker value={color} onChange={setColor} size="lg" />;
  },
};

export const CustomInitialColor: Story = {
  render: () => {
    const [color, setColor] = React.useState('#6366F1');
    return (
      <div className="flex flex-col gap-3">
        <ColorPicker value={color} onChange={setColor} />
        <p className="text-sm text-[var(--theme-text-secondary)]">
          Selected: <span className="font-mono">{color}</span>
        </p>
      </div>
    );
  },
};
