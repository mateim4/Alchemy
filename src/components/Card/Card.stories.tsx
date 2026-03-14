import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline', 'ghost', 'glass'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    interactive: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    padding: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const CardDemo = (props: React.ComponentProps<typeof Card>) => (
  <Card {...props} style={{ maxWidth: 400 }}>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>This is a card description.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-[var(--theme-text-secondary)]">
        Card content goes here. This is a sample card demonstrating the layout.
      </p>
    </CardContent>
    <CardFooter>
      <button className="text-sm text-[var(--theme-text-accent)]">Action</button>
    </CardFooter>
  </Card>
);

export const Default: Story = {
  render: (args) => <CardDemo {...args} />,
};

export const Elevated: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { variant: 'elevated' },
};

export const Outline: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { variant: 'outline' },
};

export const Ghost: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { variant: 'ghost' },
};

export const Glass: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { variant: 'glass' },
};

export const Interactive: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { interactive: true },
};

export const NoPadding: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { padding: 'none' },
};

export const SmallPadding: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { padding: 'sm' },
};

export const LargePadding: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { padding: 'lg' },
};

export const ExtraLargePadding: Story = {
  render: (args) => <CardDemo {...args} />,
  args: { padding: 'xl' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 800 }}>
      {(['default', 'elevated', 'outline', 'ghost', 'glass'] as const).map((v) => (
        <Card key={v} variant={v} padding="md">
          <CardHeader>
            <CardTitle>{v}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--theme-text-secondary)]">
              Variant: {v}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
